async function getUserQuestions(
  category: string,
  limit: number,
  types: ("known" | "unkown" | "undiscovered")[],
  excludedQuestionsID?: number[]
) {
  const requestURL = new URL("user-questions", "http://localhost:3200");
  requestURL.searchParams.set("category", category);
  requestURL.searchParams.set("limit", String(limit));
  requestURL.searchParams.set("types", JSON.stringify(types));
  if (excludedQuestionsID) {
    requestURL.searchParams.set("exclude", JSON.stringify(excludedQuestionsID));
  }
  console.log(requestURL)
  try {
    const userStatsReq = await fetch(requestURL, {
      credentials: "include",
    });
    const userStats: question[] = await userStatsReq.json();
    return userStats;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export default getUserQuestions;
