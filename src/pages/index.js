import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { getQuizzes } from "@/lib/getQuizzes";

import Header from "@/components/Header";

import styles from "./../styles/Home.module.scss";

export default function Home({ quizzes }) {
  return (
    <>
      <Head>
        <title>Frontend Quiz App | Frontend Mentor Challenge</title>
        <meta name="description" content="Frontend Quiz App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className={styles.wrapper}>
        <div className={styles.content}>
          <h1>
            <span>Welcome to the</span>
            <span>Frontend Quiz!</span>
          </h1>
          <p>Pick a subject to get started!</p>
        </div>

        {quizzes.map((quiz) => {
          return (
            <ul key={quiz.title}>
              <li>
                <Link href="/">
                  <Image
                    src={quiz.icon}
                    alt={quiz.title}
                    width={40}
                    height={40}
                  />
                  <span>{quiz.title}</span>
                </Link>
              </li>
            </ul>
          );
        })}
      </section>
    </>
  );
}

export function getStaticProps() {
  const { quizzes } = getQuizzes();

  return { props: { quizzes } };
}
