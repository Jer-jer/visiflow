import React from "react";
import { Button } from "antd";

//Components
import Input from "../../components/fields/input/input";
import Label from "../../components/fields/input/label";

//Styles
import "./styles.scss";

//Assets
import { LoginPhoto } from "../../assets/login";

function LoginLayout() {
	return (
		<div>
			<div className="flex h-screen items-center justify-center">
				<div className="loginContainer rounded-md border bg-white">
					<div className="flex h-full items-center justify-center">
						<div className="loginSvg">
							<LoginPhoto />
						</div>
						<div className="login-form absolute flex flex-col">
							<div className=" mb-6">
								<span className="login-header">
									Gullas Visitor Management System
								</span>
							</div>
							<div className=" mb-6">
								<span className="login-desc">
									Welcome back! Login to you account to view today's visitor
								</span>
							</div>
							<div className=" mb-3">
								<div className="input-global-div flex items-center justify-center align-middle">
									<div className="pr-3">
										<Label>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="field-icon h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
												/>
											</svg>
										</Label>
									</div>
									<div className="form-control w-full max-w-xs">
										<Label>&nbsp;</Label>
										<Input
											inputStyling="input bg-white border-0 border-b-2 rounded-none border-neutral w-full max-w-xs focus:outline-none focus:ring-0 focus:border-primary-500 p-0"
											inputType="text"
											placeHolder="Email"
										/>
										<Label spanStyling="text-error">&nbsp;</Label>
									</div>
								</div>
							</div>
							<div className=" mb-6">
								<div className="input-global-div flex items-center justify-center align-middle">
									<div className="pr-3">
										<Label>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="field-icon h-6 w-6"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
												/>
											</svg>
										</Label>
									</div>
									<div className="form-control w-full max-w-xs">
										<Label>&nbsp;</Label>
										<Input
											inputStyling="input bg-white border-0 border-b-2 rounded-none border-neutral w-full max-w-xs focus:outline-none focus:ring-0 focus:border-primary-500 p-0"
											inputType="text"
											placeHolder="Password"
										/>
										<Label spanStyling="text-error">&nbsp;</Label>
									</div>
								</div>
							</div>
							<div className="flex justify-end">
								<Button type="primary" size="large" className="bg-primary-500">
									Log in
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginLayout;
