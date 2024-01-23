import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Interface Types
import { UserDataType } from "../utils/interfaces";

// export interface CounterState {
// 	value: number;
// }

// const initialState: CounterState = {
// 	value: 0,
// };

const initialState: UserDataType[] = [];

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// increment: (state) => {
		// 	state.value += 1;
		// },
		// decrement: (state) => {
		// 	state.value -= 1;
		// },
		// incrementByAmount: (state, action: PayloadAction<number>) => {
		// 	state.value += action.payload;
		// },
	},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
