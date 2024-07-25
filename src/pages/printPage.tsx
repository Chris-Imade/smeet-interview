import { FC, useState, useRef } from "react";
import { Layout } from "../components/Layout";
import PrintButton from "../components/PrintButton";
import { useSymbologyScanner } from "@use-symbology-scanner/react";

const { ipcRenderer } = window.require("electron");

export const PrintPage: FC = () => {
    const [barcode, setBarcode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const lastScanTime = useRef<number>(0);
    const ref = useRef<HTMLDivElement | any>(null);

    // Handle scanned barcode symbols
    const handleSymbol = (symbol: string) => {
        try {
            const now = Date.now();
            const timeDiff = now - lastScanTime.current;
            lastScanTime.current = now;

            // Check if scan delay is reasonable
            if (timeDiff < symbol.length * 100) {
                setBarcode(symbol);
                console.log("Barcode scanned:", symbol);
                ipcRenderer.send("barcode-scanned", symbol);
            } else {
                console.log("Ignored input:", symbol);
            }
        } catch (error) {
            console.error("Error processing barcode scan:", error);
            setError("Failed to process barcode scan.");
        }
    };

    // Use the symbology scanner with correct ref type
    useSymbologyScanner(handleSymbol, {
        target: ref.current, // Now points to the <div> element
        symbologies: ["EAN 13", "Code 128"], // Use correct symbology names
        scannerOptions: {
            suffix: "\n", // Assuming newline suffix from scanner
            maxDelay: 20, // Max delay in milliseconds
        },
    });

    return (
        <Layout>
            <div 
                ref={ref} 
                className="w-full h-[100vh] bg-slate-900"
                tabIndex={0} // Make the <div> focusable
            >
                <h1 className="text-white text-center text-xl uppercase pt-12 ">
                    Testing Thermal Print functionality
                </h1>
                <div className="flex justify-center items-center w-full h-full">
                    <PrintButton />
                </div>
                {barcode && <div>Scanned Barcode: {barcode}</div>}
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </Layout>
    );
};
