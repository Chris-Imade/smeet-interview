import { FC } from "react";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";


export const IndexPage: FC = () => {
	return (
		<Layout>
			<div className="w-full h-[100vh] bg-slate-900">
				<h1 className="text-white text-center text-xl uppercase pt-12 ">
					Welcome to the Infinity Interview
				</h1>
				<div className="flex justify-center items-center w-full h-full">
					<Link to={"/print"}>
						<button className="w-[250px] h-fit rounded-md py-3 bg-purple-500 text-white">
							Go to print page 🖨
						</button>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

