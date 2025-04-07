import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient, generateSchemaDescription } from "./utils.js"

export async function addThemeTools(
  server: McpServer,
  serverUrl: string
) {
  // Dynamically fetch and convert Theme schema
  let ThemeSchema: z.ZodTypeAny
  let RawThemeSchema: any
  try {
    const response = await fetch(`${serverUrl}/openapi.json`)
    const openAPISpec = await response.json()
    RawThemeSchema = openAPISpec.components?.schemas?.Theme

    ThemeSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "Theme"
    )
  } catch (error) {
    console.error("Failed to generate Theme schema:", error)
    ThemeSchema = z.any() // Fallback to any if schema generation fails
    RawThemeSchema = {}
  }

  // Tool to describe the theme schema
  server.tool("describe_theme_schema", {}, async () => ({
    content: [
      {
        type: "text",
        text: `Theme Schema Description:

${generateSchemaDescription(RawThemeSchema)}

How to use this schema:
1. This represents the complete theme configuration structure
2. Required fields MUST be provided when creating or updating
3. Optional fields can be omitted or set to null
4. Nested objects follow the same required/optional rules
5. Each field has a specific type (string, number, array, etc.)
6. When updating, include all required fields even if they're not changing`,
      },
    ],
  }))

  // Tool to read current theme configuration
  server.tool(
    "read_theme",
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
