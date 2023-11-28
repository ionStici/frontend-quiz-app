import { getQuizzes } from "@/lib/getQuizzes";
import styles from "./../styles/Home.module.scss";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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

      <section className={styles.wrapper}>
        <div className={styles.text_box}>
          <h1>
            <span>Welcome to the</span>
            <span>Frontend Quiz!</span>
          </h1>
          <p>Pick a subject to get started!</p>
        </div>

        <div className={styles.buttons_box}>
          <ul>
            {quizzes.map((quiz) => {
              return (
                <li key={quiz.title}>
                  <Link href={quiz.title.toLowerCase()}>
                    <div style={{ backgroundColor: quiz.color }}>
                      <Image
                        src={quiz.icon}
                        alt={quiz.title}
                        width={28}
                        height={28}
                      />
                    </div>
                    <span>{quiz.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export function getStaticProps() {
  const { quizzes } = getQuizzes();
  return { props: { quizzes } };
}
