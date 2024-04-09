import React, { useEffect, useState } from "react";

// Interfaces
import { OfficesProps } from "../../utils/interfaces";

// Components
import { Input, Card } from "antd";

// Styles
import "./styles.scss";

// Assets
import { SearchOutlined } from "@ant-design/icons";
import AxiosInstance from "../../lib/axios";

const { Meta } = Card;

// const data: OfficesProps[] = [
// 	{
// 		title: "Office of Human Resources",
// 		op: "9:00AM - 3:00PM M-F",
// 		pic: "Ms. John Doe",
// 		location: "Bldg. 1, 4th Floor",
// 		contact: "091234567891",
// 		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
// 		availability: true,
// 	},
// 	{
// 		title: "Office of Dean",
// 		op: "11:00AM - 5:00PM M-Sat",
// 		pic: "Mr. John Doe",
// 		location: "Bldg. 1, 2nd Floor",
// 		contact: "091234567891",
// 		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
// 		availability: false,
// 	},
// 	{
// 		title: "Office of Head of Security",
// 		op: "10:00AM - 2:00PM M-W",
// 		pic: "Ms. Mark Smith",
// 		location: "Bldg. 1, 1st Floor",
// 		contact: "091234567891",
// 		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
// 		availability: true,
// 	},
// 	{
// 		title: "Office of Vice President",
// 		op: "9:00AM - 3:00PM M-F",
// 		pic: "Ms. John Doe",
// 		location: "Bldg. 1, 4th Floor",
// 		contact: "091234567891",
// 		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
// 		availability: false,
// 	},
// 	{
// 		title: "Office of President",
// 		op: "9:00AM - 3:00PM M-F",
// 		pic: "Ms. John Doe",
// 		location: "Bldg. 1, 4th Floor",
// 		contact: "091234567891",
// 		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
// 		availability: true,
// 	},
// ];

export default function Offices() {
	const [office, setOffice] = useState<OfficesProps[]>([]);
	const [searchValue, setSearchValue] = useState("");

	const CardDescription = ({
		op,
		dayOp,
		pic,
		email,
		location,
		contact,
	}: OfficesProps) => {
		return (
			<div className="grid grid-cols-3 gap-4 text-[#0C0D0D]">
				<span className="text-[15px] font-[400]">Operating Hours:</span>
				<p className="col-span-2 rounded-[5px] bg-white p-[4px] px-[8px]">
					{op}
				</p>
				<span className="text-[15px] font-[400]">Days Available:</span>
				<p className="col-span-2 rounded-[5px] bg-white p-[4px] px-[8px]">
					{dayOp}
				</p>
				<span className="text-[15px] font-[400]">Personnel in Charge:</span>
				<p className="col-span-2 rounded-[5px] bg-white p-[4px] px-[8px]">
					{pic}
				</p>
				<span className="text-[15px] font-[400]">Email:</span>
				<p className="col-span-2 rounded-[5px] bg-white p-[4px] px-[8px]">
					{email}
				</p>
				<span className="text-[15px] font-[400]">Location:</span>
				<p className="col-span-2 rounded-[5px] bg-white p-[4px] px-[8px]">
					{location}
				</p>
				<span className="text-[15px] font-[400]">Contact:</span>
				<p className="col-span-2 rounded-[5px] bg-white p-[4px] px-[8px]">
					{contact}
				</p>
				{/* <div
					className={`w-fit rounded-[5px]  ${
						availability ? "bg-primary-500" : "bg-error"
					}  px-[18px] py-[6px]`}
				>
					<span className="text-[15px] font-[400] uppercase text-white">
						{availability ? "Available" : "Unavailable"}
					</span>
				</div> */}
			</div>
		);
	};
	//for use effect to call fetch data when opening window
	useEffect(() => {
		if (searchValue === "") {
			fetchData();
		} else {
			handleSearch();
		}
	}, [searchValue]);

	//fetch data for display
	const fetchData = async () => {
		try {
			const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			const response = await AxiosInstance.get("/offices/");
			const data = response.data.office;
			const convertedData: OfficesProps[] = data.map((office: any) => ({
				title: office.name,
				op:
					new Date(office.opentime).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}) +
					" - " +
					new Date(office.closetime).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				dayOp: days.filter((day, index) => office.openday[index]).join(", "),
				pic: office.pic,
				email: office.email,
				location: office.roomNo,
				contact: office.contact,
				img: office.officeImg,
			}));
			setOffice(convertedData);
		} catch (error) {
			console.error("Error fetching offices:", error);
		}
	};

	// useEffect(() => {
	// 	console.log("test", office)
	// }, [office])

	const handleSearch = async () => {
		try {
			const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			const response = await AxiosInstance.post("/offices/search", {
				query: searchValue,
			});
			const data = response.data.office;
			const convertedData: OfficesProps[] = data.map((office: any) => ({
				title: office.name,
				op:
					new Date(office.opentime).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}) +
					" - " +
					new Date(office.closetime).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				dayOp: days.map((day, index) => {
					return office.openday[index] ? "" : day;
				}),
				pic: office.pic,
				email: office.email,
				location: office.roomNo,
				contact: office.contact,
				img: office.officeImg,
			}));
			setOffice(convertedData);
		} catch (error) {
			console.error("Error fetching offices:", error);
		}
	};

	return (
		<div className="item-center align-center flex justify-center">
			<div className="container ml-[24px] mr-[24px] mt-[25px] flex flex-col items-center gap-[50px] md:ml-[40px] md:mt-[50px] lg:items-start lg:gap-[94px]">
				<Input
					className="search-input w-full md:w-[584px] lg:w-[450px]"
					size="large"
					placeholder="Search"
					value={searchValue}
					onPressEnter={handleSearch}
					onChange={(e) => setSearchValue(e.target.value)}
					prefix={<SearchOutlined />}
				/>

				<div className="flex w-full justify-center">
					<div className="mb-[120px] grid w-full grid-cols-1 justify-center gap-[56px] p-[32px] sm:grid-cols-2 md:grid-cols-3 lg:justify-normal">
						{office.map((off, key) => (
							<Card
								hoverable
								key={key}
								className="bg-[#DFEAEF] hover:cursor-default md:max-w-[700px] lg:max-w-[700px]"
								cover={<img alt="example" src={off.img} className="w-full h-64 object-cover" />}
							>
								<Meta
									className=""
									title={
										<span className="flex justify-center pb-[13px] text-[20px] font-[500] text-[#0C0D0D] ">
											{off.title}
										</span>
									}
									description={
										<CardDescription
											op={off.op}
											dayOp={off.dayOp}
											pic={off.pic}
											location={off.location}
											contact={off.contact}
											email={off.email}
										/>
									}
								/>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
