import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { BRAND_MODULE } from '../../../modules/brand';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const brandService = req.scope.resolve(BRAND_MODULE);

  const brands = await brandService.listBrands();

  res.json({ brands });
};
