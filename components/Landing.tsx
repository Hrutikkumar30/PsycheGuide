
import React from 'react';
import { AnalysisResult } from '../types';

interface LandingProps {
  onStart: () => void;
  previousResult?: AnalysisResult | null;
}

const Landing: React.FC<LandingProps> = ({ onStart, previousResult }) => {
  const topCareer = previousResult?.careerRecommendations[0];

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Unlock Your Potential <br />
          <span className="gradient-text">Through Science.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
          Take our psychometric assessment designed specifically for students. 
          Discover your strengths, interests, and find your ideal career path through proven psychological frameworks.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onStart}
            className="px-10 py-4 gradient-bg text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
          >
            {previousResult ? "Retake Assessment" : "Start Assessment Now"}
          </button>
        </div>

        {previousResult && (
          <div className="max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-left group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Your Recent Insight
                </span>
                <h3 className="text-3xl font-bold mb-2">Top Match: {topCareer?.title}</h3>
                <p className="text-indigo-200 text-lg mb-6 max-w-lg">
                  Based on your last assessment, you showed a <span className="text-white font-bold">{topCareer?.matchPercentage}%</span> alignment with roles in this field.
                </p>
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-2">
                     {previousResult.strengths.slice(0, 3).map((s, i) => (
                       <div key={i} className="w-10 h-10 rounded-full bg-white/10 border-2 border-indigo-900 flex items-center justify-center text-xs font-bold" title={s}>
                         {s.charAt(0)}
                       </div>
                     ))}
                   </div>
                   <span className="text-sm text-indigo-300">Core strengths identified</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Career Mapping", 
              desc: "Get 5 personalized career recommendations with detailed matching logic.",
              icon: "🚀"
            },
            { 
              title: "Trait Analysis", 
              desc: "Deep dive into your personality traits and behavioral patterns.",
              icon: "🧠"
            },
            { 
              title: "Skill Strengths", 
              desc: "Identify your core competencies and areas for growth.",
              icon: "⭐"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
