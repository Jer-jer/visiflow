import React, { useEffect, useState } from "react";

// Components
import HomeBox from "../../components/home-box";

// Styles
import "./styles.scss";
import AxiosInstace from "../../lib/axios";

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
	children: React.ReactNode;
}

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
}: AnnouncementProps) => {
	return (
		<div
			className={`w-[80%] pb-[15px] text-center ${size} font-[300] text-[#4B4B4B] ${responsive}`}
		>
			{children}
		</div>
	);
};

interface AnnouncementModel {
	_id: string,
	title: string,
	message: string
}

export default function Home() {
	const desktopMedia = window.matchMedia("(min-width: 1024px)");
	const [announcement, setAnnouncement] = useState<AnnouncementModel[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async() => {
		try {
			const response = await AxiosInstace.get('/announcements/')
			const data = response.data.announce
			const convertedData: AnnouncementModel[] = data.map((announcement: any) => ({
				_id: announcement._id,
				title: announcement.title,
				message: announcement.message,
			  }));
			setAnnouncement(convertedData);
		  } catch (error) {
			console.error('Error fetching announcements:', error);
		  }
	}

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
				<div className="flex flex-col items-center justify-center gap-[36px]">
					<div className="mb-[40px] flex w-[90%] justify-center gap-[46px] flex-wrap">
						{announcement.map((announce) => (
							<HomeBox
							mainClass="flex w-[42%] items-center justify-center"
							headerSize="text-[32px]"
							headerText={announce.title}
							>
								<AnnouncementAdvisoryProps size="text-[20px]">
									<span>
										{announce.message}
									</span>
								</AnnouncementAdvisoryProps>
							</HomeBox>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center gap-[36px]">
					<HomeBox
						mainClass="h-fit w-[90%]"
						headerSize="text-[22px]"
						headerText="Visiting Hours"
					>
						<VisitingHours size="text-[14px]" />
					</HomeBox>
					<HomeBox
						mainClass="h-fit w-[90%]"
						headerSize="text-[22px]"
						headerText="Dress Code"
					>
						<DressCode responsive="md:w-[40%]" />
					</HomeBox>
					<HomeBox
						mainClass="h-fit w-[90%]"
						headerSize="text-[22px]"
						headerText="Announcement"
					>
						<AnnouncementAdvisoryProps responsive="md:w-[50%]">
							<span>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam
							</span>
						</AnnouncementAdvisoryProps>
					</HomeBox>
					<HomeBox
						mainClass="mb-[30px] h-fit w-[90%]"
						headerSize="text-[22px]"
						headerText="Traffic Advisory"
					>
						<AnnouncementAdvisoryProps responsive="md:w-[50%]">
							<span>
								Excepteur sint occaecat cupidatat non proident, sunt in culpa
								qui officia deserunt mollit anim id est laborum
							</span>
						</AnnouncementAdvisoryProps>
					</HomeBox>
				</div>
			)}
		</div>
	);
}
