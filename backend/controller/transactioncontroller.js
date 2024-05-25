const Transaction = require('../model/transaction');
const User = require('../model/users');
const mongoose = require('mongoose');

// Create a transaction
const createTransaction = async (req, res) => {
  const { type, amount } = req.body;

  if (!['deposit', 'withdrawal'].includes(type)) {
    return res.status(400).json({ message: 'Invalid transaction type' });
  }

  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber) || amountNumber <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be greater than zero' });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({email:req.user.email}).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    if (type === 'withdrawal' && user.balance < amountNumber) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      type,
      amount:amountNumber
    });

    await transaction.save({ session });

    if (type == 'deposit') {
      user.balance += amountNumber;
    } else if (type == 'withdrawal') {
      user.balance -= amountNumber;
    }
    await user.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({success:"success"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all transactions Details
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    const user=await User.findById({_id:req.user.id})
    res.status(200).json({user,transactions});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction || transaction.userId.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    const user=await User.findById(transaction.userId)
    res.status(200).json({transaction,user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById
};
