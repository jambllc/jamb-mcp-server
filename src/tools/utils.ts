import { HttpClient, LVAPI } from "../lvapi/lvApi.js"

export interface LVAPICallParams {
  token: string
  site: string
}

export function createLVAPIClient(serverUrl: string, params: LVAPICallParams) {
  return new LVAPI(
    new HttpClient({
      baseUrl: serverUrl,
      baseApiParams: {
        headers: {
          "X-Session-Token": params.token,
          "X-Account-Id": params.site,
        },
      },
    })
  )
}

// Helper function to generate human-readable schema description
export function generateSchemaDescription(schema: any, indent = 0): string {
  const indentStr = " ".repeat(indent * 2)

  // Handle different schema types
  if (typeof schema !== "object" || schema === null) {
    return `${indentStr}${schema}`
  }

  let description = ""

  // Handle object schemas
  if (schema.type === "object" && schema.properties) {
    description += `${indentStr}Object with the following properties:\n`
    Object.entries(schema.properties).forEach(([key, prop]: [string, any]) => {
      const propType = prop.type || "any"
      const isRequired = schema.required?.includes(key) || false
      const requiredStr = isRequired ? " (required)" : " (optional)"

      description += `${indentStr}  - ${key}: ${propType}${requiredStr}\n`

      // Add description if available
      if (prop.description) {
        description += `${indentStr}    Description: ${prop.description}\n`
      }

      // Recursively handle nested objects
      if (prop.type === "object" && prop.properties) {
        description += generateSchemaDescription(prop, indent + 1)
      }
    })
  }
  // Handle array schemas
  else if (schema.type === "array") {
    description += `${indentStr}Array of:\n`
    description += generateSchemaDescription(schema.items, indent + 1)
  }
  // Handle simple types
  else {
    description += `${indentStr}Type: ${schema.type}\n`
    if (schema.description) {
      description += `${indentStr}Description: ${schema.description}\n`
    }
  }

  return description
}
