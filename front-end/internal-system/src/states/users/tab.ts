import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import { UserDataType } from "../../utils/interfaces";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

export interface TabItems {
	key: TargetKey;
	userData: UserDataType;
}

const initialState: TabItems[] = [];

export const tabSlice = createSlice({
	name: "tab",
	initialState,
	reducers: {
		addTab: (
			state,
			action: PayloadAction<{ newActiveKey: number; user: UserDataType }>,
		) => {
			const { newActiveKey, user } = action.payload;
			const newTab = {
				key: newActiveKey,
				userData: user,
			};
			state.push(newTab);
		},
		removeTab: (state, action: PayloadAction<TabItems[]>) => {
			return [...action.payload];
		},
		updateUser: (
			state,
			action: PayloadAction<{ tabIndex: number; visitor: UserDataType }>,
		) => {
			state = state.map((tab) => {
				if (tab.key === action.payload.tabIndex) {
					tab.userData = action.payload.visitor;
				}
				return tab;
			});
		},
	},
});

export const { addTab, removeTab, updateUser } = tabSlice.actions;
export default tabSlice.reducer;
