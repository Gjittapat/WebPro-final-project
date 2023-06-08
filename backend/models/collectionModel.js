// user add items to their collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collection = new Schema({
  user: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: true
  },
  img: {
    data: {
      type: String,
      required: true
    },
    contentType: {
      type: String
    }
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

const Collection = mongoose.model('Collection', collection);

module.exports = Collection;
