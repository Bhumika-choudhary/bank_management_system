import React, { useEffect, useState } from "react";
import AccountCard from "../components/AccountCard";
import AccountForm from "../components/AccountForm";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  depositMoney,
  withdrawMoney,
} from "../services/api";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAccounts();
      setAccounts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddClick = () => {
    setSelectedAccount(null);
    setIsFormOpen(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setIsFormOpen(true);
  };

  const handleDelete = async (account) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmed) return;

    try {
      await deleteAccount(account._id);
      fetchAccounts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedAccount) {
        await updateAccount(selectedAccount._id, formData);
      } else {
        await createAccount(formData);
      }
      setIsFormOpen(false);
      setSelectedAccount(null);
      fetchAccounts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save account");
    }
  };

  const handleDeposit = async (account) => {
    const value = window.prompt("Enter amount to deposit:");
    const amount = Number(value);
    if (!value || Number.isNaN(amount) || amount <= 0) return;
    try {
      await depositMoney(account._id, amount);
      fetchAccounts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to deposit money");
    }
  };

  const handleWithdraw = async (account) => {
    const value = window.prompt("Enter amount to withdraw:");
    const amount = Number(value);
    if (!value || Number.isNaN(amount) || amount <= 0) return;
    try {
      await withdrawMoney(account._id, amount);
      fetchAccounts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to withdraw money (maybe insufficient balance)"
      );
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Accounts</h1>
        <button onClick={handleAddClick}>+ Add Account</button>
      </div>
      {error && <div className="error-banner">{error}</div>}
      {loading ? (
        <p>Loading accounts...</p>
      ) : (
        <div className="account-grid">
          {accounts.map((acc) => (
            <AccountCard
              key={acc._id}
              account={acc}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />
          ))}
          {accounts.length === 0 && <p>No accounts found.</p>}
        </div>
      )}
      <AccountForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedAccount}
      />
    </div>
  );
};

export default Dashboard;

