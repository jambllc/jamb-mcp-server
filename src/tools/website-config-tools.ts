import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addWebsiteConfigTools(
  server: McpServer,
  serverUrl: string,
  token: string
) {
  // Dynamically fetch and convert WebsiteConfig schema
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
    `* Gets the current website configuration.
* The response contains the complete website configuration object.
* Always read before update as you need to pass the entire object back when updating, even if only changing one field.`,
    {
      site: z.string(),
    },
    async ({ site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const websiteConfig = await client.api.v1SiteWebsiteConfigList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(websiteConfig.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading website config: ${error instanceof Error ? error.message : String(error)}`,
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
    `* Updates the website configuration for the site.
* The ENTIRE object needs to be saved even if only one field is updated - make sure to read first.
* Optional fields can be omitted or set to null, but required fields must always be included.`,
    {
      site: z.string(),
      website_config: WebsiteConfigSchema,
    },
    async ({ site, website_config }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // If validation passes, update the website config
        const updatedWebsiteConfig =
          await client.api.v1SiteWebsiteConfigCreate(website_config)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(updatedWebsiteConfig.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error updating website config: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
