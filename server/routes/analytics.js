const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Customer = require('../models/Customer');

// Helper to format dates
const formatDate = (date, interval) => {
  const d = new Date(date);
  switch (interval) {
    case 'daily':
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    case 'monthly':
      return `${d.getFullYear()}-${d.getMonth() + 1}`;
    case 'yearly':
      return `${d.getFullYear()}`;
    default:
      return date;
  }
};

router.get('/sales-over-time/:interval', async (req, res) => {
  const { interval } = req.params;

  try {
    const orders = await Order.find();
    const groupedSales = {};

    orders.forEach((order) => {
      const formattedDate = formatDate(order.created_at, interval);
      const total = order.total_price_set.shop_money.amount;

      if (!groupedSales[formattedDate]) {
        groupedSales[formattedDate] = 0;
      }
      groupedSales[formattedDate] += total;
    });

    res.json(groupedSales);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving sales data', err });
  }
});

router.get('/sales-growth-rate/:interval', async (req, res) => {
  const { interval } = req.params;

  try {
    const orders = await Order.find();
    const salesByTime = {};

    orders.forEach((order) => {
      const formattedDate = formatDate(order.created_at, interval);
      const total = order.total_price_set.shop_money.amount;

      if (!salesByTime[formattedDate]) {
        salesByTime[formattedDate] = 0;
      }
      salesByTime[formattedDate] += total;
    });

    const growthRate = {};
    const dates = Object.keys(salesByTime).sort();

    dates.forEach((date, index) => {
      if (index > 0) {
        const prevDate = dates[index - 1];
        const rate = ((salesByTime[date] - salesByTime[prevDate]) / salesByTime[prevDate]) * 100;
        growthRate[date] = rate;
      }
    });

    res.json(growthRate);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving sales growth rate', err });
  }
});

router.get('/new-customers/:interval', async (req, res) => {
  const { interval } = req.params;

  try {
    const customers = await Customer.find();
    const newCustomersByTime = {};

    customers.forEach((customer) => {
      const formattedDate = formatDate(customer.created_at, interval);

      if (!newCustomersByTime[formattedDate]) {
        newCustomersByTime[formattedDate] = 0;
      }
      newCustomersByTime[formattedDate]++;
    });

    res.json(newCustomersByTime);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving new customers data', err });
  }
});

router.get('/repeat-customers/:interval', async (req, res) => {
  const { interval } = req.params;

  try {
    const orders = await Order.find();
    const customerOrderCount = {};
    const repeatCustomersByTime = {};

    orders.forEach((order) => {
      const customerId = order.customer.id;
      const formattedDate = formatDate(order.created_at, interval);

      if (!customerOrderCount[customerId]) {
        customerOrderCount[customerId] = 0;
      }
      customerOrderCount[customerId]++;

      if (customerOrderCount[customerId] > 1) {
        if (!repeatCustomersByTime[formattedDate]) {
          repeatCustomersByTime[formattedDate] = 0;
        }
        repeatCustomersByTime[formattedDate]++;
      }
    });

    res.json(repeatCustomersByTime);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving repeat customers data', err });
  }
});

router.get('/customer-distribution', async (req, res) => {
  try {
    const customers = await Customer.find();
    const distribution = {};

    customers.forEach((customer) => {
      const city = customer.default_address.city;

      if (!distribution[city]) {
        distribution[city] = 0;
      }
      distribution[city]++;
    });

    res.json(distribution);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving customer distribution', err });
  }
});

module.exports = router;
