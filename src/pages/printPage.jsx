import { useState, useRef, useCallback } from "react";
import { Layout } from "../components/Layout";
import PrintButton from "../components/PrintButton";
import { useSymbologyScanner } from "@use-symbology-scanner/react";

const { ipcRenderer } = window.require("electron");

export const PrintPage = () => {
	const [barcode, setBarcode] = useState("");
	const [error, setError] = useState(null);
	const ref = useRef(null);

	// Validation logic for different barcode types
	const validateBarcode = (barcode) => {
		if (barcode.length < 8 || barcode.length > 20) return false;

		if (barcode.startsWith("0")) {
			return validateEAN13(barcode);
		} else if (barcode.startsWith("1")) {
			return validateCode128(barcode);
		} else if (barcode.startsWith("2")) {
			return validateUPC(barcode);
		} else {
			return validateUnknownFormat(barcode);
		}
	};

	const validateEAN13 = (barcode) => {
		if (barcode.length !== 13) return false;
		let sum = 0;
		for (let i = 0; i < 12; i++) {
			sum += (i % 2 === 0 ? 1 : 3) * parseInt(barcode.charAt(i), 10);
		}
		const checkDigit = (10 - (sum % 10)) % 10;
		return checkDigit === parseInt(barcode.charAt(12), 10);
	};

	const validateCode128 = (barcode) => {
		// Add your validation logic here for Code 128
		return barcode.length > 0; // Placeholder
	};

	const validateUPC = (barcode) => {
		if (barcode.length !== 12) return false;
		let sum = 0;
		for (let i = 0; i < 11; i++) {
			sum += (i % 2 === 0 ? 3 : 1) * parseInt(barcode.charAt(i), 10);
		}
		const checkDigit = (10 - (sum % 10)) % 10;
		return checkDigit === parseInt(barcode.charAt(11), 10);
	};

	const validateUnknownFormat = (barcode) => {
		// Implement your validation logic for unknown formats here
		// For demonstration, this will accept barcodes with 10 to 15 digits
		return /^[0-9]{10,15}$/.test(barcode);
	};

	// handleCompleteScan wrapped in useCallback
	const handleCompleteScan = useCallback((barcode) => {
		if (validateBarcode(barcode)) {
			console.log("Valid barcode:", barcode);
			ipcRenderer.send("barcode-scanned", barcode);
			setBarcode(""); // Reset barcode state for next scan
		} else {
			setError("Invalid barcode scanned");
		}
	}, []);

	// handleSymbol wrapped in useCallback with handleCompleteScan as dependency
	const handleSymbol = useCallback((symbol) => {
		if (symbol === "\r" || symbol === "\n") {
			handleCompleteScan(barcode);
		} else {
			setBarcode((prevBarcode) => prevBarcode + symbol);
			setError(null); // Clear any previous errors
		}
	}, [handleCompleteScan, barcode]);

	useSymbologyScanner(handleSymbol, { target: ref });

	return (
		<Layout>
			<div
				ref={ref}
				className="w-full h-[100vh] bg-slate-900"
				tabIndex={0} // Make the <div> focusable
			>
				<div className="flex flex-col justify-center items-center w-full h-full">
					<h1 className="text-white text-center text-xl uppercase pt-12">
						Testing Thermal Print functionality
					</h1>
					<PrintButton />
					<div className="text-white mt-6">My JSX</div>
					{barcode && <div>Scanned Barcode: {barcode}</div>}
					{error && <div className="text-red-500">{error}</div>}
				</div>
			</div>
		</Layout>
	);
};
