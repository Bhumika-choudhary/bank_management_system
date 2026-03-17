const Account = require("../models/BankAccount");


// Create Account
exports.createAccount = async (req, res) => {
    try {
        const account = await Account.create(req.body);

        res.status(201).json({
            success: true,
            data: account
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get All Accounts
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();

        res.json(accounts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Account By ID
exports.getAccountById = async (req, res) => {
    try {

        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json(account);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update Account
exports.updateAccount = async (req, res) => {

    try {

        const account = await Account.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(account);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete Account
exports.deleteAccount = async (req, res) => {

    try {

        await Account.findByIdAndDelete(req.params.id);

        res.json({ message: "Account deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Deposit Money
exports.depositMoney = async (req, res) => {

    try {

        const amount = Number(req.query.amount);

        const account = await Account.findById(req.params.id);

        account.balance = account.balance + amount;

        await account.save();

        res.json({
            message: "Money deposited",
            balance: account.balance
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Withdraw Money
exports.withdrawMoney = async (req, res) => {

    try {

        const amount = Number(req.query.amount);

        const account = await Account.findById(req.params.id);

        if (account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        account.balance = account.balance - amount;

        await account.save();

        res.json({
            message: "Money withdrawn",
            balance: account.balance
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};