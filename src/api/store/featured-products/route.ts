// This is a custom API endpoint that returns only the products with the featured field set to true

import { EntityManager } from 'typeorm';
import { Product } from '../../../models/product';
import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager: EntityManager = req.scope.resolve<EntityManager>('manager');

  await manager.transaction(async (manager) => {
    const productRepo = manager.getRepository(Product);
    let products = await productRepo.find({ where: { featured: true } });

    return res.json(products.slice(0, 6));
  });
};
