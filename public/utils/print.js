const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const printer = require('pdf-to-printer');
const bwipjs = require('bwip-js');

ipcMain.on('print', async () => {
  try {
    // Read the contents of receipt.txt
    const receiptPath = path.join(__dirname, 'receipt.txt');
    const data = fs.readFileSync(receiptPath, 'utf-8');

    // Create a temporary PDF file
    const pdfPath = path.join(__dirname, 'temp.pdf');
    const doc = new PDFDocument({
      size: [200, 270], // Adjust the height as needed
      margins: { top: 10, left: 10, right: 10, bottom: 10 } // Small margins for thermal paper
    });
    doc.pipe(fs.createWriteStream(pdfPath));

    // Add the text content
    doc.fontSize(10).text(data, {
      width: 180, // Adjust to fit the paper width
      align: 'left'
    });

    // Generate a barcode and add it to the PDF
    const barcodeData = '*NK90510078160'; // Your barcode data
    bwipjs.toBuffer({
      bcid: 'code128',       // Barcode type
      text: barcodeData,     // Text to encode
      scale: 3,              // 3x scaling factor
      height: 10,            // Bar height, in millimeters
      width: 60,
      includetext: true,     // Show human-readable text
      textxalign: 'left',  // Align text to the center
    }, (err, png) => {
      if (err) {
        console.error('Error generating barcode:', err);
      } else {
        // Add the barcode image to the PDF
        const barcodePath = path.join(__dirname, 'barcode.png');
        fs.writeFileSync(barcodePath, png);
        doc.image(barcodePath, {
          fit: [180, 40], // Adjust the width and height as needed
          align: 'center',
          valign: 'bottom'
        });

        // Finalize the PDF file
        doc.end();

        // Wait for the PDF to be written to disk
        doc.on('finish', () => {
          // Print the PDF file
          printer.print(pdfPath)
            .then(() => {
              console.log('Printed successfully');
              fs.unlinkSync(pdfPath); // Clean up by removing the temp PDF file
              fs.unlinkSync(barcodePath); // Clean up by removing the barcode image file
            })
            .catch(err => console.error('Error printing:', err));
        });
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
});
