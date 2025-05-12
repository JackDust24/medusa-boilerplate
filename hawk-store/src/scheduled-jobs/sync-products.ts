import { MedusaContainer } from '@medusajs/framework/types';
import { syncFromErpWorkflow } from '../workflows/sync-from-erp';

export default async function syncProductsJob(container: MedusaContainer) {
  await syncFromErpWorkflow(container).run({});
}

export const config = {
  name: 'daily-product-sync',
  schedule: '0 0 * * *', // Every day at midnight
};
