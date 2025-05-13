import React, { useEffect, useState } from 'react';
import { Button } from '@medusajs/ui';
import axios from 'axios';
import { defineWidgetConfig } from '@medusajs/admin-sdk';

const ErpStatusWidget = () => {
  const [syncStatus, setSyncStatus] = useState<{
    lastSync: string | null;
    lastCount: number;
  }>({
    lastSync: null,
    lastCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    const res = await axios.get('/admin/erp-sync');
    setSyncStatus(res.data);
  };

  const triggerSync = async () => {
    setLoading(true);
    try {
      await axios.post('/admin/erp-sync');
      await fetchStatus();
    } catch (e) {
      console.error('Sync failed', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className='bg-white p-4 rounded-md shadow-md'>
      <h3 className='text-lg font-semibold'>ERP Sync Status</h3>
      <p>
        Last Sync:{' '}
        {syncStatus.lastSync
          ? new Date(syncStatus.lastSync).toLocaleString()
          : 'Never'}
      </p>
      <p>Last Synced Product Count: {syncStatus.lastCount}</p>
      <Button onClick={triggerSync} disabled={loading}>
        {loading ? 'Syncing...' : 'Trigger ERP Sync'}
      </Button>
    </div>
  );
};

export const config = defineWidgetConfig({
  zone: 'product.list.before',
});

export default ErpStatusWidget;
