import React, { createContext, useContext, useState } from "react";

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
  const [pdfFile, setPdfFile] = useState(null);

  return (
    <PdfContext.Provider value={{ pdfFile, setPdfFile }}>
      {children}
    </PdfContext.Provider>
  );
};

export const usePdf = () => {
  return useContext(PdfContext);
};
