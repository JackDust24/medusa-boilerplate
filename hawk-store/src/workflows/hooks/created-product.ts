import { createProductsWorkflow } from '@medusajs/medusa/core-flows';
import { StepResponse } from '@medusajs/framework/workflows-sdk';
import { Modules } from '@medusajs/framework/utils';
import { LinkDefinition } from '@medusajs/framework/types';
import { BRAND_MODULE } from '../../modules/brand';
import BrandModuleService from '../../modules/brand/service';

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    // The additional_data object will  have properties passed from the workflow to the hook, which in this case is the products property that holds an array of the created products.
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }

    // A container property whose value is the Medusa container to resolve Framework and commerce tools
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);
    // if the brand doesn't exist, an error is thrown.
    await brandModuleService.retrieveBrand(additional_data.brand_id as string);

    const link = container.resolve('link');
    const logger = container.resolve('logger');

    const links: LinkDefinition[] = [];
    // The links array is populated with objects that contain the product_id and brand_id.
    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      });
    }

    await link.create(links);

    logger.info('Linked brand to products');

    return new StepResponse(links, links);
  },

  // This function is executed when the workflow fails and is used to undo the changes made in the workflow.
  async (links, { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve('link');

    await link.dismiss(links);
  }
);
