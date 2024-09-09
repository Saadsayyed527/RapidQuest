const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: String,
    email: String,
    created_at: Date,
    default_address: {
        city: String,
        country: String,
    },
});

module.exports = mongoose.model('Customer', customerSchema, 'shopifyCustomers');
