import { createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const isAdminSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		changeRole: (state, action: PayloadAction<boolean>) => {
			return action.payload;
		},
	},
});

export const { changeRole } = isAdminSlice.actions;
export default isAdminSlice.reducer;
