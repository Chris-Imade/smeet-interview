import React from "react";

const { ipcRenderer } = window.require("electron");

const PrintButton: React.FC = () => {
	const handlePrint = () => {
		const data = `Acknowledgement Receipt 298560952
                  22/07/2024  13:44:24 P. No.2045250030
                  YANTRA GROUP-NV
                  Date: 2024-07-22 Time: 01:45 PM
                  GAYATRI     YANTRA*5
                  SHANI       YANTRA*2
                  SHREE       YANTRA*3
                  SURYA       YANTRA*5
                  VASHIKARAN  YANTRA*3

                  Product Qty 18 Total Amt. 198.0 * Condition Apply:
                  For Terms & Condition P.T.O.
                  This acknowledgement slip should be retained to redeem the product and the gifts.
      `;
		ipcRenderer.send("print", data);
	};

	return (
		<button
			className="w-24 h-fit rounded-md py-3 bg-purple-500 text-white"
			onClick={handlePrint}
		>
			Print
		</button>
	);
};

export default PrintButton;

