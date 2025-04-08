import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import {getSchemaFromOpenAPI, printZodSchema} from "./schema-transformer.js"
import { createLVAPIClient, generateSchemaDescription } from "./utils.js"

export async function addBusinessTools(server: McpServer, serverUrl: string) {
  // Dynamically fetch and convert Business schema
  let BusinessSchema: z.ZodTypeAny
  // let RawBusinessSchema: any
  try {
    const response = await fetch(`${serverUrl}/openapi.json`)
    const openAPISpec = await response.json()
    // RawBusinessSchema = openAPISpec.components?.schemas?.Business

    BusinessSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "Business"
    )
  } catch (error) {
    console.error("Failed to generate Business schema:", error)
    BusinessSchema = z.any() // Fallback to any if schema generation fails
    // RawBusinessSchema = {}
  }

  // Tool to read current business information
  server.tool(
    "read_business",
      `* Gets the "business" information for the site. This includes name, address, and other details like services.
* Always read before update as you need to pass the entire object to update.`,
    {
      token: z.string(),
      site: z.string(),
    },
    async ({ token, site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const business = await client.api.v1SiteBusinessList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(business, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading business: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to update business information
  server.tool(
    "update_business",
      `* Updates the "business" information for the site. This includes name, address, and other details like services.
* The ENTIRE object needs to be saved even if only one field is updated.
* Optional fields can be omitted`,
    {
      token: z.string(),
      site: z.string(),
      business: BusinessSchema,
    },
    async ({ token, site, business }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // First validate the business data
        const validationResult =
          await client.api.v1ValidateBusinessCreate(business)

        // Check if validation result contains any errors
        const validationErrors = validationResult.data || []
        if (validationErrors.length > 0) {
          return {
            content: [
              {
                type: "text",
                text: `Validation errors: ${JSON.stringify(validationErrors, null, 2)}`,
              },
            ],
            isError: true,
          }
        }

        // If validation passes, update the business
        const updatedBusiness = await client.api.v1SiteBusinessCreate(business)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(updatedBusiness, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error updating business: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
