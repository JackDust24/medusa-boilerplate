import { MedusaContainer } from '@medusajs/framework/types';
import { syncFromErpWorkflow } from '../workflows/sync-from-erp';

export default async function syncProductsJob(container: MedusaContainer) {
  const logger = container.resolve('logger');

  logger.info('🔁 Running ERP sync job...');

  try {
    await syncFromErpWorkflow(container).run({});
    logger.info('✅ ERP sync completed successfully.');
  } catch (error) {
    logger.error('❌ ERP sync failed:', error);
  }
}

export const config = {
  name: 'daily-product-sync',
  schedule: '0 0 * * *', // Every day at midnight
};
