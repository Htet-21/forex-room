const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const authRoutes = require("./routes/auth");
const channelRoutes = require("./routes/channel");
const messageRoutes = require("./routes/message");

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
    console.log(`User joined channel ${channelId}`);
    io.to(channelId).emit("notification", {
      type: "user_join",
      message: `A new user has joined channel ${channelId}`,
      timestamp: new Date(),
    });
  });

  socket.on("sendPrivateMessage", (message) => {
    const { receiverId, content, channelId } = message;
    io.to(receiverId).emit("notification", {
      type: "private_message",
      message: `You received a new private message in ${channelId}: ${content}`,
      timestamp: new Date(),
    });
    io.to(channelId).emit("receiveMessage", message);
  });  
  
  socket.on("sendMessage", (message) => {
    io.to(message.channelId).emit("receiveMessage", message);
  });

  setInterval(() => {
    const forexUpdate = {
      pair: "EUR/USD",
      price: (Math.random() * 2 + 1).toFixed(2),
      timestamp: new Date().toISOString(),
    };
    io.emit("forexUpdate", forexUpdate);
  }, 5000);  

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
