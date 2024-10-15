// Extending the default store entity to include our custom columns

import { Entity, OneToMany, Column } from "typeorm"
import { Store as MedusaStore } from "@medusajs/medusa"
import { User } from "./user";
import { Product } from "./product";
import { Order } from "./order";
import { ShippingOption } from "./shipping-option";
import { ShippingProfile } from "./shipping-profile"

@Entity()
export class Store extends MedusaStore {

  @OneToMany(() => User, (user) => user?.store)
  members?: User[];

  @OneToMany(() => Product, (product) => product?.store)
  products?: Product[];

  @OneToMany(() => Order, (order) => order?.store)
  orders?: Order[];

  @OneToMany(() => ShippingOption, (shippingOption) => shippingOption?.store)
  shippingOptions?: ShippingOption[];

  @OneToMany(() => ShippingProfile, (shippingProfile) => shippingProfile.store)
    shippingProfiles?: ShippingProfile[];

  @Column({ nullable: true })
  stripe_account_id?: string

  @Column({ default: false })
  stripe_account_enabled: boolean

  
}