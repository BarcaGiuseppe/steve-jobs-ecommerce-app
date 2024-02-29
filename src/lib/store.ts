import { configureStore } from "@reduxjs/toolkit";
import slice, { contextSlice } from "./slice";

export const makeStore = () => {
  return configureStore({ reducer: { cart: contextSlice.reducer } });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
