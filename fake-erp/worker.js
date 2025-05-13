// worker.js
const { parentPort } = require('worker_threads');
const axios = require('axios');

const SYNC_INTERVAL_MS = 60 * 1000; // 1 minute

const triggerSync = async () => {
  try {
    const response = await axios.post('http://localhost:4001/sync', {
      triggeredBy: 'worker',
    });

    parentPort.postMessage({
      status: 'ERP sync triggered',
      response: response.data,
    });
  } catch (error) {
    parentPort.postMessage({
      status: 'ERP sync failed',
      error: error.message,
    });
  }
};

// Start loop
setInterval(triggerSync, SYNC_INTERVAL_MS);
