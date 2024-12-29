import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "../styles/ChatArea.css";

const socket = io("http://localhost:5000");

const ChatArea = ({ currentChannel, currentChannelName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userPresence, setUserPresence] = useState({});
  const senderId = localStorage.getItem("senderId");
  const name = localStorage.getItem("name");

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${currentChannel}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (currentChannel) {
      fetchMessages();
      socket.emit("joinChannel", senderId, currentChannel);

      socket.on("receiveMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on("userPresence", (user) => {
        setUserPresence((prev) => ({
          ...prev,
          [user.userId]: user.status,
        }));
      });

      return () => {
        socket.emit("leaveChannel", currentChannel);
        socket.off("receiveMessage");
        socket.off("userPresence");
      };
    }
  }, [currentChannel]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const payload = {
        message,
        sender: senderId,
        channel_id: currentChannel,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/messages",
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 201) {
          const newMessage = response.data.newMessage;

          const completeMessage = {
            ...newMessage,
            sender: { username: name },
          };

          socket.emit("sendMessage", completeMessage);
          setMessages((prevMessages) => [...prevMessages, completeMessage]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setMessage("");
    }
  };

  return (
    <div className="chat-area">
      <h3>Channel: {currentChannelName || "No channel selected"}</h3>
      <div className="messages">
        {messages
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((msg) => (
            <div key={msg._id || Math.random()} className="message">
              <div className="sender-info">
                <span className="sender">
                  {msg.sender?.username || "Unknown"}:
                </span>
                {userPresence[msg.sender?.userId] === "online" && (
                  <span className="online-indicator">🟢</span>
                )}
              </div>
              <span className="text">{msg.message || "Message not available"}</span>
              <span className="timestamp">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString()
                  : "Invalid Time"}
              </span>
            </div>
          ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatArea;
