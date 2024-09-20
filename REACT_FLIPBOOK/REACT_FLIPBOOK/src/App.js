import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/home/Homepage.jsx";
import Flipbook from "./components/Flipbook";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import { AuthProvider } from "./contexts/authContext";

function App() {
  const [pdfFile, setPdfFile] = useState(null); // To handle the PDF file across components

  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <Routes>
            {/* Public routes */}
            <Route path="/home" element={<Homepage setPdfFile={setPdfFile} />} />
            <Route path="/flipbook" element={<Flipbook pdfFile={pdfFile} />} />

            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
