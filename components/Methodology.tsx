
import React from 'react';

interface MethodologyProps {
  onBack: () => void;
}

const Methodology: React.FC<MethodologyProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button 
        onClick={onBack}
        className="mb-8 text-indigo-600 font-semibold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
      >
        ← Back to Home
      </button>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Our Methodology</h1>
      <p className="text-xl text-gray-600 mb-12">PsycheGuide combines time-tested psychometric frameworks with advanced algorithmic analysis to deliver high-fidelity career guidance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-indigo-600 mb-4 uppercase tracking-wider text-sm">Framework 01</h3>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Holland Codes (RIASEC)</h2>
          <p className="text-gray-600 leading-relaxed">
            Our interest profiling is rooted in the RIASEC model, categorizing preferences into Realistic, Investigative, Artistic, Social, Enterprising, and Conventional domains to map personality to work environments.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-indigo-600 mb-4 uppercase tracking-wider text-sm">Framework 02</h3>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Big Five Model</h2>
          <p className="text-gray-600 leading-relaxed">
            We assess personality through the lens of Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (OCEAN), providing a comprehensive view of a student's behavioral tendencies.
          </p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-gray-900">Advanced Psychometric Analysis</h2>
          <p>
            Traditional assessments often rely on simple scoring. PsycheGuide uses established psychometric methods to analyze your responses. 
            We look at how your favorite subjects, your responses, and your personality traits connect to each other.
          </p>
          <p>
            This helps us identify patterns in your strengths and interests that might not be obvious at first glance, but show up consistently across different questions.
          </p>
        </section>

        <section className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Data Privacy & Security</h2>
          <p className="text-indigo-800">
            We prioritize student privacy. All assessment data is processed in real-time and used solely for generating your personalized report. We do not store student responses longer than necessary to complete the analysis session.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={onBack}
          className="px-10 py-4 gradient-bg text-white rounded-full font-bold hover:shadow-xl transition-all"
        >
          Start Discovering Your Future
        </button>
      </div>
    </div>
  );
};

export default Methodology;
