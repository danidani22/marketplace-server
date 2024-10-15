// Here we override the default methods from the Medusa ShippingOptionService

import { Cart, ShippingOptionService as MedusaShippingOptionService } from '@medusajs/medusa'
import { Lifetime } from 'awilix'
import { FindConfig, Selector } from '@medusajs/medusa'
import { CreateShippingOptionInput as MedusaCreateShippingOptionInput } from '@medusajs/medusa/dist/types/shipping-options'
import type { ShippingOption } from '../models/shipping-option'
import type { User } from '../models/user'

// Define the types we will use here
type ShippingOptionSelector = {
    store_id?: string
} & Selector<ShippingOption>

type CreateShippingOptionInput = {
    store_id?: string
} & MedusaCreateShippingOptionInput

class ShippingOptionService extends MedusaShippingOptionService {
    static LIFE_TIME = Lifetime.TRANSIENT
    protected readonly loggedInUser_: User | null

    constructor(container, options) {
        // @ts-ignore
        super(...arguments)
        
        // Get the logged in user
        try {
            this.loggedInUser_ = container.loggedInUser
        } catch (e) {
            // avoid errors when backend first runs
        }
    }

    // Override the list method to include the custom fields
    async list(
        selector?: ShippingOptionSelector & { q?: string },
        config?: FindConfig<ShippingOption>,
    ): Promise<ShippingOption[]> {
        if (!selector.store_id && this.loggedInUser_?.store_id) {
            selector.store_id = this.loggedInUser_.store_id
        }

        config.select?.push('store_id')
        config.relations?.push('store')

        return await super.list(selector, config)
    }

    // Override the listAndCount method to include the custom fields
    async listAndCount(
        selector?: ShippingOptionSelector & { q?: string },
        config?: FindConfig<ShippingOption>,
    ): Promise<[ShippingOption[], number]> {
        if (!selector.store_id && this.loggedInUser_?.store_id) {
            selector.store_id = this.loggedInUser_.store_id
        }

        config.select?.push('store_id')
        config.relations?.push('store')

        return await super.listAndCount(selector, config)
    }

    // Override the create method to link the logged in user's store id to the shipping option
    async create(data: CreateShippingOptionInput): Promise<ShippingOption> {
        if (!data.store_id && this.loggedInUser_?.store_id) {
            data.store_id = this.loggedInUser_.store_id
        }

        return await super.create(data)
    }


    // Override method to include store id checker
    async validateCartOption(option: ShippingOption, cart: Cart): Promise<ShippingOption | null> {
        const validatedOption = await super.validateCartOption(option, cart)

        const hasAnItemFromStore = cart.items.some((item) => item.variant.product.store_id === option.store_id)

        if (!hasAnItemFromStore) {
            throw new Error('Shipping option does not exist for store')
        }

        return validatedOption
    }

}

export default ShippingOptionService