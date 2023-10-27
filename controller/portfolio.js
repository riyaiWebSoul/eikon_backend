const model = require('../models/portfolio');
const Portfolio = model.portfolio;

exports.createPortfolio = async (req, res) => {
  try {
    const existingPortfolio = await Portfolio.findOne({ id: req.body });

    if (existingPortfolio) {
      return res.status(409).json({ error: 'Portfolio with the same name already exists' });
    }

    const savedPortfolio = await Portfolio.create(req.body);
    res.status(201).json(savedPortfolio);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create Portfolio' });
  }
};

exports.getAllPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find();
  res.json(portfolios);
};

exports.getPortfolio = async (req, res) => {
  const id = req.params.id;
  const portfolio = await Portfolio.findById(id);
  res.json(portfolio);
};

exports.replacePortfolio = async (req, res) => {
  const id = req.params.id;
  const doc = await Portfolio.findOneAndReplace({ _id: id }, req.body, { new: true });
  res.status(201).json(doc);
};

exports.updatePortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Portfolio.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.deletePortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Portfolio.findOneAndDelete({ _id: id }, { new: true });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
