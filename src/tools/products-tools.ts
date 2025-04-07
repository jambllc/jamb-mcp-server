import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { getSchemaFromOpenAPI } from "./schema-transformer.js"
import { createLVAPIClient } from "./utils.js"

export async function addProductsTools(server: McpServer, serverUrl: string) {
  // Dynamically fetch and convert Products and ProductGroup schemas
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
    console.error("Failed to generate Products/ProductGroup schemas:", error)
    ProductSchema = z.any()
    ProductGroupSchema = z.any()
  }

  // Tool to list all products
  server.tool(
    "list_products",
    {
      token: z.string(),
      site: z.string(),
    },
    async ({ token, site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const productsConfig = await client.api.v1SiteProductConfigList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(productsConfig.data.products || [], null, 2),
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

  // Tool to list all product groups
  server.tool(
    "list_product_groups",
    {
      token: z.string(),
      site: z.string(),
    },
    async ({ token, site }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })
        const productsConfig = await client.api.v1SiteProductConfigList()
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                productsConfig.data.productGroups || [],
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
              text: `Error listing product groups: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to create/update multiple products
  server.tool(
    "bulk_upsert_products",
    {
      token: z.string(),
      site: z.string(),
      products: z.array(ProductSchema),
    },
    async ({ token, site, products }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // Bulk create products
        const createdProducts = await client.api.v1SiteProductsBulkCreate({
          bulk: products,
        })

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(createdProducts.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error creating products: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to create/update multiple product groups
  server.tool(
    "bulk_upsert_product_groups",
    {
      token: z.string(),
      site: z.string(),
      product_groups: z.array(ProductGroupSchema),
    },
    async ({ token, site, product_groups }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        // Bulk create product groups
        const createdGroups = await client.api.v1SiteProductGroupsBulkCreate({
          bulk: product_groups,
        })

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(createdGroups.data, null, 2),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error creating product groups: ${JSON.stringify(error)}`,
            },
          ],
          isError: true,
        }
      }
    }
  )

  // Tool to delete a single product
  server.tool(
    "delete_product",
    {
      token: z.string(),
      site: z.string(),
      product_slug: z.string(),
    },
    async ({ token, site, product_slug }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        await client.api.v1SiteProductsDelete(product_slug)

        return {
          content: [
            {
              type: "text",
              text: `Product with slug "${product_slug}" deleted successfully`,
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

  // Tool to delete a single product group
  server.tool(
    "delete_product_group",
    {
      token: z.string(),
      site: z.string(),
      group_slug: z.string(),
    },
    async ({ token, site, group_slug }) => {
      try {
        const client = createLVAPIClient(serverUrl, { token, site })

        await client.api.v1SiteProductGroupsDelete(group_slug)

        return {
          content: [
            {
              type: "text",
              text: `Product group with slug "${group_slug}" deleted successfully`,
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
