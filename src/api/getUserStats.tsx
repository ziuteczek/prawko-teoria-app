async function getUserStats(): Promise<userStats[]> {
  const requestURL = new URL("/user-stats", "http://localhost:3200");
  try {
    const userStatsReq = await fetch(requestURL, {
      credentials: "include",
    });
    const userStats = await userStatsReq.json();
    return userStats;
  } catch (err) {
    console.error(err);
    return [];
  }
}
export default getUserStats;
