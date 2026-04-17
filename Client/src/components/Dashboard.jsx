import React, { useState } from "react";
import "../styles/DashboardSty.css";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect } from "react";

const Dashboard = () => {
  // const incomeExpenseData = [
  //   { name: "Jan", income: 0, expense: 0 },
  //   { name: "Feb", income: 0, expense: 0 },
  //   { name: "Mar", income: 0, expense: 0 },
  //   { name: "Apr", income: 0, expense: 0 },
  // ];

  // const categoryData = [
  //   { name: "Food", value: 10 },
  //   { name: "Travel", value: 100 },
  //   { name: "Shopping", value: 0 },
  // ];

  const [activBtn, setActiveBtn] = useState("monthly");
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
  });
  const [model, setModel] = useState(false);
  const [incomeExpenseData, setIncomeExpenseData] = useState([
    {
      name: "",
      income: 0,
      expense: 0,
    },
  ]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthlyIncome, serMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [savingsRate, setSavingRate] = useState(0);
  const [categoryData, setCategoryData] = useState([
    {
      name: "",
      value: 0,
    },
  ]);
  const [record, setRecord] = useState([]);

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#2ECC71",
    "#E74C3C",
    "#34495E",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tracker/balance`,
        { withCredentials: true },
      );
      setTotalBalance(response.data.balance);
      console.log(totalBalance);
    } catch (error) {
      console.log(error);
    }
  };

  const monInc = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tracker/moninc`,
        { withCredentials: true },
      );

      serMonthlyIncome(response.data.monthIncome);
    } catch (err) {
      console.log(err.response);
    }
  };

  const monExp = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tracker/monexp`,
        { withCredentials: true },
      );

      setMonthlyExpenses(response.data.monthExp);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tracker/tracker`,
        {
          name: form.title,
          amount: form.amount,
          role: form.type,
          category: form.category,
        },
        { withCredentials: true },
      );
      console.log(response);
      fetchData();
      monInc();
      monExp();
      trasaction();
    } catch (error) {
      console.log(error.response);
    }
  };

  const trasaction = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tracker/category`,
        { withCredentials: true },
      );

      setRecord(response.data.record);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
    monInc();
    monExp();
    trasaction();
  }, []);

  return (
    <>
      {model && (
        <div className="modals">
          <div className="modal-content">
            <h3>Add Transaction</h3>

            <form>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                onChange={handleChange}
              />

              <select name="type" onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <select name="category" onChange={handleChange}>
                <option value="">select</option>
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Rent">Rent</option>
                <option value="EMI">EMI</option>
                <option value="Loan">Loan</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Others">Others</option>
              </select>

              <div className="">
                <button type="submit" onClick={handleSubmit}>
                  Add
                </button>
                <button type="button" onClick={() => setModel(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="dashboard">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="welcome-text">Welcome back</p>

        {/* Top Cards */}
        <div className="card-container">
          <div className="card">
            <h4>Total Balance</h4>
            <p className="amount">$ {totalBalance}</p>
          </div>

          <div className="card">
            <h4>Monthly Income</h4>
            <p className="amount">$ {monthlyIncome}</p>
          </div>

          <div className="card">
            <h4>Monthly Expenses</h4>
            <p className="amount">$ {monthlyExpenses}</p>
          </div>

          <div className="card">
            <h4>Savings Rate</h4>
            <p className="amount">
              {((totalBalance / monthlyIncome) * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Main Section */}
        <div className="main-section">
          {/* Left */}
          <div className="financial-overview">
            <div className="overview-header">
              <h3>Financial Overview</h3>
              <button className="add-btn" onClick={() => setModel(true)}>
                + Add Transaction
              </button>
            </div>

            <div className="overview-box">
              <h2>Finance Dashboard</h2>
              <p>Track your income and expenses</p>
            </div>

            {/* Bottom small cards */}
          </div>

          {/* Right */}
          <div className="right-section">
            <div className="recent-transactions">
              <h3>Recent Transactions</h3>
              <div className="empty-box">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amouth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record &&
                        record.map((rec, index) => {
                          return (
                            <tr key={index}>
                              <td
                                className={
                                  rec.role == "income" ? "income" : "expense"
                                }
                              >
                                {rec.category}
                              </td>
                              <td
                                className={
                                  rec.role == "income" ? "income" : "expense"
                                }
                              >
                                {rec.date.split("T")[0]}
                              </td>
                              <td
                                className={
                                  rec.role == "income" ? "income" : "expense"
                                }
                              >
                                ₹{rec.amount}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
