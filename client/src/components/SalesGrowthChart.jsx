import React, { useState, useEffect } from 'react';

const SalesGrowth = () => {
  const [growthData, setGrowthData] = useState(null);

  useEffect(() => {
    fetch('/api/sales-growth')
      .then(response => response.json())
      .then(data => setGrowthData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {growthData ? (
        <ul>
          {Object.entries(growthData).map(([interval, growth], index) => (
            <li key={index}>
              {interval}: {growth}%
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading growth data...</p>
      )}
    </div>
  );
};

export default SalesGrowth;
