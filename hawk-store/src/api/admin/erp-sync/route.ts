import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { syncFromErpWorkflow } from '../../../workflows/sync-from-erp';
import { ERP_MODULE } from '../../../modules/erp';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const result = await syncFromErpWorkflow.run({
      container: req.scope,
    });

    const products = (result as { erpProducts?: any }).erpProducts ?? [];

    const erpModule = req.scope.resolve(ERP_MODULE);
    erpModule.setSyncMeta(new Date(), products.length);

    res.status(200).json({
      message: 'ERP sync triggered successfully',
      syncedCount: products.length,
    });
  } catch (error) {
    console.error('ERP Sync Error:', error);
    res.status(500).json({ error: 'Failed to sync ERP products' });
  }
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const erpModule = req.scope.resolve(ERP_MODULE);
  const status = erpModule.getSyncMeta(); // ✅ Use from module

  res.status(200).json(status);
};
