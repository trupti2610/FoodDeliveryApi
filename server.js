// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pricingRoutes = require('./routes/pricing');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/pricing', pricingRoutes);

// Connect to MongoDB and start the server after successful connection
mongoose.connect('mongodb://localhost:27017/food_delivery_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));
