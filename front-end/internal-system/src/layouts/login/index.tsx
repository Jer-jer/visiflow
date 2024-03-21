import React, { useState, Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

//Interface
import { LoginZod } from "../../utils/zodSchemas";

//Components
import { Input, Button, Form, Modal } from "antd";
import Label from "../../components/fields/input/label";

//Lib
import { AxiosLoginInstance } from "../../lib/axios";

//Styles
import "./styles.scss";

//Assets
import { LoginPhoto } from "../../assets/login";
import {
	UserOutlined,
	LockOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
} from "@ant-design/icons";

type LoginDetailZod = z.infer<typeof LoginZod>;

interface LoginProps {
	setIsAdmin: Dispatch<SetStateAction<boolean>>;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function LoginLayout({ setIsAdmin, setIsLoggedIn }: LoginProps) {
	const [isFocused, setIsFocused] = useState(false);

	// Modal related data
	const [modalMessage, setModalMessage] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Client-side Validation related data
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<LoginDetailZod>({
		resolver: zodResolver(LoginZod),
	});

	const onSubmit = handleSubmit((data) => {
		AxiosLoginInstance.post("/auth/login", data)
			.then((res) => {
				localStorage.setItem("token", res.data.access_token);
				localStorage.setItem("refreshToken", res.data.refresh_token);

				const decoded: any = jwtDecode(res.data.access_token);
				const role = decoded.role;

				switch (role) {
					case "admin":
						setIsAdmin(true);
						localStorage.setItem("role", "1");
						break;
					case "guard":
						setIsAdmin(false);
						break;
					default:
						setIsAdmin(false);
						break;
				}

				setIsLoggedIn(true);
			})
			.catch((err) => {
				showModal();
				if(err.response !== undefined && err.response) {
					if (err.response.status === 401) {
						setModalMessage("Invalid Username/Password.");
					} else {
						showModal();
						setModalMessage("Login Request Failed. Please try again later.");
					}
				} else {
					setModalMessage("Something went wrong with your request. Please try again later.");
				}
				
			});
	});

	return (
		<Form name="Login" onFinish={onSubmit}>
			<div className="flex h-screen items-center justify-center">
				<div className="loginContainer relative h-full w-[832px] flex-shrink-0 overflow-hidden rounded-md border bg-white lg:h-[624px]">
					<div className="flex h-full items-center justify-center">
						<div className="absolute right-[340px] hidden md:right-[230px] md:block lg:right-[210px]">
							<LoginPhoto />
						</div>
						<div className="form-container absolute flex w-[350px] flex-col md:left-[410px] md:w-[350px] lg:left-[440px] lg:top-[100px]">
							<div className=" mb-6">
								<span className="login-header text-[32px] font-[700] tracking-[1.6px] text-accent">
									Gullas Visitor Management System
								</span>
							</div>
							<div className=" mb-6">
								<span className="login-desc color-[#0C0D0D] text-[16px] font-[400] not-italic">
									Welcome back! Login to you account to view today's visitor
								</span>
							</div>
							<div className="mb-3">
								<div className="flex h-[50px] items-center justify-center align-middle">
									<div className="pr-3">
										<Label>
											<UserOutlined />
										</Label>
									</div>
									<div className="form-control w-full max-w-xs">
										<div className="flex flex-col">
											<Input
												className="username-input bg-transparent pl-0 outline-none focus:!border-primary-500 focus:outline-none focus:ring-0"
												placeholder="Username"
												variant="borderless"
												{...register("username")}
												onChange={(e) => setValue("username", e.target.value)}
											/>
											{errors?.username && (
												<p className="mt-1 text-sm text-red-500">
													{errors.username.message}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="mb-6">
								<div className="input-global-div flex items-center justify-center align-middle">
									<div className="pr-3">
										<Label>
											<LockOutlined />
										</Label>
									</div>
									<div className="form-control w-full max-w-xs">
										<div className="flex flex-col">
											<div
												className={`${
													isFocused
														? "password-field-focused"
														: "password-field "
												}`}
											>
												<Input.Password
													className="pl-0 outline-none focus:!border-primary-500 focus:outline-none focus:ring-0"
													placeholder="Password"
													variant="borderless"
													iconRender={(visible) =>
														visible ? (
															<EyeTwoTone twoToneColor="#0db284" />
														) : (
															<EyeInvisibleOutlined />
														)
													}
													{...register("password")}
													onChange={(e) => setValue("password", e.target.value)}
													onFocus={() => setIsFocused(true)}
													onBlur={() => setIsFocused(false)}
												/>
											</div>
											{errors?.password && (
												<p className="mt-1 text-sm text-red-500">
													{errors.password.message}
												</p>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="flex justify-end">
								<Button
									type="primary"
									htmlType="submit"
									size="large"
									className="bg-primary-500"
								>
									Log in
								</Button>
							</div>
						</div>
					</div>
				</div>
				<Modal
					title="Login Failed"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<p>{modalMessage}</p>
				</Modal>
			</div>
		</Form>
	);
}

export default LoginLayout;
