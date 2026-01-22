// Backend reference file for Replit
// Copy this code to your Replit backend index.js file

import express from 'express';
import cors from 'cors';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json({ limit: '10mb' })); // Parse JSON request bodies with size limit

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!', timestamp: new Date().toISOString() });
});

// Psychometric Analysis Functions
function analyzeBigFive(answers) {
  // Big Five Personality Traits: OCEAN
  const traits = {
    Openness: 0,
    Conscientiousness: 0,
    Extraversion: 0,
    Agreeableness: 0,
    Neuroticism: 0
  };
  
  const traitKeywords = {
    Openness: ['creative', 'imaginative', 'curious', 'artistic', 'open-minded', 'adventurous'],
    Conscientiousness: ['organized', 'disciplined', 'responsible', 'reliable', 'hardworking', 'detail-oriented'],
    Extraversion: ['outgoing', 'social', 'energetic', 'talkative', 'confident', 'assertive'],
    Agreeableness: ['cooperative', 'trusting', 'empathetic', 'kind', 'helpful', 'compassionate'],
    Neuroticism: ['anxious', 'worried', 'stressed', 'emotional', 'sensitive', 'nervous']
  };
  
  answers.forEach(answer => {
    const value = answer.selectedValue.toLowerCase();
    Object.keys(traits).forEach(trait => {
      if (traitKeywords[trait].some(keyword => value.includes(keyword))) {
        traits[trait] += 1;
      }
    });
  });
  
  // Normalize scores (0-1 range)
  const maxPossible = answers.length;
  return Object.keys(traits).map(trait => ({
    trait,
    score: Math.min(traits[trait] / maxPossible, 1),
    description: getTraitDescription(trait, traits[trait] / maxPossible)
  }));
}

function getTraitDescription(trait, score) {
  const descriptions = {
    Openness: {
      high: "Highly open to new experiences, creative, and intellectually curious",
      medium: "Moderately open to new ideas and experiences",
      low: "Prefers familiar routines and traditional approaches"
    },
    Conscientiousness: {
      high: "Highly organized, disciplined, and goal-oriented",
      medium: "Moderately organized and reliable",
      low: "More flexible and spontaneous in approach"
    },
    Extraversion: {
      high: "Highly outgoing, energetic, and socially confident",
      medium: "Moderately social and comfortable in groups",
      low: "More reserved and prefers smaller, intimate settings"
    },
    Agreeableness: {
      high: "Highly cooperative, trusting, and empathetic",
      medium: "Generally cooperative and considerate",
      low: "More independent and direct in communication"
    },
    Neuroticism: {
      high: "May experience higher emotional sensitivity",
      medium: "Moderate emotional stability",
      low: "High emotional stability and resilience"
    }
  };
  
  const level = score > 0.6 ? 'high' : score > 0.3 ? 'medium' : 'low';
  return descriptions[trait][level];
}

function analyzeRIASEC(answers, favoriteSubjects) {
  // RIASEC: Realistic, Investigative, Artistic, Social, Enterprising, Conventional
  const riasecScores = {
    Realistic: 0,
    Investigative: 0,
    Artistic: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0
  };
  
  const riasecKeywords = {
    Realistic: ['hands-on', 'practical', 'technical', 'mechanical', 'building', 'repairing', 'outdoor'],
    Investigative: ['research', 'analysis', 'science', 'math', 'problem-solving', 'investigating', 'experimenting'],
    Artistic: ['creative', 'artistic', 'design', 'music', 'writing', 'expression', 'imaginative'],
    Social: ['helping', 'teaching', 'caring', 'coaching', 'mentoring', 'supporting', 'people'],
    Enterprising: ['leading', 'managing', 'selling', 'persuading', 'business', 'entrepreneurial', 'competitive'],
    Conventional: ['organized', 'systematic', 'data', 'records', 'structured', 'administrative', 'detail']
  };
  
  const subjects = favoriteSubjects.toLowerCase();
  answers.forEach(answer => {
    const value = answer.selectedValue.toLowerCase();
    Object.keys(riasecScores).forEach(category => {
      if (riasecKeywords[category].some(keyword => value.includes(keyword) || subjects.includes(keyword))) {
        riasecScores[category] += 1;
      }
    });
  });
  
  // Normalize scores
  const maxPossible = answers.length + 1;
  return Object.keys(riasecScores).map(category => ({
    category,
    score: Math.min(riasecScores[category] / maxPossible, 1),
    description: getRIASECDescription(category, riasecScores[category] / maxPossible)
  })).sort((a, b) => b.score - a.score);
}

