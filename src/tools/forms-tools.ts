import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addFormsTools(
  server: McpServer,
  serverUrl: string,
  token: string
) {
  // Dynamically fetch and convert Form schema
  let FormSchema: z.ZodTypeAny
  try {
    FormSchema = await getSchemaFromOpenAPI(`${serverUrl}/openapi.json`, "Form")
  } catch (error) {
    console.error("Failed to generate Form schema:", error)
    FormSchema = z.any() // Fallback to any if schema generation fails
  }

  // Tool to list forms
  server.tool(
    "list_forms",
    `* Lists all forms for the site.
* Returns an array of form objects with their details.`,
    {
      site: z.string(),
    },
    async ({ site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const forms = await client.api.v1SiteFormsList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(forms.data.forms, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing forms: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to bulk upsert forms
  server.tool(
    "bulk_upsert_forms",
    `* Creates or updates multiple forms in bulk.
* Provide an array of forms to be created or updated.
* Forms are matched by their type.
* If a form with the given type exists, it will be updated; otherwise, a new form will be created.`,
    {
      site: z.string(),
      forms: z.array(FormSchema),
    },
    async ({ site, forms }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // Validate forms
        const validationResults = await Promise.all(
          forms.map((form) => client.api.v1ValidateProductConfigCreate(form))
        )

        // Check for any validation errors
        const allValidationErrors = validationResults.flatMap(
          (result) => result.data || []
        )

        if (allValidationErrors.length > 0) {
          return {
            content: [
              {
                type: "text",
                text: `Validation errors: ${JSON.stringify(allValidationErrors, null, 2)}`,
              },
            ],
            isError: true,
          }
        }

        // If validation passes, upsert forms
        const upsertedForms = await Promise.all(
          forms.map((form) => client.api.v1SiteFormsCreate(form.type, form))
        )
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(upsertedForms, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error upserting forms: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to delete a form
  server.tool(
    "delete_form",
    `* Deletes a specific form by its type.
* Provide the site and the form type to be deleted.`,
    {
      site: z.string(),
      form_type: z.string(),
    },
    async ({ site, form_type }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const result = await client.api.v1SiteFormsDelete(form_type)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error deleting form: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
