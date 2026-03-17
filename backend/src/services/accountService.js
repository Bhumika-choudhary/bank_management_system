const BankAccount = require("../models/BankAccount");

const getAllAccounts = async () => {
  return BankAccount.find().sort({ createdAt: -1 });
};

const getAccountById = async (id) => {
  return BankAccount.findById(id);
};

const createAccount = async (data) => {
  const existing = await BankAccount.findOne({
    accountNumber: data.accountNumber,
  });
  if (existing) {
    const error = new Error("Account with this number already exists");
    error.statusCode = 400;
    throw error;
  }
  const account = new BankAccount(data);
  return account.save();
};

const updateAccount = async (id, data) => {
  if (data.accountNumber) {
    const existing = await BankAccount.findOne({
      accountNumber: data.accountNumber,
      _id: { $ne: id },
    });
    if (existing) {
      const error = new Error("Another account already uses this number");
      error.statusCode = 400;
      throw error;
    }
  }

  const account = await BankAccount.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return account;
};

const deleteAccount = async (id) => {
  return BankAccount.findByIdAndDelete(id);
};

const deposit = async (id, amount) => {
  if (amount <= 0) {
    const error = new Error("Deposit amount must be greater than 0");
    error.statusCode = 400;
    throw error;
  }

  const account = await BankAccount.findById(id);
  if (!account) return null;

  account.balance += amount;
  return account.save();
};

const withdraw = async (id, amount) => {
  if (amount <= 0) {
    const error = new Error("Withdrawal amount must be greater than 0");
    error.statusCode = 400;
    throw error;
  }

  const account = await BankAccount.findById(id);
  if (!account) return null;

  if (account.balance < amount) {
    const error = new Error("Insufficient balance");
    error.statusCode = 400;
    throw error;
  }

  account.balance -= amount;
  return account.save();
};

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  deposit,
  withdraw,
};

