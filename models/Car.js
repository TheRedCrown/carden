const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  kpp: {
    type: String,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: { type: Array },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Car = mongoose.model('car', CarSchema);
