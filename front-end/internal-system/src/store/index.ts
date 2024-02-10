import { configureStore } from "@reduxjs/toolkit";

// Slices
import VisitorReducer from "../states/visitors";

export const store = configureStore({
	reducer: {
		visitors: VisitorReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
