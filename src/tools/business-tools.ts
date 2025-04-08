import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addBusinessTools(
  server: McpServer,
  serverUrl: string,
  token: string
) {
  // Dynamically fetch and convert Business schema
  let BusinessSchema: z.ZodTypeAny
  try {
    BusinessSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "Business"
    )
  } catch (error) {
    console.error("Failed to generate Business schema:", error)
    BusinessSchema = z.any() // Fallback to any if schema generation fails
  }

  // Tool to read current business information
  server.tool(
    "read_business",
    `* Gets the "business" information for the site. This includes name, address, services, hours, locations, and other core business details.
* The response contains the complete business object with all properties.
* Always read before update as you need to pass the entire object back when updating, even if only changing one field.`,
    {
      site: z.string(),
    },
    async ({ site }) => {
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
    `* Updates the "business" information for the site. This includes name, address, services, hours, locations, and other core business details.
* The ENTIRE object needs to be saved even if only one field is updated - make sure to read first.
* Optional fields can be omitted or set to null, but required fields must always be included.
* Required fields include: name, description, intro, category, about, hours, locations, payment, services.`,
    {
      site: z.string(),
      business: BusinessSchema,
    },
    async ({ site, business }) => {
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
