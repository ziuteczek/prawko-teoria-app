import getMedia from "../api/getMedia";

const loadQuestions = (questions: question[]) => {
  const questionsLoaded: questionLoad[] = questions.map((question) => ({
    ...question,
    mediaBlob: question.media ? getMedia(question.media) : null,
  }));
  questionsLoaded.forEach(async (preloadedQuestion) => {
    if (preloadedQuestion.mediaBlob instanceof Promise) {
      preloadedQuestion.mediaBlob = await preloadedQuestion.mediaBlob;
    }
  });
  return questionsLoaded;
};
export default loadQuestions;