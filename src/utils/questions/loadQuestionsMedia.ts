import getMedia from "../../api/getMedia";

const loadQuestionsMedia = (questions: question[]) => {
  const questionsLoaded: questionLoad[] = questions.map((question) => ({
    ...question,
    mediaBlob: question.media ? getMedia(question.media) : null,
    isLoaded: !question.media,
  }));
  questionsLoaded.forEach((question) =>
    question.mediaBlob?.then(() => (question.isLoaded = true))
  );
  return questionsLoaded;
};
export default loadQuestionsMedia;
