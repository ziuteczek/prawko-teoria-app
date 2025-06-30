import { useEffect, useRef, useState } from "react";
import loadQuestions from "../utils/questions/loadQuestions";
import loadQuestionsMedia from "../utils/questions/loadQuestionsMedia";
import nextQuestion from "../utils/questions/nextQuestion";
import sendAnswer from "../api/sendAnswer";
import { useLocation } from "react-router";
function Quiz() {
  const loadedQuestions = useRef<questionMediaPromise[]>([]);
  const currentlyLoadingQuestions = useRef<number>(0);
  const unacknowledgedAnswers = useRef<number[]>([]);

  const rLocation = useLocation();

  const [currQuestion, setCurrQuestion] = useState<questionMediaBlob>();

  const category = new URL(window.location.href).searchParams.get("category");
  if (typeof category !== "string") {
    throw new Error("category in URL is NULL");
  }
  useEffect(() => {
    const preloadedQuestions: questionMediaPromise[] = rLocation.state;
    rLocation.state = null;
    if (preloadedQuestions?.length) {
      preloadedQuestions.forEach((preloadedQuestion) => {
        if (preloadedQuestion.mediaBlob instanceof Blob) {
          preloadedQuestion.mediaBlob = Promise.resolve(
            preloadedQuestion.mediaBlob
          );
        }
      });

      loadedQuestions.current = loadQuestionsMedia(preloadedQuestions);
    }

    (async () => {
      const loadQuestionPromise = loadQuestions(
        loadedQuestions,
        currentlyLoadingQuestions,
        category,
        unacknowledgedAnswers
      );
      if (!loadedQuestions.current.length) {
        await loadQuestionPromise;
      }
      await nextQuestion(loadedQuestions, currQuestion, setCurrQuestion);
    })();
  }, []);

  if (!currQuestion) {
    return <></>;
  }

  return (
    <>
      <h1>{currQuestion.id}</h1>
      <p>{currQuestion.content}</p>

      {currQuestion.media?.endsWith(".mp4") ? (
        <video
          src={URL.createObjectURL(currQuestion.mediaBlob as Blob)}
        ></video>
      ) : currQuestion.media?.endsWith(".jpg") ? (
        <img src={URL.createObjectURL(currQuestion.mediaBlob as Blob)} alt="" />
      ) : (
        <></>
      )}

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
