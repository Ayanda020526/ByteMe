// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Shared Form Fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  //Lecturer fields
   const [staffId, setStaffId] = useState("");

   const [studentsViewed, setStudentsViewed] = useState(148); 

  // Student-Specific Fields
  const [studentNumber, setStudentNumber] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");


  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setUsername(savedUser.username || "");
      setEmail(savedUser.email || "");
      setStudentNumber(savedUser.studentNumber || "");
      setYearOfStudy(savedUser.yearOfStudy || "");
      setStaffId(savedUser.staffId || "LCT-NOT-SET");
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { 
      ...user, 
      username, 
      email, 
      staffId,
      // Only keep student data if the user is actually a student
      studentNumber: user?.role === "student" ? studentNumber : "", 
      yearOfStudy: user?.role === "student" ? yearOfStudy : "" 
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile metrics updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // =========================================================================
  // 👨‍🏫 VIEW A: LECTURER PROFILE INTERFACE
  // =========================================================================
  if (user?.role === "lecturer") {
    return (
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand"><h2>SMART QUIZ</h2></div>
          <div className="user-profile-summary">
            <span className="user-avatar">👨‍🏫</span>
            <div className="user-info">
              <p className="username">{username}</p>
              <p className="user-role">LECTURER</p>
            </div>
          </div>
          <ul className="sidebar-menu">
            <li onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
            <li onClick={() => navigate("/quiz")}>📝 Generate Quiz</li>
            <li onClick={() => navigate("/analytics")}>📊 Class Analytics</li>
           <li onClick={() => navigate("/quiz-banks")}>📚 Quiz Banks</li>
            <li className="active" onClick={()=> navigate("/profile")}>👤 Profile</li>
            <li onClick={handleLogout} className="logout-item">🚪 Logout</li>
          </ul>
        </aside>

        <main className="dashboard-main-content">
          <header className="dashboard-top-bar">
            <h1>Lecturer Profile Settings</h1>
            <p className="date-indicator">Manage your faculty administrative credentials</p>
          </header>

          <section className="profile-workspace-layout" style={{ maxWidth: '600px', margin: '30px 0' }}>
            <div className="quiz-question-container" style={{ background: '#ffffff', padding: '40px' }}>
              
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--burgundy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white' }}>
                  {username ? username.charAt(0).toUpperCase() : "L"}
                </div>
                <div>
                  <h2 style={{ color: 'var(--burgundy)', fontSize: '1.4rem' }}>{username}</h2>
                  <span className="profile-role-badge">Faculty Member</span>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div className="form-group-block" style={{ marginBottom: '20px' }}>
                  <label>Lecturer Name</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!isEditing} className="profile-input-field" required />
                </div>
                <div className="form-group-block" style={{ marginBottom: '25px' }}>
                  <label>Faculty Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} className="profile-input-field" required />
                </div>
                    
                      <div className="form-group-block" style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', fontSize: '14px', color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                        Lecturer Staff ID
                        </label>
                        <input 
                          type="text" 
                         value={staffId} 
                         onChange={(e) => setStaffId(e.target.value)}
                         disabled={!isEditing} 
                          className="profile-input-field" 
                          required 
                          />
                         </div>

                          {/* Platform Analytics Feature: Number of Students Viewed (Read-Only) */}
                          <div className="form-group-block" style={{ marginBottom: '25px', background: '#fafafa', padding: '15px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                           <label style={{ fontWeight: '700', fontSize: '13px', color: 'var(--violet)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Platform Analytics
                            </label>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                           <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>Number of Students Viewed:</span>
                            <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--burgundy)' }}>{studentsViewed} Students</span>
                          </div>
                        </div>

                <div className="profile-action-controls">
                  {!isEditing ? (
                    <button type="button" className="dashboard-primary-btn" onClick={() => setIsEditing(true)}>⚙️ Modify Details</button>
                  ) : (
                    <>
                      <button type="submit" className="primary-gold-btn" style={{ width: 'auto', padding: '12px 25px' }}>Save Changes</button>
                      <button type="button" className="quiz-nav-btn secondary-btn" onClick={() => { setIsEditing(false); setUsername(user.username); setEmail(user.email); }}>Cancel</button>
                    </>
                  )}
                </div>
              </form>
            
          </section>
        </main>
      </div>
    );
  }

  // =========================================================================
  // 👋 VIEW B: DEFAULT STUDENT PROFILE INTERFACE
  // =========================================================================
  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand"><h2>SMART QUIZ</h2></div>
        <div className="user-profile-summary">
          <span className="user-avatar">👋</span>
          <div className="user-info">
            <p className="username">{username}</p>
            <p className="user-role">STUDENT</p>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
          <li onClick={() => navigate("/quiz")}>📝 Quizzes</li>
          <li onClick={() => navigate("/analytics")}>📊 Analytics</li>
          <li onClick={() => navigate("/history")}>📚 History</li>
          <li className="active">👤 Profile</li>
          <li onClick={handleLogout} className="logout-item">🚪 Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main-content">
        <header className="dashboard-top-bar">
          <h1>Student Profile</h1>
          <p className="date-indicator">Manage your learning identity credentials</p>
        </header>

        <section className="profile-workspace-layout" style={{ maxWidth: '600px', margin: '30px 0' }}>
          <div className="quiz-question-container" style={{ background: '#ffffff', padding: '40px' }}>
            
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white' }}>
                {username ? username.charAt(0).toUpperCase() : "S"}
              </div>
              <div>
                <h2 style={{ color: 'var(--burgundy)', fontSize: '1.4rem' }}>{username}</h2>
                <span className="profile-role-badge" style={{ color: 'var(--violet)', background: 'rgba(139, 92, 246, 0.1)' }}>Student</span>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="form-group-block" style={{ marginBottom: '20px' }}>
                <label>Student Name</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!isEditing} className="profile-input-field" required />
              </div>
              <div className="form-group-block" style={{ marginBottom: '20px' }}>
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} className="profile-input-field" required />
              </div>
              <div className="form-group-block" style={{ marginBottom: '20px' }}>
                <label>Student Number</label>
                <input type="text" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} disabled={!isEditing} className="profile-input-field" />
              </div>
              <div className="form-group-block" style={{ marginBottom: '25px' }}>
                <label>Current Year of Study</label>
                <input type="text" value={yearOfStudy} onChange={(e) => setYearOfStudy(e.target.value)} disabled={!isEditing} className="profile-input-field" />
              </div>

              <div className="profile-action-controls">
                {!isEditing ? (
                  <button type="button" className="dashboard-primary-btn" onClick={() => setIsEditing(true)}>⚙️ Modify Details</button>
                ) : (
                  <>
                    <button type="submit" className="primary-gold-btn" style={{ width: 'auto', padding: '12px 25px' }}>Save Changes</button>
                    <button type="button" className="quiz-nav-btn secondary-btn" onClick={() => { setIsEditing(false); setUsername(user.username); setEmail(user.email); setStudentNumber(user.studentNumber); setYearOfStudy(user.yearOfStudy); }}>Cancel</button>
                  </>
                )}
              </div>
            </form>
          
        </section>
      </main>
    </div>
  );
}

export default Profile;

