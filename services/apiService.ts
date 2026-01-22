import { UserResponse, StudentInfo, AnalysisResult } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

export const analyzeAssessment = async (
  info: StudentInfo,
  responses: UserResponse[],
): Promise<AnalysisResult> => {
  const url = `${API_BASE_URL}/analyze`;
  console.log("Making request to:", url);
  console.log("Request payload:", { studentInfo: info, answers: responses });
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentInfo: info,
        answers: responses,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Analysis failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data as AnalysisResult;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
