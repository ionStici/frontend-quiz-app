import Head from "next/head";
import HomeComp from "@/components/home/HomeComp";
import { getQuizzes } from "@/lib/getQuizzes";

export default function Home({ quizzes }) {
  return (
    <>
      <Head>
        <title>Frontend Quiz App</title>
        <meta
          name="description"
          content="Frontend Quiz App | Frontend Mentor Challenge"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeComp quizzes={quizzes} />
    </>
  );
}

export function getStaticProps() {
  const { quizzes } = getQuizzes();
  return { props: { quizzes } };
}
