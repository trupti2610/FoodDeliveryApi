// models/Organization.js
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Organization', organizationSchema);
