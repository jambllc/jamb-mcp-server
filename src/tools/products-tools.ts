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
    `* Lists all products for a site. Products are physical items for sale (food on a menu, products in a store, etc.).
* The response is an array of all product objects, each with its full details.
* Use this before creating or updating products to see what already exists.
* If no products exist, an empty array will be returned.`,
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
      `* Lists all product groups for a site. Product Groups are collections of products that belong together (e.g., drinks on a food menu, product categories).
* The response is an array of all product group objects, each with its full details.
* Use this before creating or updating product groups to see what already exists.
* If no product groups exist, an empty array will be returned.`,
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
      `* Creates or updates multiple "Products" for the site in a single operation.
* Products are matched on "slug" - existing products with matching slugs will be updated, new slugs will create new products.
* For each product, the ENTIRE object needs to be included, even if only one field is being updated.
* Required fields for each product include: description, name, slug.
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
      `* Creates or updates multiple "Product Groups" for the site in a single operation.
* Product Groups are matched on "slug" - existing groups with matching slugs will be updated, new slugs will create new groups.
* For each product group, the ENTIRE object needs to be included, even if only one field is being updated.
* Required fields for each product group include: description, name, slug.
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
