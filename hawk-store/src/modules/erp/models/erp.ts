import { model } from '@medusajs/framework/utils';

const Erp = model.define('erp', {
  id: model.id().primaryKey(),
  title: model.text(),
});

export default Erp;
