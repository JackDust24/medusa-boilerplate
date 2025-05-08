import { z } from 'zod';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { createBrandWorkflow } from '../../../workflows/create-brand';
// import { PostAdminCreateBrand } from './validators';
import { createProductWorkflow } from '../../../workflows/create-product';

// type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>;

// export async function GET(req: MedusaRequest, res: MedusaResponse) {
//   console.log('GET /admin/products CHECK $$$', req.validatedBody);
//   const { result } = await createProductWorkflow(req.scope).run();

//   res.send(result);
// }

// export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
//   console.log('POST /admin/products', req.validatedBody);
//   const { result } = await createProductWorkflow(req.scope).run({
//     input: req,
//   });
//   res.status(200).json(result);
// };
