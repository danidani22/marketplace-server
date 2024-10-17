// Custom API to more easily return a store based on the name given in the query

import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { EntityManager } from 'typeorm';
import { Store } from '../../../models/store';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const storeName = req.query.store_name;

  if (!storeName) return res.json({ error: 'Missing store name field' });

  const manager: EntityManager = req.scope.resolve<EntityManager>('manager');

  await manager.transaction(async (manager) => {
    const storeRepo = manager.getRepository(Store);
    const store = await storeRepo.findOne({
      where: { name: storeName as string },
    });
    if (!store) return res.json({ error: "Store by that name not found" })
    
    return res.json(store)
  });

};
