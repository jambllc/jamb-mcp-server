import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addThemeTools(
  server: McpServer,
  serverUrl: string,
  token: string
) {
  // Dynamically fetch and convert Theme schema
  let ThemeSchema: z.ZodTypeAny
  try {
    ThemeSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "Theme"
    )
  } catch (error) {
    console.error("Failed to generate Theme schema:", error)
    ThemeSchema = z.any() // Fallback to any if schema generation fails
  }

  // Tool to read current theme
  server.tool(
    "read_theme",
    `* Gets the current theme configuration for the site.
* The response contains the complete theme object with all styling properties.
* Always read before update as you need to pass the entire object back when updating, even if only changing one field.`,
    {
      site: z.string(),
    },
    async ({ site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const theme = await client.api.v1SiteThemeList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(theme, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading theme: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to update theme
  server.tool(
    "update_theme",
    `* Updates the theme configuration for the site.
* The ENTIRE object needs to be saved even if only one field is updated - make sure to read first.
* Optional fields can be omitted or set to null, but required fields must always be included.`,
    {
      site: z.string(),
      theme: ThemeSchema,
    },
    async ({ site, theme }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // If validation passes, update the theme
        const updatedTheme = await client.api.v1SiteThemeCreate(theme)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(updatedTheme.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error updating theme: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
