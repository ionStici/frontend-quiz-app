import "./../styles/global.scss";
import Layout from "@/components/layout/Layout";
import { ScoreContextProvider } from "@/store/score";

export default function App({ Component, pageProps }) {
  return (
    <ScoreContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ScoreContextProvider>
  );
}
