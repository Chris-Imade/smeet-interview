import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";
import { PrintPage } from "./pages/printPage";
import YantraList from "./pages/YantraList";

export const Router: FC = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/">
					<Route index element={<IndexPage />} />
					<Route path="/print" element={<PrintPage />} />
					<Route path="/list-yantras" element={<YantraList />} />
				</Route>
			</Routes>
		</HashRouter>
	);
};
