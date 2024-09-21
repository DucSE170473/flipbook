import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Homepage.jsx";
import FlipBook from "./components/Flipbook.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import { PdfProvider } from "./contexts/PdfContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <PdfProvider>
        <BrowserRouter>
          <Header />
          <div className="w-full min-h-screen pt-16 flex flex-col">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/flipbook"
                element={
                  <ProtectedRoute>
                    <FlipBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navigate to="/home" replace />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </PdfProvider>
    </AuthProvider>
  );
}

export default App;
