const getPreloadedQuestions = () => {
  try {
    const preloadedQuestions: question[] = JSON.parse(sessionStorage.preload);
    // sessionStorage.removeItem("preload");
    return preloadedQuestions;
  } catch (err) {
    sessionStorage.removeItem("preload");
    console.error(err);
    return [];
  }
};
export default getPreloadedQuestions;
