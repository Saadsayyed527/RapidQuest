import React, { useState, useEffect } from 'react';

const NewCustomers = () => {
  const [newCustomersData, setNewCustomersData] = useState(null);

  useEffect(() => {
    fetch('/api/new-customers')
      .then(response => response.json())
      .then(data => setNewCustomersData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {newCustomersData ? (
        <ul>
          {Object.entries(newCustomersData).map(([interval, count], index) => (
            <li key={index}>
              {interval}: {count} new customers
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading new customers data...</p>
      )}
    </div>
  );
};

export default NewCustomers;
