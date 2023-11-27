import "./../styles/global.scss";
import Layout from "@/components/Layout";

import ResultsContext from "./store";

import { ResultsContextProvider } from "./store";

export default function App({ Component, pageProps }) {
  return (
    <ResultsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ResultsContextProvider>
  );
}
