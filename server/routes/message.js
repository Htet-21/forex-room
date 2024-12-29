const express = require("express");
const { createMessage, getMessages, deleteMessage } = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createMessage);
router.get("/:channel_id", verifyToken, getMessages);
router.delete("/:id", verifyToken, deleteMessage);

module.exports = router;
