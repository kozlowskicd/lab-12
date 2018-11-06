'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const products = mongoose.Schema({
  title: {type:String, require:true},
  text: {type:String},
  category: {type:String, require:true},
}, { toObject:{virtuals:true}, toJSON:{virtuals:true} });

export default mongoose.model('products', products);