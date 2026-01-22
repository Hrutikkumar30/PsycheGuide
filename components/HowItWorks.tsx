
import React from 'react';

interface HowItWorksProps {
  onBack: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onBack }) => {
  const steps = [
    {
      title: "Step 1: Student Profile",
      description: "We start by understanding your academic context—your favorite subjects and current grade level to provide baseline context for personalized analysis.",
      icon: "👤"
    },
    {
      title: "Step 2: Core Assessment",
      description: "You'll answer a series of carefully crafted questions covering your personality, natural interests, and situational strengths.",
      icon: "📝"
    },
    {
      title: "Step 3: Psychometric Analysis",
      description: "Our advanced algorithms analyze your responses using established psychometric frameworks (Big Five, RIASEC) to build a comprehensive multidimensional profile.",
      icon: "⚡"
    },
    {
      title: "Step 4: Personalized Career Roadmap",
      description: "Receive a tailored report including personality deep-dives, interest charts, and specific career paths with actionable next steps.",
      icon: "🎯"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button 
        onClick={onBack}
        className="mb-8 text-indigo-600 font-semibold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
      >
        ← Back to Home
      </button>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">How PsycheGuide Works</h1>
      <p className="text-xl text-gray-600 mb-12">Our platform helps connect your personality traits and interests with real career paths through a simple 4-step process.</p>
      
      <div className="space-y-12">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 items-start p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl shrink-0">
              {step.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-8 gradient-bg rounded-3xl text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to find your path?</h2>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-white text-indigo-600 rounded-full font-bold hover:shadow-lg transition-shadow"
        >
          Start Your Assessment
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;
