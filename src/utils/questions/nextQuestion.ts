import type { RefObject } from "react";

const nextQuestion = async (
  loadedQuestions: RefObject<questionLoad[]>,
  currQuestion: questionWithLoadedMedia | questionNoMedia | undefined,
  setCurrQuestion: React.Dispatch<
    React.SetStateAction<
      | questionWithLoadedMedia
      | questionNoMedia
      | currQuestionObjWithLoadedMedia
      | undefined
    >
  >
) => {
  loadedQuestions.current = loadedQuestions.current.filter(
    (question) => !(question.id === currQuestion?.id)
  );
  const readyQuestion: questionLoad | undefined = loadedQuestions.current.find(
    (question) => question.isLoaded
  );

  if (readyQuestion) {
    setCurrQuestion({
      ...readyQuestion,
      mediaBlob: await readyQuestion.mediaBlob,
    });
    return;
  }

  const questionsPromises: Promise<questionWithLoadedMedia>[] =
    loadedQuestions.current.map(
      (question) =>
        new Promise(async (resolve, reject) => {
          try {
            resolve({ ...question, mediaBlob: await question.mediaBlob });
          } catch (err) {
            console.error(err);
            reject(undefined);
          }
        })
    );
  const loadedQuestion = await Promise.race(questionsPromises);

  setCurrQuestion({
    ...loadedQuestion,
    mediaURL: URL.createObjectURL(loadedQuestion.mediaBlob),
  });
};
export default nextQuestion;
