'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);

const categories = mongoose.Schema({
  title: {type:String, require:true},
  text: {type:String},
}, { toObject:{virtuals:true}, toJSON:{virtuals:true} });

export default mongoose.model('categories', categories);