function getRIASECDescription(category, score) {
  const descriptions = {
    Realistic: "Strong interest in hands-on, practical work with tools and machinery",
    Investigative: "Strong interest in research, analysis, and scientific inquiry",
    Artistic: "Strong interest in creative expression and artistic endeavors",
    Social: "Strong interest in helping, teaching, and working with people",
    Enterprising: "Strong interest in leadership, business, and entrepreneurial activities",
    Conventional: "Strong interest in organized, structured, and systematic work"
  };
  return descriptions[category] || "Interest in this area";
}

function identifyStrengths(answers, personalityTraits, interestProfile) {
  const strengths = [];
  const strengthMap = {
    'Analytical thinking': ['investigative', 'research', 'analysis', 'problem-solving'],
    'Creative problem-solving': ['artistic', 'creative', 'imaginative', 'openness'],
    'Communication skills': ['social', 'extraversion', 'helping', 'teaching'],
    'Leadership abilities': ['enterprising', 'leading', 'managing', 'confident'],
    'Attention to detail': ['conventional', 'organized', 'conscientiousness', 'systematic'],
    'Technical aptitude': ['realistic', 'hands-on', 'technical', 'mechanical'],
    'Emotional intelligence': ['social', 'agreeableness', 'empathetic', 'understanding'],
    'Adaptability': ['openness', 'flexible', 'curious', 'adventurous']
  };
  
  const allText = [
    ...answers.map(a => a.selectedValue.toLowerCase()),
    ...personalityTraits.map(t => t.trait.toLowerCase()),
    ...interestProfile.map(i => i.category.toLowerCase())
  ].join(' ');
  
  Object.keys(strengthMap).forEach(strength => {
    if (strengthMap[strength].some(keyword => allText.includes(keyword))) {
      strengths.push(strength);
    }
  });
  
  // Return top 5 or fill with defaults
  return strengths.slice(0, 5).length >= 3 
    ? strengths.slice(0, 5)
    : [...strengths, 'Critical thinking', 'Collaboration', 'Time management'].slice(0, 5);
}

