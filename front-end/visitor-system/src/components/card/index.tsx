import React from "react";

// Components
import { Card } from "antd";

// Styles
import "./styles.scss";

interface HeaderProps {
	title?: String;
	date?: String;
	loc?: String;
}

interface EventCardProps {
	header?: HeaderProps;
	desc?: String;
	children?: React.ReactNode;
}

const CardTitle = ({ title, date, loc }: HeaderProps) => {
	return (
		<div className="flex flex-col items-center">
			<span className="text-[28px] font-bold text-primary-500">{title}</span>
			<span className="text-[16px] font-normal">{date}</span>
			<span className="text-[16px] font-normal">{loc}</span>
		</div>
	);
};

const CardDescription = ({ desc }: EventCardProps) => {
	return (
		<div className="flex flex-col items-center">
			<span className="text-[14px] font-light text-[#4B4B4B]">{desc}</span>
		</div>
	);
};

const { Meta } = Card;

export default function EventCard({ header, desc, children }: EventCardProps) {
	return (
		<Card
			hoverable
			className="max-w-[330px] hover:cursor-default md:max-w-[584px]"
			cover={children}
		>
			<Meta
				title={
					<CardTitle
						title={header?.title}
						date={header?.date}
						loc={header?.loc}
					/>
				}
				description={<CardDescription desc={desc} />}
			/>
		</Card>
	);
}
