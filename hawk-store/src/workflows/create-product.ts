import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
} from '@medusajs/framework/workflows-sdk';
import { Modules } from '@medusajs/framework/utils';

type CreateProductInput = {
  title: string;
  options: {
    title: string;
    values: string[];
  }[];
  variants?: {
    title: string;
    options: {
      [key: string]: string;
    };
  }[];
  shipping_profile_id?: string;
  // additional_data?: {
  //   brand_id?: string;
  // };
};

const createProductStep = createStep(
  'create-product',
  async (inputData: CreateProductInput, { container }) => {
    const productService = container.resolve(Modules.PRODUCT);

    const product = await productService.createProducts({
      title: inputData.title,
      options: inputData.options,
      variants: inputData.variants || [],
      shipping_profile_id: inputData.shipping_profile_id,
      // additional_data: {
      //   brand_id: inputData.additional_data?.brand_id,
      // },
    });

    return new StepResponse({ product }, product.id);
  },
  async (productId, { container }) => {
    if (!productId) return;
    const productService = container.resolve(Modules.PRODUCT);
    await productService.deleteProducts([productId]);
  }
);

export const createProductWorkflow = createWorkflow(
  'create-product',
  (input: CreateProductInput) => {
    const { product } = createProductStep(input);
    return new WorkflowResponse({ product });
  }
);

// export const createProductWorkflow = createWorkflow('create-product', () => {
//   const { product } = createProductStep();
//   return new WorkflowResponse({ product });
// });

// const createProductStep = createStep(
//   'create-product',
//   async ({}, { container }) => {
//     const productService = container.resolve(Modules.PRODUCT);

//     const product = await productService.createProducts({
//       title: 'Medusa Shirt',
//       options: [
//         {
//           title: 'Color',
//           values: ['Black', 'White'],
//         },
//       ],
//       variants: [
//         {
//           title: 'Black Shirt',
//           options: {
//             Color: 'Black',
//           },
//         },
//       ],
//     });

//     return new StepResponse({ product }, product.id);
//   },
//   async (productId, { container }) => {
//     if (!productId) {
//       return;
//     }
//     const productService = container.resolve(Modules.PRODUCT);

//     await productService.deleteProducts([productId]);
//   }
// );

// export const createProductWorkflow = createWorkflow('create-product', () => {
//   const { product } = createProductStep();

//   return new WorkflowResponse({
//     product,
//   });
// });
