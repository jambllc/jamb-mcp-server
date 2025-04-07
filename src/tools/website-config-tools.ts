import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient, generateSchemaDescription } from "./utils.js"

export async function addWebsiteConfigTools(
  server: McpServer,
  serverUrl: string
) {
  // Dynamically fetch and convert WebsiteConfig schema
  let WebsiteConfigSchema: z.ZodTypeAny
  let RawWebsiteConfigSchema: any
  try {
    const response = await fetch(`${serverUrl}/openapi.json`)
    const openAPISpec = await response.json()
    RawWebsiteConfigSchema = openAPISpec.components?.schemas?.WebsiteConfig

    WebsiteConfigSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "WebsiteConfig"
    )
  } catch (error) {
    console.error("Failed to generate WebsiteConfig schema:", error)
    WebsiteConfigSchema = z.any() // Fallback to any if schema generation fails
    RawWebsiteConfigSchema = {}
  }

  // Tool to describe the website config schema
  server.tool("describe_website_config_schema", {}, async () => ({
    content: [
      {
        type: "text",
        text: `Website Configuration Schema Description:

${generateSchemaDescription(RawWebsiteConfigSchema)}

How to use this schema:
1. This represents the complete website configuration structure
2. Required fields MUST be provided when creating or updating
3. Optional fields can be omitted or set to null
4. Nested objects follow the same required/optional rules
5. Each field has a specific type (string, number, array, etc.)
6. When updating, include all required fields even if they're not changing`,
      },
    ],
  }))

  // Tool to read current website configuration
  server.tool(
    "read_website_config",
    {
      token: z.string(),
      site: z.string(),
    },
    async ({ token, site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const websiteConfig = await client.api.v1SiteWebsiteConfigList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(websiteConfig, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading website configuration: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to update website configuration
  server.tool(
    "update_website_config",
    {
      token: z.string(),
      site: z.string(),
      website_config: WebsiteConfigSchema,
    },
    async ({ token, site, website_config }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // First validate the website config data
        const validationResult =
          await client.api.v1ValidateWebsiteConfigCreate(website_config)

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

        // If validation passes, update the website configuration
        const updatedWebsiteConfig =
          await client.api.v1SiteWebsiteConfigCreate(website_config)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(updatedWebsiteConfig, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error updating website configuration: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
