import React, { useEffect, useState } from "react";

const initialForm = {
  accountHolderName: "",
  accountNumber: "",
  accountType: "Savings",
  branch: "",
  balance: 0,
};

const AccountForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        accountHolderName: initialData.accountHolderName || "",
        accountNumber: initialData.accountNumber || "",
        accountType: initialData.accountType || "Savings",
        branch: initialData.branch || "",
        balance: initialData.balance ?? 0,
      });
    } else {
      setForm(initialForm);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initialData ? "Edit Account" : "Add New Account"}</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Account Holder Name
            <input
              type="text"
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Account Number
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Account Type
            <select
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </label>
          <label>
            Branch
            <input
              type="text"
              name="branch"
              value={form.branch}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Balance
            <input
              type="number"
              name="balance"
              value={form.balance}
              onChange={handleChange}
              min="0"
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit">
              {initialData ? "Update Account" : "Create Account"}
            </button>
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;

