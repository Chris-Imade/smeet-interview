import { FC, useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { styles } from "../components/DEFAULTS";
import { images } from "../assets";
import { getUpcomingYantra, scrollableYanraList, yantraList } from "../data";
import { Upcoming, Warning, YantraCards, YantraInput } from "../components";
import Countdown, { zeroPad } from "react-countdown";

interface TimeLeft {
	hours: number;
	minutes: number;
	seconds: number;
}

export const IndexPage: FC = () => {
	const [showExit, setShowExit] = useState<boolean>(false);
	const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
	const [upcomingYantra, setUpcomingYantra] = useState<
		{ date: string; time: string }[]
	>(getUpcomingYantra());
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);

	const handleReset = () => {
		const now = new Date();
		const currentMinute = now.getMinutes();
		let nextInterval = new Date(now);
		nextInterval.setMinutes(currentMinute + (15 - (currentMinute % 15)));
		nextInterval.setSeconds(0);
		nextInterval.setMilliseconds(0);
		setSelectedTime(nextInterval);
	};

	const renderer = ({ hours, minutes, seconds, completed }: any) => {
		if (completed) {
			return <span>Time's up!</span>;
		} else {
			return (
				<span>
					{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
				</span>
			);
		}
	};
	return (
		<Layout>
			<div className="relative">
				<div
					style={{
						backgroundColor: styles.colors.primary,
					}}
					className={`h-[100%] w-[100vw] px-4 flex flex-col relative`}
				>
					{/* Top Row */}
					<div className="flex justify-between items-center">
						<div></div>
						<div className="flex pr-4 py-4 items-center gap-6">
							<div className="text-center">
								<h4 className="text-xl font-semibold">5062</h4>
								<h4 className="border-slate-800 border-[1px] border-solid tracking-widest text-xl font-semibold">
									{new Date().getDate() +
										"/" +
										new Date().getMonth() +
										"/" +
										new Date().getFullYear()}
								</h4>
								<h4 className="text-xl font-semibold">
									P.No.2045250030
								</h4>
							</div>

							<img
								src={`${images.clock}`}
								className="w-[100px] h-[100px] object-contain"
								alt="clock"
							/>
							<img
								src={`${images.smile}`}
								className="w-[100px] h-[100px] object-contain"
								alt="clock"
							/>
						</div>
					</div>
					{/* Header Row */}
					<div className="flex items-end">
						{/* left */}
						<div className="ml-12">
							{/* Timer Row */}
							<div className="flex justify-between max-w-[250px]">
								<div>
									<h4 className="text-xl font-semibold">
										Time
									</h4>
									<h4 className="text-xl font-semibold">
										{selectedTime
											? selectedTime.toLocaleTimeString(
													[],
													{
														hour: "2-digit",
														minute: "2-digit",
													},
											  )
											: "Current Time"}
									</h4>
								</div>
								<div>
									<h4 className="text-xl font-semibold">
										Time Left
									</h4>
									{selectedTime ? (
										<h4 className="text-xl font-semibold">
											<Countdown
												date={selectedTime}
												renderer={renderer}
											/>
										</h4>
									) : (
										<h4 className="text-xl font-semibold">
											N/A
										</h4>
									)}
								</div>
							</div>
							<img
								width={400}
								className="mt-3"
								src="https://tantranectar.com/wp-content/uploads/2020/04/wp4177619-yantra-wallpapers.jpg"
								alt="Yantra"
							/>
						</div>
						{/* Right */}
						<div
							className="w-full flex ml-12 flex-row justify-evenly max-h-[360px] flex-wrap p-6 rounded-sm"
							style={{ backgroundColor: styles.colors.tertiary }}
						>
							{yantraList.map((items, index) => (
								<div
									className="w-[125px] mb-2 mr-12"
									key={index}
								>
									<YantraInput image={items.image} />
								</div>
							))}
						</div>
					</div>
					{/* Scrollable Section */}
					<div
						className="w-full mt-4 h-[500px] mb-[110px] overflow-y-scroll flex flex-wrap"
						style={{ backgroundColor: styles.colors.secondary }}
					>
						{scrollableYanraList.map((item, index) => (
							<div key={index}>
								<YantraCards
									image={item.image}
									time={item.time}
								/>
							</div>
						))}
					</div>
					{/* Footer Action Buttons */}
					<div
						className="h-[110px] fixed bottom-0 w-[98.4%] py-2"
						style={{ backgroundColor: styles.colors.primary }}
					>
						{/* 1st Row */}
						<div className="flex justify-between items-center">
							<button
								className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
								style={{
									backgroundColor: styles.colors.tertiary,
								}}
							>
								Yantra
							</button>
							<div className=""></div>
							<div className="min-w-[450px] flex items-center justify-between">
								<button
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
									style={{
										backgroundColor: styles.colors.tertiary,
									}}
								>
									Current
								</button>
								<button
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
									style={{
										backgroundColor: styles.colors.tertiary,
									}}
									onClick={() => setShowUpcoming(true)}
								>
									Upcoming
								</button>
								<div>
									<input
										className="w-[70px] outline-none border-r-[1px] border-solid border-r-slate-900 pl-2 py-1"
										type="text"
									/>
									<input
										className="w-[120px] outline-none pl-2 py-1"
										type="text"
									/>
								</div>
							</div>
							<div className="flex items-center">
								<p className="mr-4">F8 - Bar Code</p>
								<input
									type="number"
									className="p-2 outline-none"
								/>
							</div>
						</div>
						{/* 2nd Row */}
						<div className="flex justify-between items-center mt-2">
							{/* Left */}
							<div className="gap-2 flex">
								<Link to={"/list-yantras"}>
									<button
										className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
										style={{
											backgroundColor:
												styles.colors.tertiary,
										}}
									>
										F6-Buy
									</button>
								</Link>
								<button
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
									style={{
										backgroundColor: styles.colors.tertiary,
									}}
								>
									F5-Clear
								</button>
								<button
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
									style={{
										backgroundColor: styles.colors.tertiary,
									}}
								>
									F9-Can. Rec.
								</button>
								<button
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
									style={{
										backgroundColor: styles.colors.tertiary,
									}}
								>
									Last Receipt
								</button>
							</div>
							{/* Center */}
							<div className="justify-self-center mx-auto">
								<button
									onClick={() => setShowExit(true)}
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold bg-pink-500"
								>
									Exit
								</button>
							</div>
							{/* Right */}
							<div className="flex gap-2">
								<div className="w-12"></div>
								<div className="w-12"></div>
								<button
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
									style={{
										backgroundColor: styles.colors.tertiary,
									}}
								>
									Purchase Details
								</button>
								<button
									className="rounded-md border-slate-700 border-solid border-[1px] py-1 px-3 font-semibold"
									style={{
										backgroundColor: styles.colors.tertiary,
									}}
								>
									F7-Lucky Yantras
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Modals */}
				{showExit && <Warning setShowExit={setShowExit} />}
				{showUpcoming && (
					<Upcoming
						setShowUpcoming={setShowUpcoming}
						upcomingYantra={upcomingYantra}
						setSelectedTime={setSelectedTime}
					/>
				)}
			</div>
		</Layout>
	);
};

