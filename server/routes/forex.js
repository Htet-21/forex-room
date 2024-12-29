const express = require("express");
const { getForexData, generateForexData } = require("../controllers/forexController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getForexData);
router.post("/", verifyToken, generateForexData);

module.exports = router;
