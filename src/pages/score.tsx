import { Score } from "@/ui/score";
import { Helmet } from "react-helmet-async";

export function ScorePage() {
  return (
    <>
      <Helmet title="Your Score" />
      <Score />
    </>
  );
}
