// src/pages/LecturerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LecturerDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showRoster, setShowRoster] = useState(false);
 const [selectedModuleFilter, setSelectedModuleFilter] = useState(null); // Tracks which module is clicked

  // Upgraded data array: Each student is now cleanly mapped to their specific module codes
  const studentRoster = [
    { id: 1, name: "Liyema Damoyi", studentNum: "22408912", email: "liyema@wsu.ac.za", year: "3rd Year", module: "CS201", performance: "Excellent" },
    { id: 2, name: "Sipho Khumalo", studentNum: "22501294", email: "sipho@wsu.ac.za", year: "2nd Year", module: "CS201", performance: "Pass" },
    { id: 3, name: "Ayanda Ndlovu", studentNum: "22307441", email: "ayanda@wsu.ac.za", year: "3rd Year", module: "DB302", performance: "Needs Review" },
    { id: 4, name: "Nthabiseng Mokoena", studentNum: "22411590", email: "nthabi@wsu.ac.za", year: "2nd Year", module: "DB302", performance: "Excellent" },
    { id: 5, name: "Thabo Molefe", studentNum: "22509144", email: "thabo@wsu.ac.za", year: "1st Year", module: "CS201", performance: "Needs Review" }
  ];
  const filteredStudents = selectedModuleFilter 
   ? comprehensiveRoster.filter(student => student.module === selectedModuleFilter)
    : [];

 // --- ADD THESE STATES AT THE TOP OF LECTURERDASHBOARD() ---
  const [assignedTasks, setAssignedTasks] = useState([
  { id: 1, title: "Implement Stacks via Arrays", module: "CS201", dueDate: "2026-09-25", submissions: "12/84" }
  ]);
  const [uploadedNotes, setUploadedNotes] = useState([
  { id: 1, name: "Lecture_3_Binary_Trees.pdf", module: "CS201", dateAdded: "15 Sept 2026" }
 ]);

 // Form field states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskModule, setTaskModule] = useState("CS201");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [notesFile, setNotesFile] = useState(null);
  const [notesModule, setNotesModule] = useState("CS201");
 
  // Mock Lecturer Metrics Context Data
  const [lecturerMetrics, setLecturerMetrics] = useState({
    activeModules: 2,
    totalStudents: 148,
    quizzesCreated: 14,
    classAverage: 68
  });

  // Modules currently being managed by the lecturer
  const managedModules = [
    { id: 1, code: "CS201", name: "Data Structures & Algorithms", students: 84, average: 72, trackColor: "var(--violet)" },
    { id: 2, code: "DB302", name: "Database Design & SQL", students: 64, average: 64, trackColor: "var(--sunset-orange)" }
  ];

  // Live stream overview of recent student activity logs
  const recentSubmissions = [
    { id: 1, student: "S. Khumalo", studentNum: "22408912", module: "CS201", quiz: "Stacks & Queues", score: "14/15", percentage: 93, status: "Excellent" },
    { id: 2, student: "N. Mandela", studentNum: "22501294", module: "DB302", quiz: "SQL Joins Test", score: "6/10", percentage: 60, status: "Pass" },
    { id: 3, student: "A. Ndlovu", studentNum: "22307441", module: "CS201", quiz: "Binary Trees Sprint", score: "4/10", percentage: 40, status: "Needs Review" }
  ];

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

       const handleAssignTask = (e) => {
  e.preventDefault();
  if (!taskTitle || !taskDueDate) return alert("Please populate all task fields.");

  const newTask = {
    id: Date.now(),
    title: taskTitle,
    module: taskModule,
    dueDate: taskDueDate,
    submissions: "0/84"
  };

  setAssignedTasks([newTask, ...assignedTasks]);
  setTaskTitle("");
  setTaskDueDate("");
  alert("Task assigned and published successfully!");
};