function generateCareerRecommendations(interestProfile, personalityTraits, strengths) {
  const topInterests = interestProfile.slice(0, 2).map(i => i.category);
  const topTraits = personalityTraits.sort((a, b) => b.score - a.score).slice(0, 2).map(t => t.trait);
  
  const careerDatabase = {
    'Investigative': [
      { title: 'Data Scientist', match: 92, why: 'Your analytical skills and investigative nature align perfectly', path: 'Pursue Computer Science or Statistics degree' },
      { title: 'Research Scientist', match: 88, why: 'Strong investigative interests and analytical thinking', path: 'Focus on research opportunities and advanced degrees' },
      { title: 'Software Engineer', match: 85, why: 'Technical aptitude combined with problem-solving skills', path: 'Build coding projects and pursue CS degree' }
    ],
    'Artistic': [
      { title: 'Graphic Designer', match: 90, why: 'Creative abilities and artistic interests', path: 'Build portfolio and study design principles' },
      { title: 'Content Creator', match: 87, why: 'Creative expression and communication skills', path: 'Develop multimedia skills and build audience' },
      { title: 'Architect', match: 85, why: 'Combines creativity with technical skills', path: 'Study architecture and develop design portfolio' }
    ],
    'Social': [
      { title: 'Teacher/Educator', match: 93, why: 'Strong social interests and communication skills', path: 'Pursue education degree and gain teaching experience' },
      { title: 'Counselor', match: 90, why: 'Empathetic nature and helping orientation', path: 'Study psychology or counseling, gain experience' },
      { title: 'Healthcare Professional', match: 88, why: 'Social interests and helping others', path: 'Pursue medical or healthcare degree' }
    ],
    'Enterprising': [
      { title: 'Business Manager', match: 91, why: 'Leadership abilities and business interests', path: 'Study business administration and gain management experience' },
      { title: 'Entrepreneur', match: 89, why: 'Entrepreneurial spirit and enterprising nature', path: 'Start with small projects and build business skills' },
      { title: 'Marketing Manager', match: 87, why: 'Combines creativity with business acumen', path: 'Study marketing and build campaign experience' }
    ],
    'Realistic': [
      { title: 'Engineer', match: 92, why: 'Technical aptitude and hands-on interests', path: 'Pursue engineering degree in your interest area' },
      { title: 'Mechanic/Technician', match: 88, why: 'Practical skills and technical interests', path: 'Complete technical training and certifications' },
      { title: 'Architect', match: 85, why: 'Combines technical skills with design', path: 'Study architecture and develop technical skills' }
    ],
    'Conventional': [
      { title: 'Accountant', match: 90, why: 'Organized nature and attention to detail', path: 'Pursue accounting degree and CPA certification' },
      { title: 'Data Analyst', match: 88, why: 'Systematic approach and analytical skills', path: 'Learn data analysis tools and statistics' },
      { title: 'Administrative Manager', match: 85, why: 'Organizational skills and structured thinking', path: 'Gain administrative experience and management skills' }
    ]
  };
  
  const recommendations = [];
  topInterests.forEach(interest => {
    if (careerDatabase[interest]) {
      recommendations.push(...careerDatabase[interest].slice(0, 2));
    }
  });
  
  // Remove duplicates and sort by match
  const unique = recommendations.filter((r, i, self) => 
    i === self.findIndex(t => t.title === r.title)
  );
  
  return unique.sort((a, b) => b.match - a.match).slice(0, 4).map(rec => ({
    title: rec.title,
    matchPercentage: rec.match,
    whyItMatches: rec.why,
    suggestedPath: rec.path
  }));
}

function generateSummary(studentInfo, personalityTraits, interestProfile, strengths) {
  const topTrait = personalityTraits.sort((a, b) => b.score - a.score)[0];
  const topInterest = interestProfile[0];
  
  return `Based on your assessment, you demonstrate strong ${topTrait.trait.toLowerCase()} traits and a primary interest in ${topInterest.category.toLowerCase()} activities. Your profile suggests a student who ${topTrait.description.toLowerCase()} and is drawn to ${topInterest.description.toLowerCase()}. Your strengths in ${strengths.slice(0, 2).join(' and ')} position you well for careers that align with these characteristics.`;
}

function generateEncouragingSummary(personalityTraits, strengths) {
  const topTrait = personalityTraits.sort((a, b) => b.score - a.score)[0];
  return `Your ${topTrait.trait} is one of your greatest assets! This trait, combined with your strengths in ${strengths.slice(0, 2).join(' and ')}, creates a unique profile that sets you apart. What makes you special is how these qualities work together—your natural abilities aren't just individual strengths, but a powerful combination that can lead to remarkable achievements. Embrace these qualities as your superpower!`;
}

function generateStrategicDirection(interestProfile, strengths) {
  const topInterest = interestProfile[0];
  const directions = {
    'Investigative': 'Focus on research projects, science fairs, and analytical problem-solving activities. Join STEM clubs and seek out mentorship in your areas of interest.',
    'Artistic': 'Build a creative portfolio, participate in art competitions, and explore different mediums. Connect with creative communities and showcase your work.',
    'Social': 'Seek leadership roles in clubs, volunteer opportunities, and peer mentoring. Develop communication skills through debate, drama, or student government.',
    'Enterprising': 'Start small business projects, join entrepreneurship clubs, and seek leadership opportunities. Build your network and develop business skills.',
    'Realistic': 'Engage in hands-on projects, technical workshops, and building activities. Consider internships or apprenticeships in technical fields.',
    'Conventional': 'Develop organizational skills through planning events or managing projects. Focus on detail-oriented activities and systematic approaches.'
  };
  
  return directions[topInterest.category] || 'Focus on activities that align with your top interests and strengths.';
}

