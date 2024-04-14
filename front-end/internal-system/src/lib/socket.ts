import { io } from "socket.io-client";

const URL = "https://visiflow-api.onrender.com";

export const socket = io(URL);
