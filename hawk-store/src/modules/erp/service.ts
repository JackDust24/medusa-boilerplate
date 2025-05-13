import axios from 'axios';

type Options = {
  apiKey: string; // Will use in a real ERP sense
  baseUrl?: string;
};

type SyncMetadata = {
  lastSync: Date | null;
  lastCount: number;
};

export default class ErpModuleService {
  private syncMetadata: SyncMetadata = {
    lastSync: null,
    lastCount: 0,
  };

  private options: Options;
  private client: ReturnType<typeof axios.create>;

  constructor({}, options: Options) {
    this.options = options;
    this.client = axios.create({
      baseURL: options.baseUrl || 'http://localhost:4001',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getProducts() {
    const res = await this.client.get('/products');
    return res.data.products;
  }

  setSyncMeta(date: Date, count: number) {
    this.syncMetadata = {
      lastSync: date,
      lastCount: count,
    };
  }

  getSyncMeta(): SyncMetadata {
    return this.syncMetadata;
  }
}
