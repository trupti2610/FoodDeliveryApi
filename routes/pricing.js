// routes/pricing.js
const express = require('express');
const router = express.Router();
const Pricing = require('../models/Pricing');

// Route to insert pricing data
router.post('/add', async (req, res) => {
  try {
    const { organization, item, zone, base_distance_in_km, km_price, fix_price } = req.body;

    // Create a new pricing document
    const pricing = new Pricing({
      organization,
      item,
      zone,
      base_distance_in_km,
      km_price,
      fix_price
    });

    // Save the new pricing document to the database
    await pricing.save();

    res.status(201).json({ message: 'Pricing data added successfully' });
  } catch (error) {
    console.error('Error adding pricing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/calculate', async (req, res) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  try {
    // Fetch pricing details based on zone and organization
    const pricing = await Pricing.findOne({ organization: organization_id, zone }).populate('item');

    if (!pricing) {
      return res.status(404).json({ error: 'Pricing details not found' });
    }

    // Calculate total price
    let totalPrice = pricing.fix_price;
    if (total_distance > pricing.base_distance_in_km) {
      const additionalDistance = total_distance - pricing.base_distance_in_km;
      totalPrice += additionalDistance * pricing.km_price;
    }
    if (pricing.item.type === item_type) {
      totalPrice += totalPrice * (pricing.item.type === 'perishable' ? 0.15 : 0.1); // Apply percentage increase for perishable items
    }

    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
