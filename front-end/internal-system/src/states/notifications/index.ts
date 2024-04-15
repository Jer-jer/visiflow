import { createSlice } from "@reduxjs/toolkit";

// Types and Interfaces
import type { PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../../utils/enums";

export interface NotificationStoreProps {
	key: string;
	_id: string;
	name: string;
	message: string;
	time_in: Date;
	time_out: Date;
	receivedTime: Date;
	type: NotificationType;
	is_read: boolean;
}

const initialState: NotificationStoreProps[] = [];

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		fetchNotifs: (state, action: PayloadAction<NotificationStoreProps[]>) => {
			return [...action.payload];
		},
		addNotif: (state, action: PayloadAction<NotificationStoreProps>) => {
			state.push(action.payload);
		},
		readNotif: (state, action: PayloadAction<string>) => {
			return state.filter((notif) => notif.key !== action.payload);
		},
	},
});

export const { addNotif, fetchNotifs, readNotif } = notificationsSlice.actions;
export default notificationsSlice.reducer;
