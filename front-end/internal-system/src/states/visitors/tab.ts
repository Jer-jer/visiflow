import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import { VisitorDataType } from "../../utils/interfaces";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string | number;

export interface TabItems {
	key: TargetKey;
	visitorData: VisitorDataType;
}

const initialState: TabItems[] = [];

export const tabSlice: any = createSlice({
	name: "tab",
	initialState,
	reducers: {
		addTab: (
			state,
			action: PayloadAction<{ newActiveKey: number; visitor: VisitorDataType }>,
		) => {
			const { newActiveKey, visitor } = action.payload;
			const newTab = {
				key: newActiveKey,
				visitorData: visitor,
			};
			state.push(newTab);
		},
		removeTab: (state, action: PayloadAction<TabItems[]>) => {
			return [...action.payload];
		},
		updateVisitor: (
			state,
			action: PayloadAction<{ tabIndex: number; visitor: VisitorDataType }>,
		) => {
			state = state.map((tab) => {
				if (tab.key === action.payload.tabIndex) {
					tab.visitorData = action.payload.visitor;
				}
				return tab;
			});
		},
	},
});

export const { addTab, removeTab, updateVisitor } = tabSlice.actions;
export default tabSlice.reducer;
