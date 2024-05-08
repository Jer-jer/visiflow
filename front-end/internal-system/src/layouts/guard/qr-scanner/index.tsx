import React, { useState, useContext } from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import Scanner from "../../../components/scanner";
import Alert from "../../../components/alert";
import {
	Avatar,
	Button,
	Form,
	Modal,
	Image,
	Input,
	Select,
	DatePicker,
	Spin,
} from "antd";
import { VisitorDataType, IDPictureProps } from "../../../utils/interfaces";
import { WidthContext } from "../../logged-in";

//Utils
import { formatDateObjToString, formatDateToISO } from "../../../utils";
import { UserOutlined } from "@ant-design/icons";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";
import axios from "axios";
import AxiosInstance from "../../../lib/axios";

export default function QrScannerLayout() {
	const desktopMedia = window.matchMedia("(min-width: 1024px)");
	const [idPicture] = useState<IDPictureProps>({
		//In case there are no pictures
		front:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
		back: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
		selfie:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2d0041db-96ab-4012-b808-2cf1a664da62/d4ci082-7c5296e1-da7e-4d78-bc19-09123ba8da8f.png/v1/fill/w_600,h_600/profile_unavailable_by_whledo_d4ci082-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAwIiwicGF0aCI6IlwvZlwvMmQwMDQxZGItOTZhYi00MDEyLWI4MDgtMmNmMWE2NjRkYTYyXC9kNGNpMDgyLTdjNTI5NmUxLWRhN2UtNGQ3OC1iYzE5LTA5MTIzYmE4ZGE4Zi5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwXReMzAA7SgocVUaM4qjm8SLZTdyyNoiZ_mD-ZSH7o",
	});

	const width = useContext(WidthContext);

	//Alert status
	const [status, setStatus] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	//Modal status
	const [isTimeInOpen, setIsTimeInOpen] = useState(false);
	const [isTimeOutOpen, setIsTimeOutOpen] = useState(false);

	//Visitor status
	const [visitor, setVisitor] = useState<VisitorDataType | null>(null);
	const [badgeId, setBadgeId] = useState(null);

	const handleTimeInCancel = () => {
		setIsTimeInOpen(false);
	};

	const handleTimeInOk = async () => {
		await AxiosInstance.post("/badge/timeRecord", {
			_id: badgeId,
			record: true,
		})
			.then(() => {
				setIsTimeInOpen(false);
				setStatus(true);
				setAlertOpen(true);
				setAlertMsg("Successfully Timed-In");
			})
			.catch((err) => {
				if (err && err.response) {
					setIsTimeInOpen(false);
					setStatus(false);
					setAlertOpen(true);
					setAlertMsg(err.response.data.error);
				}
			});
	};

	const handleTimeOutCancel = () => {
		setIsTimeOutOpen(false);
	};

	const handleTimeOutOk = async () => {
		await AxiosInstance.post("/badge/timeRecord", {
			_id: badgeId,
			record: false,
		})
			.then(() => {
				setIsTimeOutOpen(false);
				setStatus(true);
				setAlertOpen(true);
				setAlertMsg("Successfully Timed-Out");
			})
			.catch((err) => {
				if (err && err.response) {
					setIsTimeOutOpen(false);
					setStatus(false);
					setAlertOpen(true);
					setAlertMsg(err.response.data.error);
				}
			});
	};

	return (
		<>
			<Modal
				width={700}
				title={
					<span className="text-[24px] font-semibold text-primary-500">
						Time-In
					</span>
				}
				open={isTimeInOpen}
				onCancel={handleTimeInCancel}
				//onOk={handleSuccessOk}
				footer={[
					<Button key="back" onClick={handleTimeInCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleTimeInOk}>
						Time-In
					</Button>,
				]}
			>
				<div className="flex flex-col items-center gap-5 md:flex-row">
					<div>
						<Avatar
							size={width === 1210 ? 150 : 220}
							src={visitor && visitor.id_picture.selfie}
							icon={<UserOutlined />}
						/>
					</div>
					{!desktopMedia.matches ? (
						<>
							<div className="flex flex-col gap-5">
								<div className="flex gap-1">
									<span className="w-[45%]">First Name:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.first_name || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Middle Name:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.middle_name || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Last Name:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.last_name || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[50%]">Expected Time-In:</span>
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_in) || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[50%]">Expected Time-Out:</span>
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_out) ||
												"N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">What:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.what || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[75%]">Where:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.where || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[50%]">When:</span>
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.purpose.when) || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Who:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.who || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Plate Number:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.plate_num || "N/A"}
										</span>
									)}
								</div>
							</div>
						</>
					) : (
						<>
							<div className="flex gap-5">
								<div className="flex flex-col items-end">
									<span>First Name:</span>

									<span>Middle Name:</span>

									<span>Last Name:</span>

									<span>Expected Time-In:</span>

									<span>Expected Time-Out:</span>

									<span>What:</span>

									<span>Where:</span>

									<span>When:</span>

									<span>Who:</span>

									<span>Plate Number:</span>
								</div>
								<div className="flex flex-col">
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.first_name || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.middle_name || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.last_name || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_in) || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_out) ||
												"N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.what || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.where || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.purpose.when) || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.who || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.plate_num || "N/A"}
										</span>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</Modal>
			<Modal
				width={700}
				title={
					<span className="text-[24px] font-semibold text-primary-500">
						Time-Out
					</span>
				}
				open={isTimeOutOpen}
				onCancel={handleTimeOutCancel}
				//onOk={handleSuccessOk}
				footer={[
					<Button key="back" onClick={handleTimeOutCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleTimeOutOk}>
						Time-Out
					</Button>,
				]}
			>
				<div className="flex flex-col items-center gap-5 md:flex-row">
					<div>
						<Avatar
							size={width === 1210 ? 150 : 220}
							src={visitor && visitor.id_picture.selfie}
							icon={<UserOutlined />}
						/>
					</div>
					{!desktopMedia.matches ? (
						<>
							<div className="flex flex-col gap-5">
								<div className="flex gap-1">
									<span className="w-[45%]">First Name:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.first_name || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Middle Name:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.middle_name || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Last Name:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.last_name || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[50%]">Expected Time-In:</span>
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_in) || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[50%]">Expected Time-Out:</span>
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_out) ||
												"N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">What:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.what || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[75%]">Where:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.where || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[50%]">When:</span>
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.purpose.when) || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Who:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.who || "N/A"}
										</span>
									)}
								</div>
								<div className="flex gap-1">
									<span className="w-[45%]">Plate Number:</span>
									{visitor && (
										<span className="text-primary-600">
											{visitor.plate_num || "N/A"}
										</span>
									)}
								</div>
							</div>
						</>
					) : (
						<>
							<div className="flex gap-5">
								<div className="flex flex-col items-end">
									<span>First Name:</span>

									<span>Middle Name:</span>

									<span>Last Name:</span>

									<span>Expected Time-In:</span>

									<span>Expected Time-Out:</span>

									<span>What:</span>

									<span>Where:</span>

									<span>When:</span>

									<span>Who:</span>

									<span>Plate Number:</span>
								</div>
								<div className="flex flex-col">
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.first_name || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.middle_name || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.visitor_details.name.last_name || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_in) || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.expected_time_out) ||
												"N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.what || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.where || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{formatDateObjToString(visitor.purpose.when) || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.purpose.who || "N/A"}
										</span>
									)}
									{visitor && (
										<span className="text-primary-600">
											{visitor.plate_num || "N/A"}
										</span>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</Modal>
			<div className="mx-3 mb-[35px] mt-3 flex md:ml-2 md:mr-[25px]">
				<div className="w-[380px] flex-auto md:w-[761px]">
					<div
						className={`transition-alert absolute z-[1] w-[380px] scale-y-0 ease-in-out ${
							alertOpen && "scale-y-100"
						}`}
					>
						<Alert
							globalCustomStyling={`flex w-[380px] overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
							statusStyling="flex w-12 items-center justify-center"
							statusColor={status ? "bg-primary-500" : "bg-error-500"}
							spanStyling="font-semibold"
							statusTextHeaderColor={
								status ? "text-primary-500" : "text-error-500"
							}
							descStyling="text-sm text-gray-600"
							header="Information Box"
							desc={alertMsg}
							open={alertOpen}
							setOpen={setAlertOpen}
						/>
					</div>
					<OuterContainer header="QR SCANNER">
						<InnerContainer>
							<div className="mb-[35px] ml-[25px] mr-[25px] mt-3 flex h-fit flex-col items-center justify-center gap-20">
								<div className="flex flex-col items-center justify-center gap-5">
									<Scanner
										setIsTimeInOpen={setIsTimeInOpen}
										setIsTimeOutOpen={setIsTimeOutOpen}
										setAlertOpen={setAlertOpen}
										setStatus={setStatus}
										setAlertMsg={setAlertMsg}
										setVisitor={setVisitor}
										setBadgeId={setBadgeId}
									/>
									<h1>PLACE THE QR INSIDE THE BOX</h1>
									{/* <h1>INVALID QR</h1> */}
								</div>
							</div>
						</InnerContainer>
					</OuterContainer>
				</div>
			</div>
		</>
	);
}
