const getPreloadedQuestions = () => {
  try {
    const preloadQuestionsStr = sessionStorage.getItem("preload");
    if (typeof preloadQuestionsStr !== "string") {
      return [];
    }
    const preloadedQuestions: question[] = JSON.parse(preloadQuestionsStr);

    return preloadedQuestions;
  } catch (err) {
    // sessionStorage.removeItem("preload");
    console.error(err);
    return [];
  }
};
export default getPreloadedQuestions;
