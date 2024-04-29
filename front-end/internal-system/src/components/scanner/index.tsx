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

	useEffect(() => {
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
								window.location.href = "/qr-scanner";
								break;
							}
							case "time-in": {
								onQRstatus("Successfully Timed-In");
								window.location.href = "/qr-scanner";
								break;
							}
							default: {
								onQRstatus("Something went wrong");
								window.location.href = "/qr-scanner";
								break;
							}
						}
						console.log(res.data);
					})
					.catch((err) => {
						// if (err && err.response) {
						// 	console.log(err.res.data.error);
						// 	onQRstatus(err.res.data.error);
						// 	window.location.href = "/qr-scanner";
						// }
					});
			}
		} else {
			onQRstatus("Invalid QR");
		}
	}

	function error(err: any) {
		// Handle scanner errors
	}

	const desiredUrlPatterns = [
		"https://gullas-visiflow-internal.onrender.com/visitor-form/?qr_id=",
		"https://visiflow-api.onrender.com/?qr_id=",
		"https://visiflow-api.onrender.com/?visitor_id=",
		"https://visiflow-api.onrender.com/badge/checkBadge?visitor_id=",
		"https://visiflow-api.onrender.com/badge/checkBadge?qr_id=",
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
