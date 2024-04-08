import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Utils
import AxiosInstance from "../../../lib/axios";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";
import { VisitorDataType } from "../../../utils/interfaces";

export interface VisitorStoreState {
	key: string;
	companions: VisitorDataType[];
	loading: boolean;
}

const initialState: VisitorStoreState = {
	key: "",
	companions: [],
	loading: false,
};

export const fetchCompanions = createAsyncThunk(
	"visitors/fetchCompanions",
	async (visitor_id: string) => {
		const response = await AxiosInstance.post("/visitor/get-companions", {
			visitor_id,
		});
		return response.data;
	},
);

export const companionSlice = createSlice({
	name: "companions",
	initialState,
	reducers: {
		update: (state, action: PayloadAction<VisitorDataType>) => {
			state.companions = state.companions.map((visitor) => {
				if (visitor._id === action.payload._id) {
					return action.payload;
				}
				return visitor;
			});
		},
		deleteVisitor: (state, action: PayloadAction<string>) => {
			state.companions = state.companions.filter(
				(visitor) => visitor._id !== action.payload,
			);
		},
	},
	extraReducers: (builder) => {
		// For Fetching Visitors
		builder
			.addCase(fetchCompanions.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCompanions.fulfilled, (state, action) => {
				console.log(action.payload);
				state.companions = action.payload.companions.map(
					(visitor: VisitorDataType) => {
						return {
							...visitor,
							key: visitor._id,
						};
					},
				);
				state.loading = false;
			})
			.addCase(fetchCompanions.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export const { update, deleteVisitor } = companionSlice.actions;
export default companionSlice.reducer;
