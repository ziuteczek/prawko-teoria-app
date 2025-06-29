import type { RefObject } from "react";
import getUserQuestions from "../../api/getUserQuestions";
import loadQuestionsMedia from "./loadQuestionsMedia";
const loadQuestions = async (
  loadedQuestions: RefObject<questionLoad[]>,
  currentlyLoadingQuestions: RefObject<number>,
  category: string,
  unacknowledgedAnswers: RefObject<number[]>
) => {
  const questionsToDownloadQuantity =
    8 - loadedQuestions.current.length + currentlyLoadingQuestions.current;
  console.log(questionsToDownloadQuantity);
  if (questionsToDownloadQuantity <= 0 || currentlyLoadingQuestions.current) {
    return;
  }
  currentlyLoadingQuestions.current += questionsToDownloadQuantity;

  const loadedQuestionsID = [
    ...loadedQuestions.current.map((question) => question.id),
    ...unacknowledgedAnswers.current
  ];
  
  const userQuestions = await getUserQuestions(
    category,
    questionsToDownloadQuantity,
    ["undiscovered"],
    loadedQuestionsID
  );

  if (!userQuestions) {
    // * Add error handling
    return;
  }

  const userQuestionsLoaded = loadQuestionsMedia(userQuestions);
  loadedQuestions.current.push(...userQuestionsLoaded);
  currentlyLoadingQuestions.current -= questionsToDownloadQuantity;
};
export default loadQuestions;
