import axios from "axios";

import { Modal } from "antd";

const token = localStorage.getItem("token");

const AxiosInstance = axios.create({
	baseURL: "http://localhost:5000",
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

export const AxiosLoginInstance = axios.create({
	baseURL: "http://localhost:5000",
});

AxiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		const logout = () => {
			window.location.reload();
			localStorage.clear();
		};

		const errorModal = (message: string) => {
			Modal.error({
				title: `Error`,
				content: message,
				className: "error-modal",
				onOk: () => {
					logout();
				},
			});
		};

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const refreshToken = await localStorage.getItem("refreshToken");

			if (refreshToken) {
				try {
					const refreshResponse = await AxiosLoginInstance.post(
						"/auth/refreshToken",
						{
							refreshToken,
						},
					);

					const newAccessToken = refreshResponse.data.access_token;
					await localStorage.setItem("token", newAccessToken); // Update token securely

					// Update authorization header with new token
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

					// Retry the original request with the new token
					return AxiosInstance(originalRequest);
				} catch (refreshError) {
					console.error("Refresh token failed:", refreshError);
					errorModal("Refresh token failed, logging you out.");
				}
			} else {
				console.error("No refresh token found");
				errorModal("No refresh token found, logging you out.");
			}
		}

		return Promise.reject(error);
	},
);

export default AxiosInstance;
