// get all => will be on feed page
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guitarSchema = new Schema({
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
  },
  user: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;
