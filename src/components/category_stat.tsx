import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import getUserQuestions from "../api/getUserQuestions";

function CategoryUserStat({ categoryStats }: { categoryStats: userStats }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const questionsContent = useRef<question[] | null>(null);

  useEffect(() => {
    if (!inView) {
      return;
    }
    (async () => {
      questionsContent.current = await getUserQuestions(
        categoryStats.category,
        3,
        ["undiscovered"]
      );
      console.log(questionsContent.current);
    })();
  }, [inView]);
  return (
    <div key={categoryStats.category} ref={ref}>
      <h3>{categoryStats.category}</h3>
      <p>Znane {categoryStats.known}</p>
      <p>Nieznane {categoryStats.unknown}</p>
      <p>
        Nieodkryte{" "}
        {categoryStats.size - categoryStats.known - categoryStats.unknown}
      </p>
      <p>Liczba pytań {categoryStats.size}</p>
      <Link
        to={encodeURI("/quiz?category=" + categoryStats.category)}
        onClick={() =>
          questionsContent.current &&
          sessionStorage.setItem(
            "preload",
            JSON.stringify(questionsContent.current)
          )
        }
      >
        Start
      </Link>
    </div>
  );
}
export default CategoryUserStat;
