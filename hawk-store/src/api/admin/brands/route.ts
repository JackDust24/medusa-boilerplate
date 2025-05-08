import { z } from 'zod';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createBrandWorkflow } from '../../../workflows/create-brand';
import { PostAdminCreateBrand } from './validators';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve('query');

  console.log('GET /admin/brands', req.queryConfig);
  const { data: brands, metadata: { count, take, skip } = {} } =
    await query.graph({
      entity: 'brand',
      ...req.queryConfig,
    });

  console.log('GET /admin/brands BRANDS - ', brands);
  res.json({
    brands,
    count,
    limit: take,
    offset: skip,
  });
};

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  console.log('POST /admin/brands', req.validatedBody);
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  });
  res.status(200).json(result);
};
