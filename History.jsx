// src/pages/History.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function History() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("All");

  useEffect(() => {
    // 1. Fetch user data profile context
    setUser(JSON.parse(localStorage.getItem("user")));

    // 2. Fetch the shared quiz history records from local storage cache
    const storedHistory = JSON.parse(localStorage.getItem("quiz_history")) || [];
    setQuizHistory(storedHistory);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to delete all quiz history logs? This cannot be undone.")) {
      localStorage.removeItem("quiz_history");
      setQuizHistory([]);
    }
  };

  // 3. Filter history logs based on search terms and Pass/Fail tags
  const filteredHistory = quizHistory.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.date.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterResult === "All" || item.result === filterResult;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation - Synchronized Shell */}
      <aside className="dashboard-sidebar">
       
        <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '35px' }}>
  <img 
    src="/src/assets/logo.png" 
    alt="Smart Quiz Logo" 
    style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
  />
  <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px', color: 'var(--gold, #d4a017)' }}>
    SMART QUIZ
  </h2>
</div>
        <div className="user-profile-summary">
          <span className="user-avatar">👋</span>
          <div className="user-info">
            <p className="username">{user?.username || "Learner"}</p>
            <p className="user-role">{user?.role ? user.role.toUpperCase() : "STUDENT"}</p>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
          <li onClick={() => navigate("/quiz")}>📝 Quizzes</li>
          <li onClick={() => navigate("/analytics")}>📊 Analytics</li>
          <li className="active" onClick={() => navigate("/history")}>📚 History</li>
          <li onClick={() => navigate("/profile")}>👤 Profile</li>
          <li onClick={handleLogout} className="logout-item">🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Workspace Frame */}
      <main className="dashboard-main-content">
        <header className="history-header-bar">
          <div>
            <h1>Quiz History Logs</h1>
            <p className="date-indicator">Comprehensive ledger of all completed self-assessments</p>
          </div>
          {quizHistory.length > 0 && (
            <button className="clear-history-btn-action" onClick={handleClearHistory}>
              🗑️ Clear All Logs
            </button>
          )}
        </header>

        {/* Filter Controls Bar */}
        <section className="history-toolbar-card">
          <input 
            type="text" 
            placeholder="Search by quiz title or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="history-search-input"
          />
          <div className="history-filter-group">
            <label>Filter Status:</label>
            <select value={filterResult} onChange={(e) => setFilterResult(e.target.value)} className="history-filter-select">
              <option value="All">Show All</option>
              <option value="Pass">Passes Only</option>
              <option value="Fail">Fails Only</option>
            </select>
          </div>
        </section>

        {/* Dynamic Log Data Table Grid */}
        <section className="history-table-container">
          {filteredHistory.length === 0 ? (
            <div className="empty-history-state">
              <span>📋</span>
              <h3>No matching history records found</h3>
              <p>Complete quiz modules or adjust your active filtering terms to generate table log items.</p>
              {quizHistory.length === 0 && (
                <button className="dashboard-primary-btn" onClick={() => navigate("/quiz")} style={{ marginTop: '15px' }}>
                  Take Your First Quiz
                </button>
              )}
            </div>
          ) : (
            <table className="history-data-table">
              <thead>
                <tr>
                  <th>Quiz Topic / Source</th>
                  <th>Date Attempted</th>
                  <th>Raw Score</th>
                  <th>Performance Rate</th>
                  <th>Evaluation Outcome</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((log) => (
                  <tr key={log.id} className="history-table-row">
                    <td className="quiz-title-td">{log.title}</td>
                    <td>{log.date}</td>
                    <td className="score-td">{log.score}</td>
                    <td>
                      <div className="table-progress-flex">
                        <span className="pct-txt">{log.percentage}%</span>
                        <div className="table-mini-progress-bar">
                          <div 
                            className="table-progress-fill-indicator" 
                            style={{ 
                              width: `${log.percentage}%`,
                              backgroundColor: log.result === "Pass" ? "var(--mint, #4ade80)" : "#ef4444"
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge-indicator ${log.result.toLowerCase()}`}>
                        {log.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default History;
