import { Product } from "@/declarations";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
const initialState: Array<Product> = [];

export const sliceProduct = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<{ products: Array<Product> }>) => {
      const { products } = action.payload;
      state.concat(products);
    },
  },
});

export const { fetchData } = sliceProduct.actions;
export const selectProducts = (state: RootState) => state;
export default sliceProduct.reducer;
