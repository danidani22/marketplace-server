// Here we override methods from the default Medusa StoreService

import { Lifetime } from "awilix"
import { 
  FindConfig,
  StoreService as MedusaStoreService, Store, User,
} from "@medusajs/medusa"

class StoreService extends MedusaStoreService {
  static LIFE_TIME = Lifetime.SCOPED
  protected readonly loggedInUser_: User | null

  // Create enum for events that we will refer to
  static Events = {
    CREATED: 'store.created',
}

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

  // Override to return the logged in user's store
  async retrieve(config?: FindConfig<Store>): Promise<Store> {
    if (!this.loggedInUser_) {
      return super.retrieve(config);
    }
    return this.retrieveForLoggedInUser(config);
  }

  // Create method to search and return the logged in user's store
  async retrieveForLoggedInUser (config?: FindConfig<Store>) {
    const storeRepo = this.manager_.withRepository(this.storeRepository_);
    const store = await storeRepo.findOne({
        ...config,
        relations: [
          ...config.relations,
          'members'
        ],
        where: {
          id: this.loggedInUser_.store_id
        },
    });

    if (!store) {
        throw new Error('Unable to find the user store');
    }

    return store
  }
}

export default StoreService