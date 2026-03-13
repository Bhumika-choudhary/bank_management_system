const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema(
  {
    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["Savings", "Current"],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankAccount = mongoose.model("Bank_Account", bankAccountSchema);

module.exports = BankAccount;

