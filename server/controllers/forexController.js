const Forex = require("../models/ForexData");

exports.getForexData = async (req, res) => {
  try {
    const forexData = await Forex.find();
    res.status(200).json(forexData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateForexData = async (req, res) => {
  try {
    const { pair, price } = req.body;

    const newForex = new Forex({
      pair,
      price,
    });

    await newForex.save();
    res.status(201).json(newForex);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
