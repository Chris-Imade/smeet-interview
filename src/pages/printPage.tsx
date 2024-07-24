import { FC } from "react";
import { Layout } from "../components/Layout";

const { ipcRenderer } = window.require("electron");

export const PrintPage: FC = () => {
	const handlePrint = () => {
		const data = "Testing Thermal Print functionality"; // Your text to print
		ipcRenderer.send("print", data);
	};

	return (
		<Layout>
			<div className="w-full h-[100vh] bg-slate-900">
				<h1 className="text-white text-center text-xl uppercase pt-12 ">
					Testing Thermal Print functionality
				</h1>
				<div className="flex justify-center items-center w-full h-full">
					<button
						className="w-24 h-fit rounded-md py-3 bg-purple-500 text-white"
						onClick={handlePrint}
					>
						Print
					</button>
				</div>
			</div>
		</Layout>
	);
};

