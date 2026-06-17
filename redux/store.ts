import {configureStore} from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import {authApi} from "@/redux/api/authApi";
import {userApi} from "@/redux/api/userApi";
import {bookingApi} from "@/redux/api/bookingApi";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, bookingApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;