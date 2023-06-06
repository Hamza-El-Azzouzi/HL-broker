import React from "react";
import { Routes, Route,  Navigate } from "react-router-dom";
import ls from 'localstorage-slim';
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import axios from "axios";
const App = () => {
  const token = ls.get('token', { decrypt: true });
  const user = JSON.parse(ls.get('user', { decrypt: true }));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // const redirection = useNavigate()
  const isLoggedIn = !!token && !!user;
  // console.log(isLoggedIn)
  return (
    <>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        {isLoggedIn ? (
          user.account_type === 'admin' ? (
            <>
            <Route path="admin/*" element={<AdminLayout />} />
            <Route path="/" element={<Navigate to="/admin/Dashboard" replace />} />
          </>
          ):(
            <Route path="*" element={<Navigate to="/auth" replace />} />
          )
         
        ) : (
          <Route path="*" element={<Navigate to="/auth" replace />}  />
        )}
      </Routes>
    </>

  );
};

export default App;
