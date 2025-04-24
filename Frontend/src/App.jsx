import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/SignUp.jsx';
import Dashboard from './Pages/Deashboard.jsx';
import Appointment from './Pages/Appointment.jsx';
import Patient from './Pages/Patient.jsx';
import Doctor from './Pages/Doctor.jsx';
import Package from './Pages/HealthPackage.jsx';

// Admin routes
import AdminNavbar from './Pages/admin/AdminNavbar.jsx';
import AdminDashboard from './Pages/admin/Dashboard.jsx';
import AdminDoctor from './Pages/admin/Doctor.jsx';
import AdminHealthPackage from './Pages/admin/HealthPackage.jsx';

// 🔐 Protected route
function PrivateRoute({ loggedIn, allowedRoles, children }) {
  const role = localStorage.getItem("role");

  if (!loggedIn) return <Navigate to="/login"/>;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/login" />;

  return children;
}


// Layout with Navbar/Footer logic
function LayoutWrapper({ children, loggedIn }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/SignUp';
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAuthPage && (isAdminRoute ? <AdminNavbar /> : <>{loggedIn && <Navbar />}</>)}
      {children}
      {!isAuthPage && !isAdminRoute && loggedIn && <Footer />}
    </>
  );
}

export default function App() {
//Add total Patient 
const [totalPatients, setTotalPatients] = useState(() => {
  const saved = localStorage.getItem("totalPatients");
  return saved ? parseInt(saved) : 0;
})

//Add total Doctor
const [totalDoctors, setTotalDoctors] = useState(() => {
  return parseInt(localStorage.getItem("totalDoctors")) || 0;
});

  const [index, setIndex] = useState([]);
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");

  //lgoin----------
  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

//totalpatient------
  useEffect(() => {
    localStorage.setItem("totalPatients", totalPatients.toString());
  }, [totalPatients]);

//totalDoctor---------
  useEffect(() => {
    localStorage.setItem("totalDoctors", totalDoctors.toString());
  }, [totalDoctors]);

  return (
    <BrowserRouter>
      <LayoutWrapper loggedIn={loggedIn}>
        <Routes>

          {/* Always show login first */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/SignUp" element={<Signup />} />

          {/* Normal user routes */}
          <Route
            path="/h"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['user']}>
                <Dashboard totalPatients={totalPatients}  totalDoctors={totalDoctors}/>
              </PrivateRoute>
            }
          />
          <Route
            path="/Doctor"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['user']}>
                <Doctor setIndex={setIndex} />
              </PrivateRoute>
            }
          />

             <Route
            path="/Package"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['user']}>
                <Package setIndex={setIndex} />
              </PrivateRoute>
            }
          />

          <Route
            path="/patient"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['user']}>
                <Patient totalPatients={totalPatients} setTotalPatients={setTotalPatients} />
              </PrivateRoute>
            }
          />
          <Route
            path="/Appointment"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['user']}>
                <Appointment index={index} />
              </PrivateRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/admin/Dashboard"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/Doctor"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['admin']}>
                <AdminDoctor totalDoctors={totalDoctors} setTotalDoctors={setTotalDoctors}/>
              </PrivateRoute>
            }
          />
         <Route
            path="/admin/HealthPackage"
            element={
              <PrivateRoute loggedIn={loggedIn} allowedRoles={['admin']}>
                <AdminHealthPackage />
              </PrivateRoute>
            }
          />

        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}
