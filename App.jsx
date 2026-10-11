// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LecturerDashboard from "./pages/lecturerDashboard";
import Quiz from "./pages/Quizzes";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Profile from "./pages/Profile";
import QuizBanks from "./pages/QuizBanks";


// Import the guard component we just created
import { RoleGuard } from "./components/RoleGuard";

const DashboardRouterWrapper = () => {
  const activeUser = JSON.parse(localStorage.getItem("user"));
  if (!activeUser) return <Navigate to="/login" replace />;
  if(activeUser.role==="lecturer"){
    return <LecturerDashboard />
  }
  return <Dashboard />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Unified Dashboard Entry (Handles routing logic inside itself) */}
        <Route path="/dashboard" element={<DashboardRouterWrapper />} />
  {/* 🔐 Student Protected Routes */}
  <Route 
    path="/quiz" 
    element={
      <RoleGuard allowedRoles={["student","lecturer"]}>
        <Quiz/>
      </RoleGuard>
    } 
  />

  {/* Ensure there are no stray tags here between your routes! */}

        {/* 🔓 Open Protected Routes (Accessible by both Students and Lecturers) */}
        <Route 
          path="/analytics" 
          element={
            <RoleGuard allowedRoles={["student", "lecturer"]}>
              <Analytics />
            </RoleGuard>
          } 
        />

       <Route 
          path="/history" element={
           <RoleGuard allowedRoles={["student"]}>
           <History />
           </RoleGuard>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <RoleGuard allowedRoles={["student", "lecturer"]}>
              <Profile />
            </RoleGuard>
          } 
        />
        <Route 
         path="/quiz-banks" 
         element={
          <RoleGuard allowedRoles={["lecturer"]}>
          <QuizBanks />
         </RoleGuard>
         } 
         />
      </Routes>
    </Router>
  );
}

export default App;
