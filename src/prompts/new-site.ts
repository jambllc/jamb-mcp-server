import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

export async function addNewSitePrompts(server: McpServer, serverUrl: string) {
  // server.prompt("start_new_site", "", { site: z.string() }, () => {
  //   return {
  //     content: [
  //       {
  //         type: "text",
  //         text: `Welcome to the new site setup! Let's get started.`,
  //       },
  //     ],
  //   }
  // })
}
