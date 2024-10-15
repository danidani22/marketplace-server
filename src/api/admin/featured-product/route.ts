// This is a custom API endpoint to update the featured field of a product

import { EntityManager } from 'typeorm';
import { Product } from '../../../models/product';
import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

interface RequestBody {
  productId: string;
  featured: boolean;
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const body = req.body as RequestBody;
  if (!body)
    return res.status(422).json({
      success: false,
      error: 'Error: Missing request body',
    });

  const productId = body.productId;
  const featured = body.featured;

  if (!productId || typeof featured !== 'boolean')
    return res.status(422).json({
      success: false,
      error: 'Error: Missing required values',
    });

  try {
    const manager: EntityManager = req.scope.resolve<EntityManager>('manager');
    await manager.transaction(async (manager) => {
      const productRepo = manager.getRepository(Product);

      // Pull the product from the given product id
      let product = await productRepo.findOne({ where: { id: productId } });

      if (!product)
        return res.status(404).json({
          success: false,
          error: 'Error: Unable to find the product',
        });

      product.featured = featured; // Update with the value in the POST
      product = await productRepo.save(product);
      return res.status(200).json({ success: true });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Error : ' + error,
    });
  }
};
