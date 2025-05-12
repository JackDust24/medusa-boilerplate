import { Modules } from '@medusajs/framework/utils';
import { LinkDefinition } from '@medusajs/types';
import BrandModuleService from '../modules/brand/service';
import { BRAND_MODULE } from '../modules/brand';

export async function linkProductsToBrand(
  container: any,
  products: { id: string }[],
  brandId: string
): Promise<{ links: LinkDefinition[] }> {
  // Resolve services
  const brandModuleService: BrandModuleService =
    container.resolve(BRAND_MODULE);
  const link = container.resolve('link');
  const logger = container.resolve('logger');

  // Verify brand exists (using your exact method name)
  await brandModuleService.retrieveBrand(brandId);

  // Create links
  const links: LinkDefinition[] = products.map((product) => ({
    [Modules.PRODUCT]: { product_id: product.id },
    [BRAND_MODULE]: { brand_id: brandId },
  }));

  await link.create(links);
  logger.info(`Linked ${products.length} products to brand ${brandId}`);

  return { links };
}

export async function unlinkProducts(
  container: any,
  links: LinkDefinition[]
): Promise<void> {
  if (!links?.length) return;

  const link = container.resolve('link');
  await link.dismiss(links);
}
