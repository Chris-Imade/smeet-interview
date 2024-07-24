import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages";
import { PopupPage } from "./pages/popup";
import { PrintPage } from "./pages/printPage";

export const Router: FC = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/">
					<Route index element={<IndexPage />} />
					<Route path="/print" element={<PrintPage />} />
					<Route path="popup" element={<PopupPage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
};
