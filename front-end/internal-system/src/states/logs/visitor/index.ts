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
		addLog: (state, action: PayloadAction<VisitorLogDetails>) => {
			state.push(action.payload);
		},
	},
});

export const { addLog } = visitorLogsSlice.actions;
export default visitorLogsSlice.reducer;
