import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';

const reducer = {
    users: userReducer
}

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});
