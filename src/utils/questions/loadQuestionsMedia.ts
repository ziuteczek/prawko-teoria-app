import getMedia from "../../api/getMedia";

const loadQuestions = (questions: question[]) => {
  const questionsLoaded: questionLoad[] = questions.map((question) => ({
    ...question,
    mediaBlob: question.media ? getMedia(question.media) : null,
    isLoaded: !question.media,
  }));
  return questionsLoaded;
};
export default loadQuestions;
