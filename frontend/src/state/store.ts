import { applyMiddleware, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from "./reducer";
import thunk from "redux-thunk";

// persistance with redux toolkit
const persistConfig = {
    key: 'root',
    storage,
}

// persistent reducer
const persistedReducer = persistReducer(persistConfig, reducer)

// set up Redux store and wrap the Provider component
export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store)