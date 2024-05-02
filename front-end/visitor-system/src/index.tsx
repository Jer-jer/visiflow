import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import { App } from "antd";

// Components
import MainApp from "./App";

// Styles
import "./index.scss";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	// <React.StrictMode>
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
			<App className="h-full">
				<MainApp />
			</App>
		</BrowserRouter>
	</ConfigProvider>,
	// </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
