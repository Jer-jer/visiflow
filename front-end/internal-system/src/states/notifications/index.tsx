import { createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";
import { VisitorType, NotificationType } from "../../utils/enums";

// Utils

export interface NotificationContent {
	visitor_name: string;
	host_name: string;
	date: Date;
	time: Date;
	location: string;
	purpose: string;
	visitor_type: VisitorType;
}

export interface NotificationProps {
	_id: string;
	type: NotificationType;
	recipient: string;
	content: NotificationContent;
	is_read: boolean;
	created_at: Date;
}

const initialState: NotificationProps[] = [];

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		fetchNotifs: (state, action: PayloadAction<NotificationProps[]>) => {
			return [...action.payload];
		},
		addNotif: (state, action: PayloadAction<NotificationProps>) => {
			state.push(action.payload);
		},
		readNotif: (state, action: PayloadAction<string>) => {
			const notif = state.find((notif) => notif._id === action.payload);
			if (notif) {
				notif.is_read = true;
			}
		},
	},
});

export const { addNotif, fetchNotifs, readNotif } = notificationsSlice.actions;
export default notificationsSlice.reducer;
