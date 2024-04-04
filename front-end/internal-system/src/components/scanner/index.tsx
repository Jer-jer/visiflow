/* Built using Ant Design */
import React from "react";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

//Styles
import "./styles.scss";

export default function Scanner() {
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

	function success(result: string) {
		if (isValidUrl(result)) {
			if (scanner) {
				scanner.clear();
			}
			setScanResult(result);
			// Redirect to the scanned link
			window.location.href = result;
		} else {
			console.log("Invalid URL:", result);
			<p>invalid url</p>;
			// Reinitialize scanner to continue scanning
			if (scanner) {
				scanner.resume();
			}
		}
	}

	function error(err: any) {
		// Handle scanner errors
	}

	const desiredUrlPatterns = [
		"http://localhost:3000/visitor-form/?qr_id=",
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
