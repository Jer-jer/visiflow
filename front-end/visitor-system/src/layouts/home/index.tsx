import React, { useEffect, useState } from "react";

// Components
import HomeBox from "../../components/home-box";

// Styles
import "./styles.scss";
import AxiosInstance from "../../lib/axios";

// Assets

interface VisitingHoursProps {
	size: String;
}

interface DressCodeProps {
	sizeOne?: String;
	sizeTwo?: String;
	responsive?: String;
}

interface AnnouncementProps {
	size?: String;
	responsive?: String;
	date?: String;
	children: React.ReactNode;
}

//! Don't delete yet
const VisitingHours = ({ size }: VisitingHoursProps) => {
	return (
		<>
			<div className="flex flex-col items-center justify-center pb-[5px]">
				<span className={`${size} font-[300] text-[#4B4B4B]`}>
					Monday to Friday
				</span>
				<span className={`${size} font-[300] text-[#4B4B4B]`}>
					9:00 AM to 6:00 PM
				</span>
			</div>
			<div className="flex flex-col items-center justify-center pb-[15px]">
				<span className={`${size} font-[300] text-[#4B4B4B]`}>
					Satruday to Sunday
				</span>
				<span className={`${size} font-[300] text-[#4B4B4B]`}>
					9:00 AM to 12:00 PM
				</span>
			</div>
		</>
	);
};

//! Don't delete yet
const DressCode = ({ sizeOne, sizeTwo, responsive }: DressCodeProps) => {
	return (
		<>
			<div className={`${sizeOne} font-[500] text-[#4B4B4B]`}>
				<span>DON'Ts</span>
			</div>
			<div
				className={`w-[80%] pb-[15px] text-center ${sizeTwo} font-[300] text-[#4B4B4B] ${responsive}`}
			>
				<span>
					Sleeveless tops, Slippers, Shorts, Tattered Jeans, Legginsg, Cap,
					Sunglasses
				</span>
			</div>
		</>
	);
};

const AnnouncementAdvisoryProps = ({
	size,
	responsive,
	children,
	date,
}: AnnouncementProps) => {
	return (
		<div
			className={`w-[80%] overflow-auto pb-[15px] text-center ${size} font-[300] text-[#4B4B4B] ${responsive}`}
		>
			{children}
		</div>
	);
};

interface AnnouncementModel {
	_id: string;
	title: string;
	message: string;
	updatedAt: string;
	priority: number;
}

export default function Home() {
	const desktopMedia = window.matchMedia("(min-width: 1024px)");
	const [announcement, setAnnouncement] = useState<AnnouncementModel[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await AxiosInstance.get("/announcements/");
			const data = response.data.announce;
			const convertedData: AnnouncementModel[] = data.map(
				(announcement: any) => ({
					_id: announcement._id,
					title: announcement.title,
					message: announcement.message,
					updatedAt: new Date(announcement.updatedAt)
						.toISOString()
						.split("T")[0],
					priority: announcement.prio,
				}),
			);
			const sortedAnnouncements = [...convertedData].sort(
				(a, b) => a.priority - b.priority,
			);
			setAnnouncement(sortedAnnouncements);
		} catch (error) {
			console.error("Error fetching announcements:", error);
		}
	};

	return (
		<div className="flex flex-col justify-center gap-[36px]">
			<div className="cover-photo">
				<div className="cover-color-gradient flex h-[300px] w-full items-end justify-center md:h-[400px]">
					<span className="pb-[16px] text-[32px] text-white md:text-[54px]">
						Welcome
					</span>
				</div>
			</div>
			{desktopMedia.matches ? (
				<div className="mb-[50px] flex flex-row-reverse flex-wrap-reverse items-center justify-center gap-[36px]">
					{announcement.map((announce, index) => (
						<HomeBox
							key={index}
							mainClass="flex w-[42%] items-center justify-center"
							headerSize="text-[32px]"
							headerText={announce.title}
							date={announce.updatedAt}
						>
							<AnnouncementAdvisoryProps size="text-[20px]">
								<span>{announce.message}</span>
							</AnnouncementAdvisoryProps>
						</HomeBox>
					))}
				</div>
			) : (
				<div className="mb-[50px] flex flex-col items-center justify-center gap-[36px]">
					{/* 
					! TEMPLATE DON'T REMOVE
					<HomeBox
						mainClass="h-fit w-[90%]"
						headerSize="text-[22px]"
						headerText="Visiting Hours"
					>
						<VisitingHours size="text-[14px]" />
					</HomeBox> 
					*/}
					{announcement.map((announce, index) => (
						<HomeBox
							key={index}
							mainClass="h-fit w-[90%]"
							headerSize="text-[22px]"
							headerText={announce.title}
							date={announce.updatedAt}
						>
							<AnnouncementAdvisoryProps responsive="md:w-[50%]">
								<span>{announce.message}</span>
							</AnnouncementAdvisoryProps>
						</HomeBox>
					))}
				</div>
			)}
		</div>
	);
}
