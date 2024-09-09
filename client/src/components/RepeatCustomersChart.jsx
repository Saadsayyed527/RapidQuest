import React, { useState, useEffect } from 'react';

const RepeatCustomers = () => {
  const [repeatCustomersData, setRepeatCustomersData] = useState(null);

  useEffect(() => {
    fetch('/api/repeat-customers')
      .then(response => response.json())
      .then(data => setRepeatCustomersData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {repeatCustomersData ? (
        <ul>
          {Object.entries(repeatCustomersData).map(([interval, count], index) => (
            <li key={index}>
              {interval}: {count} repeat customers
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading repeat customers data...</p>
      )}
    </div>
  );
};

export default RepeatCustomers;
