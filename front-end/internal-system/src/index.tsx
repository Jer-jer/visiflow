import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { createBrowserRouter, BrowserRouter } from "react-router-dom";

import App from "./App";

/* Pages */
//Admin
import Dashboard from "./pages/admin/dashboard";
import Statistics from "./pages/admin/statistics";

//Guard

//Styles
import "./utils/variables.scss";
import "./index.scss";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

//? To be implemented soon
const router = createBrowserRouter([
	{
		path: "/",
		element: <Dashboard />,
		// loader: rootLoader,
		children: [
			// Add routes here
			{
				path: "statistics",
				element: <Statistics />,
				// loader: teamLoader,
			},
		],
	},
]);

root.render(
	<React.StrictMode>
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
					},
				}}
			>
				<App />
			</ConfigProvider>
		</BrowserRouter>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
