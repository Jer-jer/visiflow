import React, { Dispatch, SetStateAction } from "react";

// Interfaces
import { VisitorInput, VisitorData } from "../../../utils/interfaces";

// Components
import { Input, Divider } from "antd";

interface FormProps {
	visitorId: number;
	visitors: VisitorData[];
	visitor: VisitorInput;
	increment: number;
	setVisitors: Dispatch<SetStateAction<VisitorData[]>>;
}

export default function Form({
	visitorId,
	visitors,
	visitor,
	increment,
	setVisitors,
}: FormProps) {
	function findIndexById(id: number) {
		return visitors.findIndex((item) => item.id === id);
	}

	const updateData = (value: string, property: string) => {
		const index = findIndexById(visitorId);

		setVisitors((prevVisitors) => {
			// Create a copy of the array
			const updatedVisitors = [...prevVisitors];

			switch (property) {
				case "firstName":
					updatedVisitors[index].data.firstName = value;
					break;
				case "middleName":
					updatedVisitors[index].data.middleName = value;
					break;
				case "lastName":
					updatedVisitors[index].data.lastName = value;
					break;
				case "email":
					updatedVisitors[index].data.email = value;
					break;
				case "mobile":
					const reg = /^-?\d*(\.\d*)?$/;
					if (reg.test(value) || value === "" || value === "-" || value === "+")
						updatedVisitors[index].data.mobile = value;
					break;
				case "house":
					updatedVisitors[index].data.house = value;
					break;
				case "street":
					updatedVisitors[index].data.street = value;
					break;
				case "barangay":
					updatedVisitors[index].data.barangay = value;
					break;
				case "city":
					updatedVisitors[index].data.city = value;
					break;
				case "province":
					updatedVisitors[index].data.province = value;
					break;
				case "country":
					updatedVisitors[index].data.country = value;
					break;
				default:
					console.error("Something went wrong");
			}

			return updatedVisitors;
		});
	};

	return (
		<div className="flex flex-wrap gap-[21px]">
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[150px] text-[16px] font-[400] text-[#0000004d] md:w-[150px] lg:w-[120px]">
					First Name
				</span>
				<Input
					key={increment}
					name="First Name"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.firstName}
					onChange={(event: any) => updateData(event.target.value, "firstName")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[150px] text-[16px] font-[400] text-[#0000004d]">
					Middle Name
				</span>
				<Input
					key={increment}
					name="Middle Name"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.middleName}
					onChange={(event: any) =>
						updateData(event.target.value, "middleName")
					}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[150px] text-[16px] font-[400] text-[#0000004d] md:w-[150px] lg:w-[120px]">
					Last Name
				</span>
				<Input
					key={increment}
					name="Last Name"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.lastName}
					onChange={(event: any) => updateData(event.target.value, "lastName")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%] lg:w-[430px]">
				<span className="w-[150px] text-[16px] font-[400] text-[#0000004d]">
					Email Address
				</span>
				<Input
					key={increment}
					name="Email"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.email}
					onChange={(event: any) => updateData(event.target.value, "email")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%] lg:w-[778px]">
				<span className="w-[150px] text-[16px] font-[400] text-[#0000004d]">
					Mobile Number
				</span>
				<Input
					key={increment}
					name="Mobile Number"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.mobile}
					onChange={(event: any) => updateData(event.target.value, "mobile")}
				/>
			</div>
			<Divider className="border border-[#00000030]" /> {/* Divider */}
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
					House No.
				</span>
				<Input
					key={increment}
					name="House No."
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.house}
					onChange={(event: any) => updateData(event.target.value, "house")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
					Street
				</span>
				<Input
					key={increment}
					name="Street"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.street}
					onChange={(event: any) => updateData(event.target.value, "street")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
					Barangay
				</span>
				<Input
					key={increment}
					name="Barangay."
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.barangay}
					onChange={(event: any) => updateData(event.target.value, "barangay")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
					City
				</span>
				<Input
					key={increment}
					name="City"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.city}
					onChange={(event: any) => updateData(event.target.value, "city")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
					Province
				</span>
				<Input
					key={increment}
					name="Province"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.province}
					onChange={(event: any) => updateData(event.target.value, "province")}
				/>
			</div>
			<div className="flex items-center justify-between gap-[5%]">
				<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
					Country
				</span>
				<Input
					key={increment}
					name="Country"
					className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
					value={visitor.country}
					onChange={(event: any) => updateData(event.target.value, "country")}
				/>
			</div>
		</div>
	);
}
