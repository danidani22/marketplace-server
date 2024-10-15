// Overriding the default repository to apply to our extended entity

import { User } from "../models/user"
import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import {
  UserRepository as MedusaUserRepository,
} from "@medusajs/medusa/dist/repositories/user"

export const UserRepository = dataSource
  .getRepository(User)
  .extend({
    ...Object.assign(
      MedusaUserRepository, 
      { target: User }
    ),
  })

export default UserRepository