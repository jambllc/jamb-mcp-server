import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addFeedbackTools(
  server: McpServer,
  serverUrl: string,
  token: string
) {
  // Dynamically fetch and convert FeedbackItem schema
  let FeedbackItemSchema: z.ZodTypeAny
  try {
    FeedbackItemSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "FeedbackItem"
    )
  } catch (error) {
    console.error("Failed to generate FeedbackItem schema:", error)
    FeedbackItemSchema = z.any() // Fallback to any if schema generation fails
  }

  // Tool to list feedback with pagination
  server.tool(
    "list_feedback",
    `* Lists feedback for the account with pagination support.
* Returns an object with a list of feedback items and the total count.
* Can filter by source and supports pagination with limit and skip parameters.
* Maximum limit is 100 items.`,
    {
      site: z.string(),
      source: z.string().optional(),
      limit: z.number().min(1).max(100).optional(),
      skip: z.number().min(0).optional(),
    },
    async ({ site, source, limit, skip }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // Prepare filter parameters
        const filterParams: any = {}
        if (source) filterParams.source = source
        if (limit !== undefined) filterParams.limit = Math.min(limit, 100) // Enforce max limit of 100
        if (skip !== undefined) filterParams.skip = skip

        const feedback = await client.api.v1AccountFeedbackList(filterParams)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(feedback.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing feedback: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to get specific feedback by ID
  server.tool(
    "get_feedback",
    `* Gets a specific feedback item by its ID.
* Returns the feedback object if found.`,
    {
      site: z.string(),
      feedback_id: z.string().uuid(),
    },
    async ({ site, feedback_id }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const feedback = await client.api.v1AccountFeedbackDetail(feedback_id)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(feedback.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error fetching feedback: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to create feedback
  server.tool(
    "create_feedback",
    `* Creates a new feedback item.
* Returns the created feedback object.`,
    {
      site: z.string(),
      feedback: FeedbackItemSchema,
    },
    async ({ site, feedback }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const result = await client.api.v1AccountFeedbackCreate(feedback)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error creating feedback: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to update feedback
  server.tool(
    "update_feedback_references",
    `* Updates an existing feedback item. Only *Ref fields are required rest will be ignored.
* Returns the updated feedback object.`,
    {
      site: z.string(),
      feedback: z.object({
        id: z.string(),
        productRef: z.array(z.string()),
        locationRef: z.array(z.string()),
        serviceRef: z.array(z.string()),
      }),
    },
    async ({ site, feedback }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        const { id, ...feedbackData } = feedback
        if (!id) {
          return {
            content: [
              {
                type: "text",
                text: "Id is missing..",
              },
            ],
            isError: true,
          }
        }

        // Retrieve existing feedback data
        const existingFeedbackResponse =
          await client.api.v1AccountFeedbackDetail(id)
        const existingFeedback = existingFeedbackResponse.data

        if (!existingFeedback) {
          return {
            content: [
              {
                type: "text",
                text: `No Feedback found with id=${id}`,
              },
            ],
            isError: true,
          }
        }

        for (const key of Object.keys(feedback)) {
          if (!key.endsWith("Ref")) {
            return {
              content: [
                {
                  type: "text",
                  text: `property=${key} now allowed`,
                },
              ],
              isError: true,
            }
          }
        }

        if (Object.keys(feedbackData).length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "No valid *Ref fields provided to update.",
              },
            ],
            isError: true,
          }
        }

        // Merge the filtered feedback into the existing feedback document
        const updatedFeedback = {
          ...existingFeedback,
          ...feedbackData,
        }

        const result = await client.api.v1AccountFeedbackUpdate(
          id,
          updatedFeedback
        )
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error updating feedback: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to delete feedback
  server.tool(
    "delete_feedback",
    `* Deletes a specific feedback item by its ID.
* Returns a success message if deleted successfully.`,
    {
      site: z.string(),
      feedback_id: z.string().uuid(),
    },
    async ({ site, feedback_id }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        await client.api.v1AccountFeedbackDelete(feedback_id)
        return {
          content: [
            {
              type: "text",
              text: `Feedback with ID ${feedback_id} was deleted successfully.`,
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error deleting feedback: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
