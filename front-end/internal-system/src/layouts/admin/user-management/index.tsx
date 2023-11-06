import React, { useRef, useState } from "react";

//Interfaces
import { UserDataType, UserRole } from "../../../utils";

//Components
import { Tabs, Button, Input } from "antd";
import UserListTable from "../../../components/table/user-list";
import UserDetails from "./user-details";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface UserListProps {
	addTab: () => void;
	createUser: () => void;
}

interface TabItems {
	key: TargetKey;
	tabName: string;
	userData?: UserDataType;
}

const UserList = ({ addTab, createUser }: UserListProps) => {
	return (
		<div className="ml-[45px] mt-[30px] flex flex-col gap-[50px]">
			<div className="flex w-full items-center justify-start gap-[25px] pr-[65px]">
				<Input
					className="w-[366px]"
					size="large"
					placeholder="Search"
					prefix={<Search />}
				/>
				<Button type="primary" className="search-button !bg-primary-500">
					Search
				</Button>
				<Button
					type="primary"
					onClick={createUser}
					className="search-button !bg-primary-500"
				>
					Create Account
				</Button>
				<div className="ml-auto">
					<ExcelDownload />
				</div>
			</div>
			<div className="mr-[50px]">
				<UserListTable addTab={addTab} />
			</div>
		</div>
	);
};

export default function UserManagementLayout() {
	const [items, setItems] = useState<TabItems[]>([]);
	const [activeKey, setActiveKey]: any = useState(1);
	const newTabIndex = useRef(1);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	const createUser = () => {
		const newActiveKey = ++newTabIndex.current;

		setItems([
			...items,
			{
				key: newActiveKey,
				tabName: "New User",
				userData: {
					userId: 12345,
					officeId: 54321,
					fullName: {
						firstName: "",
						middleName: "",
						lastName: "",
					},
					username: "12345",
					email: "",
					password: "12345",
					mobile: "",
					role: UserRole.Security,
				},
			},
		]);

		setActiveKey(newActiveKey);
	};

	const add = (record?: UserDataType) => {
		const newActiveKey = ++newTabIndex.current;

		setItems([
			...items,
			{
				key: newActiveKey,
				tabName: "User Details",
				userData: record,
			},
		]);

		setActiveKey(newActiveKey);
	};

	const remove = (targetKey: TargetKey) => {
		const targetIndex = items.findIndex(
			(pane) => pane.key.toString() === targetKey,
		);
		const newPanes = items.filter((pane) => pane.key.toString() !== targetKey);

		if (newPanes.length && targetKey === activeKey.toString()) {
			const newActiveKey =
				newPanes[
					targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
				];

			setActiveKey(newActiveKey.key);
		} else setActiveKey(1);

		setItems(newPanes);
	};

	const onEdit = (
		targetKey: React.MouseEvent | React.KeyboardEvent | string | number,
		action: "add" | "remove",
	) => {
		if (action === "remove") remove(targetKey);
	};

	return (
		<div className="mb-[35px] ml-2 mr-[25px] mt-3 h-fit">
			<Tabs
				hideAdd
				className="h-full"
				type="editable-card"
				size="middle"
				onChange={onChange}
				activeKey={activeKey.toString()}
				onEdit={onEdit}
			>
				<Tabs.TabPane closable={false} tab="User List" key="1">
					<UserList addTab={add} createUser={createUser} />
				</Tabs.TabPane>
				{items.map((items, key) => (
					<Tabs.TabPane
						tab={items.tabName}
						key={items.key.toString()}
						closeIcon={<TabClose />}
					>
						<UserDetails record={items.userData} />
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
}
