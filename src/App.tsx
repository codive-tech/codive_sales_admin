import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SchoolProvider } from './contexts/SchoolContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Schools } from './pages/Schools';
import { Sales } from './pages/Sales';
import { Payments } from './pages/Payments';
import  Leads  from './pages/Leads';
import Revenue from './pages/Revenue';  
import Courses from './pages/Courses';
import Students from './pages/Students';
import Tracker from './pages/Tracker';
import {ToastContainer} from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SchoolProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/students" element={<Students />} />
            </Route>
          </Routes>
        </SchoolProvider>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}