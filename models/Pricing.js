// models/Pricing.js
const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  zone: { type: String, required: true },
  base_distance_in_km: { type: Number, required: true },
  km_price: { type: Number, required: true },
  fix_price: { type: Number, required: true }
});

module.exports = mongoose.model('Pricing', pricingSchema);
