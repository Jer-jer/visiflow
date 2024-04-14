import React, { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

//Interfaces
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { WalkInFormInterfaceZod } from "../../../utils/zodSchemas";

//Components
import { Button, Form, Modal, Image, Input, Select, DatePicker } from "antd";
import Alert from "../../alert";

//Styles
import "./styles.scss";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

interface NewWalkInProps {
	isSuccessOpen: boolean;
	alertOpen: boolean;
	status: boolean;
	alertMsg: string;
	whatOptions: {
		label: string;
		value: string;
	}[];
	whoOptions: {
		label: string;
		value: string;
	}[];
	whereOptions: {
		label: string;
		value: string;
	}[];
	errors: FieldErrors<WalkInFormInterfaceZod>;
	register: UseFormRegister<WalkInFormInterfaceZod>;
	setAlertOpen: Dispatch<SetStateAction<boolean>>;
	onSubmit: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined,
	) => Promise<void>;
	handleSuccessOk: () => void;
	updateInput: (
		value: string | [string, string] | string[] | Date | any,
		property: string,
	) => void;
	handlePurpose: (purpose: string, value: string | string[]) => void;
	onChange: (date: dayjs.Dayjs, dateString: string | string[]) => void;
}

function NewWalkIn({
	isSuccessOpen,
	alertOpen,
	status,
	alertMsg,
	errors,
	whatOptions,
	whereOptions,
	whoOptions,
	register,
	setAlertOpen,
	onSubmit,
	handleSuccessOk,
	updateInput,
	handlePurpose,
	onChange,
}: NewWalkInProps) {
	return (
		<>
			<Modal
				title={
					<span className="text-[24px] font-semibold text-primary-500">
						Success
					</span>
				}
				open={isSuccessOpen}
				onOk={handleSuccessOk}
			>
				<span>Sucessfully registered and timed-in visitor.</span>
			</Modal>
			<div
				className={`transition-alert absolute z-[1] ml-[-38px] mt-[-92px] w-[380px] scale-y-0 ease-in-out ${
					alertOpen && "scale-y-100"
				}`}
			>
				<Alert
					globalCustomStyling={`flex w-[380px] overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
					statusStyling="flex w-12 items-center justify-center"
					statusColor={status ? "bg-primary-500" : "bg-error-500"}
					spanStyling="font-semibold"
					statusTextHeaderColor={status ? "text-primary-500" : "text-error-500"}
					descStyling="text-sm text-gray-600"
					header="Information Box"
					desc={alertMsg}
					open={alertOpen}
					setOpen={setAlertOpen}
				/>
			</div>

			<Form name="Visitor Details" onFinish={onSubmit} autoComplete="off">
				<div className="mb-[35px] ml-2 mt-3 flex">
					<div className="w-[380px] flex-auto md:w-[761px]">
						<div className="mb-[35px] ml-[20px] mr-[25px] flex h-fit flex-col items-center justify-center gap-[30px] lg:flex-row lg:gap-[25px]">
							<div className="flex flex-col items-center justify-center gap-[15px]">
								<div className="relative h-[245px] w-[330px] md:h-[300px] md:w-[360px]">
									<Image width="100%" height="100%" />
									<Button
										type="primary"
										className="absolute ml-[-240px] mt-[200px] h-[40px] w-[155px] !rounded-[10px] !bg-primary-500 text-xs shadow-lg md:ml-[-260px] md:mt-[240px] md:h-[46px] md:w-[175px] md:text-lg"
									>
										<b>SCAN ID</b>
									</Button>
								</div>
								<div className="relative h-[245px] w-[330px] md:h-[300px] md:w-[360px]">
									<Image width="100%" height="100%" />
									<Button
										type="primary"
										className="absolute ml-[-240px] mt-[200px] h-[40px] w-[155px] !rounded-[10px] !bg-primary-500 text-xs shadow-lg md:ml-[-260px] md:mt-[240px] md:h-[46px] md:w-[175px] md:text-sm"
									>
										<b>
											SCAN PLATE NUMBER <br /> (OPTIONAL)
										</b>
									</Button>
								</div>
							</div>

							<div className="flex flex-col items-center justify-center gap-[20px]">
								<div className="flex flex-col gap-7 lg:flex-row lg:gap-[40px]">
									<div className="flex flex-col items-center gap-7">
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>First Name</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[30px]"
													size="large"
													{...register("first_name")}
													onChange={(e) =>
														updateInput(e.target.value, "first_name")
													}
												/>
											</div>
											{errors?.first_name && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.first_name.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Middle Name</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[13px]"
													size="large"
													{...register("middle_name")}
													onChange={(e) =>
														updateInput(e.target.value, "middle_name")
													}
												/>
											</div>
											{errors?.middle_name && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.middle_name.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Last Name</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[31px]"
													size="large"
													{...register("last_name")}
													onChange={(e) =>
														updateInput(e.target.value, "last_name")
													}
												/>
											</div>
											{errors?.last_name && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.last_name.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Email</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[64px]"
													size="large"
													{...register("email")}
													onChange={(e) => updateInput(e.target.value, "email")}
												/>
											</div>
											{errors?.email && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.email.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Mobile #</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[42px]"
													size="large"
													{...register("phone")}
													onChange={(e) => updateInput(e.target.value, "phone")}
												/>
											</div>
											{errors?.phone && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.phone.message}
												</p>
											)}
										</div>

										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Plate Number (Optional)</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[16px] md:w-[230px]"
													size="large"
													{...register("plate_num")}
													onChange={(e) =>
														updateInput(e.target.value, "plate_num")
													}
												/>
											</div>
											{errors?.plate_num && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.plate_num.message}
												</p>
											)}
										</div>
									</div>

									<div className="flex flex-col items-start gap-7">
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>House #</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[24px]"
													size="large"
													{...register("house")}
													onChange={(e) => updateInput(e.target.value, "house")}
												/>
											</div>
											{errors?.house && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.house.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Street</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[39.5px]"
													size="large"
													{...register("street")}
													onChange={(e) =>
														updateInput(e.target.value, "street")
													}
												/>
											</div>
											{errors?.street && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.street.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Barangay</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[18.5px]"
													size="large"
													{...register("brgy")}
													onChange={(e) => updateInput(e.target.value, "brgy")}
												/>
											</div>
											{errors?.brgy && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.brgy.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>City</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[52px]"
													size="large"
													{...register("city")}
													onChange={(e) => updateInput(e.target.value, "city")}
												/>
											</div>
											{errors?.city && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.city.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Province</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[23px]"
													size="large"
													{...register("province")}
													onChange={(e) =>
														updateInput(e.target.value, "province")
													}
												/>
											</div>
											{errors?.province && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.province.message}
												</p>
											)}
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col md:flex-row md:items-center">
												<h1>Country</h1>
												<Input
													className="h-[35px] w-[300px] rounded-[5px] border-none bg-[#DFEAEF] hover:bg-primary-200 focus:ring-primary-600 md:ml-[27px]"
													size="large"
													{...register("country")}
													onChange={(e) =>
														updateInput(e.target.value, "country")
													}
												/>
											</div>
											{errors?.country && (
												<p className="absolute mt-[36px] text-sm text-red-500">
													{errors.country.message}
												</p>
											)}
										</div>
									</div>
								</div>

								<div className="flex flex-col">
									<div className="flex gap-[41px]">
										<div className="flex flex-col gap-5 lg:gap-7">
											<span className="mb-[-15px]">Purpose</span>
											<div className="flex flex-col gap-5 lg:flex-row">
												<div className="flex flex-col">
													<div>
														<Select
															className="w-[315px] md:w-[397px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="What"
															listHeight={150}
															options={whatOptions}
															{...register("what")}
															onChange={(value: string[]) =>
																handlePurpose("what", value)
															}
														></Select>
													</div>
													{errors?.what && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.what.message}
														</p>
													)}
												</div>

												<div className="flex flex-col">
													<div>
														<Select
															className="w-[315px] md:w-[397px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="Who"
															listHeight={150}
															options={whoOptions}
															{...register("who")}
															onChange={(value: string[]) =>
																handlePurpose("who", value)
															}
														></Select>
													</div>
													{errors?.who && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.who.message}
														</p>
													)}
												</div>
											</div>
											<div className="flex flex-col gap-5 lg:flex-row">
												<div className="flex flex-col">
													<div>
														<Select
															className="w-[315px] md:w-[397px]"
															size="large"
															placement="bottomLeft"
															mode="multiple"
															allowClear
															showSearch
															placeholder="Where"
															listHeight={150}
															options={whereOptions}
															{...register("where")}
															onChange={(value: string[]) =>
																handlePurpose("where", value)
															}
														></Select>
													</div>
													{errors?.where && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.where.message}
														</p>
													)}
												</div>

												<div className="flex flex-col">
													<div className="flex flex-col md:flex-row md:items-center">
														<h1>Expected Time Out</h1>
														<DatePicker
															showTime
															className="focus:!bg-[#e0ebf0]vm-placeholder ml-[20px] h-[35px] w-[180px] border-none !border-[#d9d9d9] bg-[#e0ebf0] focus-within:!bg-[#e0ebf0] hover:!border-primary-500 hover:!bg-[#e0ebf0] focus:!border-primary-500 md:w-[260px]"
															defaultValue={dayjs(
																dayjs(),
																"YYYY-MM-DD hh:mm A",
															)}
															format="YYYY-MM-DD hh:mm A"
															onChange={onChange}
															disabledDate={(current) => {
																return (
																	current && current < dayjs().startOf("day")
																);
															}}
														/>
													</div>
													{errors?.expected_time_out && (
														<p className="absolute mt-[36px] text-sm text-red-500">
															{errors.expected_time_out.message}
														</p>
													)}
												</div>
											</div>
											<div className="flex justify-end gap-10">
												<Button
													type="primary"
													className="mt-[10px] w-[100px] !rounded-[10px] !bg-primary-500"
													htmlType="submit"
												>
													SUBMIT
												</Button>
												<Button
													type="primary"
													className="mt-[10px] w-[100px] !rounded-[10px] !bg-red-500"
													href="/"
												>
													CANCEL
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</>
	);
}

export default NewWalkIn;
