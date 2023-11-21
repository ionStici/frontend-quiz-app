import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { getQuizzes } from "@/lib/getQuizzes";

import HomeComponent from "@/components/HomeComponent";

export default function Home({ quizzes }) {
  return (
    <>
      <Head>
        <title>Frontend Quiz App | Frontend Mentor Challenge</title>
        <meta name="description" content="Frontend Quiz App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeComponent quizzes={quizzes} />
    </>
  );
}

export function getStaticProps() {
  const { quizzes } = getQuizzes();

  return { props: { quizzes } };
}
