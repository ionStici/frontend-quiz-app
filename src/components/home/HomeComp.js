import SubjectLink from "./SubjectLink";
import styles from "./../../styles/Home.module.scss";

function HomeComp({ quizzes }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.text_box}>
        <h1>
          <span>Welcome to the</span>
          <span>Frontend Quiz!</span>
        </h1>
        <p>Pick a subject to get started!</p>
      </div>

      <div className={styles.links}>
        <ul>
          {quizzes.map((quiz) => (
            <SubjectLink
              key={quiz.title}
              title={quiz.title}
              icon={quiz.icon}
              color={quiz.color}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default HomeComp;
