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
    `* List all products for a site. Products are physical items for sale (food on a menu, products in the stor).
* Always read before update as you need to pass the entire object to update.`,
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
      `* List all products groups for a site. Products Groups are collection of products that belongs together (drinks on a food menu for example).
* Always read before update as you need to pass the entire object to update.`,
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
      `* Updates one or more "Products" for the site.
* Products are matched on "slug", so make sure to use the right one and unique one for creating.
* The ENTIRE objects needs to be saved even if only one field is updated.
* Optional fields can be omitted.`,
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
      `* Updates one or more "ProductsGroups" for the site.
* Product Groups are matched on "slug", so make sure to use the right one and unique one for creating.
* The ENTIRE objects needs to be saved even if only one field is updated.
* Optional fields can be omitted.`,
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
      `* Deletes a "Product" from the site.
* This cannot be undone so make sure it is the right slug.`,
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
      `* Deletes a "Product Group" from the site.
* This cannot be undone so make sure it is the right slug.`,
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
