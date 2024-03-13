import { configureStore } from "@reduxjs/toolkit";

// Slices
import VisitorReducer from "../states/visitors";
import VisitorLogsReducer from "../states/logs/visitor";
import CompanionLogsReducer from "../states/logs/companions";
import UserLogsReducer from "../states/logs/user";

export const store = configureStore({
	reducer: {
		visitors: VisitorReducer,
		visitorLogs: VisitorLogsReducer,
		companionLogs: CompanionLogsReducer,
		userLogs: UserLogsReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
