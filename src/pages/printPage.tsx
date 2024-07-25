import { FC } from "react";
import { Layout } from "../components/Layout";
import PrintButton from "../components/PrintButton";

export const PrintPage: FC = () => {
	return (
		<Layout>
			<div className="w-full h-[100vh] bg-slate-900">
				<h1 className="text-white text-center text-xl uppercase pt-12 ">
					Testing Thermal Print functionality
				</h1>
				<div className="flex justify-center items-center w-full h-full">
					<PrintButton />
				</div>
			</div>
		</Layout>
	);
};

