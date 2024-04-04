import { createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import { UserActionLogsDetails } from "../../../utils/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UserActionLogsDetails[] = [];

export const userLogsSlice = createSlice({
	name: "userLogs",
	initialState,
	reducers: {
		fetchUserLogs: (state, action: PayloadAction<UserActionLogsDetails[]>) => {
			return [...action.payload];
		},
		addUserLog: (state, action: PayloadAction<UserActionLogsDetails>) => {
			state.push(action.payload);
		},
	},
});

export const { fetchUserLogs, addUserLog } = userLogsSlice.actions;
export default userLogsSlice.reducer;
