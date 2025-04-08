import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addWebsiteConfigTools(
  server: McpServer,
  serverUrl: string
) {
  let WebsiteConfigSchema: z.ZodTypeAny
  try {
    WebsiteConfigSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "WebsiteConfig"
    )
  } catch (error) {
    console.error("Failed to generate WebsiteConfig schema:", error)
    WebsiteConfigSchema = z.any() // Fallback to any if schema generation fails
  }

  // Tool to read current website configuration
  server.tool(
    "read_website_config",
      `* Gets the complete "Website Config" information for the site. 
* This includes navigation menu items, call-to-action buttons, page configurations, sections on each page, forms, and more.
* The response is a complex object with nested arrays and objects that defines the entire website structure.
* Always read before update as you need to pass the entire object back when updating, even if only changing one part.`,
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
      `* Updates the "Website Config" information for the site. 
* The ENTIRE object needs to be saved even if only one field is updated - make sure to read first.
* Optional fields can be omitted, but required fields (navigation, pageConfig) must always be included.
* Changing this affects the overall site structure, navigation, and page layouts.`,
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
