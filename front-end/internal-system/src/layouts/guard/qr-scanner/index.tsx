import React, { useState, useContext } from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import Scanner from "../../../components/scanner";
import Alert from "../../../components/alert";
import { Avatar, Button, Modal, Image } from "antd";
import { VisitorDataType } from "../../../utils/interfaces";
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
				width={600}
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
									{formatDateObjToString(visitor.expected_time_out) || "N/A"}
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
				</div>
			</Modal>
			<Modal
				width={600}
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
									{formatDateObjToString(visitor.expected_time_out) || "N/A"}
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
