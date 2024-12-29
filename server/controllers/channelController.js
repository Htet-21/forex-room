const Channel = require("../models/Channel");
const User = require("../models/User");

exports.createChannel = async (req, res) => {
  try {
    const { name, isPrivate } = req.body;

    const existingChannel = await Channel.findOne({ name });
    if (existingChannel) return res.status(400).json({ message: "Channel already exists" });

    const newChannel = new Channel({
      name,
      isPrivate,
      created_by: req.user.id,
      members: [req.user.id],
    });

    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findById(id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (channel.created_by.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this channel" });
    }

    await Channel.deleteOne({ _id: id });
    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMembers = async (req, res) => {
  try {
      const { id } = req.params;
      const { members } = req.body;
      const userId = req.user.id;

      const channel = await Channel.findById(id);

      if (!channel) {
          return res.status(404).json({ message: "Channel not found" });
      }
      if (channel.created_by.toString() !== userId) {
          return res.status(403).json({ message: "You are not authorized to add members to this channel" });
      }
      const uniqueMembers = [...new Set([...channel.members, ...members])];

      channel.members = uniqueMembers;
      await channel.save();

      res.status(200).json({ message: "Members added successfully", channel });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

