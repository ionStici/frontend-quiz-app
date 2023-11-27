import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import ResultsContext from "./store";
import Link from "next/link";

function Results() {
  const router = useRouter();
  let subject = router.query.slug?.[0];

  const context = useContext(ResultsContext);
  const { results } = context;

  const [currentResult, setCurrentResult] = useState(
    results[results.length - 1]
  );

  console.log(currentResult);

  return (
    <p>
      <Link href="/html">HTML</Link>
      <br />
      <Link href="/css">CSS</Link>
      <br />
      <Link href="/javascript">JavaScript</Link>
      <br />
      <Link href="/accessibility">Accessibility</Link>
      <br />

      <span>{currentResult[0]}</span>
      <span>{currentResult[1]}</span>
    </p>
  );
}

export default Results;
