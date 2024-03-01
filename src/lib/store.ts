import { configureStore } from "@reduxjs/toolkit";
import slice, { contextSlice } from "./features/cart/sliceCart";
import { sliceProduct } from "./features/products/sliceProduct";

export const makeStore = () => {
  return configureStore({
    reducer: { cart: contextSlice.reducer, product: sliceProduct.reducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
