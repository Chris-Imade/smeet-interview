import React from "react";
import { styles } from "./DEFAULTS";
const { ipcRenderer } = window.require("electron");

interface WarningProps {
    setShowExit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Warning: React.FC<WarningProps> = ({ setShowExit }) => {
	return (
		<div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-[#0f172a5e]">
			<div className="bg-white rounded-lg fixed max-w-[450px] text-center flex flex-col items-center p-5 top-[40%] left-[40%]">
				<h4>Are you sure you want to Exit?</h4>
				<div className="flex items-center mt-4">
					<button
						onClick={() => ipcRenderer.send("close-window")}
						className="rounded-md px-6 py-1 mr-4"
						style={{ backgroundColor: styles.colors.secondary }}
					>
						Yes
					</button>
					<button
						onClick={() => setShowExit(false)}
						className="rounded-md px-6 py-1"
						style={{ backgroundColor: styles.colors.green }}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default Warning;
