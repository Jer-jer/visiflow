import React from "react";

//Styles
import "./styles.scss";

//Assets
import { LoginPhoto } from "../../assets/login";

function LoginLayout() {
	return (
		<div>
			<div className="flex h-screen items-center justify-center">
				<div className="container rounded-md border bg-white">
					<div className="flex h-full items-center justify-center">
						<LoginPhoto />
						<div className="loginForm absolute flex flex-col">
							<h1>hello world</h1>
							<h1>hello world</h1>
							<h1>hello world</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginLayout;
