import { FC } from "react";
import { AppProps } from "next/app";
import { PrimeReactProvider } from "primereact/api";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Roboto } from "next/font/google";
import Layout from "@/components/Layout";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "../styles/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

// setting retry to false, because I want to
// show that i'm handling in case of an error ;)
// because otherwise while its getting SSR, it will keep retrying and it will look a bit weird
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className={roboto.className}>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PrimeReactProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
