import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import {AuthContext} from './context/AuthContext'

function App() {
  const {user} = useContext(AuthContext);
  const ProtectedRoute = ({children}) => {
    if (!user) {
      return <Navigate to="/chat.io/login" ></Navigate>
    }

    return children;
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/chat.io/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
