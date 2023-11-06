import React from "react";

// Interfaces
import { OfficesProps } from "../../utils/interfaces";

// Components
import { Input, Card } from "antd";

// Styles
import "./styles.scss";

// Assets
import { SearchOutlined } from "@ant-design/icons";

const { Meta } = Card;

const data: OfficesProps[] = [
	{
		title: "Office of Human Resources",
		op: "9:00AM - 3:00PM M-F",
		pic: "Ms. John Doe",
		location: "Bldg. 1, 4th Floor",
		contact: "091234567891",
		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		availability: true,
	},
	{
		title: "Office of Dean",
		op: "11:00AM - 5:00PM M-Sat",
		pic: "Mr. John Doe",
		location: "Bldg. 1, 2nd Floor",
		contact: "091234567891",
		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		availability: false,
	},
	{
		title: "Office of Head of Security",
		op: "10:00AM - 2:00PM M-W",
		pic: "Ms. Mark Smith",
		location: "Bldg. 1, 1st Floor",
		contact: "091234567891",
		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		availability: true,
	},
	{
		title: "Office of Vice President",
		op: "9:00AM - 3:00PM M-F",
		pic: "Ms. John Doe",
		location: "Bldg. 1, 4th Floor",
		contact: "091234567891",
		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		availability: false,
	},
	{
		title: "Office of President",
		op: "9:00AM - 3:00PM M-F",
		pic: "Ms. John Doe",
		location: "Bldg. 1, 4th Floor",
		contact: "091234567891",
		img: "https://s3-alpha-sig.figma.com/img/1d30/0d05/f0e7547ac0886e050968872c37178b8b?Expires=1699228800&Signature=Tvx~-eAdBtdtvT4oRbjjkWYG9Ok4LmxysLLAsD9F3dkAHqWWXDBzrAqa4YRrQFZE4vMQodqFENZSNmBdl92qPlYRS1KFKeGF0Knx73kgpldR77R4FgFpjMe3okpy0AkjwecWrpp6xWOWXL5HpVCr5WMOt1AtmRa~i4L1m7EelT7V3eSvHGNdG5bTWB~xmOxgZx5LgPU6PvHZeYqJilJ3Doa2XCXW0AG3mziB3Y3mb1jAF0zVwblc2EfDd~X~kKiwumipNdHOctJ3rLaxe7qWDrSz7i~gyjfpCfos6q2M5mTbWZU9uEnEJ9IuZVAbtKHrIOwWSARRvhDD-Ye7pOkSKA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
		availability: true,
	},
];

export default function Offices() {
	const CardDescription = ({
		op,
		pic,
		location,
		contact,
		availability,
	}: OfficesProps) => {
		return (
			<div className="flex-start flex flex-col gap-[12px] text-[#0C0D0D]">
				<div className="flex justify-between">
					<span className="text-[15px] font-[400]">Operating Hours</span>
					<p className="w-[60%] rounded-[5px] bg-white pl-[5px]">{op}</p>
				</div>
				<div className="flex justify-between">
					<span className="text-[15px] font-[400]">Personnel in Charge</span>
					<p className="w-[60%] rounded-[5px] bg-white pl-[5px]">{pic}</p>
				</div>
				<div className="flex justify-between">
					<span className="text-[15px] font-[400]">Location</span>
					<p className="w-[60%] rounded-[5px] bg-white pl-[5px]">{location}</p>
				</div>
				<div className="flex justify-between">
					<span className="text-[15px] font-[400]">Contact</span>
					<p className="w-[60%] rounded-[5px] bg-white pl-[5px]">{contact}</p>
				</div>
				<div
					className={`w-fit rounded-[5px]  ${
						availability ? "bg-primary-500" : "bg-error"
					}  px-[18px] py-[6px]`}
				>
					<span className="text-[15px] font-[400] uppercase text-white">
						{availability ? "Available" : "Unavailable"}
					</span>
				</div>
			</div>
		);
	};
	return (
		<div className="ml-[24px] mr-[24px] mt-[25px] flex flex-col items-center gap-[50px] md:ml-[40px] md:mt-[50px] lg:items-start lg:gap-[94px]">
			<Input
				className="search-input w-full md:w-[584px] lg:w-[450px]"
				size="large"
				placeholder="Search"
				prefix={<SearchOutlined />}
			/>

			<div className="mb-[120px] flex flex-wrap justify-center gap-[56px] lg:justify-normal">
				{data.map((office, key) => (
					<Card
						hoverable
						key={key}
						className="bg-[#DFEAEF] hover:cursor-default md:max-w-[584px] lg:max-w-[415px]"
						cover={<img alt="example" src={office.img} />}
					>
						<Meta
							className=""
							title={
								<span className="flex justify-center pb-[13px] text-[20px] font-[500] text-[#0C0D0D] ">
									{office.title}
								</span>
							}
							description={
								<CardDescription
									op={office.op}
									pic={office.pic}
									location={office.location}
									contact={office.contact}
									availability={office.availability}
								/>
							}
						/>
					</Card>
				))}
			</div>
		</div>
	);
}
