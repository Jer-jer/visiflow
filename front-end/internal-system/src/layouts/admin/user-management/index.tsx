import React, {
	useRef,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import AxiosInstance from "../../../lib/axios";
import { CSVLink } from "react-csv";

//Interfaces
import { UserDataType } from "../../../utils/interfaces";

//Components
import { Tabs, Button, Input, Tooltip } from "antd";
import Alert from "../../../components/alert";
import UserListTable from "../../../components/table/user-list";
import UserDetails from "./user-details";

//Utils
import { formatDate } from "../../../utils";

//Styles
import "../../../utils/variables.scss";
import "./styles.scss";

//Assets
import { ExcelDownload, Search, TabClose } from "../../../assets/svg";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

interface UserListProps {
	users: UserDataType[];
	setUsers: Dispatch<SetStateAction<UserDataType[]>>;
	addTab: () => void;
	createUser: () => void;
}

export interface TabItems {
	key: TargetKey;
	tabName: string;
	userData?: UserDataType;
}

const UserList = ({ users, setUsers, addTab, createUser }: UserListProps) => {
	const [search, setSearch] = useState<string>("");

	const searchingUsers = () => {
		setUsers((users) =>
			users.filter((user) => {
				return (
					user.name.first_name.toLowerCase().includes(search.toLowerCase()) ||
					user.name.middle_name!.toLowerCase().includes(search.toLowerCase()) ||
					user.name.last_name.toLowerCase().includes(search.toLowerCase()) ||
					`${user.name.first_name.toLowerCase()} ${user.name.middle_name!.toLowerCase()} ${user.name.last_name.toLowerCase()}` ===
						search.toLowerCase() ||
					user.phone.includes(search.toLowerCase())
				);
			}),
		);
	};

	const fetchUsers = () => {
		AxiosInstance.get("/user")
			.then((res) => {
				setUsers(res.data.users);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const userDataHeaders = [
		{ label: "First Name", key: "first_name" },
		{ label: "Middle Name", key: "middle_name" },
		{ label: "Last Name", key: "last_name" },
		{ label: "Username", key: "username" },
		{ label: "Email", key: "email" },
		{ label: "Phone", key: "phone" },
		{ label: "Role", key: "role" },
		{ label: "Date Created", key: "date_created" },
	];

	const userDataDetails = users.map((user) => {
		return {
			first_name: user.name.first_name,
			middle_name: user.name.middle_name,
			last_name: user.name.last_name,
			username: user.username,
			email: user.email,
			phone: user.phone,
			role: user.role,
			date_created: formatDate(user.created_at),
		};
	});

	return (
		<div className="ml-[45px] flex flex-col gap-[50px]">
			<div className="mt-[30px] flex w-full items-center justify-start gap-[25px] pr-[65px]">
				<Input
					className="w-[366px]"
					size="large"
					placeholder="Search"
					prefix={<Search />}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button
					type="primary"
					className="search-button !bg-primary-500"
					onClick={searchingUsers}
				>
					Search
				</Button>
				<Button
					type="primary"
					className="search-button !bg-primary-500"
					onClick={fetchUsers}
				>
					Reset
				</Button>
				<Button
					type="primary"
					onClick={createUser}
					className="search-button !bg-primary-500"
				>
					Create Account
				</Button>
				<Tooltip placement="top" title="Export List" arrow={false}>
					<CSVLink
						className="ml-auto"
						filename={"Users_List.csv"}
						data={userDataDetails}
						headers={userDataHeaders}
					>
						<ExcelDownload />
					</CSVLink>
				</Tooltip>
			</div>
			<div className="mr-[50px]">
				<UserListTable users={users} search={search} addTab={addTab} />
			</div>
		</div>
	);
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
		AxiosInstance.get("/user")
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
		AxiosInstance.post("/user/new", {
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
						userData: res.data.newUser,
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
						<UserList
							users={users}
							addTab={add}
							createUser={createUser}
							setUsers={setUsers}
						/>
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
