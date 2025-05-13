import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params;

  const query = req.scope.resolve('query');

  const { data: brand } = await query.graph({
    entity: 'brand',
    filters: { id },
    fields: ['id', 'name', 'description', 'products.id', 'products.title'],
  });

  if (!brand) {
    return res.status(404).json({ message: 'Brand not found' });
  }

  res.json({ brand });
};
