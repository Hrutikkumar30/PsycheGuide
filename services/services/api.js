const API_BASE_URL = "https://nodejs-1.hrutiknaik30.replit.app";

export async function analyzeAssessment(studentInfo, answers) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentInfo: studentInfo,
      answers: answers,
    }),
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return response.json();
}
