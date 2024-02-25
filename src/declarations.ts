export type Cart = Array<{
  id: number;
  quantity: number;
}>;

export interface Product {
  qty: number;
  userId: number;
  title: string;
  description: string;
  id: number;
  price: number;
  image: string;
  thumbnail: string;
}

export interface TContext {
  cart: Cart;
  paid: boolean;
  products: Array<Product> | null;
  loading: boolean;
  error: string;
  addToCart: (idProduct: Product["id"]) => void;
  removeFromCart: (idProduct: Product["id"]) => void;
  pay: () => void;
  done: () => void;
  getProductQuantity: (
    idProduct: Product["id"],
    isAddToCart: boolean
  ) => number;
}
