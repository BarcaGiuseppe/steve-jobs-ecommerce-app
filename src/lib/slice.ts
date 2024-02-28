import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Cart, Product } from "@/declarations";

interface InitialState {
  cart: Cart[] | null;
  paid: boolean;
  products: Product[] | null;
  loading: boolean;
  error: string;
}

const initialState: InitialState = {
  cart: [],
  paid: false,
  products: null,
  loading: false,
  error: "",
};

const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product["id"]>) {
      const idProduct = action.payload;
      const existingItemIndex = state.cart?.findIndex(
        (item) => item.id === idProduct
      );
      const product = state.products?.find((p) => p.id === idProduct);

      if (product && product.qty > 0) {
        if (existingItemIndex !== -1) {
          state.cart[existingItemIndex].quantity++;
        } else {
          state.cart.push({ id: idProduct, quantity: 1 } as const);
        }
      }
    },
    removeFromCart(state, action: PayloadAction<Product["id"]>) {
      // Rimuovi il prodotto dal carrello
    },
    pay(state) {
      // Pagamento
    },
    getProducts(state) {
      // Ottenere i prodotti
    },
    done(state) {
      // Operazione completata
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setCart(state, action: PayloadAction<Cart[]>) {
      state.cart = action.payload;
    },
    setPaid(state, action: PayloadAction<boolean>) {
      state.paid = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[] | null>) {
      state.products = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  pay,
  getProducts,
  done,
  setLoading,
  setError,
  setCart,
  setPaid,
  setProducts,
} = contextSlice.actions;

export const selectCart = (state: RootState) => state.context.cart;
export const selectPaid = (state: RootState) => state.context.paid;
export const selectProducts = (state: RootState) => state.context.products;
export const selectLoading = (state: RootState) => state.context.loading;
export const selectError = (state: RootState) => state.context.error;

export default contextSlice.reducer;
