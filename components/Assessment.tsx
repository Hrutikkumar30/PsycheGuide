
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { UserResponse } from '../types';

interface AssessmentProps {
  onComplete: (responses: UserResponse[]) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleSelect = (option: string) => {
    const newResponse: UserResponse = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      selectedValue: option
    };

    const existingIndex = responses.findIndex(r => r.questionId === currentQuestion.id);
    let updatedResponses = [...responses];
    
    if (existingIndex !== -1) {
      updatedResponses[existingIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }
    
    setResponses(updatedResponses);

    // Auto-advance if not at end
    if (currentIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const handleFinish = () => {
    if (responses.length === QUESTIONS.length) {
      onComplete(responses);
    }
  };

  const isComplete = responses.length === QUESTIONS.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
              Section: {currentQuestion.category}
            </span>
            <h3 className="text-2xl font-bold text-gray-900">Question {currentIndex + 1} of {QUESTIONS.length}</h3>
          </div>
          <span className="text-sm font-medium text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full gradient-bg transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-10 leading-tight">
          {currentQuestion.text}
        </h2>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = responses.find(r => r.questionId === currentQuestion.id)?.selectedValue === option;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 group flex items-center justify-between
                  ${isSelected 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'}`}
              >
                <span className={`text-lg font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>
                  {option}
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-300'}`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="px-6 py-2 text-gray-500 font-semibold disabled:opacity-30 flex items-center gap-2"
          >
            ← Previous
          </button>
          
          {currentIndex === QUESTIONS.length - 1 ? (
            <button
              onClick={handleFinish}
              disabled={!isComplete}
              className={`px-10 py-4 rounded-xl font-bold transition-all shadow-md active:scale-95
                ${isComplete ? 'gradient-bg text-white hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Analyze Results
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-6 py-2 text-indigo-600 font-bold flex items-center gap-2"
            >
              Next Question →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
