const Message = require("../models/Message");

const createMessage = async (req, res) => {
  try {
    const { message, sender, channel_id } = req.body;
    
    const newMessage = new Message({
      message,
      sender,
      channel_id,
    });
    
    await newMessage.save();
    res.status(201).json({ message: "Message created successfully", newMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { channel_id } = req.params;
    const messages = await Message.find({ channel_id })
      .populate("sender", "username")
      .populate("channel_id", "name")
      .sort({ timestamp: -1 });
    
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};
