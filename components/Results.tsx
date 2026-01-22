
import React, { useState, useRef } from 'react';
import { AnalysisResult } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Cell
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResultsProps {
  result: AnalysisResult;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const [viewMode, setViewMode] = useState<'student' | 'counselor'>('student');
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc',
        ignoreElements: (element) => element.hasAttribute('data-html2canvas-ignore')
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`PsycheGuide_Report_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderStudentView = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Personalized Narrative Guidance - NEW SECTION */}
      <div className="bg-indigo-50 border border-indigo-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl">✨</div>
          <h3 className="text-3xl font-bold text-indigo-900">Your Personal Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-3">What Makes You Unique</h4>
            <p className="text-indigo-900/80 leading-relaxed text-lg">
              {result.encouragingSummary}
            </p>
          </div>
          <div className="bg-white/60 p-6 rounded-3xl border border-indigo-200">
            <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-3">Your Strategic Direction</h4>
            <p className="text-indigo-900 font-medium leading-relaxed">
              {result.strategicDirection}
            </p>
            <div className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <span>Goal: Growth & Exploration</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personality Traits Radar */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Personality Dimensions</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.personalityTraits}>
                <PolarGrid />
                <PolarAngleAxis dataKey="trait" />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {result.personalityTraits.map((t, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="font-bold text-indigo-600 w-24 shrink-0">{t.trait}</span>
                <span className="text-sm text-gray-600">{t.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Bar Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Interest Analysis</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.interestProfile} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" width={80} tick={{ fontSize: 12 }} />
                <RechartsTooltip />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={32}>
                  {result.interestProfile.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-4">
             <h4 className="font-bold text-gray-700">Top Strengths:</h4>
             <div className="flex flex-wrap gap-2">
                {result.strengths.map((s, i) => (
                  <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold">
                    {s}
                  </span>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Career Recommendations */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-3xl font-bold mb-10 text-gray-900">Career Roadmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {result.careerRecommendations.map((career, i) => (
            <div key={i} className="group p-8 rounded-3xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-bold text-gray-900">{career.title}</h4>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                  {career.matchPercentage}% Match
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{career.whyItMatches}</p>
              <div className="p-4 bg-white/50 rounded-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 block mb-2">Suggested Path</span>
                <p className="text-sm text-gray-800 font-medium">{career.suggestedPath}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCounselorView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
           </div>
           <div>
             <h3 className="text-2xl font-bold text-gray-900">Psychological Profile Brief</h3>
             <p className="text-gray-500">Confidential summary for educators and career counselors.</p>
           </div>
        </div>
        
        <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-lg italic bg-gray-50 p-6 rounded-2xl border-l-4 border-teal-500">
            "{result.counselorSummary}"
          </p>
          
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Developmental Strengths</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {result.strengths.map((s, i) => (
                 <div key={i} className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl">
                   <div className="w-2 h-2 rounded-full bg-teal-500" />
                   <span className="font-medium text-teal-900">{s}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="mt-12">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Parent & Educator Action Plan</h4>
            <div className="space-y-4">
              {result.parentActionPlan.map((action, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-700">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 flex gap-6 items-start">
        <div className="text-3xl text-amber-600 pt-1">⚠️</div>
        <div>
           <h4 className="font-bold text-amber-900 mb-1">Counselor Note</h4>
           <p className="text-amber-800 text-sm">
             This profile should be used as a conversation starter and combined with traditional observation and academic records for final decision-making.
           </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8" ref={reportRef}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">P</div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Official PsycheGuide Discovery Report</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Discovery Report</h1>
            <p className="text-gray-500 font-medium">Personalized Career Alignment Analysis • {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="flex gap-3" data-html2canvas-ignore="true">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              )}
              Export PDF
            </button>
            <button 
              onClick={onRestart}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
            >
              Back Home
            </button>
          </div>
        </div>

        {/* View Switcher - Hidden in PDF */}
        <div className="flex justify-center" data-html2canvas-ignore="true">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
            <button 
              onClick={() => setViewMode('student')}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all ${viewMode === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Student View
            </button>
            <button 
              onClick={() => setViewMode('counselor')}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all ${viewMode === 'counselor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Counselor View
            </button>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xl text-gray-600 leading-relaxed italic">
            {viewMode === 'student' ? result.summary : 'Expert-led insights for academic and behavioral guidance.'}
          </p>
        </div>

        {viewMode === 'student' ? renderStudentView() : renderCounselorView()}

        {/* PDF Footer Watermark */}
        <div className="hidden pdf-only:block pt-12 border-t border-gray-100 text-center text-gray-400 text-xs mt-20">
          This report was generated by PsycheGuide using psychometric analysis. © 2024 PsycheGuide Platform.
        </div>
      </div>
    </div>
  );
};

export default Results;
