import { createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import { UserActionLogsDetails } from "../../../utils/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UserActionLogsDetails[] = [];

export const userLogsSlice = createSlice({
	name: "visitors",
	initialState,
	reducers: {
		addLog: (state, action: PayloadAction<UserActionLogsDetails>) => {
			state.push(action.payload);
		},
	},
});

export const { addLog } = userLogsSlice.actions;
export default userLogsSlice.reducer;
