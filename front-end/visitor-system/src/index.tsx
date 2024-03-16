import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import { BrowserRouter } from "react-router-dom";

import { App } from "antd";

// Components
import MainApp from "./App";

// Styles
import "./index.scss";

// Kommunicate.init("1533584fa23c162f32fe0da228affe252", {
// 	automaticChatOpenOnNavigation: true,
// 	popupWidget: true,
// });

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#0db284",
					colorBorder: "#0db284",
				},
				components: {
					Button: {
						defaultBorderColor: "#0db284",
						defaultColor: "#0db284",
					},
					FloatButton: {
						colorPrimary: "#E88B23",
						colorPrimaryHover: "#eda24f",
					},
					Input: {
						activeBorderColor: "#0db284",
					},
				},
			}}
		>
			<BrowserRouter basename="/">
				<App>
					<MainApp />
				</App>
			</BrowserRouter>
		</ConfigProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
