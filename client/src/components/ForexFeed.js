import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../styles/ForexFeed.css';
import Notifications from './Notifications';

const socket = io('http://localhost:5000');

const ForexFeed = () => {
  const [forexData, setForexData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    socket.on('forexUpdate', (data) => {
      const currentTime = Date.now();
      const throttleDelay = 1000;

      if (currentTime - lastUpdate > throttleDelay) {
        if (data && data.pair && data.price && data.timestamp) {
          setForexData((prevData) => {
            const updatedData = [data, ...prevData];
            return updatedData.slice(0, 5);
          });

          setNotification({
            type: 'forex',
            message: `New Forex update: ${data.pair} - ${data.price}`,
            timestamp: data.timestamp,
          });

          setLastUpdate(currentTime);
        } else {
          console.error('Invalid data format received:', data);
        }
      }
    });

    return () => {
      socket.off('forexUpdate');
    };
  }, [lastUpdate]);

  return (
    <div className="forex-feed">
      <h3>Forex Feed</h3>
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Bid</th>
            <th>Ask</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {forexData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.pair}</td>
              <td>{entry.price}</td>
              <td>{entry.price}</td>
              <td>{new Date(entry.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Notifications</h3>

      {notification && (
        <div className="notifications">
          <div className="notification">
            <span className="forex-notification">{notification.message}</span>
            <span className="timestamp">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
       <Notifications />
    </div>
  );
};

export default ForexFeed;

