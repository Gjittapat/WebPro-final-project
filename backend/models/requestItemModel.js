const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestItemSchema = new Schema({
  user: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: true
  },
  item: {
    type: Schema.Types.Mixed,
    ref: 'Guitar',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

const RequestItem = mongoose.model('RequestItem', requestItemSchema);

module.exports = RequestItem;