const handleNotesUpload = (e) => {
  e.preventDefault();
  if (!notesFile) return alert("Please attach a document file first.");

  const newNotes = {
    id: Date.now(),
    name: notesFile.name,
    module: notesModule,
    dateAdded: new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  setUploadedNotes([newNotes, ...uploadedNotes]);
  setNotesFile(null);
  alert("Lecture notes published to student portals!");
};


  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation - Synchronized Shell Wrapper */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>SMART QUIZ</h2>
        </div>
        
        <div className="user-profile-summary">
          <span className="user-avatar">👨‍🏫</span>
          <div className="user-info">
            <p className="username">{user?.username || "Lecturer"}</p>
            <p className="user-role">{user?.role ? user.role.toUpperCase() : "LECTURER"}</p>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li className="active" onClick={() => navigate("/dashboard")}>🏠 Dashboard</li>
          <li onClick={() => navigate("/quiz")}>📝 Generate Quiz</li>
          <li onClick={() => navigate("/analytics")}>📊 Class Analytics</li>
          <li onClick={() => navigate("/quiz-banks")}>📚 Quiz Banks</li>
          <li onClick={() => navigate("/profile")}>👤 Profile</li>
          <li onClick={handleLogout} className="logout-item">🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Administrative Presentation Workspace */}
      <main className="dashboard-main-content">
        <header className="dashboard-top-bar">
          <h1>Lecturer Dashboard</h1>
          <p className="date-indicator">Overview panel for your assigned university modules and students</p>
        </header>

        {/* Top-Level High-Consideration Metric Cards */}
        <section className="metrics-card-grid">
          <div className="metric-card">
            <h2>{lecturerMetrics.activeModules}</h2>
            <p>Assigned Modules</p>
            <div className="card-accent-bar" style={{ background: "var(--burgundy)" }}></div>
          </div>

                <div className="metric-card" onClick={() => setShowRoster(!showRoster)} style={{ cursor: 'pointer', position: 'relative' }}>
                     <h2>148</h2>
                    <p>Total Students Enrolled (Click to View) 👁️</p>
                     <div className="card-accent-bar" style={{ background: "var(--violet)" }}></div>
                  </div>
                    {showRoster && (
                      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 9999, background: 'rgba(0, 0, 0, 0.4)', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
                       <section className="history-table-container" style={{ width:'90%',maxWidth: '1200px', maxHeight: '85vh', overflowY: 'auto', background: '#ffffff', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', animation: 'fadeIn 0.3s ease' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 30px', background: '#fafafa', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
                           <h3 style={{ color: 'var(--burgundy)', margin: 0 }}>📋 Enrolled Student Class Roster</h3>
                          <button onClick={() => setShowRoster(false)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', fontWeight: '700',padding: '8px 16px',borderRadius: '8px',cursor: 'pointer', transition: 'all 0.2s' }}>✕ Close</button>
                     </div>
                      <table className="history-data-table">
                     <thead>
                       <tr>
                        <th>Student Name</th>
                        <th>Student Number</th>
                        <th>Registered Module</th> {/* New Column Header */}
                        <th>Email Address</th>
                        <th>Year</th>
                        <th>Academic Standing</th>
                      </tr>
                     </thead>
                       <tbody>
                       {studentRoster.map((student) => (
                       <tr key={student.id} className="history-table-row">
                       <td style={{ fontWeight: '600' }}>{student.name}</td>
                       <td>{student.studentNum}</td>
                       <td style={{ fontWeight: '600', color: 'var(--violet, #8B5CF6)' }}>{student.module}</td> 
                       <td>{student.email}</td>
                       <td>{student.year}</td>
                       <td>
                       <span className={`status-badge ${student.performance === 'Needs Review' ? 'fail' : 'pass'}`}>
                       {student.performance}
                       </span>
                       </td>
                       </tr>
                       ))}
                     </tbody>
                  </table>
              </section>
            </div>
          )}
          

          <div className="metric-card">
            <h2>{lecturerMetrics.quizzesCreated}</h2>
            <p>Quizzes Published</p>
            <div className="card-accent-bar" style={{ background: "var(--sunset-orange)" }}></div>
          </div>

          <div className="metric-card">
            <h2>{lecturerMetrics.classAverage}%</h2>
            <p>Overall Class Average</p>
            <div className="card-accent-bar" style={{ background: "var(--mint)" }}></div>
          </div>
      </section>

        {/* Content Layout Sections Split Grid */}
        <div className="dashboard-content-split" style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
  
  {/* COLUMN 1: Assign Tasks Operations Center */}
  <section className="performance-analytics-section" style={{ flex: 1, background: '#ffffff', padding: '25px', borderRadius: '12px' }}>
    <h2>📋 Student Task Manager</h2>
    <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>Assign new evaluation tasks directly to module streams.</p>

    <form onSubmit={handleAssignTask} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' }}>
      <input 
        type="text" 
        placeholder="Task Title (e.g. Implement Linked List)" 
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="profile-input-field"
        style={{ marginBottom: '12px' }}
      />
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <select value={taskModule} onChange={(e) => setTaskModule(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
          <option value="CS201">CS201 - Data Structures</option>
          <option value="DB302">DB302 - Database Systems</option>
        </select>
        <input 
          type="date" 
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb' }}
        />
      </div>
      <button type="submit" className="primary-gold-btn" style={{ padding: '10px 20px', fontSize: '14px' }}>Publish Task</button>
    </form>

    <div className="analytics-log-list">
      <h3>Active Task Ledger</h3>
      {assignedTasks.map(task => (
        <div key={task.id} className="log-row-item" style={{ marginTop: '10px', background: '#fafafa', padding: '12px', borderRadius: '8px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px' }}>{task.title}</h4>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{task.module} • Due: {task.dueDate}</span>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '13px', fontWeight: '600', color: 'var(--violet)' }}>{task.submissions} Done</span>
        </div>
      ))}
    </div>
  </section>

  {/* COLUMN 2: Upload Notes Content Hub */}
  <section className="quiz-recommendation-section" style={{ flex: 1, background: '#ffffff', padding: '25px', borderRadius: '12px' }}>
    <h2>📚 Course Notes Repository</h2>
    <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>Upload notes to help students generate personalized AI study materials.</p>

    <form onSubmit={handleNotesUpload} style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #f3f4f6' }}>
      <div className="document-upload-dropzone" style={{ padding: '20px', marginBottom: '12px' }}>
        <span className="upload-icon">📄</span>
        <label htmlFor="lecturer-file" className="file-picker-label" style={{ display: 'block', marginTop: '5px' }}>
          {notesFile ? `Attached: ${notesFile.name}` : "Click to attach Lecture Notes (.pdf)"}
        </label>
        <input 
          type="file" 
          id="lecturer-file" 
          accept=".pdf,.txt" 
          onChange={(e) => e.target.files.length > 0 && setNotesFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>
      <select value={notesModule} onChange={(e) => setNotesModule(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb', marginBottom: '12px' }}>
        <option value="CS201">CS201 - Data Structures</option>
        <option value="DB302">DB302 - Database Systems</option>
      </select>
      <button type="submit" className="dashboard-primary-btn" style={{ padding: '10px 20px', fontSize: '14px' }}>Upload Material</button>
    </form>

    <div className="analytics-log-list">
      <h3>Published Materials</h3>
      {uploadedNotes.map(note => (
        <div key={note.id} className="log-row-item" style={{ marginTop: '10px', background: '#fafafa', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--burgundy)' }}>{note.name}</h4>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Module: {note.module} • Added: {note.dateAdded}</span>
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

export default LecturerDashboard;

