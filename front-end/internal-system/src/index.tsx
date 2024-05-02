import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Store
import { store } from "./store";

import App from "./App";

//Guard

//Styles
import "./utils/variables.scss";
import "./index.scss";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	// <React.StrictMode>
	<BrowserRouter basename="/">
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#0db284",
					colorBorder: "#0db284",
				},
				components: {
					Tabs: {
						cardBg: "#fff",
					},
					Button: {
						defaultBorderColor: "#0db284",
						defaultColor: "#0db284",
					},
					InputNumber: {
						activeShadow: "#0db284",
						activeBorderColor: "#0db284",
						handleHoverColor: "#0db284",
						hoverBorderColor: "#0db284",
					},
				},
			}}
		>
			<Provider store={store}>
				<App />
			</Provider>
		</ConfigProvider>
	</BrowserRouter>,
	// </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
