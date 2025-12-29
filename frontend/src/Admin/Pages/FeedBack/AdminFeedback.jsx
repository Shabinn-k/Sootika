import { useEffect, useState } from "react";
import { api } from "../../../api/Axios";
import Layout from "../../Components/Layout";
import "./AdminFeedback.css";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================
     FETCH FEEDBACKS
  ===================== */
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get("/feedbacks");
        setFeedbacks(res.data);
      } catch (error) {
        console.error("Failed to fetch feedbacks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  /* =====================
     APPROVE FEEDBACK
  ===================== */
  const approve = async (id) => {
    try {
      await api.patch(`/feedbacks/${id}`, { feed: "approved" });

      setFeedbacks((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, feed: "approved" } : item
        )
      );
    } catch (error) {
      console.error("Approve failed", error);
    }
  };

  /* =====================
     DELETE FEEDBACK
  ===================== */
  const deleteFeed = async (id) => {
    const sure = window.confirm("Are you sure you want to delete this feedback?");
    if (!sure) return;

    try {
      await api.delete(`/feedbacks/${id}`);
      setFeedbacks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Layout>
      <div className="admin-feed-pg">
        <h2>User Feedbacks</h2>

        {loading ? (
          <p>Loading feedbacks...</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedbacks given</p>
        ) : (
          <table className="feed-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Feedback</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.review}</td>
                  <td>{item.rating} ★</td>
                  <td>
                    <button
                      className="ys-btn"
                      onClick={() => approve(item.id)}
                      disabled={item.feed === "approved"}
                    >
                      {item.feed === "approved" ? "Approved" : "Approve"}
                    </button>

                    <button
                      className="dlt-btn"
                      onClick={() => deleteFeed(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default AdminFeedback;
