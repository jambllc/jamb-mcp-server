import { z } from "zod"

export function printZodSchema(schema: z.ZodTypeAny, indent = 0): string {
  const indentStr = ' '.repeat(indent * 2);
  const description = schema.description || 'No description';

  let output = `${indentStr}Description: ${description}\n`;

  if ('shape' in schema) {
    // Handle object schemas
    output += `${indentStr}Type: object\n`;
    output += `${indentStr}Properties:\n`;

    // @ts-ignore
    for (const [key, value] of Object.entries(schema.shape)) {
      output += `${indentStr}  ${key}:\n`;
      // @ts-ignore
      output += printZodSchema(value, indent + 2);
    }
  } else if (schema instanceof z.ZodString) {
    output += `${indentStr}Type: string\n`;
  } else if (schema instanceof z.ZodNumber) {
    output += `${indentStr}Type: number\n`;
  } else if (schema instanceof z.ZodBoolean) {
    output += `${indentStr}Type: boolean\n`;
  } else if (schema instanceof z.ZodArray) {
    output += `${indentStr}Type: array\n`;
    output += `${indentStr}Items:\n`;
    output += printZodSchema(schema.element, indent + 1);
  } else if (schema instanceof z.ZodEnum) {
    output += `${indentStr}Type: enum\n`;
    output += `${indentStr}Values: ${(schema as any)._def.values.join(', ')}\n`;
  } else if (schema instanceof z.ZodUnion) {
    output += `${indentStr}Type: union\n`;
    (schema as any)._def.options.forEach((option: z.ZodTypeAny, index: number) => {
      output += `${indentStr}Option ${index + 1}:\n`;
      output += printZodSchema(option, indent + 1);
    });
  } else if (schema instanceof z.ZodNullable) {
    output += `${indentStr}Type: nullable\n`;
    output += `${indentStr}Inner schema:\n`;
    output += printZodSchema((schema as any)._def.innerType, indent + 1);
  } else {
    output += `${indentStr}Type: ${schema.constructor.name}\n`;
  }

  return output;
}


// Store the OpenAPI spec globally to avoid passing it around
let _openAPISpec: any
let _processedRefs: Map<string, z.ZodTypeAny> = new Map()

// Helper function to resolve a reference
function resolveRef(ref: string): any {
  // Handle references like "#/components/schemas/About"
  if (ref.startsWith("#/components/schemas/")) {
    const schemaName = ref.replace("#/components/schemas/", "")
    return _openAPISpec.components?.schemas?.[schemaName]
  }
  // Add other reference resolution logic as needed
  return null
}

// Helper function to add description to a schema if available
function addDescription(zodSchema: z.ZodTypeAny, openAPISchema: any): z.ZodTypeAny {
  if (openAPISchema.description) {
    return zodSchema.describe(openAPISchema.description)
  }
  return zodSchema
}

// Helper function to apply string constraints (min/max length, pattern)
function applyStringConstraints(
  schema: any
): z.ZodString {
  let result = z.string()

  // Apply min length
  if (schema.minLength !== undefined) {
    result = result.min(schema.minLength, {
      message: `String must be at least ${schema.minLength} characters`
    })
  }

  // Apply max length
  if (schema.maxLength !== undefined) {
    result = result.max(schema.maxLength, {
      message: `String must be at most ${schema.maxLength} characters`
    })
  }

  // Apply pattern if it exists
  if (schema.pattern) {
    try {
      const regex = new RegExp(schema.pattern)
      result = result.regex(regex, {
        message: schema.patternMessage || 'String must match the required pattern'
      })
    } catch (error) {
      console.warn(`Invalid regex pattern: ${schema.pattern}`)
    }
  }

  return result
}

// Helper function to apply number constraints (min/max)
function applyNumberConstraints(
  schema: any
): z.ZodNumber {
  let result = z.number()

  // Apply minimum
  if (schema.minimum !== undefined) {
    result = result.min(schema.minimum, {
      message: `Number must be at least ${schema.minimum}`
    })
  }

  // Apply maximum
  if (schema.maximum !== undefined) {
    result = result.max(schema.maximum, {
      message: `Number must be at most ${schema.maximum}`
    })
  }

  return result
}

