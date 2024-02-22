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

export default AxiosInstance;
