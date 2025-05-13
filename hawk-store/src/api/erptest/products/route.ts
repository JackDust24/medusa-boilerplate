import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { Modules } from '@medusajs/framework/utils';
import {
  linkProductsToBrand,
  unlinkProducts,
} from '../../../workflows/brand-product-linker';

type ERPProduct = {
  title: string;
  options: {
    title: string;
    values: string[];
  }[];
  shipping_profile_id: string;
  additional_data?: {
    brand_id: string;
  };
};

export const POST = async (
  req: MedusaRequest<ERPProduct>,
  res: MedusaResponse
) => {
  const productService = req.scope.resolve(Modules.PRODUCT);

  const {
    title,
    options,
    shipping_profile_id = '',
    additional_data,
  } = req.body;

  const products = [
    {
      title,
      options,
      shipping_profile_id,
      additional_data,
    },
  ];

  try {
    const createdProduct = await productService.createProducts(products);

    if (additional_data?.brand_id) {
      const { links } = await linkProductsToBrand(
        req.scope,
        createdProduct,
        additional_data.brand_id
      );
    }

    res.status(200).json({ status: 'success', product: createdProduct });
  } catch (e) {
    console.error('ERP TEST SYNC ERROR', e);
    res.status(500).json({ status: 'error', message: e.message });
  }
};
