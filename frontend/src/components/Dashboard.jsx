import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [subscriptions, setSubscriptions] = useState(JSON.parse(localStorage.getItem('subscriptions') || '[]'));
  const [prices, setPrices] = useState({});
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/stocks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStocks(response.data.stocks);
    };
    fetchStocks();

    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket == null) return;

    subscriptions.forEach(ticker => {
      socket.emit('subscribe', ticker);
    });

    socket.on('stockUpdate', (stockData) => {
      setPrices(prevPrices => ({
        ...prevPrices,
        [stockData.ticker]: stockData.price
      }));
    });

    return () => {
      subscriptions.forEach(ticker => {
        socket.emit('unsubscribe', ticker);
      });
    };
  }, [socket, subscriptions]);

  const handleSubscribe = async (ticker) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/subscribe', { ticker }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscriptions(response.data.subscriptions);
      localStorage.setItem('subscriptions', JSON.stringify(response.data.subscriptions));
      if (socket) {
        socket.emit('subscribe', ticker);
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('subscriptions');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Stock Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="stock-section">
        <h3>Available Stocks</h3>
        <ul className="stock-list">
          {stocks.map(stock => (
            <li key={stock} className="stock-item">
              {stock}
              {!subscriptions.includes(stock) && (
                <button className="subscribe-btn" onClick={() => handleSubscribe(stock)}>Subscribe</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="stock-section">
        <h3>Your Subscriptions</h3>
        <ul className="stock-list">
          {subscriptions.map(stock => (
            <li key={stock} className="subscription-item">
              {stock}
              <span className="stock-price">${prices[stock] || 'Loading...'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;