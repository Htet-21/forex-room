const express = require("express");
const { createChannel, getAllChannels, deleteChannel, addMembers } = require("../controllers/channelController");
const { verifyToken, checkAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, checkAdmin, createChannel);
router.get("/", verifyToken, getAllChannels);
router.delete("/:id", verifyToken, checkAdmin, deleteChannel);
router.put("/:id/members", verifyToken, addMembers);

module.exports = router;
