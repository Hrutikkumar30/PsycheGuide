
import { Question, Category } from './types';

export const QUESTIONS: Question[] = [
  // PERSONALITY - Big Five Model (OCEAN)
  // Openness
  {
    id: 'p1',
    category: Category.PERSONALITY,
    text: "How do you usually react to a last-minute change in plans?",
    options: ["I feel excited for the adventure", "I'm okay with it but need a moment", "I find it quite stressful", "I strongly prefer sticking to the schedule"]
  },
  {
    id: 'p2',
    category: Category.PERSONALITY,
    text: "When learning something new, you prefer:",
    options: ["Exploring creative and unconventional approaches", "Following established methods and guidelines", "A mix of both traditional and new ideas", "Sticking to what has worked before"]
  },
  
  // Conscientiousness
  {
    id: 'p3',
    category: Category.PERSONALITY,
    text: "When given a project with a deadline, you typically:",
    options: ["Plan it out step-by-step and finish early", "Work steadily and meet the deadline", "Work in bursts and finish on time", "Often need reminders and work at the last minute"]
  },
  {
    id: 'p4',
    category: Category.PERSONALITY,
    text: "How organized is your workspace or study area?",
    options: ["Very organized with everything in its place", "Generally organized with occasional clutter", "Somewhat organized but can get messy", "I prefer a more flexible, less structured approach"]
  },
  
  // Extraversion
  {
    id: 'p5',
    category: Category.PERSONALITY,
    text: "How do you recharge your energy after a busy week?",
    options: ["Spending time alone with a book/game", "Hanging out with a few close friends", "Going to a big social event", "Exploring a new hobby or activity"]
  },
  {
    id: 'p6',
    category: Category.PERSONALITY,
    text: "In a group discussion, you tend to:",
    options: ["Speak up frequently and share your ideas", "Contribute when you have something valuable to add", "Listen more than you speak", "Prefer one-on-one conversations"]
  },
  
  // Agreeableness
  {
    id: 'p7',
    category: Category.PERSONALITY,
    text: "When working in a group, what's your typical role?",
    options: ["Leading and organizing others", "Doing my assigned part quietly", "Generating creative ideas", "Ensuring everyone feels included"]
  },
  
  // Neuroticism (Emotional Stability)
  {
    id: 'p8',
    category: Category.PERSONALITY,
    text: "When facing a stressful situation, you typically:",
    options: ["Stay calm and think through solutions", "Feel some anxiety but manage it", "Get quite stressed but push through", "Feel overwhelmed and need support"]
  },
  
  // INTERESTS - RIASEC Model
  // Realistic
  {
    id: 'i1',
    category: Category.INTERESTS,
    text: "Which activity sounds most appealing to you?",
    options: ["Solving a complex math problem", "Writing a poem or short story", "Building a physical model or gadget", "Volunteering for a local charity"]
  },
  {
    id: 'i2',
    category: Category.INTERESTS,
    text: "If you could spend a day learning a hands-on skill, you'd choose:",
    options: ["Carpentry or mechanics", "Computer programming", "Photography or videography", "Counseling or coaching"]
  },
  
  // Investigative
  {
    id: 'i3',
    category: Category.INTERESTS,
    text: "If you were at a science museum, which section would you visit first?",
    options: ["Artificial Intelligence & Robotics", "Marine Biology & Ecosystems", "Theoretical Physics & Space", "Social Science & Psychology"]
  },
  {
    id: 'i4',
    category: Category.INTERESTS,
    text: "You're most excited by questions like:",
    options: ["How does this work? What causes this?", "How can I express this creatively?", "How can I help solve this problem?", "How can I improve this process?"]
  },
  
  // Artistic
  {
    id: 'i5',
    category: Category.INTERESTS,
    text: "In your free time, you're most likely to:",
    options: ["Read scientific articles or solve puzzles", "Create art, music, or write", "Help others or volunteer", "Organize events or plan activities"]
  },
  
  // Social
  {
    id: 'i6',
    category: Category.INTERESTS,
    text: "You feel most fulfilled when:",
    options: ["Solving a complex problem", "Creating something beautiful", "Helping someone succeed", "Leading a successful project"]
  },
  
  // STRENGTHS - Competencies
  {
    id: 's1',
    category: Category.STRENGTHS,
    text: "When faced with a difficult puzzle, you tend to:",
    options: ["Break it down logically", "Look for an unconventional solution", "Ask for help and collaborate", "Keep trying until it's finished"]
  },
  {
    id: 's2',
    category: Category.STRENGTHS,
    text: "Which skill do you feel most confident in?",
    options: ["Logical reasoning and analysis", "Creative expression and innovation", "Empathy and listening", "Practical problem-solving"]
  },
  {
    id: 's3',
    category: Category.STRENGTHS,
    text: "In group projects, others often rely on you for:",
    options: ["Technical expertise and analysis", "Creative ideas and solutions", "Mediating and keeping harmony", "Organization and planning"]
  }
];
