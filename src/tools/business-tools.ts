import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient, generateSchemaDescription } from "./utils.js"

export async function addBusinessTools(server: McpServer, serverUrl: string) {
  // Dynamically fetch and convert Business schema
  let BusinessSchema: z.ZodTypeAny
  let RawBusinessSchema: any
  try {
    const response = await fetch(`${serverUrl}/openapi.json`)
    const openAPISpec = await response.json()
    RawBusinessSchema = openAPISpec.components?.schemas?.Business

    BusinessSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "Business"
    )
  } catch (error) {
    console.error("Failed to generate Business schema:", error)
    BusinessSchema = z.any() // Fallback to any if schema generation fails
    RawBusinessSchema = {}
  }

  // Tool to describe the business schema
  server.tool("describe_business_schema", {}, async () => ({
    content: [
      {
        type: "text",
        text: `Business Schema Description:

${generateSchemaDescription(RawBusinessSchema)}

How to use this schema:
1. This represents the complete business profile structure
2. Required fields MUST be provided when creating or updating a business
3. Optional fields can be omitted or set to null
4. Nested objects follow the same required/optional rules
5. Each field has a specific type (string, number, array, etc.)
6. When updating, include all required fields even if they're not changing`,
      },
    ],
  }))

  // Tool to read current business information
  server.tool(
    "read_business",
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
