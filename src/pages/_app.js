import "./../styles/global.scss";
import Layout from "@/components/layout/Layout";
import { ResultsContextProvider } from "../store/scores";

export default function App({ Component, pageProps }) {
  return (
    <ResultsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ResultsContextProvider>
  );
}
