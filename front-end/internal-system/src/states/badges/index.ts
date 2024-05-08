import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Utils
import AxiosInstance from "../../lib/axios";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";
import { VisitorDataType } from "../../utils/interfaces";
import { fetchVisitors } from "../visitors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../store";

export interface VisitorStoreState {
	key: string;
	badges: VisitorDataType[];
	dashboardBadge?: VisitorDataType;
	loading: boolean;
}

const initialState: VisitorStoreState = {
	key: "",
	badges: [],
	loading: false,
};

export const fetchBadges = createAsyncThunk(
	"badges/fetchBadges",
	async () => {
		try {
			const response1 = await AxiosInstance.get("/badge");
            const badges = response1.data;

            const response2 = await AxiosInstance.get("/visitor");
            const visitors = response2.data;

		  return {badges, visitors};
		} catch (error) {
		  throw error;
		}
	  }
);

export const badgeSlice = createSlice({
	name: "badges",
	initialState,
	reducers: {
		update: (state, action: PayloadAction<VisitorDataType>) => {
			state.badges = state.badges.map((badge) => {
				if (badge._id === action.payload._id) {
					return action.payload;
				}
				return badge;
			});
		},
		openBadge: (state, action: PayloadAction<VisitorDataType>) => {
			state.dashboardBadge = action.payload;
		},
	},
	extraReducers: (builder) => {
		// For Fetching Visitors
		builder
			.addCase(fetchBadges.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchBadges.fulfilled, (state, action) => {
				const badges = action.payload.badges.badges;
				const visitors = action.payload.visitors.visitors;
				let schedules = badges.map((badge: any) => {
					let visitor = visitors.find((visitor: any) => String(badge.visitor_id) === String(visitor._id));
					if (visitor) {
					  return {
						...visitor,
						key: badge._id,
						expected_time_in: badge.expected_time_in,
						expected_time_out: badge.expected_time_out,
						badge_status: badge.status
					  };
					}
				  }).filter((item: any) => item !== undefined);

				state.badges = schedules;

				state.loading = false;
			})
			.addCase(fetchBadges.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export const { update, openBadge } = badgeSlice.actions;
export default badgeSlice.reducer;
