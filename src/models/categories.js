'use strict';

import Model from './defaultModel.js';
import schema from './schemas/categories.js';

class Categories extends Model {}

const categories = new Categories(schema);

export default categories;