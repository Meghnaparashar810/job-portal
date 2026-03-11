import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Notfound from './pages/Notfound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacultyDashboard from './pages/FacultyDashboard.jsx';
import CreateJob from './pages/CreateJob.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='*' element={<Notfound />} />
        <Route path='facultydashboard' element={<FacultyDashboard />} />
        <Route path='createjob' element={<CreateJob />} />
        <Route path='profile' element={<Profile />} />





      </Routes>
    </>
  )
}

export default App