function generateCounselorSummary(studentInfo, personalityTraits, interestProfile) {
  const topTraits = personalityTraits.sort((a, b) => b.score - a.score).slice(0, 3);
  const topInterests = interestProfile.slice(0, 2);
  
  return `Student in grade ${studentInfo.grade} (age ${studentInfo.age}) shows strong ${topTraits.map(t => t.trait).join(', ')} traits. Primary interests align with ${topInterests.map(i => i.category).join(' and ')} categories. Favorite subjects: ${studentInfo.favoriteSubjects}. Recommended focus areas: ${topInterests.map(i => i.category.toLowerCase()).join(' and ')} career exploration.`;
}

function generateParentActionPlan(interestProfile, strengths) {
  const topInterest = interestProfile[0];
  const plans = {
    'Investigative': [
      'Encourage participation in STEM competitions and science fairs',
      'Explore coding bootcamps or programming courses',
      'Support research projects and scientific inquiry',
      'Connect with mentors in STEM fields'
    ],
    'Artistic': [
      'Support creative expression through art supplies and classes',
      'Encourage participation in art competitions and exhibitions',
      'Explore digital design and multimedia tools',
      'Connect with local art communities and mentors'
    ],
    'Social': [
      'Encourage leadership roles in school clubs and organizations',
      'Support volunteer opportunities and community service',
      'Explore teaching or mentoring opportunities',
      'Develop communication skills through debate or drama'
    ],
    'Enterprising': [
      'Support entrepreneurial projects and business ideas',
      'Encourage participation in business competitions',
      'Explore leadership opportunities and management roles',
      'Connect with business mentors and entrepreneurs'
    ],
    'Realistic': [
      'Support hands-on projects and technical activities',
      'Explore engineering or technical programs',
      'Encourage participation in maker spaces or workshops',
      'Connect with technical mentors and professionals'
    ],
    'Conventional': [
      'Support organizational and planning activities',
      'Encourage participation in structured programs',
      'Explore data analysis and administrative skills',
      'Develop attention to detail through focused projects'
    ]
  };
  
  return plans[topInterest.category] || [
    'Support exploration of various interests',
    'Encourage participation in relevant activities',
    'Connect with mentors in areas of interest',
    'Provide resources for skill development'
  ];
}

// Analyze endpoint - matches what your frontend expects
app.post("/analyze", async (req, res) => {
  console.log('Received /analyze request');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { studentInfo, answers } = req.body;

    // Validate request
    if (!studentInfo || !answers) {
      console.error('Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields: studentInfo and answers',
        received: { hasStudentInfo: !!studentInfo, hasAnswers: !!answers }
      });
    }

    console.log('Processing psychometric analysis...');
    console.log('Student Info:', studentInfo);
    console.log('Answers count:', answers.length);

    // Perform psychometric analysis
    const personalityTraits = analyzeBigFive(answers);
    const interestProfile = analyzeRIASEC(answers, studentInfo.favoriteSubjects);
    const strengths = identifyStrengths(answers, personalityTraits, interestProfile);
    const careerRecommendations = generateCareerRecommendations(interestProfile, personalityTraits, strengths);
    
    const result = {
      personalityTraits,
      strengths,
      interestProfile,
      careerRecommendations,
      summary: generateSummary(studentInfo, personalityTraits, interestProfile, strengths),
      encouragingSummary: generateEncouragingSummary(personalityTraits, strengths),
      strategicDirection: generateStrategicDirection(interestProfile, strengths),
      counselorSummary: generateCounselorSummary(studentInfo, personalityTraits, interestProfile),
      parentActionPlan: generateParentActionPlan(interestProfile, strengths)
    };

    console.log('Analysis complete. Sending response...');
    res.json(result);
    console.log('Response sent successfully');
  } catch (error) {
    console.error("Analysis error:", error);
    console.error("Error stack:", error.stack);
    
    // Make sure to send a response even on error
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Internal server error",
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (!res.headersSent) {
    res.status(500).json({ 
      error: "Internal server error",
      message: err.message 
    });
  }
});

// Start server - IMPORTANT: Listen on 0.0.0.0 to accept external connections
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server accessible at: http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
