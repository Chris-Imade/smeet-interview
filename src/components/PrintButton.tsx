import React from 'react';

const { ipcRenderer } = window.require('electron');

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    ipcRenderer.send('print');
  };

  return (
    <button onClick={handlePrint}>
      Print
    </button>
  );
};

export default PrintButton;
