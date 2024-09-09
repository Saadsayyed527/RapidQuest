import React, { useState, useEffect } from 'react';

const TotalSales = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    fetch('/api/total-sales')
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {salesData ? (
        <ul>
          {Object.entries(salesData).map(([interval, total], index) => (
            <li key={index}>
              {interval}: ${total}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading sales data...</p>
      )}
    </div>
  );
};

export default TotalSales;
