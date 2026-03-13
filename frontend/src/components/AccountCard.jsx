import React from "react";

const AccountCard = ({ account, onEdit, onDelete, onDeposit, onWithdraw }) => {
  return (
    <div className="account-card">
      <div className="account-row">
        <span className="label">Account Holder:</span>
        <span>{account.accountHolderName}</span>
      </div>
      <div className="account-row">
        <span className="label">Account No:</span>
        <span>{account.accountNumber}</span>
      </div>
      <div className="account-row">
        <span className="label">Type:</span>
        <span>{account.accountType}</span>
      </div>
      <div className="account-row">
        <span className="label">Branch:</span>
        <span>{account.branch}</span>
      </div>
      <div className="account-row">
        <span className="label">Balance:</span>
        <span>₹{account.balance}</span>
      </div>
      <div className="account-actions">
        <button onClick={() => onDeposit(account)}>Deposit</button>
        <button onClick={() => onWithdraw(account)} className="secondary">
          Withdraw
        </button>
      </div>
      <div className="account-actions">
        <button onClick={() => onEdit(account)}>Edit</button>
        <button onClick={() => onDelete(account)} className="danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AccountCard;

