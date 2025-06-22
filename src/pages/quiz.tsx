import { useEffect, useRef, useState } from "react";
import getUserQuestions from "../api/getUserQuestions";
import getPreloadedQuestions from "../utils/getPreloadedQuestions";
import loadQuestions from "../utils/loadQuestions";
function Quiz() {
  const loadedQuestions = useRef<questionLoad[]>([]);
  const currentlyLoadingQuestions = useRef<boolean>(false);

  const [currQuestion, setCurrQuestion] = useState<questionLoad>();

  const category = new URL(window.location.href).searchParams.get("category");
  if (typeof category !== "string") {
    throw new Error("category in URL is NULL");
  }

  useEffect(() => {
    const preloadedQuestions = getPreloadedQuestions();
    loadedQuestions.current = loadQuestions(preloadedQuestions);
  }, []);

  useEffect(() => {
    const questionsToDownloadQuantity = 8 - loadedQuestions.current.length;
    if (questionsToDownloadQuantity <= 0 || currentlyLoadingQuestions.current) {
      return;
    }
    currentlyLoadingQuestions.current = true;

    const loadedQuestionsID = [
      ...loadedQuestions.current.map((question) => question.id),
    ];
    const excludedQuestionsID = currQuestion?.id
      ? [...loadedQuestionsID]
      : [...loadedQuestionsID, currQuestion?.id as number];

    const userQuestionsPromise = getUserQuestions(
      category,
      questionsToDownloadQuantity,
      ["undiscovered"],
      excludedQuestionsID
    );

    (async () => {
      const userQuestions = await userQuestionsPromise;
      if (!userQuestions) {
        // * Add error handling
        return;
      }

      const userQuestionsLoaded = loadQuestions(userQuestions);
      loadedQuestions.current = [
        ...loadedQuestions.current,
        ...userQuestionsLoaded,
      ];
      currentlyLoadingQuestions.current = false;
    })();
  }, []);

  return (
    <>
      <p>{currQuestion?.content}</p>
    </>
  );
}

export default Quiz;
