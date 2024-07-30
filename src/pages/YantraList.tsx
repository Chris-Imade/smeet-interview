import React from "react";
import { styles } from "../components/DEFAULTS";
import { Link } from "react-router-dom";
import { detailF5Buy } from "../data";
import { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "./style.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const YantraList = () => {
	const [value, onChange] = useState<Value>(new Date());
	const [showModal, setShowModal] = useState<boolean>(false);

	const handleFilter = () => {
		alert(`Implement filter for ${value}`);
	};

	return (
		<div
			className="w-[100vw] h-[100vh] flex flex-col justify-center items-center relative"
			style={{ backgroundColor: styles.colors.primary }}
		>
			<div
				className="h-[90%] w-[95%] rounded-md flex items-center flex-wrap overflow-y-scroll overflow-hidden"
				style={{ backgroundColor: styles.colors.secondary }}
			>
				{/* Main Window */}
				{detailF5Buy.map((item, index) => (
					<div key={index}>
						<div className="border-slate-900 border-[1px] border-solid py-2 px-4">
							<img width={101.8} src={item.image} alt="" />
						</div>
						<div className="border-slate-900 border-[1px] border-solid h-[40px] flex justify-center items-center">
							<h4 className="text-center font-semibold">
								{item.time}
							</h4>
						</div>
					</div>
				))}
			</div>

			{/* Actions Footer */}
			<div className="w-full pt-4 flex justify-center items-center gap-4">
				<button
					onClick={() => setShowModal(true)}
					className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
					style={{
						backgroundColor: styles.colors.tertiary,
					}}
				>
					Filter
				</button>
				<Link to={"/"}>
					<button
						className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
						style={{
							backgroundColor: styles.colors.tertiary,
						}}
					>
						Back
					</button>
				</Link>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-[#0f172a5e] flex items-center justify-center">
					<div className="h-fit w-[50%] px-6 py-12 fixed top-40 bg-white rounded-md">
						<Calendar
							onChange={onChange}
							value={value}
							calendarType="gregory"
							className="border-none"
							tileClassName={({ date, view }) =>
								view === "month" ? "custom-day" : null
							}
						/>

						<div className="w-full flex justify-end items-center">
							<div className="flex gap-6 absolute bottom-4">
								<button
									onClick={() => setShowModal(false)}
									className="uppercase text-orange-400"
								>
									Cancel
								</button>
								<button
									onClick={handleFilter}
									className="uppercase text-blue-400"
								>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default YantraList;

