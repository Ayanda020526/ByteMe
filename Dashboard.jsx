// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { LuActivity } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [showRoster, setShowRoster] = useState(false);
  const studentRoster = [
  { id: 1, name: "Liyema Damoyi", studentNum: "22408912", email: "liyema@wsu.ac.za", year: "3rd Year", performance: "Excellent" },
  { id: 2, name: "Sipho Khumalo", studentNum: "22501294", email: "sipho@wsu.ac.za", year: "2nd Year", performance: "Pass" }
  ];
  <div className="metric-card progress-card" onClick={() => setShowRoster(!showRoster)} style={{ cursor: 'pointer' }}>
   <h2>148</h2>
   <p>Total Students Enrolled 👁️</p>
   <div className="card-accent-bar progress-bar-accent"></div>
  </div>
  {showRoster && (
   <section className="history-table-container" style={{ marginTop: '20px', background: '#fff', borderRadius: '12px', padding: '20px' }}>
     <h3>📋 Enrolled Student Class Roster</h3>
     <table className="history-data-table" style={{ width: '100%', marginTop: '15px' }}>
       <thead>
         <tr><th>Name</th><th>Student Number</th><th>Academic Standing</th></tr>
       </thead>
       <tbody>
         {studentRoster.map(s => (
          <tr key={s.id}><td>{s.name}</td><td>{s.studentNum}</td><td>{s.performance}</td></tr>
         ))}
       </tbody>
      </table>
   </section>
 )}

  // Metrics Linked State
  const [metrics, setMetrics] = useState({
    quizzesTaken: 0,
    averageScore: 0,
    badgesEarned: 0
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);

    // Read the shared history array populated by the Quiz component
    const localHistory = JSON.parse(localStorage.getItem("quiz_history")) || [];
    
    if (localHistory.length > 0) {
      const totalQuizzes = localHistory.length;
      const sumPercentage = localHistory.reduce((acc, curr) => acc + curr.percentage, 0);
      const avgPercentage = Math.round(sumPercentage / totalQuizzes);
      
      // Award 1 badge for every passed quiz automatically
      const passedCount = localHistory.filter(item => item.result === "Pass").length;

      setMetrics({
        quizzesTaken: totalQuizzes,
        averageScore: avgPercentage,
        badgesEarned: passedCount * 2 // 2 badges per passed quiz module
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation - Full Routing Links Active */}
      <aside className="dashboard-sidebar">
        {/* Replace the static .sidebar-brand block with this responsive video tag container: */}
       <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '35px' }}>
  <img 
    src="/src/assets/logo.png" 
    alt="Smart Quiz Logo" 
    style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
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
          <li className="active" onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
          <li onClick={() => navigate("/quiz")}>📝 Quizzes</li>
          <li onClick={() => navigate("/analytics")}>📊 Analytics</li>
          <li onClick={() => navigate("/history")}>📚 History</li>     {/* <-- Link to History */}
          <li onClick={()=> navigate("/profile")}>👤 Profile</li>
         <li onClick={() => { localStorage.removeItem("user"); navigate("/login"); }} className="logout-item">🚪 Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main-content">
        <header className="dashboard-top-bar">
          <h1>Welcome Back, {user?.username || "Learner"}!</h1>
          <p className="date-indicator">System Overview Dashboard</p>
        </header>

        {/* Dynamic Metric Cards wired into the shared state stream */}
        <section className="metrics-card-grid">
          <div className="metric-card progress-card" onClick={() => navigate("/analytics")} style={{ cursor: 'pointer' }}>
            <h2>{metrics.averageScore}%</h2>
            <p>Learning Progress</p>
            <div className="card-accent-bar progress-bar-accent"></div>
          </div>

          <div className="metric-card generator-card" onClick={() => navigate("/quiz")} style={{ cursor: 'pointer' }}>
            <h2>{metrics.quizzesTaken}</h2>
            <p>Quizzes Completed</p>
            <div className="card-accent-bar generator-bar-accent"></div>
          </div>

          <div className="metric-card badges-card" onClick={() => navigate("/analytics")} style={{ cursor: 'pointer' }}>
            <h2>{metrics.badgesEarned}</h2>
            <p>Badges Earned</p>
            <div className="card-accent-bar badges-bar-accent"></div>
          </div>
        </section>

        <div className="dashboard-content-split">
          {/* Action Link for Recommended Card */}
          <section className="quiz-recommendation-section">
            <h2>Recommended Quiz</h2>
            <div className="recommended-quiz-card">
              <h3>Data Structures Quiz</h3>
              <div className="quiz-meta-tags">
                <span className="tag level-medium">Difficulty: Medium</span>
                <span className="tag questions-count">3 Questions</span>
              </div>

              {/* 📂 LECTURED NOTES ACCESS LINK - Add this inside the recommended quiz card layout */}
              <div className="attached-notes-container" style={{ 
                 margin: '15px 0 20px 0', 
                 padding: '12px 16px', 
                  background: 'rgba(139, 92, 246, 0.05)', 
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  borderRadius: '8px',
                  display: 'flex',
                   alignItems: 'center',
                  justifyContent: 'space-between',
                 gap: '10px'
                 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent: 'center'}}>
                      <LuActivity
                        className="ai-pulse-glow"
                        style={{ color: 'var(--sunset-orange, #F97316)', fontSize: '18px' }}
                      />
                   </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <p style={{ margin:0, fontSize: '11px',color:'#6b7280', fontWeight: '500' }}>AI Seeded Study Guide</p>
                       <span style={{ fontSize: '10px', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--sunset-orange)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>LIVE LIVE AI</span>
                      </div>
                       <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--burgundy, #4a1c1c)', fontWeight: '600' }}>
                          Recursion_Lecture_Notes.pdf 
                       </p>
                    </div>
                 </div>
                   <a 
                     href="/uploads/Recursion_Lecture_Notes.pdf" // Points directly to the public assets upload folder
                     download
                     className="download-notes-btn"
                     style={{
                     padding: '6px 12px',
                     background: 'var(--violet, #8B5CF6)',
                     color: '#ffffff',
                     fontSize: '12px',
                     fontWeight: '600',
                     borderRadius: '6px',
                     textDecoration: 'none',
                     transition: 'all 0.2s ease',
                     cursor: 'pointer'
                     }}
                     onClick={(e) => {
                      // Temporary mockup notice for your demo showcase tracking
                     alert("📥 Downloading lecture study notes archive material...");
                     }}
                      >
                     📥 Download
                    </a>
                 </div>


              <button className="dashboard-primary-btn" onClick={() => navigate("/quiz")}>
                Start Quiz
              </button>
            </div>
          </section>

          {/* Quick Analytics Redirection Panel */}
          <section className="performance-analytics-section" onClick={() => navigate("/analytics")} style={{ cursor: 'pointer' }}>
            <h2>Performance Analytics Overview</h2>
            <div className="analytics-skill-item">
              <div className="skill-meta">
                <span>Core Track Mastery</span>
                <span className="skill-percentage">{metrics.averageScore || 0}%</span>
              </div>
              <div className="analytics-progress-wrapper">
                <div className="analytics-progress-fill programming-fill" style={{ width: `${metrics.averageScore || 0}%` }}></div>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '15px' }}>Click panel to open comprehensive report details →</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

