'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const categories = mongoose.Schema({
  title: {type:String, require:true},
  text: {type:String}}, { toObject:{virtuals:true}, toJSON:{virtuals:true},
});

categories.virtual('products', {
  ref: 'products',
  localField: 'title',
  foreignField: 'category',
  justOne:false,
});

categories.pre('find', function() {
  try {
    this.populate('products');
  }
  catch(err) {
    console.error(err);
  }
});

export default mongoose.model('categories', categories);