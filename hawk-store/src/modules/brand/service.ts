import { MedusaService } from '@medusajs/framework/utils';
import { Brand } from './models/brand';

// This function generates a class with data-management methods for your module's data models.
class BrandModuleService extends MedusaService({
  Brand,
}) {
  constructor() {
    super(...arguments);
  }
}

export default BrandModuleService;
