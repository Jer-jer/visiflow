// import React, { Dispatch, SetStateAction } from "react";
// import { z } from "zod";

// // Components
// import { Input, Divider, Form } from "antd";

// // Interfaces
// import { VisitorInput, VisitorData } from "../../../utils/interfaces";
// import { VisitorZod } from "../../../utils/zodSchemas";

// // Styles
// import "./form.scss";

// interface FormProps {
// 	visitorId: number;
// 	visitors: VisitorData[];
// 	visitor: VisitorInput;
// 	increment: number;
// 	setVisitors: Dispatch<SetStateAction<VisitorData[]>>;
// }

// type VisitorVal = z.infer<typeof VisitorZod>;

// export default function StepTwoForm({
// 	visitorId,
// 	visitors,
// 	visitor,
// 	increment,
// 	setVisitors,
// }: FormProps) {
// 	function findIndexById(id: number) {
// 		return visitors.findIndex((item) => item.id === id);
// 	}

// 	const updateData = (value: string, property: string) => {
// 		const index = findIndexById(visitorId);

// 		setVisitors((prevVisitors) => {
// 			const updatedVisitors = [...prevVisitors];

// 			switch (property) {
// 				case "firstName":
// 					updatedVisitors[index].data.firstName = value;
// 					break;
// 				case "middleName":
// 					updatedVisitors[index].data.middleName = value;
// 					break;
// 				case "lastName":
// 					updatedVisitors[index].data.lastName = value;
// 					break;
// 				case "email":
// 					updatedVisitors[index].data.email = value;
// 					break;
// 				case "mobile":
// 					const reg = /^-?\d*(\.\d*)?$/;
// 					if (reg.test(value) || value === "" || value === "-" || value === "+")
// 						updatedVisitors[index].data.mobile = value;
// 					break;
// 				case "house":
// 					updatedVisitors[index].data.house = value;
// 					break;
// 				case "street":
// 					updatedVisitors[index].data.street = value;
// 					break;
// 				case "barangay":
// 					updatedVisitors[index].data.barangay = value;
// 					break;
// 				case "city":
// 					updatedVisitors[index].data.city = value;
// 					break;
// 				case "province":
// 					updatedVisitors[index].data.province = value;
// 					break;
// 				case "country":
// 					updatedVisitors[index].data.country = value;
// 					break;
// 				default:
// 					console.error("Something went wrong");
// 			}

// 			return updatedVisitors;
// 		});
// 	};

// 	return (
// 		<div className="flex flex-wrap gap-[21px]">
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[150px] text-[16px] font-[400] text-[#0000004d]">
// 							First Name
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="First Name"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.firstName}
// 						onChange={(event: any) =>
// 							updateData(event.target.value, "firstName")
// 						}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[150px] text-[16px] font-[400] text-[#0000004d]">
// 							Middle Name
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Middle Name"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.middleName}
// 						onChange={(event: any) =>
// 							updateData(event.target.value, "middleName")
// 						}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[150px] text-[16px] font-[400] text-[#0000004d] md:w-[150px] lg:w-[120px]">
// 							Last Name
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Last Name"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.lastName}
// 						onChange={(event: any) =>
// 							updateData(event.target.value, "lastName")
// 						}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%] lg:w-[50%]">
// 				<Form.Item
// 					className="form-item m-0 lg:w-full"
// 					label={
// 						<span className="w-[150px] text-[16px] font-[400] text-[#0000004d]">
// 							Email Address
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Email"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent lg:w-full"
// 						value={visitor.email}
// 						onChange={(event: any) => updateData(event.target.value, "email")}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%] lg:w-[48%]">
// 				<Form.Item
// 					className="form-item m-0 lg:w-full"
// 					label={
// 						<span className="w-[150px] text-[16px] font-[400] text-[#0000004d]">
// 							Mobile Number
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Mobile Number"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent lg:w-full"
// 						value={visitor.mobile}
// 						onChange={(event: any) => updateData(event.target.value, "mobile")}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<Divider className="border border-[#00000030]" /> {/* Divider */}
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
// 							House No.
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="House No."
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.house}
// 						onChange={(event: any) => updateData(event.target.value, "house")}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
// 							Street
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Street"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.street}
// 						onChange={(event: any) => updateData(event.target.value, "street")}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
// 							Barangay
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Barangay."
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.barangay}
// 						onChange={(event: any) =>
// 							updateData(event.target.value, "barangay")
// 						}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
// 							City
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="City"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.city}
// 						onChange={(event: any) => updateData(event.target.value, "city")}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
// 							Province
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Province"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.province}
// 						onChange={(event: any) =>
// 							updateData(event.target.value, "province")
// 						}
// 					/>
// 				</Form.Item>
// 			</div>
// 			<div className="flex items-center justify-between gap-[5%]">
// 				<Form.Item
// 					className="form-item m-0"
// 					label={
// 						<span className="w-[120px] text-[16px] font-[400] text-[#0000004d]">
// 							Country
// 						</span>
// 					}
// 					rules={[{ required: true }]}
// 				>
// 					<Input
// 						key={increment}
// 						name="Country"
// 						className="rounded-[5px] border-none bg-[#DFEAEF] focus:outline-0 focus:ring-transparent"
// 						value={visitor.country}
// 						onChange={(event: any) => updateData(event.target.value, "country")}
// 					/>
// 				</Form.Item>
// 			</div>
// 		</div>
// 	);
// }
