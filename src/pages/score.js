function ScorePage() {
  return "Score Page";
}

export default ScorePage;

// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useContext } from "react";
// import ScoresContext from "../store/scores";
// import Link from "next/link";
// import Error from "next/error";

// function Results(props) {
//   console.log(props);

//   const router = useRouter();
//   const { slug } = router.query;
//   let subject = router.query.slug?.[0];

//   const context = useContext(ScoresContext);
//   const { scores: allScores } = context;

//   const scores = allScores.filter((score) => {
//     return score[0].toLowerCase() === subject;
//   });

//   const currentScore = scores[scores.length - 1];

//   if (slug?.[1] !== "score") return <Error statusCode={404} />;

//   return (
//     <section>
//       <h1>
//         <span>Quiz completed</span>
//         <span>You scored...</span>
//       </h1>

//       <div>
//         <div>
//           <h2>
//             {/* <Image src="" alt="" width={28} height={28} /> */}
//             <span>{currentScore?.[0]}</span>
//           </h2>

//           <p>{currentScore?.[1]}</p>

//           <p>out of 10</p>
//         </div>

//         <Link href="/">Play Again</Link>
//       </div>
//     </section>
//   );
// }

// export default Results;
