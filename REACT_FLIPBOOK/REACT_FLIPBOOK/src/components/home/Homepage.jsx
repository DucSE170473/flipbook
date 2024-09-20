// src/components/Homepage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"; // Assuming this context is set up

function Homepage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Create an object URL for the file
    }
  };

  const handleUpload = () => {
    if (file) {
      // Navigate to Flipbook page and pass file URL
      navigate("/flipbook", { state: { pdfFile: file } });
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome {currentUser.displayName ? currentUser.displayName : currentUser.email}</h1>
      <h2>Upload your PDF file</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and View</button>
    </div>
  );
}

export default Homepage;
