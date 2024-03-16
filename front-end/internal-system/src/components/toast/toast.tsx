import React from "react";

interface ToastProps {
	status: string;
	toastInfo: string;
}

function Toast({ status, toastInfo }: ToastProps) {
	let toast: any;

	if (status === "info") {
		toast = (
			<div className="alert alert-info">
				<span>{toastInfo}</span>
			</div>
		);
	} else if (status === "success") {
		toast = (
			<div className="alert alert-success">
				<span>{toastInfo}</span>
			</div>
		);
	} else if (status === "error") {
		toast = (
			<div className="alert-error-500 alert">
				<span>{toastInfo}</span>
			</div>
		);
	} else {
		toast = <span>Toast</span>;
	}

	return <div className="toast toast-end">{toast}</div>;
}

export default Toast;
