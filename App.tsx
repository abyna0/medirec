
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import MedicalRecords from './pages/MedicalRecords';
import Login from './pages/Login';
import { storage } from './services/storage';

const App: React.FC = () => {
  useEffect(() => {
    storage.init();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/patients"
        element={
          <Layout>
            <PatientList />
          </Layout>
        }
      />
      <Route
        path="/records"
        element={
          <Layout>
            <MedicalRecords />
          </Layout>
        }
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
