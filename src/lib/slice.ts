import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Cart, Product } from "@/declarations";

interface InitialState {
  cart: Cart | null;
}

const initialState: Cart = [];

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action: PayloadAction<{ id: number }>) {
        const { id } = action.payload;
        const foundItem = state.find((item) => item.id === id);

        if (foundItem) {
          // Se l'elemento è già presente nel carrello, incrementa la quantità
          foundItem.quantity++;
        } else {
          // Se l'elemento non è presente nel carrello, aggiungilo
          state.push({ id, quantity: 1 });
        }
      },
      prepare(id: number) {
        return {
          payload: { id },
        };
      },
    },
    removeFromCart(state: Cart, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      const newCart = state.reduce((acc: Cart, el) => {
        if (el.id === id) {
          if (el.quantity > 1) {
            acc.push({ id: el.id, quantity: el.quantity - 1 });
          }
          return acc;
        } else {
          acc.push(el);
          return acc;
        }
      }, []);
      state = newCart;
    },
  },

  // other reducers
});

export const { addToCart, removeFromCart } = contextSlice.actions;

//export const selectCart = (state: RootState) => state;
// export const selectPaid = (state: RootState) => state.context.paid;
// export const selectProducts = (state: RootState) => state.context.products;
// export const selectLoading = (state: RootState) => state.context.loading;
// export const selectError = (state: RootState) => state.context.error;
export const selectCart = (state: RootState) => state.cart;
export default contextSlice.reducer;
