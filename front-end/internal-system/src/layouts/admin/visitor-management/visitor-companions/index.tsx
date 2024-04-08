/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

//Interface
import { VisitorRecordContext } from "../visitor-details";

//Components
import { Input, Tooltip } from "antd";
import StandardModal from "../../../../components/modal";
import VisitorCompanionsList from "../../../../components/table/companion-list";

//Store
import { RootState } from "../../../../store";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload, Search } from "../../../../assets/svg";

interface VisitorCompanionsProps {
	expectedIn: String;
	expectedOut: String;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function VisitorCompanions({
	expectedIn,
	expectedOut,
	open,
	setOpen,
}: VisitorCompanionsProps) {
	const [search, setSearch] = useState<string>("");
	const recordContext = useContext(VisitorRecordContext);

	const { companions } = useSelector((state: RootState) => state.companions);

	const companionDetailsHeaders = [
		{ label: "First Name", key: "firstname" },
		{ label: "Middle Name", key: "middlename" },
		{ label: "Last Name", key: "lastname" },
		{ label: "Phone Number", key: "phone" },
		{ label: "Email", key: "email" },
		{ label: "House No.", key: "house" },
		{ label: "Street", key: "street" },
		{ label: "Barangay", key: "brgy" },
		{ label: "City", key: "city" },
		{ label: "Province", key: "province" },
		{ label: "Country", key: "country" },
		{ label: "Expected Check In", key: "check_in" },
		{ label: "Expected Check Out", key: "check_out" },
	];

	// const companionDetailsData = recordContext!.companion_details!.map(
	// 	(companion) => {
	// 		return {
	// 			firstname: companion.name.first_name,
	// 			middlename: companion.name.middle_name,
	// 			lastname: companion.name.last_name,
	// 			phone: companion.phone,
	// 			email: companion.email,
	// 			house: companion.address.house,
	// 			street: companion.address.street,
	// 			brgy: companion.address.brgy,
	// 			city: companion.address.city,
	// 			province: companion.address.province,
	// 			country: companion.address.country,
	// 			check_in: expectedIn,
	// 			check_out: expectedOut,
	// 		};
	// 	},
	// );

	const companionDetailsData = companions.map((companion) => ({
		firstname: companion.visitor_details.name.first_name,
		middlename: companion.visitor_details.name.middle_name,
		lastname: companion.visitor_details.name.last_name,
		phone: companion.visitor_details.phone,
		email: companion.visitor_details.email,
		house: companion.visitor_details.address.house,
		street: companion.visitor_details.address.street,
		brgy: companion.visitor_details.address.brgy,
		city: companion.visitor_details.address.city,
		province: companion.visitor_details.address.province,
		country: companion.visitor_details.address.country,
		check_in: expectedIn,
		check_out: expectedOut,
	}))

	return (
		<StandardModal
			header={
				<span className="text-[22px] text-[#0C0D0D]">Visitor Companions</span>
			}
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<div className="flex w-full items-center justify-start gap-[25px]">
				<Input
					className="w-[366px]"
					placeholder="Search"
					prefix={<Search />}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Tooltip placement="top" title="Export Companion List" arrow={false}>
					<CSVLink
						className="ml-auto"
						filename={`${recordContext!.visitor_details.name.last_name.toUpperCase()}_Companion_List.csv`}
						data={companionDetailsData}
						headers={companionDetailsHeaders}
					>
						<ExcelDownload />
					</CSVLink>
				</Tooltip>
			</div>
			<VisitorCompanionsList search={search} />
		</StandardModal>
	);
}
