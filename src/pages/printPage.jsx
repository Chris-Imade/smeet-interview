import { useState, useRef, useCallback, useEffect } from "react";
import { Layout } from "../components/Layout";
import PrintButton from "../components/PrintButton";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { debounce } from "lodash";
// const { ipcRenderer } = window.require("electron");

export const PrintPage = () => {
	const [barcode, setBarcode] = useState(null);
	const [error, setError] = useState(null);
	const [isScanning, setIsScanning] = useState(false); // Indicate scanning progress
	const lastScanTime = useRef(0);
	const ref = useRef(null);

	const handleSymbol = useCallback((symbol) => {
		try {
			const now = Date.now();
			const timeDiff = now - lastScanTime.current;
			lastScanTime.current = now;

			// Check if scan delay is reasonable
			if (timeDiff < symbol.length * 100) {
				setBarcode((prevBarcode) => prevBarcode + symbol);
				setIsScanning(true); // Indicate scanning in progress
			} else {
				console.log("Ignored input:", symbol);
			}
		} catch (error) {
			console.error("Error processing barcode scan:", error);
			setError("Failed to process barcode scan.");
		}
	}, []);

	useSymbologyScanner(handleSymbol, { target: ref });

	const handleCompleteScan = useCallback(
		debounce((scannedBarcode) => {
			// Validate scanned barcode
			if (validateBarcode(scannedBarcode)) {
				setBarcode(scannedBarcode);
				console.log("Scanned barcode:", scannedBarcode);
			} else {
				setError("Invalid barcode format");
			}
			setIsScanning(false); // Indicate scanning complete
		}, 500), // Adjust debounce time as needed
		[validateBarcode],
	);

	useEffect(() => {
		if (barcode) {
			handleCompleteScan(barcode);
		}
	}, [barcode, handleCompleteScan]);

	function validateBarcode(barcode) {
		// Basic length check
		if (barcode.length < 8 || barcode.length > 20) {
			setError("Not a valid barcode, try again!");
			console.log("Invalid barcode, try again!");
			return false;
		}

		// More specific validation based on barcode type
		if (barcode.startsWith("0")) {
			// EAN-13 or UPC validation
			if (barcode.length === 12) {
				return validateUPC(barcode);
			} else if (barcode.length === 13) {
				return validateEAN13(barcode);
			} else {
				return false;
			}
		} else if (barcode.startsWith("1")) {
			// Code 128 validation
			return validateCode128(barcode);
		} else {
			// Handle other barcode types or unknown formats
			console.log("Invalid Format!");
			setError("Invalid Format!");
			return false;
		}
	}

	function validateEAN13(barcode) {
		if (barcode.length !== 13) return false;

		// EAN-13 checksum calculation
		let sum = 0;
		for (let i = 0; i < 12; i++) {
			let num = parseInt(barcode[i], 10);
			sum += i % 2 === 0 ? num : num * 3;
		}

		let checkDigit = (10 - (sum % 10)) % 10;
		return checkDigit === parseInt(barcode[12], 10);
	}

	function validateUPC(barcode) {
		if (barcode.length !== 12) return false;

		// UPC-A checksum calculation
		let sum = 0;
		for (let i = 0; i < 11; i++) {
			let num = parseInt(barcode[i], 10);
			sum += i % 2 === 0 ? num * 3 : num;
		}

		let checkDigit = (10 - (sum % 10)) % 10;
		return checkDigit === parseInt(barcode[11], 10);
	}

	function validateCode128(barcode) {
		if (barcode.length < 6) return false;

		// Basic Code 128 validation: Check for valid ASCII range
		// Code 128 includes all 128 ASCII characters, from 32 to 126.
		for (let i = 0; i < barcode.length; i++) {
			let charCode = barcode.charCodeAt(i);
			if (charCode < 32 || charCode > 126) {
				return false;
			}
		}
		return true;
	}

	return (
		<Layout>
			<div
				ref={ref}
				className="w-full h-[100vh] bg-slate-900"
				tabIndex={0}
			>
				<div className="flex flex-col justify-center items-center w-full h-full">
					<h1 className="text-white text-center text-xl uppercase pt-12 ">
						Testing Thermal Print functionality
					</h1>
					<PrintButton />
					<div className="text-white mt-6 underline mb-4">
						Barcode Information
					</div>
					{barcode && (
						<div className="text-white text-2xl font-semibold">
							Scanned Barcode: {barcode}
						</div>
					)}
					{error && (
						<div className="text-red-500 text-xl my-4">{error}</div>
					)}
					{isScanning && (
						<div className="text-lime-300 text-xl font-semibold">
							Scanning...
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

