import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addProductsTools(
  server: McpServer,
  serverUrl: string,
  token: string
) {
  // Dynamically fetch and convert Product and ProductGroup schemas
  let ProductSchema: z.ZodTypeAny
  let ProductGroupSchema: z.ZodTypeAny
  try {
    ProductSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "Product"
    )
    ProductGroupSchema = await getSchemaFromOpenAPI(
      `${serverUrl}/openapi.json`,
      "ProductGroup"
    )
  } catch (error) {
    console.error("Failed to generate Product/ProductGroup schemas:", error)
    ProductSchema = z.any() // Fallback to any if schema generation fails
    ProductGroupSchema = z.any()
  }

  // Tool to list products
  server.tool(
    "list_products",
    `* Lists all products for the site.
* Returns an array of product objects with their details.`,
    {
      site: z.string(),
    },
    async ({ site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const products = await client.api.v1SiteProductsList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(products.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing products: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to list product groups
  server.tool(
    "list_product_groups",
    `* Lists all product groups for the site.
* Returns an array of product group objects with their details.`,
    {
      site: z.string(),
    },
    async ({ site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const productGroups = await client.api.v1SiteProductGroupsList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(productGroups.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing product groups: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to bulk upsert products
  server.tool(
    "bulk_upsert_products",
    `* Creates or updates multiple products in bulk.
* Provide an array of products to be created or updated.
* Products are matched by their slug.
* If a product with the given slug exists, it will be updated; otherwise, a new product will be created.`,
    {
      site: z.string(),
      products: z.array(ProductSchema),
    },
    async ({ site, products }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // If validation passes, upsert products
        const upsertedProducts = await client.api.v1SiteProductsBulkCreate({
          bulk: products,
        })
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(upsertedProducts, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error upserting products: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to bulk upsert product groups
  server.tool(
    "bulk_upsert_product_groups",
    `* Creates or updates multiple product groups in bulk.
* Provide an array of product groups to be created or updated.
* Product groups are matched by their slug.
* If a product group with the given slug exists, it will be updated; otherwise, a new product group will be created.`,
    {
      site: z.string(),
      product_groups: z.array(ProductGroupSchema),
    },
    async ({ site, product_groups }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // Validate product groups
        const validationResults = await Promise.all(
          product_groups.map((group) =>
            client.api.v1ValidateProductGroupCreate(group)
          )
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

        // If validation passes, upsert product groups
        const upsertedProductGroups =
          await client.api.v1SiteProductGroupsBulkCreate({
            bulk: product_groups,
          })
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(upsertedProductGroups, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error upserting product groups: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to delete a product
  server.tool(
    "delete_product",
    `* Deletes a specific product by its slug.
* Provide the site and the product slug to be deleted.`,
    {
      site: z.string(),
      product_slug: z.string(),
    },
    async ({ site, product_slug }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const result = await client.api.v1SiteProductsDelete(product_slug)
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
              text: `Error deleting product: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to delete a product group
  server.tool(
    "delete_product_group",
    `* Deletes a specific product group by its slug.
* Provide the site and the product group slug to be deleted.`,
    {
      site: z.string(),
      group_slug: z.string(),
    },
    async ({ site, group_slug }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const result = await client.api.v1SiteProductGroupsDelete(group_slug)
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
              text: `Error deleting product group: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
