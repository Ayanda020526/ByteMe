// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [staffId, setStaffId] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");


  const handleRegister = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username,
      email,
      role,
      password,
      staffId: role === "lecturer" ? staffId : "",
      studentNumber: role === "student" ? studentNumber :"",
      yearOfStudy: role === "student" ? yearOfStudy : ""
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="left-panel">
        <h1>SMART QUIZ</h1>
        <h2>Join the Smart Learning Revolution</h2>

        <ul className="features">
          <li>Adaptive Learning</li>
          <li>AI Quiz Generator</li>
          <li>Performance Analytics</li>
        </ul>
      </div>

      <div className="right-panel">
        <div className="register-card">
          <h2>Create Account</h2>

          {/* 📝 COHESIVE REGISTRATION FORM WORKSPACE - Replace your form inside Register.jsx with this: */}
<form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
  
  <input 
    type="text" 
    placeholder="Full Name & Surname" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} 
    className="profile-input-field" 
    required 
  />

  <input 
    type="email" 
    placeholder="Email Address" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    className="profile-input-field" 
    required 
  />

  {/* ================= ROLE SELECTOR CONTAINER SETUPS ================= */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
    <label style={{ fontWeight: '600', fontSize: '14px', color: '#4b5563' }}>Select System Access Role</label>
    <div style={{ display: 'flex', gap: '20px' }}>
      
      {/* Student Check Option */}
      <label style={{ 
        flex: 1, 
        padding: '12px', 
        border: role === 'student' ? '2px solid var(--violet, #8B5CF6)' : '1px solid #e5e7eb', 
        borderRadius: '10px', 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        background: role === 'student' ? 'rgba(139, 92, 246, 0.04)' : '#fff'
      }}>
        <input 
          type="radio" 
          name="userRole" 
          value="student" 
          checked={role === 'student'} 
          onChange={(e) => setRole(e.target.value)} 
        />
        <span> Student</span>
      </label>

      {/* Lecturer Check Option */}
      <label style={{ 
        flex: 1, 
        padding: '12px', 
        border: role === 'lecturer' ? '2px solid var(--burgundy, #4a1c1c)' : '1px solid #e5e7eb', 
        borderRadius: '10px', 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        background: role === 'lecturer' ? 'rgba(74, 28, 28, 0.04)' : '#fff'
      }}>
        <input 
          type="radio" 
          name="userRole" 
          value="lecturer" 
          checked={role === 'lecturer'} 
          onChange={(e) => setRole(e.target.value)} 
        />
        <span> Lecturer</span>
      </label>
    </div>
  </div>

  {/* ================= DYNAMIC FIELD INJECTION SWITCHES ================= */}
  
  {/* VIEW A: Render fields ONLY if user clicks Student role */}
  {role === "student" && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeIn 0.2s ease' }}>
      <input 
        type="text" 
        placeholder="Student Registration Number (e.g. 22408912)" 
        value={studentNumber} 
        onChange={(e) => setStudentNumber(e.target.value)} 
        className="profile-input-field" 
        required // Enforced ONLY when student is active
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '4px' }}>
        <label style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280' }}>Current Year of Study</label>
        <select 
          value={yearOfStudy} 
          onChange={(e) => setYearOfStudy(e.target.value)} 
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #e5e7eb', background: '#fff' }}
          required
        >
          <option value="">-- Choose Year --</option>
          <option value="1st Year">1st Year (Freshman)</option>
          <option value="2nd Year">2nd Year (Intermediate)</option>
          <option value="3rd Year">3rd Year (Finalist)</option>
          <option value="Postgraduate">Honours / Postgraduate</option>
        </select>
      </div>
    </div>
  )}

  {/* VIEW B: Render fields ONLY if user clicks Lecturer role */}
  {role === "lecturer" && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeIn 0.2s ease' }}>
      <input 
        type="text" 
        placeholder="Lecturer Staff Identification ID (e.g. LCT99824)" 
        value={staffId} 
        onChange={(e) => setStaffId(e.target.value)} 
        className="profile-input-field" 
        required // Enforced ONLY when lecturer is active
      />
    </div>
  )}

  {/* =================================================================== */}

  <input 
    type="password" 
    placeholder="Create System Password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    className="profile-input-field" 
    required 
  />
  <input 
    type="password" 
    placeholder="Confirm System Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)} 
    className="profile-input-field" 
    required 
  />


  <button type="submit" className="primary-gold-btn" style={{ padding: '14px', marginTop: '10px' }}>
    Register Account
  </button>
</form>


          <p>
            Already have an account? <a href="/login" className="login-link">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
