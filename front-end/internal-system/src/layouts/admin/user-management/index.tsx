import React, {
	useRef,
	useState,
	useEffect,
	SetStateAction,
	Dispatch,
} from "react";
import AxiosInstace from "../../../lib/axios";

//Interfaces
import { UserDataType } from "../../../utils/interfaces";

//Components
import { Tabs, Button, Input } from "antd";
import Alert from "../../../components/alert";
import UserListTable from "../../../components/table/user-list";
import UserDetails from "./user-details";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface UserListProps {
	users: UserDataType[];
	addTab: () => void;
	createUser: () => void;
}

export interface TabItems {
	key: TargetKey;
	tabName: string;
	userData?: UserDataType;
}

const UserList = ({ users, addTab, createUser }: UserListProps) => {
	return (
		<div className="ml-[45px] flex flex-col gap-[50px]">
			<div className="mt-[30px] flex w-full items-center justify-start gap-[25px] pr-[65px]">
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
				<UserListTable users={users} addTab={addTab} />
			</div>
		</div>
	);
};

const generateUserId = (userLength: number) => {
	return ("UVGU000" + (userLength + 1)).slice(-9);
};

export default function UserManagementLayout() {
	const [items, setItems] = useState<TabItems[]>([]);
	const [users, setUsers] = useState<UserDataType[]>([]);
	const [activeKey, setActiveKey]: any = useState(1);
	const newTabIndex = useRef(1);

	// Alert
	const [alertOpen, setAlertOpen] = useState(false);
	const [status, setStatus] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");

	useEffect(() => {
		AxiosInstace.get("/user")
			.then((res) => {
				setUsers(res.data.users);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [items]);

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey);
	};

	const createUser = () => {
		AxiosInstace.post("/user/new", {
			user_id: generateUserId(users.length),
			first_name: " ",
			middle_name: " ",
			last_name: " ",
			username: " ",
			email: "mail@mail.com",
			password: "admin1234",
			phone: "09999999999",
		})
			.then((res) => {
				const newActiveKey = ++newTabIndex.current;

				setItems([
					...items,
					{
						key: newActiveKey,
						tabName: "New User",
						userData: res.data.user,
					},
				]);

				setActiveKey(newActiveKey);
			})
			.catch((err) => {
				setAlertMsg(err.response.data.error || err.response.data.errors);
				setAlertOpen(!alertOpen);
			});
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
					<div>
						<div
							className={`transition-alert absolute z-[1] w-full scale-y-0 ease-in-out ${
								alertOpen && "scale-y-100"
							}`}
						>
							<Alert
								globalCustomStyling={`flex w-full overflow-hidden rounded-lg rounded-tl-none bg-white shadow-md`}
								statusStyling="flex w-12 items-center justify-center"
								statusColor={status ? "bg-primary-500" : "bg-error-500"}
								spanStyling="font-semibold"
								statusTextHeaderColor={
									status ? "text-primary-500" : "text-error-500"
								}
								descStyling="text-sm text-gray-600"
								header="Information Box"
								desc={alertMsg}
								open={alertOpen}
								setOpen={setAlertOpen}
							/>
						</div>
						<UserList users={users} addTab={add} createUser={createUser} />
					</div>
				</Tabs.TabPane>
				{items.map((item, key) => (
					<Tabs.TabPane
						tab={item.tabName}
						key={item.key.toString()}
						closeIcon={<TabClose />}
					>
						<UserDetails
							record={item.userData}
							items={items}
							setItems={setItems}
							setActiveKey={setActiveKey}
							newTabIndex={newTabIndex}
						/>
					</Tabs.TabPane>
				))}
			</Tabs>
		</div>
	);
}
