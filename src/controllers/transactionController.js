import Transaction from "../models/Transaction.js";



export const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, note } = req.body;

    
    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type and category are required",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        message: "Type must be income or expense",
      });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      note,
      user: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const { page = 1, limit = 5, type, category } = req.query;

    const query = { user: userId };

    
    if (type) query.type = type;
    if (category) query.category = category;

    
    const transactions = await Transaction.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Transaction.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    
    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};