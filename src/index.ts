#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"
import express from "express"
import { addBusinessTools } from "./tools/business-tools.js"
import * as process from "process"
import { addWebsiteConfigTools } from "./tools/website-config-tools.js"
import { addThemeTools } from "./tools/theme-tools.js"
import { addProductsTools } from "./tools/products-tools.js"
import { addNewSitePrompts } from "./prompts/new-site.js"
import { addScrapeTools } from "./tools/scrape-tools.js"

// Parse command-line arguments
const parseArgs = () => {
  const args = process.argv.slice(2)
  const argsObj: { [key: string]: string } = {}

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]
    const value = args[i + 1]

    if (key && value) {
      argsObj[key.replace(/^--/, "")] = value
    }
  }

  return argsObj
}

const cmdArgs = parseArgs()

// Configuration priority:
// 1. Command-line arguments
// 2. Environment variables
// 3. Default values
const SERVER_URL =
  cmdArgs["server-url"] || process.env.LV_SERVER_URL || "http://localhost:8001"
const TOKEN = cmdArgs["token"] || process.env.LV_TOKEN

if (!TOKEN || !SERVER_URL) {
  console.error(
    "Error: Both LV_SERVER_URL and LV_TOKEN must be provided via command line or environment variables."
  )
  process.exit(1)
}

const server = new McpServer({
  name: "Jamb MCP Server",
  version: "1.0.0",
})

// HTTP/SSE Transport Setup
async function startHttpServer() {
  const app = express()
  const transports: { [sessionId: string]: SSEServerTransport } = {}

  app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport("/messages", res)
    transports[transport.sessionId] = transport
    res.on("close", () => {
      delete transports[transport.sessionId]
    })
    await server.connect(transport)
  })

  app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId as string
    const transport = transports[sessionId]
    if (transport) {
      await transport.handlePostMessage(req, res)
    } else {
      res.status(400).send("No transport found for sessionId")
    }
  })

  const PORT = cmdArgs["port"] || process.env.PORT || 3001

  app.listen(PORT, () => {
    console.log(`MCP Server running on port ${PORT}`)
    console.log(`Connected to LV Server: ${SERVER_URL}`)
  })
}

// Main execution
async function main() {
  // Validate that TOKEN is provided
  if (!TOKEN) {
    console.error(
      "Error: Token is required. Please provide via --token or LV_TOKEN environment variable."
    )
    process.exit(1)
  }

  // Add business tools dynamically
  await addBusinessTools(server, SERVER_URL, TOKEN)
  await addWebsiteConfigTools(server, SERVER_URL, TOKEN)
  await addThemeTools(server, SERVER_URL, TOKEN)
  await addProductsTools(server, SERVER_URL, TOKEN)
  await addNewSitePrompts(server, SERVER_URL)
  await addScrapeTools(server, SERVER_URL, TOKEN)

  const transport =
    process.env.TRANSPORT === "http"
      ? await startHttpServer()
      : await server.connect(new StdioServerTransport())
}

main().catch(console.error)

export { server }
