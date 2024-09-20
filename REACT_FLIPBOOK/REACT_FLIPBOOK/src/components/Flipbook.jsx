// src/components/Flipbook.jsx
import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useLocation } from "react-router-dom";
import "../Modal.css"; // Ensure this file exists or adjust as needed

function Flipbook() {
  const [numPages, setNumPages] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const location = useLocation();
  const pdfFile = location?.state?.pdfFile;

  useEffect(() => {
    if (pdfFile) {
      // This effect will run when pdfFile changes
      // Perform any additional setup or processing if needed
    }
  }, [pdfFile]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    // Create an array of page numbers to render
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(i);
    }
    setPdfPages(pages);
  };

  return (
    <div className="flipbook-container">
      {pdfFile ? (
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          className="modal-90w"
        >
          <HTMLFlipBook width={500} height={707}>
            {pdfPages.map((pageNumber) => (
              <div key={pageNumber}>
                <Page width={500} pageNumber={pageNumber} />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      ) : (
        <p>No PDF file selected</p>
      )}
    </div>
  );
}

export default Flipbook;
