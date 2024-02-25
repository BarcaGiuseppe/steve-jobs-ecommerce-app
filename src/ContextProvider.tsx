import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Cart, Product, TContext } from "./declarations";

export const AppContext = createContext<TContext>({
  cart: [],
  paid: false,
  products: null,
  addToCart: () => {},
  removeFromCart: () => {},
  pay: () => {},
  done: () => {},
  getProductQuantity: () => 0,
  loading: false,
  error: "",
});

interface Props {
  children: ReactNode;
}

export const useDataCardByContext = () => useContext(AppContext);

export function ContextProvider({ children }: Props) {
  const [cart, setCart] = useState<TContext["cart"]>([]);
  const [paid, setPaid] = useState<TContext["paid"]>(false);
  const [products, setProducts] = useState<TContext["products"]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addToCart = (idProduct: Product["id"]) => {
    const found = cart.find((el) => el.id === idProduct);
    const qntProductAvailable = products?.find(
      (el) => el.id === idProduct
    )?.qty;

    if (!!found) {
      const newCart = cart.map((el) => {
        if (el.id !== idProduct || qntProductAvailable == 0) return el;
        return { id: el.id, quantity: el.quantity + 1 };
      });
      setCart(newCart);
    } else {
      setCart([...cart, { id: idProduct, quantity: 1 }]);
    }
  };

  const removeFromCart = (idProduct: Product["id"]) => {
    const newCart = cart.reduce((acc, el) => {
      if (el.id === idProduct) {
        if (el.quantity > 1) {
          acc.push({ id: el.id, quantity: el.quantity - 1 });
          return acc;
        }
        return acc;
      } else {
        acc.push(el);
        return acc;
      }
    }, [] as Cart);
    setCart(newCart);
  };

  const pay = () => {
    setPaid(true);
    setCart([]);
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://mockend.up.railway.app/api/products"
      );
      const data = await response.json();
      console.log("abbiamo i dati");
      setProducts(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const done = () => {
    setPaid(false);
  };

  const getProductQuantity = (
    idProduct: Product["id"],
    isAddToCart: boolean
  ) => {
    const productHome = products?.find((product) => product.id == idProduct);
    //const productCart = cart.find((product) => product.id == idProduct);

    if (products && productHome) {
      //const qntProductCart = productCart.quantity;
      let qntProductHome = productHome.qty;

      const newProducts = products.map((product) => {
        if (product.id == idProduct && product.qty > 0) {
          if (isAddToCart)
            return {
              ...product,
              qty: --qntProductHome,
            };
          return {
            ...product,
            qty: ++qntProductHome,
          };
        }
        return product;
      });
      setProducts(newProducts);
    }
    return 0;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        paid,
        products,
        addToCart,
        removeFromCart,
        getProductQuantity,
        pay,
        loading,
        error,
        done,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
