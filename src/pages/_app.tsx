import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContextProvider } from "../ContextProvider";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";

export default function App({ Component, pageProps }: AppProps) {
  const store: AppStore = makeStore();
  return (
    <Provider store={store}>
      <ContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </ContextProvider>
    </Provider>
  );
}
