import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addThemeTools(
  server: McpServer,
  serverUrl: string
) {
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

  // Tool to read current theme configuration
  server.tool(
    "read_theme",
    `* Gets the "theme" information for the site. These are all colors, fonts, spacing, and other visual styling settings for the site.
* The response contains the complete theme object with all its properties.
* Always read before update as you need to pass the entire object back when updating, even if only changing one color.`,
    {
      token: z.string(),
      site: z.string(),
    },
    async ({ token, site }) => {
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

  // Tool to update theme configuration
  server.tool(
    "update_theme",
      `* Updates the "Theme" information for the site. This includes colors, fonts, spacing, and other visual styling settings.
* The ENTIRE object needs to be saved even if only one field is updated - make sure to read first.
* Optional fields can be omitted or set to null.
* Changes to the theme will affect the entire visual appearance of the website.`,
    {
      token: z.string(),
      site: z.string(),
      theme: ThemeSchema,
    },
    async ({ token, site, theme }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // First validate the theme data
        const validationResult =
          await client.api.v1ValidateThemeCreate(theme)

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

        // If validation passes, update the theme configuration
        const updatedTheme = await client.api.v1SiteThemeCreate(theme)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(updatedTheme, null, 2),
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
