// src/pages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Analytics() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Mock Performance Statistics Metrics Data (Student View)
  const performanceData = {
    quizzesTaken: 24,
    averageScore: 78,
    studyHours: 14.5,
    accuracyRate: 82
  };

  const subjectStrengths = [
    { name: "Programming & Syntax", rate: 90, color: "var(--violet)", status: "Excellent" },
    { name: "Database Design & SQL", rate: 70, color: "var(--sunset-orange)", status: "Proficient" },
    { name: "Discrete Mathematics", rate: 55, color: "var(--gold)", status: "Needs Review" },
    { name: "Cybersecurity Basics", rate: 85, color: "var(--mint)", status: "Excellent" }
  ];

  const recentQuizHistory = [
    { id: 1, title: "Data Structures Mastery", score: "12/15", percentage: 80, date: "14 Sept 2026", result: "Pass" },
    { id: 2, title: "SQL Joins & Indexing", score: "8/10", percentage: 80, date: "11 Sept 2026", result: "Pass" },
    { id: 3, title: "Network Layer Routing", score: "5/10", percentage: 50, date: "07 Sept 2026", result: "Fail" }
  ];

  // Mock Aggregate Stats (Lecturer View)
  const classPerformanceData = {
    activeModules: 2,
    totalStudents: 148,
    quizzesPublished: 14,
    classAverage: 68
  };

  const moduleAverages = [
    { name: "Data Structures & Algorithms (CS201)", rate: 72, color: "var(--violet)", status: "Above Average" },
    { name: "Database Design & SQL (DB302)", rate: 64, color: "var(--sunset-orange)", status: "Average" }
  ];

  const recentStudentSubmissions = [
    { id: 1, student: "S. Khumalo", score: "14/15", date: "21 Sept 2026", result: "Pass" },
    { id: 2, student: "N. Mandela", score: "6/10", date: "20 Sept 2026", result: "Pass" },
    { id: 3, student: "A. Ndlovu", score: "4/10", date: "19 Sept 2026", result: "Fail" }
  ];

  
  // DYNAMIC CONDITIONAL LECTURER LAYOUT INTERFACE SPLIT
 
  if (user?.role === "lecturer") {
    return (
      <div className="dashboard-container">
        {/* Lecturer Sidebar Frame */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '35px' }}>
            <img src="/src/assets/logo.png" alt="Smart Quiz Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px', color: 'var(--gold, #d4a017)' }}>SMART QUIZ</h2>
          </div>

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
            <li className="active" onClick={() => navigate("/analytics")}>📊 Class Analytics</li>
            <li onClick={() => navigate("/quiz-banks")}>📚 Quiz Banks</li>
            <li onClick={() => navigate("/profile")}>👤 Profile</li>
            <li onClick={handleLogout} className="logout-item">🚪 Logout</li>
          </ul>
        </aside>

        {/* Lecturer Core Main Content Area */}
        <main className="dashboard-main-content">
          <header className="dashboard-top-bar">
            <h1>Class Analytics</h1>
            <p className="date-indicator">Aggregate metric overview of your assigned classes and active cohorts</p>
          </header>

          <section className="metrics-card-grid">
            <div className="metric-card">
              <h2>{classPerformanceData.activeModules}</h2>
              <p>Active Modules</p>
              <div className="card-accent-bar" style={{ background: "var(--burgundy)" }}></div>
            </div>
            <div className="metric-card">
              <h2>{classPerformanceData.totalStudents}</h2>
              <p>Enrolled Students</p>
              <div className="card-accent-bar" style={{ background: "var(--violet)" }}></div>
            </div>
            <div className="metric-card">
              <h2>{classPerformanceData.quizzesPublished}</h2>
              <p>Quizzes Published</p>
              <div className="card-accent-bar" style={{ background: "var(--sunset-orange)" }}></div>
            </div>
            <div className="metric-card">
              <h2>{classPerformanceData.classAverage}%</h2>
              <p>Class Average Score</p>
              <div className="card-accent-bar" style={{ background: "var(--mint)" }}></div>
            </div>
          </section>

          <div className="dashboard-content-split">
            {/* Module Proficiency Grid */}
            <section className="performance-analytics-section" style={{ flex: 1.3 }}>
              <h2>Module Averages</h2>
              <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>Visual comparison of cross-module group performance records</p>
              <div className="skills-analytics-wrapper">
                {moduleAverages.map((module, idx) => (
                  <div key={idx} className="analytics-skill-item">
                    <div className="skill-meta">
                      <span className="skill-title-text">{module.name}</span>
                      <span className="skill-status-tag" style={{ color: module.color }}>{module.status} ({module.rate}%)</span>
                    </div>
                    <div className="analytics-progress-wrapper">
                      <div className="analytics-progress-fill" style={{ width: `${module.rate}%`, backgroundColor: module.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Submission Logs List Container */}
            <section className="quiz-recommendation-section" style={{ flex: 1 }}>
              <h2>Recent Student Activity</h2>
              <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>Live stream ledger log of incoming test finishes</p>
              <div className="analytics-log-list">
                {recentStudentSubmissions.map((log) => (
                  <div key={log.id} className="log-row-item">
                    <div className="log-item-details">
                      <h4>{log.student}</h4>
                      <span>Completed: {log.date}</span>
                    </div>
                    <div className="log-item-score-block">
                      <span className="score-fraction">{log.score}</span>
                      <span className={`status-badge-indicator ${log.result.toLowerCase()}`}>{log.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }


 
  // DYNAMIC CONDITIONAL STUDENT LAYOUT VIEW (DEFAULT FALLBACK)
  
  return (
    <div className="dashboard-container">
      {/* Student Sidebar Frame */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '35px' }}>
          <img src="/src/assets/logo.png" alt="Smart Quiz Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px', color: 'var(--gold, #d4a017)' }}>SMART QUIZ</h2>
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
          <li className="active" onClick={() => navigate("/analytics")}>📊 Analytics</li>
          <li onClick={() => navigate("/history")}>📚 History</li>
          <li onClick={() => navigate("/profile")}>👤 Profile</li>
          <li onClick={handleLogout} className="logout-item">🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Student Performance Analytics Hub */}
      <main className="dashboard-main-content">
        <header className="dashboard-top-bar">
          <h1>Performance Analytics</h1>
          <p className="date-indicator">Detailed breakdown of your learning journey insights</p>
        </header>

        {/* Top-Level Numerical Statistics Grid Rows */}
        <section className="metrics-card-grid">
          <div className="metric-card">
            <h2>{performanceData.quizzesTaken}</h2>
            <p>Quizzes Completed</p>
            <div className="card-accent-bar" style={{ background: "var(--burgundy)" }}></div>
          </div>
          <div className="metric-card">
            <h2>{performanceData.averageScore}%</h2>
            <p>Average Score</p>
            <div className="card-accent-bar" style={{ background: "var(--violet)" }}></div>
          </div>
          <div className="metric-card">
            <h2>{performanceData.studyHours}h</h2>
            <p>Time Spent Studying</p>
            <div className="card-accent-bar" style={{ background: "var(--sunset-orange)" }}></div>
          </div>
          <div className="metric-card">
            <h2>{performanceData.accuracyRate}%</h2>
            <p>Overall Accuracy</p>
            <div className="card-accent-bar" style={{ background: "var(--mint)" }}></div>
          </div>
        </section>

        {/* Content Layout Sections Split Grid */}
        <div className="dashboard-content-split">
          
          {/* Detailed Skill Breakdown Progress Bars */}
          <section className="performance-analytics-section" style={{ flex: 1.3 }}>
            <h2>Subject Proficiency</h2>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>Visual tracking metrics across core registered topics</p>
            <div className="skills-analytics-wrapper">
              {subjectStrengths.map((subject, idx) => (
                <div key={idx} className="analytics-skill-item">
                  <div className="skill-meta">
                    <span className="skill-title-text">{subject.name}</span>
                    <span className="skill-status-tag" style={{ color: subject.color }}>{subject.status} ({subject.rate}%)</span>
                  </div>
                  <div className="analytics-progress-wrapper">
                    <div className="analytics-progress-fill" style={{ width: `${subject.rate}%`, backgroundColor: subject.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Snapshot Table Log of Recent Performances */}
          <section className="quiz-recommendation-section" style={{ flex: 1 }}>
            <h2>Recent Attempts</h2>
            <p style={{ color: "#6b7280", fontSize: "13px", marginBottom: "20px" }}>Log overview of latest active quiz iterations</p>
            <div className="analytics-log-list">
              {recentQuizHistory.map((log) => (
                <div key={log.id} className="log-row-item">
                  <div className="log-item-details">
                    <h4>{log.title}</h4>
                    <span>{log.date}</span>
                  </div>
                  <div className="log-item-score-block">
                    <span className="score-fraction">{log.score}</span>
                    <span className={`status-badge-indicator ${log.result.toLowerCase()}`}>{log.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Analytics;

