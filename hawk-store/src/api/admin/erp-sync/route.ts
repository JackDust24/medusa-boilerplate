import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { syncFromErpWorkflow } from '../../../workflows/sync-from-erp';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const result = await syncFromErpWorkflow.run({
      container: req.scope,
    });

    res.status(200).json({
      message: 'ERP sync triggered successfully',
      result,
    });
  } catch (error) {
    console.error('ERP Sync Error:', error);
    res.status(500).json({ error: 'Failed to sync ERP products' });
  }
};
