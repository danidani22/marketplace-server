// This loader ensures the featured field is included in a product

export default async function () {
    const imports = (await import(
      "@medusajs/medusa/dist/api/routes/store/products/index"
    )) as any
    imports.allowedStoreProductsFields = [
      ...imports.allowedStoreProductsFields,
      "featured",
    ]
    imports.defaultStoreProductsFields = [
      ...imports.defaultStoreProductsFields,
      "featured",
    ]
}  