// Modified function to convert OpenAPI schema to Zod schema
export function convertOpenAPISchemaToZod(schema: any): z.ZodTypeAny {
  // Handle null or undefined schema
  if (!schema) {
    return z.any()
  }

  // Handle $ref directly
  if (schema.$ref) {
    const refPath = schema.$ref

    // Check if we already processed this reference to avoid circular references
    if (_processedRefs.has(refPath)) {
      return _processedRefs.get(refPath)!
    }

    // Create a temporary placeholder to handle circular references
    const tempSchema = z.lazy(() => z.any())
    _processedRefs.set(refPath, tempSchema)

    // Resolve the reference
    const resolvedSchema = resolveRef(refPath)
    if (resolvedSchema) {
      // Convert the resolved schema
      const convertedSchema = convertOpenAPISchemaToZod(resolvedSchema)
      // Update the reference map with the real schema
      _processedRefs.set(refPath, convertedSchema)
      return convertedSchema
    }

    console.warn(`Could not resolve reference: ${refPath}`)
    return z.any()
  }

  // Handle special case: string-or-null pattern (common in OpenAPI)
  // const stringOrNullSchema = handleStringOrNull(schema)
  // if (stringOrNullSchema) {
  //   return stringOrNullSchema
  // }

  // Handle different schema types
  let zodSchema: z.ZodTypeAny

  switch (schema.type) {
    case "string":
      // Create string schema with constraints
      if (schema.enum && schema.enum.length > 0) {
        zodSchema = z.enum(schema.enum as [string, ...string[]])
      } else {
        zodSchema = applyStringConstraints(schema)
      }
      break

    case "number":
    case "integer":
      zodSchema = applyNumberConstraints(schema)
      break

    case "boolean":
      zodSchema = z.boolean()
      break

    case "array":
      // Handle both direct items and items with $ref
      if (schema.items) {
        let itemsSchema = convertOpenAPISchemaToZod(schema.items)
        let arraySchema = z.array(itemsSchema)

        // Apply array constraints
        if (schema.minItems !== undefined) {
          arraySchema = arraySchema.min(schema.minItems, {
            message: `Array must contain at least ${schema.minItems} items`
          })
        }

        if (schema.maxItems !== undefined) {
          arraySchema = arraySchema.max(schema.maxItems, {
            message: `Array must contain at most ${schema.maxItems} items`
          })
        }

        zodSchema = arraySchema
      } else {
        zodSchema = z.array(z.any())
      }
      break

    case "object":
      if (schema.properties) {
        const shape: { [key: string]: z.ZodTypeAny } = {}

        Object.entries(schema.properties).forEach(
          ([key, prop]: [string, any]) => {
            const isRequired = schema.required?.includes(key) || false
            let fieldSchema = convertOpenAPISchemaToZod(prop)

            // Add description to the field if available
            if (prop.description) {
              fieldSchema = fieldSchema.describe(prop.description)
            }

            shape[key] = isRequired ? fieldSchema : fieldSchema.optional()
          }
        )

        zodSchema = z.object(shape)
      } else {
        zodSchema = z.record(z.any())
      }
      break

    case "null":
      zodSchema = z.null()
      break

    default:
      // Handle union types (anyOf, oneOf, allOf)
      if (schema.anyOf) {
        // Special case: if anyOf contains a string-or-null pattern
        if (schema.anyOf.length === 2) {
            const nonNullSchema = schema.anyOf.filter((s: any) => s.type !== 'null')
            if (nonNullSchema.length === 1) {
              // console.log("Detected string-or-null pattern", nonNullSchema[0])
              return convertOpenAPISchemaToZod(nonNullSchema[0]).optional()
            }
        }
        zodSchema = z.union(schema.anyOf.map(convertOpenAPISchemaToZod))
      } else if (schema.oneOf) {
        zodSchema = z.union(schema.oneOf.map(convertOpenAPISchemaToZod))
      } else if (schema.allOf) {
        // allOf in OpenAPI is like extending or merging schemas
        // For Zod, we'll process each schema and merge them
        const mergedShape: { [key: string]: z.ZodTypeAny } = {}
        const mergedRequired: string[] = []

        schema.allOf.forEach((subSchema: any) => {
          const convertedSchema = convertOpenAPISchemaToZod(subSchema)
          // If it's an object schema, merge its properties
          if (subSchema.properties) {
            Object.entries(subSchema.properties).forEach(
              ([key, prop]: [string, any]) => {
                const isRequired = subSchema.required?.includes(key) || false
                let fieldSchema = convertOpenAPISchemaToZod(prop)

                if (prop.description) {
                  fieldSchema = fieldSchema.describe(prop.description)
                }

                mergedShape[key] = isRequired ? fieldSchema : fieldSchema.optional()
                if (isRequired) {
                  mergedRequired.push(key)
                }
              }
            )
          }
        })

        zodSchema = z.object(mergedShape)
      } else if (schema.nullable) {
        console.log("Detected nullable schema", schema)
        zodSchema = convertOpenAPISchemaToZod({
          ...schema,
          type: schema.type || "any",
          nullable: undefined
        }).nullable()
      } else {
        // Handle objects without explicit type
        if (schema.properties) {
          return convertOpenAPISchemaToZod({...schema, type: "object"})
        }
        zodSchema = z.any()
      }
      break
  }

  // Add description to the schema
  return addDescription(zodSchema, schema)
}

// Updated function to fetch and convert OpenAPI schema
export async function getSchemaFromOpenAPI(
  openAPIUrl: string,
  schemaName: string
): Promise<z.ZodTypeAny> {
  try {
    if (!_openAPISpec) {
      const response = await fetch(openAPIUrl)
      _openAPISpec = await response.json()
    }

    // Reset processed refs for each schema conversion
    _processedRefs = new Map()

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
