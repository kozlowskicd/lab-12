'use strict';

import Storage from '../lib/storage/storage.js';

class Model {

  constructor(schema) {
    this.schema = schema;
    this.storage = new Storage(schema);
  }

  static schema() {
    return typeof this.schema.jsonSchema === 'function' ? this.schema.jsonSchema() : {};
  }

  static find(query) {
    return this.storage.find(query);
  }

  static save(data) {
    return this.storage.save(data);
  }

  static delete(id) {
    return this.storage.delete(id);
  }

  static put(id, data) {
    return this.storage.find({_id:id})
      .then(results => {
        results = Object.assign(results[0], data);
        return this.storage.save(results);
      });
  }

  static patch(id, data) {
    return this.storage.put(id, data);
  }
}

export default Model;