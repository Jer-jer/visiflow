import { configureStore } from "@reduxjs/toolkit";

// Slices
import VisitorReducer from "../states/visitors";
import CompanionsReducer from "../states/visitors/companions";
import VisitorLogsReducer from "../states/logs/visitor";
import CompanionLogsReducer from "../states/logs/companions";
import UserLogsReducer from "../states/logs/user";
import VisitorTabsReducer from "../states/visitors/tab";
import UserTabsReducer from "../states/users/tab";
import NotificationsReducer from "../states/notifications";

export const store = configureStore({
	reducer: {
		visitorTabs: VisitorTabsReducer,
		visitors: VisitorReducer,
		companions: CompanionsReducer,
		visitorLogs: VisitorLogsReducer,
		companionLogs: CompanionLogsReducer,
		userTabs: UserTabsReducer,
		userLogs: UserLogsReducer,
		notifications: NotificationsReducer,
	},
	devTools: false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
