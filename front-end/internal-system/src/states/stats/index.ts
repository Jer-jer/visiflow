import { createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";

export interface VisitorStatisticSummaryProps {
	total: number;
	preRegCount: number;
	walkInCount: number;
	majorityType: string;
	majorityTypePercent: string;
    rise: boolean;
    walkInRise: boolean;
    preRegRise: boolean;
}

const initialState: VisitorStatisticSummaryProps = {
    total: 0,
    preRegCount: 0,
    walkInCount: 0,
    majorityType: "",
    majorityTypePercent: "",
    rise: false,
    walkInRise: false,
    preRegRise: false
};

export const visitorStatSummarySlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		fetchStats: (
			state,
			action: PayloadAction<VisitorStatisticSummaryProps>,
		) => {
			return action.payload;
		},
	},
});

export const { fetchStats } = visitorStatSummarySlice.actions;
export default visitorStatSummarySlice.reducer;
