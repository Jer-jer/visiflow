import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Interfaces
import { VisitorDataType } from "../../utils/interfaces";

// Store
import { AppDispatch } from "../../store";

// Actions
import { openVisitor } from "../../states/visitors";

// Utils
import { formatDateString } from "../../utils";

//Styles
import "../../utils/variables.scss";
import "./styles.scss";

interface PendingAppointmentsProps {
	pendingAppointments: VisitorDataType[];
}

export default function PendingAppointments({
	pendingAppointments,
}: PendingAppointmentsProps) {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const toVisitorManagement = (visitor: VisitorDataType) => {
		navigate(`/visitor-management`);
		dispatch(openVisitor(visitor));
	};
	return (
		<div className="w-full">
			{pendingAppointments.map((item, index) => (
				<div
					key={index}
					className={`flex h-fit flex-col border-t border-[#D0D2CC] py-[15px] pl-[35px] pr-[15px] ${
						index === pendingAppointments.length - 1 && "border-b"
					}`}
				>
					<div className="flex justify-start gap-[12px]">
						<div className="avatar">
							<div className="h-[50px] w-[50px] rounded-full">
								<img src={item.id_picture.selfie} alt="" />
							</div>
						</div>
						<div className="flex flex-col">
							<span className="line-normal text-[12px] font-[100] text-black">
								{formatDateString(item.purpose.when)}
							</span>
							<span className="line-normal mt-[5px] text-[18px] font-[400] text-black">
								{item.visitor_details.name.last_name}
								{", "}
								{item.visitor_details.name.first_name}{" "}
								{item.visitor_details.name.middle_name}
							</span>
							<span className="line-normal mt-[8px] text-[14px] font-[300] text-black">
								What:
								{item.purpose.what.map((purpose, index) => {
									return (
										<span key={index}>
											{" "}
											{purpose}
											{","}
										</span>
									);
								})}
							</span>
							<span className="line-normal mt-[4px] text-[14px] font-[300] text-black">
								Where:
								{item.purpose.where.map((purpose, index) => {
									return (
										<span key={index}>
											{" "}
											{purpose}
											{","}
										</span>
									);
								})}
							</span>
							<span className="line-normal mt-[4px] text-[14px] font-[300] text-black">
								Who:
								{item.purpose.who.map((purpose, index) => {
									return (
										<span key={index}>
											{" "}
											{purpose}
											{","}
										</span>
									);
								})}
							</span>
						</div>
					</div>
					<div className="flex justify-end">
						<button
							className="line-normal read-more cursor-pointer text-[14px] font-[400] text-primary-500 hover:decoration-solid hover:underline-offset-2"
							onClick={() => toVisitorManagement(item)}
						>
							Read more
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
