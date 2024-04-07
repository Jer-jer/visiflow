/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction, useState } from "react";

//Interface

//Components
import { Button, Input } from "antd";
import StandardModal from "../../../../components/modal";
import VisitorCompanionsList from "../../../../components/table/companion-list";

//Styles
//import "./styles.scss";

//Assets
import { ExcelDownload, Search } from "../../../../assets/svg";

interface VisitorCompanionsProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function VisitorCompanions({
	open,
	setOpen,
}: VisitorCompanionsProps) {
	const [search, setSearch] = useState<string>("");
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
				<Input className="w-[366px]" placeholder="Search" prefix={<Search />} />
				<Button
					type="primary"
					className="search-button !bg-primary-500 hover:!bg-primary-500"
				>
					Search
				</Button>
				<ExcelDownload />
			</div>
			<VisitorCompanionsList search={search} />
		</StandardModal>
	);
}
