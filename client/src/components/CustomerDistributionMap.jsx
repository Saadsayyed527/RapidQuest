import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getCustomerDistribution } from '../api';

const CustomerDistributionMap = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchCustomerDistribution = async () => {
      const data = await getCustomerDistribution();
      const labels = Object.keys(data);
      const values = Object.values(data);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Customers by City',
            data: values,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
          },
        ],
      });
    };

    fetchCustomerDistribution();
  }, []);

  return (
    <div>
      <h2>Customer Distribution by City</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default CustomerDistributionMap;
