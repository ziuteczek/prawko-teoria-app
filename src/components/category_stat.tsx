import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";
import getUserQuestions from "../api/getUserQuestions";
import loadQuestionsMedia from "../utils/questions/loadQuestionsMedia";

function CategoryUserStat({ categoryStats }: { categoryStats: userStats }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  // const questionsContent = useRef<question[] | null>(null);
  const [questionsContent, setQuestionsContent] = useState<
    (questionMediaPromise | questionMediaBlob)[]
  >([]);
  useEffect(() => {
    if (!inView) {
      return;
    }

    (async () => {
      const questions = await getUserQuestions(categoryStats.category, 3, [
        "undiscovered",
      ]);

      if (!questions) {
        return;
      }
      const questionsLoaded = loadQuestionsMedia(questions);

      setQuestionsContent(questionsLoaded);


      questionsLoaded.forEach(async (questionLoaded) => {
        const questionLoadedWithMedia = {
          ...questionLoaded,
          mediaBlob: await questionLoaded.mediaBlob,
        };
        questionLoadedWithMedia.isLoaded = true
        setQuestionsContent((questions) => [
          ...questions.filter((q) => q.id !== questionLoaded.id),
          questionLoadedWithMedia,
        ]);
      });

    })();
  }, [inView]);
  useEffect(() => {
    // console.log(questionsContent);
  }, [questionsContent]);
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
        to={"/quiz?category=" + categoryStats.category}
        state={questionsContent}
        // onClick={() =>
        //   questionsContent &&
        //   sessionStorage.setItem("preload", JSON.stringify(questionsContent))
        // }
      >
        Start
      </Link>
    </div>
  );
}
export default CategoryUserStat;
