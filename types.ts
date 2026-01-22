
export enum Category {
  INTERESTS = 'Interests',
  PERSONALITY = 'Personality',
  STRENGTHS = 'Strengths'
}

export interface Question {
  id: string;
  category: Category;
  text: string;
  options: string[];
}

export interface UserResponse {
  questionId: string;
  category: Category;
  selectedValue: string;
}

export interface StudentInfo {
  name: string;
  age: string;
  grade: string;
  favoriteSubjects: string;
}

export interface AnalysisResult {
  personalityTraits: {
    trait: string;
    description: string;
    score: number;
  }[];
  strengths: string[];
  interestProfile: {
    category: string;
    description: string;
    score: number;
  }[];
  careerRecommendations: {
    title: string;
    matchPercentage: number;
    whyItMatches: string;
    suggestedPath: string;
  }[];
  summary: string;
  encouragingSummary: string;
  strategicDirection: string;
  counselorSummary: string;
  parentActionPlan: string[];
}

export enum AppState {
  LANDING = 'LANDING',
  FORM = 'FORM',
  ASSESSMENT = 'ASSESSMENT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  METHODOLOGY = 'METHODOLOGY'
}
