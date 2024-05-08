/* Built using Ant Design */
import React from "react";

import { Html5QrcodeScanner } from "html5-qrcode";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { qr_id } from "../../layouts/guard/visitor-form";
import AxiosInstance from "../../lib/axios";

//Styles
import "./styles.scss";

interface scannerProps {
	setIsTimeInOpen: Dispatch<SetStateAction<boolean>>;
	setIsTimeOutOpen: Dispatch<SetStateAction<boolean>>;
	setAlertOpen: Dispatch<SetStateAction<boolean>>;
	setStatus: Dispatch<SetStateAction<boolean>>;
	setAlertMsg: Dispatch<SetStateAction<string>>;
	setVisitor: any;
	setBadgeId: any;
}

export default function Scanner({
	setIsTimeInOpen,
	setIsTimeOutOpen,
	setAlertOpen,
	setStatus,
	setAlertMsg,
	setVisitor,
	setBadgeId,
}: scannerProps) {
	const [scanResult, setScanResult] = useState<string | null>(null);

	let scanner: Html5QrcodeScanner | null = null;

	const initializeScanner = () => {
		scanner = new Html5QrcodeScanner(
			"reader",
			{
				qrbox: {
					width: 400,
					height: 400,
				},
				fps: 5,
			},
			false,
		);

		scanner.render(success, error);
	};

	useEffect(() => {
		initializeScanner();

		// Cleanup function to clear scanner when component unmounts
		return () => {
			if (scanner) {
				scanner.clear();
			}
		};
	}, []);

	function success(result: any) {
		setAlertOpen(false);

		if (isValidUrl(result)) {
			AxiosInstance.get(result)
				.then((res) => {
					if (scanner) {
						scanner.clear();
					}

					const resVisitor = res.data.visitor;
					setVisitor(resVisitor);
					const resBadgeId = res.data.badge_id;
					setBadgeId(resBadgeId);

					const resType = res.data.type;
					const resBadgeStatus = res.data.status;

					if (resType === "new-recurring") {
						window.location.href = res.data.url;
					} else if (resBadgeStatus === "inactive") {
						setIsTimeInOpen(true);
					} else if (resBadgeStatus != "inactive") {
						setIsTimeOutOpen(true);
					} else {
						setStatus(false);
						setAlertOpen(true);
						setAlertMsg("Something went wrong in scanning result");
					}

					initializeScanner();
				})
				.catch((err) => {
					if (err && err.response) {
						setStatus(false);
						setAlertOpen(true);
						setAlertMsg(err.response.data.error);
					}
				});
		} else {
			setStatus(false);
			setAlertOpen(true);
			setAlertMsg("Invalid QR");
		}
	}

	function error(err: any) {
		// Handle scanner errors
	}

	const desiredUrlPatterns = [
		// "https://gullas-visiflow-internal.onrender.com/visitor-form/?qr_id=",
		// "https://visiflow-api.onrender.com/?qr_id=",
		// "https://visiflow-api.onrender.com/?visitor_id=",
		// "https://visiflow-api.onrender.com/badge/checkBadge?visitor_id=",
		// "https://visiflow-api.onrender.com/badge/checkBadge?qr_id=",
		"http://localhost:5000/badge/checkBadge?qr_id=",
		"http://localhost:5000/badge/checkBadge?visitor_id=",
		// Add more desired URL patterns here if needed
	];

	function isValidUrl(url: string) {
		// Check if the scanned URL matches any of the desired patterns
		return desiredUrlPatterns.some((pattern) => url.startsWith(pattern));
	}

	return (
		<div className="App">
			{scanResult ? (
				<div>
					Success: <a href={scanResult}>{scanResult}</a>
				</div>
			) : (
				<div id="reader"></div>
			)}
		</div>
	);
}
