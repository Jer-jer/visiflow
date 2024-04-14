import axios from "axios";

import { Modal } from "antd";

const token = localStorage.getItem("token");

const AxiosInstance = axios.create({
	baseURL: "https://visiflow-api.onrender.com",
	headers: {
		Authorization: `Bearer ${token!}`,
	},
});

export const AxiosLoginInstance = axios.create({
	baseURL: "https://visiflow-api.onrender.com",
});

AxiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		const errorModal = (message: string) => {
			Modal.error({
				title: `Error`,
				content: message,
				className: "error-modal",
			});
		};

		const logout = () => {
			window.location.reload();
			localStorage.clear();
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
					logout();
				}
			} else {
				console.error("No refresh token found");
				errorModal("No refresh token found, logging you out.");
				logout();
			}
		}

		return Promise.reject(error);
	},
);

export default AxiosInstance;
