import {
  container,
  type SubscriberArgs,
  type SubscriberConfig,
} from '@medusajs/framework';
import axios from 'axios';

export default async function productCreateHandler({
  event,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve('logger');

  logger.info('🔁 Product Create event triggered');
  const product = event.data;
  logger.info(`🔁 Product ID: ${product}`);

  try {
    await axios.post('http://localhost:4001/products', product);
    logger.info('✅ Product sent to ERP');
  } catch (err) {
    logger.error('❌ Failed to send product to ERP:', err.message);
    console.error('❌ Failed to send product to ERP:', err.message);
  }
}

export const config: SubscriberConfig = {
  event: `product.created`,
};
