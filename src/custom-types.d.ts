export declare module "@medusajs/medusa/dist/models/store" {
    declare interface Store {
      members?: User[];
      products?: Product[];
      orders?: Order[];
      stripe_account_id?: string
      stripe_account_enabled: boolean
    }
  }
  
  export declare module "@medusajs/medusa/dist/models/user" {
    declare interface User {
      store_id?: string;
      store?: Store;
    }
  }
  
  export declare module "@medusajs/medusa/dist/models/product" {
    declare interface Product {
      store_id?: string;
      store?: Store;
      featured: boolean
    }
  }

  declare module '@medusajs/medusa/dist/models/shipping-profile' {
    interface ShippingProfile {
        store_id?: string
        store?: Store
    }
}

declare module '@medusajs/medusa/dist/models/shipping-option' {
    interface ShippingOption {
        store_id?: string
        store?: Store
    }
}

  export declare module "@medusajs/medusa/dist/models/order" {
    declare interface Order {
      store_id?: string;
      store?: Store;
      order_parent_id?: string
      parent?: Order
      children?: Order[]
    }
  }