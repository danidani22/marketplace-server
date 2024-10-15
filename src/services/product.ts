// Here we override methods from the default Medusa ProductService

import { Lifetime } from "awilix"
import { 
  ProductService as MedusaProductService, Product, User,
} from "@medusajs/medusa"
import { CreateProductInput as MedusaCreateProductInput, FindProductConfig, ProductSelector as MedusaProductSelector } from "@medusajs/medusa/dist/types/product"

type ProductSelector = {
  store_id?: string
} & MedusaProductSelector

type CreateProductInput = {
  store_id?: string
} & MedusaCreateProductInput

class ProductService extends MedusaProductService {
  static LIFE_TIME = Lifetime.SCOPED
  protected readonly loggedInUser_: User | null

  constructor(container, options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments)

    // Get the logged in user
    try {
      this.loggedInUser_ = container.loggedInUser
    } catch (e) {
      // avoid errors when backend first runs
    }
  }

  // Override the method which returns a list of the products
  async listAndCount(selector: ProductSelector, config?: FindProductConfig): Promise<[Product[], number]> {
    // Set the store id to the store of the logged in user if we aren't given a store id in the query
    if (!selector.store_id && this.loggedInUser_?.store_id) {
      selector.store_id = this.loggedInUser_.store_id
    }

    // Include the custom fields
    config.select?.push('store_id')
    config.select?.push("featured")
    config.relations?.push('store')

    return await super.listAndCount(selector, config)
  }

  // Override method which retrives a single product
  async retrieve(productId: string, config?: FindProductConfig): Promise<Product> {
    // Include the custom fields
    config.relations = [
      ...(config.relations || []),
      'store',
        ]
        config.select?.push('featured')

    const product = await super.retrieve(productId, config);

    // Make sure that the product is from the store of the logged in user
    if (product.store?.id && this.loggedInUser_?.store_id && product.store.id !== this.loggedInUser_.store_id) {
      throw new Error('Product does not exist in store.');
    }
    
    return product
  }

  // Override the create method to include the store if of the logged in user
  async create(productObject: CreateProductInput): Promise<Product> {
    if (!productObject.store_id && this.loggedInUser_?.store_id) {
      productObject.store_id = this.loggedInUser_.store_id
    }
    return await super.create(productObject);
  }
}

export default ProductService