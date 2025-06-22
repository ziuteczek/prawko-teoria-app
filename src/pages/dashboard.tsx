import { useEffect, useState } from "react";
import getUserStats from "../api/getUserStats";
import CategoryUserStat from "../components/category_stat";

function Dashboard() {
  const [userStats, setUserStats] = useState<userStats[]>([]);

  useEffect(() => {
    (async () => {
      const newUserStats = await getUserStats();
      setUserStats(newUserStats);
      localStorage.setItem("userStats", JSON.stringify(newUserStats));
    })();
    const oldUserStats = JSON.parse(localStorage.getItem("userStats") || "[]");
    setUserStats(oldUserStats);
  }, []);

  return (
    <section>
      <h2>Kategorie</h2>
      {userStats
        .sort((userStatsA, userStatsB) => userStatsB.known - userStatsA.known)
        .map((categoryStat) => (
          <CategoryUserStat categoryStats={categoryStat} key={categoryStat.category}/>
        ))}
    </section>
  );
}
export default Dashboard;
