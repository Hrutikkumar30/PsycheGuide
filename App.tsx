
import React, { useState, useEffect } from 'react';
import { AppState, StudentInfo, UserResponse, AnalysisResult } from './types';
import Layout from './components/Layout';
import Landing from './components/Landing';
import StudentForm from './components/StudentForm';
import Assessment from './components/Assessment';
import Results from './components/Results';
import HowItWorks from './components/HowItWorks';
import Methodology from './components/Methodology';
import { analyzeAssessment } from './services/apiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppState>(AppState.LANDING);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [previousResult, setPreviousResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load previous result on mount
  useEffect(() => {
    const saved = localStorage.getItem('psycheguide_last_result');
    if (saved) {
      try {
        setPreviousResult(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved result", e);
      }
    }
  }, []);

  const startAssessment = () => setCurrentStep(AppState.FORM);
  const navigateHome = () => setCurrentStep(AppState.LANDING);
  const navigateHowItWorks = () => setCurrentStep(AppState.HOW_IT_WORKS);
  const navigateMethodology = () => setCurrentStep(AppState.METHODOLOGY);
  
  const viewPreviousResult = () => {
    if (previousResult) {
      setResult(previousResult);
      setCurrentStep(AppState.RESULTS);
    }
  };

  const handleFormSubmit = (info: StudentInfo) => {
    setStudentInfo(info);
    setCurrentStep(AppState.ASSESSMENT);
  };

  const handleAssessmentComplete = async (userResponses: UserResponse[]) => {
    setResponses(userResponses);
    setCurrentStep(AppState.ANALYZING);
    setError(null);

    if (studentInfo) {
      try {
        const analysis = await analyzeAssessment(studentInfo, userResponses);
        setResult(analysis);
        setPreviousResult(analysis);
        localStorage.setItem('psycheguide_last_result', JSON.stringify(analysis));
        setCurrentStep(AppState.RESULTS);
      } catch (err) {
        console.error(err);
        setError("We encountered an issue analyzing your results. Please try again.");
        setCurrentStep(AppState.ASSESSMENT);
      }
    }
  };

  const restart = () => {
    setCurrentStep(AppState.LANDING);
    setStudentInfo(null);
    setResponses([]);
    setResult(null);
  };

  const renderContent = () => {
    switch (currentStep) {
      case AppState.LANDING:
        return (
          <Landing 
            onStart={startAssessment} 
            previousResult={previousResult} 
          />
        );
      case AppState.HOW_IT_WORKS:
        return <HowItWorks onBack={navigateHome} />;
      case AppState.METHODOLOGY:
        return <Methodology onBack={navigateHome} />;
      case AppState.FORM:
        return <StudentForm onSubmit={handleFormSubmit} />;
      case AppState.ASSESSMENT:
        return (
          <>
            {error && (
              <div className="max-w-3xl mx-auto mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                {error}
              </div>
            )}
            <Assessment onComplete={handleAssessmentComplete} />
          </>
        );
      case AppState.ANALYZING:
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-4">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-xl">⚡</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Analyzing Your Profile</h2>
              <p className="text-gray-500 animate-pulse">Processing your psychometric assessment data...</p>
            </div>
          </div>
        );
      case AppState.RESULTS:
        return result ? <Results result={result} onRestart={restart} /> : null;
      default:
        return <Landing onStart={startAssessment} />;
    }
  };

  return (
    <Layout 
      onNavigateHome={navigateHome}
      onNavigateHowItWorks={navigateHowItWorks}
      onNavigateMethodology={navigateMethodology}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
