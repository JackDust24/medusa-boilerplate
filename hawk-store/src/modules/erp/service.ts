import axios from 'axios';

type Options = {
  apiKey: string; // Will use in a real ERP sense
  baseUrl?: string;
};

export default class ErpModuleService {
  private options: Options;
  private client: ReturnType<typeof axios.create>;

  constructor({}, options: Options) {
    this.options = options;
    //TODO: initialize client that connects to ERP
    this.client = axios.create({
      baseURL: options.baseUrl || 'http://localhost:4001',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getProducts() {
    // return this.client.getProducts();
    console.log('Fetching products from ERP...');
    const res = await this.client.get('/products');
    return res.data.products;
  }
}
