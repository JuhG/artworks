import "styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "redux/store";
import { Navigation } from "components/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="bg-gray-50">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col p-8">
          <Navigation />
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
