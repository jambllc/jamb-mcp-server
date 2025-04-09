import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { createLVAPIClient } from "./utils.js"
import TurndownService from "turndown"
import { parseDocument } from "htmlparser2"
import { DomUtils } from "htmlparser2"

export async function addScrapeTools(
  server: McpServer,
  serverUrl: string,
  token: string
) {
  server.tool(
    "scrape_page_list",
    `* If there is a scrape of the current website we're converting, this will give you a list of pages available in that scrape. 
* Content can be retrieved using the scrape_page_content tool.`,
    {
      site: z.string(),
    },
    async ({ site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const scrape = await client.api.v1ScrapeList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                scrape.data.map((f) => f.filename),
                null,
                2
              ),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading scrape: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  server.tool(
    "scrape_page_content",
    `* Gets the current scrape content for the site.`,
    {
      site: z.string(),
      filename: z
        .string()
        .describe(
          "The filename of the scrape to retrieve (from scrape_page_list)"
        ),
      raw: z
        .boolean()
        .optional()
        .default(false)
        .describe(
          "Whether to return the raw content or parsed content. Raw html can be very large but use if looking for something you cannot find anywhere else."
        ),
    },
    async ({ site, filename, raw }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const scrape = await client.api.v1ScrapeDetail(filename)

        if (!scrape.data) {
          return {
            content: [
              {
                type: "text",
                text: `No scrape found for filename: ${filename}`,
              },
            ],
            isError: true,
          }
        }

        if (raw) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(scrape.data),
              },
            ],
          }
        }

        const turndownService = new TurndownService()
        const markdown = turndownService.turndown(scrape.data.content)

        // Parse the HTML string
        const document = parseDocument(scrape.data.content)

        // Extract metadata
        const metaTags = DomUtils.findAll(
          (elem) =>
            elem.name === "meta" &&
            !!elem.attribs.name &&
            !!elem.attribs.content,
          document.children
        )

        const metadata: Record<string, string> = {}
        metaTags.forEach((meta) => {
          metadata[meta.attribs.name] = meta.attribs.content
        })

        // Extract ld+json schema
        const scriptTags = DomUtils.findAll(
          (elem) =>
            elem.name === "script" &&
            elem.attribs.type === "application/ld+json",
          document.children
        )

        const ldJsonSchemas: any[] = []
        scriptTags.forEach((script) => {
          const textNode = script.children.find(DomUtils.isText)
          if (textNode && DomUtils.isText(textNode)) {
            try {
              ldJsonSchemas.push(JSON.parse(textNode.data))
            } catch (error) {
              // console.error("Error parsing ld+json:", error)
              ldJsonSchemas.push(textNode.data)
            }
          }
        })

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                markdown,
                ldJsonSchemas,
                metadata,
                images: scrape.data.images,
                url: scrape.data.url,
                name: scrape.data.site_name,
                title: scrape.data.title,
                description: scrape.data.description,
              }),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading scrape: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
