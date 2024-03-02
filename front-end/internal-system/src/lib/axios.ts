import axios from "axios";

const token = localStorage.getItem("token");

const AxiosInstance = axios.create({
	baseURL: "http://localhost:5000",
	headers: {
		Authorization: `Bearer ${token!}`,
	},
	timeout: 1000,
});

export const AxiosLoginInstance = axios.create({
	baseURL: "http://localhost:5000",
	timeout: 1000,
});

AxiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

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
					// Handle failed refresh (e.g., logout, notify user)
				}
			} else {
				console.error("No refresh token found");
				// Handle missing refresh token (e.g., logout, notify user)
			}
		}

		return Promise.reject(error);
	},
);

export default AxiosInstance;
