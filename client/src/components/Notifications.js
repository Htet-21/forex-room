import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../styles/Notifications.css";

const socket = io("http://localhost:5000");

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("Connecting to Socket.IO server...");
    socket.on("connect", () => {
        console.log("Connected to server with ID:", socket.id);
    });

    socket.on("newNotification", (notification) => {
        console.log("Notification received:", notification);
        setNotifications((prev) => [notification, ...prev].slice(0, 10));
      });      

    return () => {
        socket.off("newNotification");
        socket.off("connect");
    };
}, []);


return (
    <div className="notifications">
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className={`notification ${notification.type}`}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default Notifications;
