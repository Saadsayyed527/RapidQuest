import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  

export const getTotalSales = async (interval) => {
  const response = await axios.get(`${API_URL}/sales-over-time/${interval}`);
  return response.data;
};

export const getSalesGrowthRate = async (interval) => {
  const response = await axios.get(`${API_URL}/sales-growth-rate/${interval}`);
  return response.data;
};

export const getNewCustomers = async (interval) => {
  const response = await axios.get(`${API_URL}/new-customers/${interval}`);
  return response.data;
};

export const getRepeatCustomers = async (interval) => {
  const response = await axios.get(`${API_URL}/repeat-customers/${interval}`);
  return response.data;
};

export const getCustomerDistribution = async () => {
  const response = await axios.get(`${API_URL}/customer-distribution`);
  return response.data;
};
