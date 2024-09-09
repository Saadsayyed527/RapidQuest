import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TotalSalesChart from './components/TotalSalesChart';
import SalesGrowthChart from './components/SalesGrowthChart';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import CustomerDistributionMap from './components/CustomerDistributionMap';

function App() {
  const [interval, setInterval] = useState('monthly');

  return (
    <Router>
      <div className="App">
        <h1>E-commerce Analytics Dashboard</h1>
        
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/sales-growth">Sales Growth</Link></li>
            <li><Link to="/new-customers">New Customers</Link></li>
            <li><Link to="/repeat-customers">Repeat Customers</Link></li>
            <li><Link to="/distribution-map">Customer Distribution Map</Link></li>
          </ul>
        </nav>

        <select onChange={(e) => setInterval(e.target.value)} value={interval}>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <TotalSalesChart interval={interval} />
                <SalesGrowthChart interval={interval} />
                <NewCustomersChart interval={interval} />
                <RepeatCustomersChart interval={interval} />
                <CustomerDistributionMap />
              </>
            } 
          />
          <Route path="/sales-growth" element={<SalesGrowthChart interval={interval} />} />
          <Route path="/new-customers" element={<NewCustomersChart interval={interval} />} />
          <Route path="/repeat-customers" element={<RepeatCustomersChart interval={interval} />} />
          <Route path="/distribution-map" element={<CustomerDistributionMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
