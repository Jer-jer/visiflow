/* Built using Ant Design */
import React from "react";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { qr_id } from "../../layouts/guard/visitor-form";
import AxiosInstance from "../../lib/axios";

//Styles
import "./styles.scss";

export default function Scanner({ onQRstatus }: any) {
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
		if (isValidUrl(result)) {
			if (qr_id !== undefined) {
				onQRstatus("Visitor Form is Ongoing");
			} else {
				//setScanResult(result);
				// if (scanner) {
				// 	scanner.clear();
				// }

				// Retrieve JWT token from local storage
				// const token = localStorage.getItem("token");

				// Append JWT token as a query parameter to the scanned URL
				// const redirectUrl = `${result}&token=${token}`;
				// Redirect to the scanned link
				// window.location.href = redirectUrl;
				AxiosInstance.get(result)
					.then((res) => {
						if (scanner) {
							scanner.clear();
						}

						const resType = res.data.type;

						switch (resType) {
							case "new-recurring": {
								window.location.href = res.data.url;
								break;
							}
							case "time-out": {
								onQRstatus("Successfully Timed-Out");
								break;
							}
							case "time-in": {
								onQRstatus("Successfully Timed-In");
								break;
							}
							default: {
								onQRstatus("Something went wrong");
								break;
							}
						}
						initializeScanner();
					})
					.catch((err) => {
						if (err && err.response) {
							onQRstatus(err.response.data.error);
						}
					});

				// setTimeout(() => {
				// 	initializeScanner();
				// }, 2000);
			}
		} else {
			onQRstatus("Invalid QR");
		}
	}

	function error(err: any) {
		// Handle scanner errors
	}

	const desiredUrlPatterns = [
		"http://localhost:5000/badge/checkBadge?visitor_id=",
		"http://localhost:5000/badge/checkBadge?qr_id=",
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
