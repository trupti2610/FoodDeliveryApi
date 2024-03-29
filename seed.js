// seed.js

// Import necessary modules
const mongoose = require('mongoose');
const Organization = require('./models/Organization');
const Item = require('./models/Item');
const Pricing = require('./models/Pricing');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/food_delivery_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Define sample data
    const organizationData = [
      { name: 'Organization 1' },
      // Add more organizations if needed
    ];

    const itemData = [
      { type: 'perishable', description: 'Sample perishable item' },
      { type: 'non-perishable', description: 'Sample non-perishable item' },
    ];

    const pricingData = [
      {
        organization: '605e0d80e8d7a8241c0ab693', // Insert correct organization ID
        item: '605e0d80e8d7a8241c0ab694', // Insert correct item ID
        zone: 'central',
        base_distance_in_km: 5,
        km_price: 1.5,
        fix_price: 10,
      },
      // Add more pricing data if needed
    ];

    // Insert sample data into collections
    Promise.all([
      Organization.insertMany(organizationData),
      Item.insertMany(itemData),
      Pricing.insertMany(pricingData),
    ])
      .then(() => {
        console.log('Sample data inserted successfully');
        // Disconnect from MongoDB
        mongoose.disconnect();
      })
      .catch(err => {
        console.error('Failed to insert sample data', err);
        // Disconnect from MongoDB
        mongoose.disconnect();
      });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
