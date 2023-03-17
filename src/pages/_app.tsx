import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";

import store from "../store/store";
import NavbarLayout from "../components/navigation/NavbarLayout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Toaster />
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    </Provider>
  );
};

export default App;
