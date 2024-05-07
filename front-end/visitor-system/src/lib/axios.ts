import axios from "axios";

const AxiosInstance = axios.create({
	baseURL: "https://visiflow-api.onrender.com",
});

export default AxiosInstance;
