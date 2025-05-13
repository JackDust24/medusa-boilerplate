import {
  createStep,
  createWorkflow,
  StepResponse,
  transform,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { createProductsWorkflow } from '@medusajs/medusa/core-flows';
import { ERP_MODULE } from '../modules/erp';

const getProductsFromErpStep = createStep(
  'get-products-from-erp',
  async (_, { container }) => {
    const erpModuleService = container.resolve(ERP_MODULE);

    const products = await erpModuleService.getProducts();

    return new StepResponse(products);
  }
);

export const syncFromErpWorkflow = createWorkflow('sync-from-erp', () => {
  const erpProducts = getProductsFromErpStep();

  const productsToCreate = transform(
    {
      erpProducts,
    },
    (data) => {
      return data.erpProducts.map((erpProduct) => {
        return {
          title: erpProduct.title,
          external_id: erpProduct.id,
          description: erpProduct.description,
          price: erpProduct.price,
          sku: erpProduct.sku,
          options: [
            {
              title: 'Size',
            },
          ],
          variants: erpProduct.variants.map((variant, idx) => ({
            title: variant.title,
            option: [
              {
                value: `${variant.option_value}` || 'Default', // This MUST match the product's intended options
              },
            ],
            metadata: {
              external_id: variant.metadata.external_id,
            },
          })),
        };
      });
    }
  );

  createProductsWorkflow.runAsStep({
    input: {
      products: productsToCreate,
    },
  });

  return new WorkflowResponse({
    erpProducts,
  });
});
