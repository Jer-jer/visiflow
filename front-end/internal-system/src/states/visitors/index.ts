import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Utils
import AxiosInstance, { AxiosLoginInstance } from "../../lib/axios";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";
import { VisitorDataType } from "../../utils/interfaces";

export interface VisitorStoreState {
	data: VisitorDataType[];
	dashboardVisitor?: VisitorDataType;
	loading: boolean;
}

const initialState: VisitorStoreState = {
	data: [],
	loading: false,
};

export const fetchVisitors = createAsyncThunk(
	"visitors/fetchVisitors",
	async () => {
		const response = await AxiosInstance.get("/visitor");
		return response.data;
	},
);

export const visitorSlice = createSlice({
	name: "visitors",
	initialState,
	reducers: {
		update: (state, action: PayloadAction<VisitorDataType>) => {
			state.data = state.data.map((visitor) => {
				if (visitor._id === action.payload._id) {
					return action.payload;
				}
				return visitor;
			});
		},
		deleteVisitor: (state, action: PayloadAction<string>) => {
			state.data = state.data.filter(
				(visitor) => visitor._id !== action.payload,
			);
		},
		deleteCompanion: (state, action: PayloadAction<string>) => {
			state.data = state.data.map((visitor) => {
				if (visitor.companion_details) {
					visitor.companion_details = visitor.companion_details.filter(
						(companion) => companion._id !== action.payload,
					);
				}
				return visitor;
			});
		},
		openVisitor: (state, action: PayloadAction<VisitorDataType>) => {
			state.dashboardVisitor = action.payload;
		},
		searchVisitor: (state, action: PayloadAction<string>) => {
			state.data = state.data.filter((visitor) => {
				return (
					visitor.visitor_details.name.first_name.toLowerCase().includes(action.payload.toLowerCase()) ||
					visitor.visitor_details.name.middle_name!.toLowerCase().includes(action.payload.toLowerCase()) ||
					visitor.visitor_details.name.last_name.toLowerCase().includes(action.payload.toLowerCase()) ||
					visitor.visitor_details.phone.toLowerCase().includes(action.payload.toLowerCase())
				);
			});
		},
	},
	extraReducers: (builder) => {
		// For Fetching Visitors
		builder
			.addCase(fetchVisitors.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchVisitors.fulfilled, (state, action) => {
				state.data = action.payload.visitors;
				state.loading = false;
			})
			.addCase(fetchVisitors.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export const { update, deleteVisitor, deleteCompanion, openVisitor, searchVisitor } =
	visitorSlice.actions;
export default visitorSlice.reducer;
