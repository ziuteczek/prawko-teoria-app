const sendAnswer = async (questionID: number, answer: string) => {
  const reqestURL = new URL("user-answer", "http://localhost:3200");
  reqestURL.searchParams.set("questionID", String(questionID));
  reqestURL.searchParams.set("answer", answer);
  try {
    const req = await fetch(reqestURL, {
      method: "POST",
      credentials: "include",
    });

    if (!req.ok) {
      throw new Error("Status code " + req.status);
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export default sendAnswer;
