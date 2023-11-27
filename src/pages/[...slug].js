import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import ScoresContext from "./store";
import Link from "next/link";

function Results() {
  const router = useRouter();
  let subject = router.query.slug?.[0];

  const context = useContext(ScoresContext);
  const { scores: allScores } = context;

  const scores = allScores.filter((score) => {
    return score[0].toLowerCase() === subject;
  });

  const currentScore = scores[scores.length - 1];

  return (
    <section>
      <h1>
        <span>Quiz completed</span>
        <span>You scored...</span>
      </h1>

      <div>
        <h2>
          {/* <Image src="" alt="" width={28} height={28} /> */}
          <span>{currentScore?.[0]}</span>
        </h2>
        <p>{currentScore?.[1]}</p>
        <p>out of 10</p>
      </div>

      <button>Play Again</button>
    </section>
  );
}

export default Results;
