import React, { useState, useContext, createContext } from "react";

//Interfaces
import { VisitorDetailsProps, VisitorDataType} from "../../../../utils";
import { WidthContext } from "../../../logged-in";

//Layouts
import Identification from "../identification";

//Components
import { Button, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Label from "../../../../components/fields/input/label";
import Input from "../../../../components/fields/input/input";
import DateTimePicker from "../../../../components/datetime-picker";
import Badge from "../../../../components/badge";

//Assets
import { ExcelDownload, ArrowDown } from "../../../../assets/svg";

interface ScheduleDeetsProps {
	record?: VisitorDataType;
}

const exportOptions: MenuProps["items"] = [
	{
		label: "Export All",
		key: "0",
	},
	{
		label: "Export Visitor Details",
		key: "1",
	},
	{
		label: "Export Visitor Logs",
		key: "2",
	},
	{
		label: "Export Visitor Details + Logs",
		key: "3",
	},
];

const statusOptions = [
	{
		label: "In Progress",
		key: "in-progress",
	},
	{
		label: "Approved",
		key: "approved",
	},
	{
		label: "Declined",
		key: "declined",
	},
];


export default function ScheduleDetails ({ record }: ScheduleDeetsProps) {
  //Form States
  const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobileInput, setMobileInput] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [house, setHouse] = useState("");
	const [cityInput, setCityInput] = useState("");
	const [streetInput, setStreeInput] = useState("");
	const [provinceInput, setProvinceInput] = useState("");
	const [brgyInput, setBrgyInput] = useState("");
	const [countryInput, setCountryInput] = useState("");
  const [numVisitorsInput, setNumVisitorsInput] = useState("");
  const [purposeInput, setPurposeInput] = useState("");
  const [poiInput, setPoiInput] = useState("");

  //Modal States
  const [identificationOpen, setIdentificationOpen] = useState(false);

  //setCurrentStatus is for changing the status of the visitor
  const [currentStatus, setCurrentStatus] = useState(
		statusOptions?.find((option) => option?.key === record?.visitorDetails.status),
	);
  const [disabledInputs, setDisabledInputs] = useState<boolean>(true);
  const width = useContext(WidthContext);

  console.log("CONSOLE", record);


  return (
    <div className="mr-[135px] flex flex-col gap-[35px] pt-[30px]"> 
      {/* Excel download */}
      <div className="flex justify-end">
					<Dropdown menu={{ items: exportOptions }} trigger={["click"]}>
						<a onClick={(e) => e.preventDefault()} href="/">
							<ExcelDownload />
						</a>
					</Dropdown>
      </div>
      {/* Start of Form */}
      <div className="mb-[35px] ml-[58px] flex flex-col gap-[25px]">
        {/* Personal Information */}
        <div className="flex justify-between">
          {/* Actual Form */}
          <div className="flex w-[782px] flex-col gap-[20px]">
            {/* Name */}
            <div className="flex gap-[60px]">
              <div className="flex w-[380px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  First Name
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.fullName.firstName}
                  input={firstName}
                  setInput={setFirstName}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
              <div className="flex w-[360px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  Middle Name
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.fullName.middleName}
                  input={middleName}
                  setInput={setMiddleName}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
            </div>
            {/* Name 2 */}
            <div className="flex gap-[60px]">
              <div className="flex w-[380px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  Last Name
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.fullName.lastName}
                  input={lastName}
                  setInput={setLastName}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
              <div className="flex w-[360px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  Mobile Number
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.mobile}
                  input={mobileInput}
                  setInput={setMobileInput}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
            </div>
            {/* Email */}
            <div className="flex w-full gap-[33px]">
              <Label
                spanStyling="text-black font-medium text-[16px]"
                labelStyling="w-[14.5%]"
              >
                Email Address
              </Label>
              <Input
                inputType="text"
                inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500 basis-[82%]"
                placeHolder={record?.visitorDetails.email}
                input={emailAddress}
                setInput={setEmailAddress}
                visitorMngmnt
                disabled={disabledInputs}
              />
            </div>
            {/* Address 1 */}
            <div className="flex gap-[60px]">
              <div className="flex w-[380px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  House No.
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.houseNo}
                  input={house}
                  setInput={setHouse}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
              <div className="flex w-[360px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  City
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.city}
                  input={cityInput}
                  setInput={setCityInput}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
            </div>
            {/* Address 2 */}
            <div className="flex gap-[60px]">
              <div className="flex w-[380px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  Street
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.street}
                  input={streetInput}
                  setInput={setStreeInput}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
              <div className="flex w-[360px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  Province
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.province}
                  input={provinceInput}
                  setInput={setProvinceInput}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
            </div>
            {/* Address 3 */}
            <div className="flex gap-[60px]">
              <div className="flex w-[380px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  Barangay
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.brgy}
                  input={brgyInput}
                  setInput={setBrgyInput}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
              <div className="flex w-[360px] justify-between">
                <Label spanStyling="text-black font-medium text-[16px]">
                  Country
                </Label>
                <Input
                  inputType="text"
                  inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
                  placeHolder={record?.visitorDetails.country}
                  input={countryInput}
                  setInput={setCountryInput}
                  visitorMngmnt
                  disabled={disabledInputs}
                />
              </div>
            </div>
          </div>
          {/* Identification Photo */}
          <div className="flex flex-col items-center gap-[30px]">
            <Avatar
              className="cursor-pointer"
              onClick={() => setIdentificationOpen(!identificationOpen)}
              size={width === 1210 ? 150 : 220}
              src="https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg"
            />
            <Identification
              open={identificationOpen}
              setOpen={setIdentificationOpen}
              image={{
                frontId:
                  "https://media.philstar.com/photos/2021/07/23/10_2021-07-23_18-27-24.jpg",
                backId:
                  "https://s3-alpha-sig.figma.com/img/6541/e76f/4938b0155718de8af5610a0f82b07fc5?Expires=1696809600&Signature=g9ee7Y9K6izTlUfPBSWDgv2t9CilaBU3wsYb~xTBNwzFqBIgD~qDFl1WJms9oyFfyQXVxeFC5zydUUKHzBz-JaG~jZ31ambhXu9Gqte1D5vDh9x6WnZF8Kszq9IisRwRC1ytG02cYqFmIFpwLjb-hZ-JFXIWPbB~g-EA-pVFCSsElqjTHikVTTSSmEQiViHAXOSZo0OF3spgfGhfQhtobuWeryxKXlrr3Wu6CnxlIN0VGWKrCMzNH3qp6o99M8KZ4tkEsA8oFrhz~ijLF2GntP1DSBpZNm07wWoLJ2T1l7zSdqRJ5OOl4wiRucamxNbR8wnqPxjrKxrRGE7nJhAQ6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
                selfieId:
                  "https://www.sars.gov.za/wp-content/uploads/images/Verify-banking-details.jpg",
              }}
            />
            {disabledInputs ? (
              <Badge status={record?.visitorDetails.status} textSize="text-[20px]" />
            ) : (
              <Dropdown
                menu={{ items: statusOptions }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Button className="border-none bg-[#DFEAEF] font-[600] text-[#0C0D0D] hover:!text-[#0C0D0D]">
                  <div className="flex items-center justify-between gap-[10px]">
                    {currentStatus?.label}
                    <ArrowDown />
                  </div>
                </Button>
              </Dropdown>
            )}
          </div>
        </div>
        {/* Schedule Information */}
        <div>
          {/* Time in and out */}
          <div className="flex w-full justify-between">
            <Label
              spanStyling="text-black font-medium text-[16px]"
              labelStyling="w-[22.5%]"
            >
              Time In and Out
            </Label>
            <DateTimePicker
              globalStyling="w-full"
              rangePickerStyling="bg-[#e0ebf0] border-none w-[inherit]"
              size="large"
              defaultVal={{
                from: record?.visitorDetails.timeIn || "9999-99-99 99:90 PM",
                to: record?.visitorDetails.timeOut || "9999-99-99 99:99 PM",
              }}
              visitorMngmnt
              disabled={disabledInputs}
            />
          </div>
          {/* Purpose */}
          <div className="w-full">
            <Label
              spanStyling="text-black font-medium text-[16px]"
              labelStyling="w-[22.5%]"
            >
              Purpose
            </Label>
            <Input
              inputType="string"
              inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
              placeHolder={record?.purpose}
              input={purposeInput}
              setInput={setPurposeInput}
              visitorMngmnt
              disabled={disabledInputs}
            />
          </div>
          <div className="">
            <div>
              <Label
                spanStyling="text-black font-medium text-[16px]"
                labelStyling="w-[22.5%]"
              >
                No. of Visitors
              </Label>
              <select
                multiple
                onChange={(e) => setNumVisitorsInput(e.target.value)}
                disabled={disabledInputs}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="">
            <Label
              spanStyling="text-black font-medium text-[16px]"
              labelStyling="w-[22.5%]"
            >
              Person of Interest
            </Label>
            <Input
              inputType="string"
              inputStyling="input h-[38px] rounded-[5px] focus:outline-none focus:ring-0 focus:border-primary-500"
              placeHolder={record?.personOfInterest}
              input={poiInput}
              setInput={setPoiInput}
              visitorMngmnt
              disabled={disabledInputs}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
