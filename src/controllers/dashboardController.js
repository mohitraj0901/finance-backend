import Transaction from "../models/Transaction.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryBreakdown = {};

    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;

      // category breakdown
      if (!categoryBreakdown[t.category]) {
        categoryBreakdown[t.category] = 0;
      }
      categoryBreakdown[t.category] += t.amount;
    });

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
      categoryBreakdown,
      recentTransactions: transactions.slice(-5),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};