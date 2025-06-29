import { useEffect, useRef, useState } from "react";
import loadQuestions from "../utils/questions/loadQuestions";
import getPreloadedQuestions from "../utils/questions/getPreloadedQuestions";
import loadQuestionsMedia from "../utils/questions/loadQuestionsMedia";
import nextQuestion from "../utils/questions/nextQuestion";
import sendAnswer from "../api/sendAnswer";
function Quiz() {
  const loadedQuestions = useRef<questionLoad[]>([]);
  const currentlyLoadingQuestions = useRef<number>(0);
  const unacknowledgedAnswers = useRef<number[]>([]);

  const [currQuestion, setCurrQuestion] = useState<
    questionWithLoadedMedia | questionNoMedia
  >();

  const category = new URL(window.location.href).searchParams.get("category");
  if (typeof category !== "string") {
    throw new Error("category in URL is NULL");
  }

  useEffect(() => {
    const preloadedQuestions = getPreloadedQuestions();
    loadedQuestions.current = loadQuestionsMedia(preloadedQuestions);

    (async () => {
      await nextQuestion(loadedQuestions, currQuestion, setCurrQuestion);
      await loadQuestions(
        loadedQuestions,
        currentlyLoadingQuestions,
        category,
        unacknowledgedAnswers
      );
    })();
  }, []);

  if (!currQuestion) {
    return <></>;
  }

  return (
    <>
      <h1>{currQuestion.id}</h1>
      <p>{currQuestion.content}</p>

      <button
        onClick={async () => {
          const answerQuestionID = currQuestion.id;
          unacknowledgedAnswers.current.push(answerQuestionID);
          await nextQuestion(loadedQuestions, currQuestion, setCurrQuestion);
          await sendAnswer(answerQuestionID, "Nie");
          await loadQuestions(
            loadedQuestions,
            currentlyLoadingQuestions,
            category,
            unacknowledgedAnswers
          );
          unacknowledgedAnswers.current = unacknowledgedAnswers.current.filter(
            (questionID) => questionID !== answerQuestionID
          );
        }}
      >
        Następne pytanie
      </button>
    </>
  );
}

export default Quiz;
