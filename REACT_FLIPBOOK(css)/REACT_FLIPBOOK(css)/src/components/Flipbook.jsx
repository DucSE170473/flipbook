import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeft,
  faArrowRight,
  faSearchPlus,
  faSearchMinus,
  faExpand,
  faDownload,
  faBookmark,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import "../Modal.css"; // Ensure this file exists or adjust as needed

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Flipbook() {
  const [numPages, setNumPages] = useState(null);
  const [pdfPages, setPdfPages] = useState([]);
  const location = useLocation();
  const pdfFile = location?.state?.pdfFile;
  const flipBookRef = useRef();
  const [zoom, setZoom] = useState(1.0);

  useEffect(() => {
    if (pdfFile) {
      setNumPages(null);
      setPdfPages([]);
    }
  }, [pdfFile]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);
    setPdfPages(pages);
  };

  const goToNextPage = () => {
    flipBookRef.current.pageFlip().flipNext();
  };

  const goToPreviousPage = () => {
    flipBookRef.current.pageFlip().flipPrev();
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfFile;
    link.download = "document.pdf";
    link.click();
  };

  return (
    <div className="flipbook-container">
      {pdfFile ? (
        <>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            className="modal-90w"
          >
            <HTMLFlipBook width={450} height={550} ref={flipBookRef}>
              {pdfPages.map((pageNumber) => (
                <div key={pageNumber} className="page">
                  <Page width={450 * zoom} pageNumber={pageNumber} />
                </div>
              ))}
            </HTMLFlipBook>
          </Document>

          <div className="toolbar">
            <button onClick={goToPreviousPage} disabled={numPages <= 1}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={goToNextPage} disabled={numPages <= 1}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button onClick={handleZoomOut} disabled={zoom <= 0.5}>
              <FontAwesomeIcon icon={faSearchMinus} />
            </button>
            <button onClick={handleZoomIn}>
              <FontAwesomeIcon icon={faSearchPlus} />
            </button>
            <button onClick={handleFullscreen}>
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <button onClick={downloadPDF}>
              <FontAwesomeIcon icon={faDownload} />
            </button>
            <button>
              <FontAwesomeIcon icon={faBookmark} />
            </button>
            <button>
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </>
      ) : (
        <p>No PDF file selected</p>
      )}
    </div>
  );
}

export default Flipbook;
