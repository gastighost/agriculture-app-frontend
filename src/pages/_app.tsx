import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";

import store from "../store/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
