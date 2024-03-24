/* Built using Ant Design */
import React from "react";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

//Styles
import "./styles.scss";

export default function Scanner() {
	const [scanResult, setScanResult] = useState(null);

	useEffect(() => {
		const scanner = new Html5QrcodeScanner(
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

		function success(result: any) {
			scanner.clear();
			setScanResult(result);
			console.log("IVE BEEN CALLED");
			// Redirect to the scanned link
			window.location.href = result;
		}

		function error(err: any) {}
	}, []);

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
