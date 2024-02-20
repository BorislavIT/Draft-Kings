import { FC } from "react";
import { AppProps } from "next/app";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "@/contexts/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className={roboto.className}>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <ToastProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ToastProvider>
        </PrimeReactProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
