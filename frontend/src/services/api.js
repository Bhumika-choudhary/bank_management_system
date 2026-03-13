import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAccounts = () => api.get("/accounts");

export const createAccount = (data) => api.post("/accounts", data);

export const updateAccount = (id, data) => api.put(`/accounts/${id}`, data);

export const deleteAccount = (id) => api.delete(`/accounts/${id}`);

export const depositMoney = (id, amount) =>
  api.put(`/accounts/deposit/${id}?amount=${amount}`);

export const withdrawMoney = (id, amount) =>
  api.put(`/accounts/withdraw/${id}?amount=${amount}`);

export default api;

