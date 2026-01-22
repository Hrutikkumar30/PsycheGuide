
import React, { useState } from 'react';
import { StudentInfo } from '../types';

interface StudentFormProps {
  onSubmit: (info: StudentInfo) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<StudentInfo>({
    name: '',
    age: '',
    grade: '',
    favoriteSubjects: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
        <p className="text-gray-500 mb-8">This helps us personalize your career recommendations based on your profile.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
                placeholder="16"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Grade / Level</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={formData.grade}
              onChange={e => setFormData({...formData, grade: e.target.value})}
              placeholder="10th Grade"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Favorite Subjects (Separate by commas)</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={formData.favoriteSubjects}
              onChange={e => setFormData({...formData, favoriteSubjects: e.target.value})}
              placeholder="Math, Art, History"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 gradient-bg text-white rounded-xl font-bold hover:shadow-lg transition-all active:scale-95"
          >
            Continue to Assessment
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
