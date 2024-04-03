import { createSlice } from "@reduxjs/toolkit";

// Interface
import { VisitorLogDetails } from "../../../utils/interfaces";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: VisitorLogDetails[] = [];

export const visitorLogsSlice = createSlice({
	name: "visitors",
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

export const { addLog, fetchLogs, removeLogs } = visitorLogsSlice.actions;
export default visitorLogsSlice.reducer;
