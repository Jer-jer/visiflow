import { createSlice } from "@reduxjs/toolkit";

// Interface
import { VisitorLogDetails } from "../../../utils/interfaces";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: VisitorLogDetails[] = [];

export const companionLogsSlice = createSlice({
	name: "companions",
	initialState,
	reducers: {
		fetchLogs: (state, action: PayloadAction<VisitorLogDetails[]>) => {
			return [...action.payload];
		},
		addLog: (state, action: PayloadAction<VisitorLogDetails>) => {
			state.push(action.payload);
		},
		removeLogs: (state) => {
			return [];
		}
	},
});

export const { addLog, removeLogs, fetchLogs } = companionLogsSlice.actions;
export default companionLogsSlice.reducer;
