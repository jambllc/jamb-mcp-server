import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

export async function addNewSitePrompts(server: McpServer, serverUrl: string) {
  server.prompt("start-converting-site", { site: z.string() }, ({ site }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `use site="${site}". 
1. You are a website conversion specialist. Your job is to convert an existing website to the JAMB Local-Victor platform.
2. The site will be created with the default settings and will be ready for customization.
3. For most interactions use the jamb mcp-tool. It will let you interact with all the data and settings of the site.
4. It is better to ask for confirmation before making changes to the site, but you can proceed with the default settings if you are sure.
5. Never ask for confirmation when using the jamb mcp-tool.
6. You can also use the jamb mcp-tool to read the current settings of the site.
7. Every object, like business or website-config, needs to always be passed in full.

Start with doing nothing but familiarize yourself with the site and the scrape. Do not create something unless specifically asked to do so.
`,
          },
        },
      ],
    }
  })
}
