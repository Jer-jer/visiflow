/* Components designed using Ant Design */

import React, { Dispatch, SetStateAction } from "react";

//Interface

//Components
import { Button, Input } from "antd";
import StandardModal from "../../../components/modal";
import VisitorCompanionsList from "../../../components/table/companion-list";

//Styles
import "./styles.scss";

//Assets
import { ExcelDownload, Search } from "../../../assets/svg";

interface VisitorCompanionsProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function VisitorCompanions({
	open,
	setOpen,
}: VisitorCompanionsProps) {
	return (
		<StandardModal
			header="Visitor Companions"
			open={open}
			setOpen={setOpen}
			footer={false}
		>
			<div className="flex w-full items-center justify-start gap-[25px]">
				<Input className="w-[366px]" placeholder="Search" prefix={<Search />} />
				<Button type="primary" className="search-button !bg-primary-500">
					Search
				</Button>
				<ExcelDownload />
			</div>
			<VisitorCompanionsList />
		</StandardModal>
	);
}
