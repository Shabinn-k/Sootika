import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { api } from "../../../api/Axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const productRes = await api.get("/products");
      const userRes = await api.get("/users");
      const feedbackRes = await api.get("/feedbacks");

      setProducts(productRes.data || []);
      setUsers(userRes.data || []);
      setFeedbacks(feedbackRes.data || []);

      // Collect all orders from users safely
      const allOrders = (userRes.data || []).flatMap(
        (user) => user.orders || []
      );

      setOrders(allOrders);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* =====================
     CALCULATIONS
  ===================== */
  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.track === "Pending"
  ).length;

  const pendingFeedback = feedbacks.filter(
    (f) => f.feed === "pending"
  ).length;

  /* =====================
     NAVIGATION
  ===================== */
  const goTo = (path) => navigate(path);

  return (
    <Layout>
      <div className="dashboard-container">

        <h1 className="dash-title">Dashboard Overview</h1>

        <div className="dash-cards">

          <div className="dash-card" onClick={() => goTo("/admin/products")}>
            <h2>{totalProducts}</h2>
            <p>Total Products</p>
          </div>

          <div className="dash-card" onClick={() => goTo("/admin/users")}>
            <h2>{totalUsers}</h2>
            <p>Total Users</p>
          </div>

          <div className="dash-card" onClick={() => goTo("/admin/orders")}>
            <h2>{totalOrders}</h2>
            <p>Total Orders</p>
          </div>

          <div className="dash-card">
            <h2>₹ {totalRevenue.toLocaleString()}</h2>
            <p>Total Revenue</p>
          </div>

          <div
            className="dash-card warning"
            onClick={() => goTo("/admin/orders")}
          >
            <h2>{pendingOrders}</h2>
            <p>Pending Orders</p>
          </div>

          <div
            className="dash-card warning"
            onClick={() => goTo("/admin/feedback")}
          >
            <h2>{pendingFeedback}</h2>
            <p>Pending Feedback</p>
          </div>

        </div>

        {/* RECENT ORDERS */}
        <h2 className="recent-title">Recent Orders</h2>

        <div
          className="recent-orders"
          onClick={() => goTo("/admin/orders")}
        >
          {[...orders]
            .reverse()
            .slice(0, 5)
            .map((order, index) => (
              <div className="recent-item" key={index}>
                <p><b>Order ID:</b> #{order.orderId}</p>
                <p><b>Status:</b> {order.track}</p>
              </div>
            ))}
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
