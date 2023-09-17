import React from "react";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface PendingAppointmentsDetails {
	imgSrc: string;
	date: string;
	name: string;
	desc: string;
}

interface PendingAppointmentsProps {
	pendingAppointmentDetails: PendingAppointmentsDetails[];
}

export default function PendingAppointments({
	pendingAppointmentDetails,
}: PendingAppointmentsProps) {
	return (
		<div className="w-full">
			{pendingAppointmentDetails.map((item, index) => (
				<div
					key={index}
					className={`flex h-[117px] flex-col border-t border-[#D0D2CC] py-[15px] pl-[35px] pr-[15px] ${
						index === pendingAppointmentDetails.length - 1 && "border-b"
					}`}
				>
					<div className="flex justify-start gap-[12px]">
						<div className="avatar">
							<div className="h-[50px] w-[50px] rounded-full">
								<img src={item.imgSrc} alt="" />
								{/* {item.img} */}
							</div>
						</div>
						<div className="flex flex-col">
							<span className="line-normal text-[12px] font-[100] text-black">
								{item.date}
								{/* April 16, 2023 2:00 PM */}
							</span>
							<span className="line-normal mt-[5px] text-[18px] font-[400] text-black">
								{item.name}
								{/* Dwayne Johnson */}
							</span>
							<span className="line-normal mt-[10px] text-[14px] font-[300] text-black">
								{item.desc}
								{/* Scheduled meeting with HR */}
							</span>
						</div>
					</div>
					<div className="flex justify-end">
						<a
							href="/"
							className="line-normal read-more cursor-pointer text-[14px] font-[400] text-primary-500 hover:decoration-solid hover:underline-offset-2"
						>
							Read more
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
