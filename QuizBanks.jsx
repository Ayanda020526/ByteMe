// src/pages/QuizBanks.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QuizBanks() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Mock Question Repositories compiled by the lecturer
  const initialBanks = [
    { id: 1, module: "CS201", topic: "Data Structures", totalQuestions: 45, dateModified: "18 Sept 2026" },
    { id: 2, module: "DB302", topic: "Database Systems", totalQuestions: 32, dateModified: "12 Sept 2026" }
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Universal Shared Sidebar Frame */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand"><h2>SMART QUIZ</h2></div>
        <div className="user-profile-summary">
          <span className="user-avatar">👨‍🏫</span>
          <div className="user-info">
            <p className="username">{user?.username || "Lecturer"}</p>
            <p className="user-role">LECTURER</p>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
          <li onClick={() => navigate("/quiz")}>📝 Generate Quiz</li>
          <li onClick={() => navigate("/analytics")}>📊 Class Analytics</li>
          <li className="active" onClick={() => navigate("/quiz-banks")}>📚 Quiz Banks</li>
          <li onClick={() => navigate("/profile")}>👤 Profile</li>
          <li onClick={handleLogout} className="logout-item">🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Administrative Presentation Workspace */}
      <main className="dashboard-main-content">
        <header className="dashboard-top-bar">
          <h1>Module Quiz Banks</h1>
          <p className="date-indicator">Central library containing pre-compiled question banks and evaluation matrices</p>
        </header>

        <section className="history-table-container" style={{ marginTop: '30px' }}>
          <table className="history-data-table">
            <thead>
              <tr>
                <th>Module Code</th>
                <th>Subject Track Title</th>
                <th>Total Questions Stored</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialBanks.map((bank) => (
                <tr key={bank.id} className="history-table-row">
                  <td className="quiz-title-td">{bank.module}</td>
                  <td style={{ fontWeight: '600' }}>{bank.topic}</td>
                  <td className="score-td">{bank.totalQuestions} Questions</td>
                  <td>{bank.dateModified}</td>
                  <td>
                    <button 
                      className="dashboard-primary-btn" 
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => alert(`Opening ${bank.topic} question database pool...`)}
                    >
                      👁️ View Pool
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default QuizBanks;
