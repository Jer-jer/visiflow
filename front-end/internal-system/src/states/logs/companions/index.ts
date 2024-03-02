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
		addLog: (state, action: PayloadAction<VisitorLogDetails>) => {
			state.push(action.payload);
		},
	},
});

export const { addLog } = companionLogsSlice.actions;
export default companionLogsSlice.reducer;
