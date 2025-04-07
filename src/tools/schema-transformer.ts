import { z } from "zod"

// Function to recursively convert OpenAPI schema to Zod schema
export function convertOpenAPISchemaToZod(schema: any): z.ZodTypeAny {
  // Handle different schema types
  switch (schema.type) {
    case "string":
      let stringSchema: z.ZodTypeAny = z.string()
      if (schema.enum) {
        // Use z.string() if enum cannot be converted directly
        stringSchema =
          schema.enum.length > 0
            ? z.enum(schema.enum as [string, ...string[]])
            : z.string()
      }
      return stringSchema

    case "number":
    case "integer":
      return z.number()

    case "boolean":
      return z.boolean()

    case "array":
      if (schema.items) {
        return z.array(convertOpenAPISchemaToZod(schema.items))
      }
      return z.array(z.any())

    case "object":
      if (schema.properties) {
        const shape: { [key: string]: z.ZodTypeAny } = {}

        Object.entries(schema.properties).forEach(
          ([key, prop]: [string, any]) => {
            const isRequired = schema.required?.includes(key) || false
            const fieldSchema = convertOpenAPISchemaToZod(prop)

            shape[key] = isRequired ? fieldSchema : fieldSchema.optional()
          }
        )

        return z.object(shape)
      }
      return z.record(z.any())

    case "null":
      return z.null()

    default:
      // Handle union types and nullable
      if (schema.anyOf) {
        return z.union(schema.anyOf.map(convertOpenAPISchemaToZod))
      }

      if (schema.nullable) {
        return convertOpenAPISchemaToZod({
          ...schema,
          type: schema.type || "any",
        }).nullable()
      }

      return z.any()
  }
}

let _openAPISpec: any

// Function to fetch and convert OpenAPI schema
export async function getSchemaFromOpenAPI(
  openAPIUrl: string,
  schemaName: string
): Promise<z.ZodTypeAny> {
  try {
    if (!_openAPISpec) {
      const response = await fetch(openAPIUrl)
      _openAPISpec = await response.json()
    }

    const schema = _openAPISpec.components?.schemas?.[schemaName]

    if (!schema) {
      throw new Error(`Schema ${schemaName} not found in OpenAPI specification`)
    }

    return convertOpenAPISchemaToZod(schema)
  } catch (error) {
    console.error("Error fetching or converting schema:", error)
    throw error
  }
}
