// This loader ensures there is a product-store relation and adds the store fields.

export default async function (): Promise<void> {
  const module = await import(
    '@medusajs/medusa/dist/api/routes/store/products/index'
  );

  Object.assign(module, {
    ...module,
    defaultStoreProductsRelations: [
      ...module.defaultStoreProductsRelations,
      'store',
    ],
    defaultStoreProductsFields: [
      ...module.defaultStoreProductsFields,
      'store_id',
      'featured',
    ],
    allowedStoreProductsRelations: [
      ...module.allowedStoreProductsRelations,
      'store',
    ],
    allowedStoreProductsFields: [
      ...module.allowedStoreProductsFields,
      'store_id',
      'featured',
    ],
  });
}
