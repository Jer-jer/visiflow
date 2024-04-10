import React, { useState, useEffect } from "react";

//Components
import OuterContainer from "../../../components/container";
import InnerContainer from "../../../components/container/inner-container";
import Scanner from "../../../components/scanner";
import Alert from "../../../components/alert";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

export default function QrScannerLayout() {
	const [status, setStatus] = useState(false);
	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	function handleQRstatus(message: string) {
		setStatus(false);
		if (message === "Successfully Timed-In/Out") {
			setStatus(true);
		}
		setAlertMsg(message);
		setAlertOpen(true);
	}

	return (
		<div className="mb-[35px] ml-2 mt-3 flex">
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
								<Scanner onQRstatus={handleQRstatus} />
								<h1>PLACE THE QR INSIDE THE BOX</h1>
								{/* <h1>INVALID QR</h1> */}
							</div>
						</div>
					</InnerContainer>
				</OuterContainer>
			</div>
		</div>
	);
}
