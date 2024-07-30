import React from "react";

interface UpcomingProps {
	setShowUpcoming: React.Dispatch<React.SetStateAction<boolean>>;
	upcomingYantra: { date: string; time: string }[];
	setSelectedTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Upcoming: React.FC<UpcomingProps> = ({
	setShowUpcoming,
	upcomingYantra,
	setSelectedTime,
}) => {
	let date = new Date();
	const handleTimeClick = (time: string) => {
		const [timePart, modifier] = time.split(" ");
		let [hours, minutes] = timePart.split(":").map(Number);

		if (modifier === "PM" && hours < 12) {
			hours += 12;
		} else if (modifier === "AM" && hours === 12) {
			hours = 0;
		}

		const newDate = new Date(date);
		newDate.setHours(hours);
		newDate.setMinutes(minutes);
		newDate.setSeconds(0);
		newDate.setMilliseconds(0);

		setSelectedTime(newDate);
		setShowUpcoming(false);
	};

	return (
		<div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-[#0f172a5e] flex items-center justify-center">
			<div className="h-fit px-6 py-12 fixed top-40 w-[95%] bg-white overflow-y-scroll rounded-md">
				<div>
					<h2
						className="font-semibold my-3"
						style={{ color: "#F6402E" }}
					>
						Yantra of:{" "}
						{date.toLocaleDateString().split("/")[0] +
							"-" +
							date.toLocaleDateString().split("/")[1] +
							"-" +
							date.toLocaleDateString().split("/")[2]}
					</h2>
					<div>
						{upcomingYantra.map((item, index) => {
							return (
								!(item.date > date.toLocaleDateString()) && (
									<button
										className="bg-[#8bd8f7] px-3 py-2 m-2 min-w-[100px]"
										key={index}
										onClick={() =>
											handleTimeClick(item.time)
										}
									>
										{item.time}
									</button>
								)
							);
						})}
					</div>
				</div>
				<div>
					<h2
						className="font-semibold my-3"
						style={{ color: "#F6402E" }}
					>
						Yantra of:{" "}
						{date.toLocaleDateString().split("/")[0] +
							"-" +
							date.toLocaleDateString().split("/")[1] +
							"-" +
							date.toLocaleDateString().split("/")[2]}
					</h2>
					<div>
						{upcomingYantra.map((item, index) => {
							return (
								item.date > date.toLocaleDateString() && (
									<button
										className="bg-[#8bd8f7] px-3 py-2 m-2 min-w-[100px]"
										key={index}
										onClick={() =>
											handleTimeClick(item.time)
										}
									>
										{item.time}
									</button>
								)
							);
						})}
					</div>
				</div>
				<button onClick={() => setShowUpcoming(false)}>Close</button>
			</div>
		</div>
	);
};

export default Upcoming;

