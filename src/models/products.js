'use strict';

import Model from './defaultModel.js';
import schema from './schemas/products.js';

class Products extends Model {}

const products = new Products(schema);

export default products;