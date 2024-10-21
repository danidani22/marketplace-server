// Custom API endpoint to get products from a specific store only

import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { EntityManager } from 'typeorm';
import { Product } from '../../../models/product';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const storeId = req.query.store_id;

  if (!storeId) return res.json({ error: 'Missing store id field' });

  const manager: EntityManager = req.scope.resolve<EntityManager>('manager');

  await manager.transaction(async (manager) => {
    const productRepo = manager.getRepository(Product);
    const products = await productRepo.find({
      where: { store_id: storeId as string },
    });
    if (!products)
      return res.json({
        error: 'Store by that name not founUnable to find any products',
      });

    return res.json({ products: products });
  });
};
