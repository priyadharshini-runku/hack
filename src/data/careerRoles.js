import { ALL_CAREER_ROLES } from './registrationCareerData.js';

const BASE_CAREER_ROLES = [
  {
    id: 'role_swe',
    title: 'Software Developer (Full Stack / Backend)',
    category: 'Software Engineering',
    avgStartingSalary: '₹8.5 - ₹16 LPA',
    hiringDemand: 'Very High (+38% YoY)',
    description: 'Designs, develops, and maintains scalable backend services, REST/GraphQL APIs, database architectures, and distributed systems.',
    industryRequirements: [
      { skill: 'Data Structures & Algorithms', level: 'Intermediate', weight: 25, category: 'Core CS', whyLearn: 'Essential for technical interview rounds and algorithmic problem solving at tier-1 tech firms.' },
      { skill: 'React', level: 'Intermediate', weight: 20, category: 'Frontend', whyLearn: 'The industry-standard frontend library used for modern responsive user interfaces.' },
      { skill: 'Python', level: 'Intermediate', weight: 15, category: 'Programming', whyLearn: 'High-productivity language widely utilized in backend microservices, automation, and data pipelines.' },
      { skill: 'Java', level: 'Intermediate', weight: 15, category: 'Programming', whyLearn: 'Enterprise standard for building robust, multi-threaded high-throughput enterprise systems.' },
      { skill: 'SQL & Database Design', level: 'Intermediate', weight: 15, category: 'Databases', whyLearn: 'Crucial for relational query optimization, normalization, indexing, and transactional integrity.' },
      { skill: 'Git & Version Control', level: 'Intermediate', weight: 10, category: 'Tools', whyLearn: 'Required for collaborative development, CI/CD branching strategies, and open-source contributions.' }
    ]
  },
  {
    id: 'role_frontend',
    title: 'Frontend Web Developer (React / Next.js)',
    category: 'Frontend Engineering',
    avgStartingSalary: '₹7.5 - ₹14 LPA',
    hiringDemand: 'High (+32% YoY)',
    description: 'Crafts responsive, accessible, high-performance web applications using modern JavaScript frameworks, CSS architectures, and state management.',
    industryRequirements: [
      { skill: 'React', level: 'Advanced', weight: 30, category: 'Frontend', whyLearn: 'Deep mastery of React hooks, custom hooks, memoization, and component lifecycle is required.' },
      { skill: 'JavaScript / TypeScript', level: 'Advanced', weight: 25, category: 'Languages', whyLearn: 'Core ECMAScript features, asynchronous promises, type safety, and DOM manipulation fundamentals.' },
      { skill: 'CSS / Tailwind CSS', level: 'Intermediate', weight: 15, category: 'Styling', whyLearn: 'Modern utility-first responsive styling, animations, flexbox, and CSS grid layouts.' },
      { skill: 'Git & Version Control', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Standard team collaboration, PR reviews, and automated deployment pipelines.' },
      { skill: 'Web Performance & SEO', level: 'Intermediate', weight: 15, category: 'Performance', whyLearn: 'Optimizing Core Web Vitals, lazy loading, lighthouse audits, and client-side rendering speed.' }
    ]
  },
  {
    id: 'role_aiml',
    title: 'AI & Machine Learning Engineer',
    category: 'Data Science & AI',
    avgStartingSalary: '₹10 - ₹22 LPA',
    hiringDemand: 'Extremely High (+54% YoY)',
    description: 'Develops predictive machine learning models, neural networks, NLP pipelines, and generative AI integrations on cloud infra.',
    industryRequirements: [
      { skill: 'Python', level: 'Advanced', weight: 25, category: 'Programming', whyLearn: 'The primary language for AI/ML libraries, NumPy, Pandas, Scikit-Learn, PyTorch, and TensorFlow.' },
      { skill: 'Machine Learning Fundamentals', level: 'Intermediate', weight: 25, category: 'AI/ML', whyLearn: 'Supervised/unsupervised algorithms, regression, classification, cross-validation, and loss functions.' },
      { skill: 'Data Structures & Algorithms', level: 'Intermediate', weight: 20, category: 'Core CS', whyLearn: 'Efficient vector operations, graph traversal, and optimized computational pipeline execution.' },
      { skill: 'SQL & Database Design', level: 'Intermediate', weight: 15, category: 'Databases', whyLearn: 'Extracting and transforming feature datasets from enterprise data warehouses.' },
      { skill: 'Deep Learning & LLMs', level: 'Intermediate', weight: 15, category: 'AI/ML', whyLearn: 'Transformer architectures, prompt engineering, fine-tuning, and RAG pipelines.' }
    ]
  },
  {
    id: 'role_devops',
    title: 'Cloud & DevOps Engineer',
    category: 'Infrastructure & Cloud',
    avgStartingSalary: '₹9 - ₹18 LPA',
    hiringDemand: 'High (+42% YoY)',
    description: 'Automates deployment pipelines, provisions scalable AWS/Azure cloud infrastructure, and manages containerized orchestration.',
    industryRequirements: [
      { skill: 'Docker & Containerization', level: 'Intermediate', weight: 25, category: 'DevOps', whyLearn: 'Container packaging, multi-stage builds, and standardized local-to-production environments.' },
      { skill: 'Linux & Shell Scripting', level: 'Intermediate', weight: 25, category: 'OS', whyLearn: 'Server administration, bash automation, process monitoring, and networking fundamentals.' },
      { skill: 'Cloud Architecture (AWS / GCP)', level: 'Intermediate', weight: 20, category: 'Cloud', whyLearn: 'Compute, storage, VPC networking, IAM security, and serverless architectures.' },
      { skill: 'Git & Version Control', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'GitOps, automated triggers, and CI/CD pipelines in GitHub Actions.' },
      { skill: 'Kubernetes & CI/CD', level: 'Intermediate', weight: 15, category: 'DevOps', whyLearn: 'Cluster management, ingress controllers, automated rolling updates, and monitoring.' }
    ]
  },
  {
    id: 'role_data',
    title: 'Data Analyst & Business Intelligence Specialist',
    category: 'Analytics',
    avgStartingSalary: '₹7 - ₹13 LPA',
    hiringDemand: 'High (+29% YoY)',
    description: 'Analyzes enterprise metrics, constructs interactive dashboards in PowerBI/Tableau, and drives data-backed strategic decisions.',
    industryRequirements: [
      { skill: 'SQL & Database Design', level: 'Advanced', weight: 30, category: 'Databases', whyLearn: 'Complex aggregations, window functions, CTEs, and subquery optimization.' },
      { skill: 'Python', level: 'Intermediate', weight: 25, category: 'Programming', whyLearn: 'Data cleaning, EDA with Pandas, statistical modeling, and automated reporting.' },
      { skill: 'Data Visualization & BI', level: 'Intermediate', weight: 25, category: 'Analytics', whyLearn: 'Storytelling with data, dashboard UX, KPI tracking in PowerBI and Tableau.' },
      { skill: 'Excel & Statistical Modeling', level: 'Intermediate', weight: 20, category: 'Analytics', whyLearn: 'Hypothesis testing, pivot tables, regression analysis, and variance calculations.' }
    ]
  }
];

const baseRoleIds = new Set(BASE_CAREER_ROLES.map(r => r.id));
export const CAREER_ROLES = [
  ...BASE_CAREER_ROLES,
  ...ALL_CAREER_ROLES.filter(r => !baseRoleIds.has(r.id))
];

export const CURATED_LEARNING_RESOURCES = [
  {
    id: 'res_dsa_1',
    skill: 'Data Structures & Algorithms',
    title: 'Data Structures and Algorithms in Java / Python',
    platform: 'freeCodeCamp (YouTube)',
    url: 'https://www.youtube.com/watch?v=RBSGKlAnoiM',
    type: 'Video Course',
    level: 'Beginner to Advanced',
    estimatedHours: '14 Hours',
    rating: 4.9,
    description: 'Complete hands-on masterclass covering Arrays, Linked Lists, Trees, Graphs, Sorting, and Dynamic Programming with code implementations.'
  },
  {
    id: 'res_react_1',
    skill: 'React',
    title: 'React 18 Official Interactive Tutorial & Docs',
    platform: 'React.dev',
    url: 'https://react.dev/learn',
    type: 'Documentation & Sandbox',
    level: 'Beginner to Intermediate',
    estimatedHours: '10 Hours',
    rating: 4.9,
    description: 'Learn modern React with interactive code sandboxes covering Components, JSX, Hooks (useState, useEffect), and State Management.'
  },
  {
    id: 'res_python_1',
    skill: 'Python',
    title: 'Python for Beginners – Full Course [Programming Tutorial]',
    platform: 'freeCodeCamp (YouTube)',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    type: 'Video Course',
    level: 'Beginner',
    estimatedHours: '4.5 Hours',
    rating: 4.8,
    description: 'Comprehensive introduction covering syntax, functions, lists, dictionaries, OOP classes, and building practical mini-projects.'
  },
  {
    id: 'res_sql_1',
    skill: 'SQL & Database Design',
    title: 'SQL Tutorial - Full Database Course for Beginners',
    platform: 'freeCodeCamp (YouTube)',
    url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
    type: 'Video Course',
    level: 'Beginner to Intermediate',
    estimatedHours: '4.5 Hours',
    rating: 4.9,
    description: 'Master schema design, CRUD operations, JOINs, Nested Queries, Primary/Foreign keys, and relational database management.'
  },
  {
    id: 'res_git_1',
    skill: 'Git & Version Control',
    title: 'Git and GitHub for Beginners - Crash Course',
    platform: 'freeCodeCamp (YouTube)',
    url: 'https://www.youtube.com/watch?v=RGOj5yHMFew',
    type: 'Video Course',
    level: 'Beginner',
    estimatedHours: '1.5 Hours',
    rating: 4.9,
    description: 'Master branches, commits, merge conflicts, pull requests, remotes, and GitHub collaborative workflows.'
  },
  {
    id: 'res_docker_1',
    skill: 'Docker & Containerization',
    title: 'Docker Tutorial for Beginners [Full Free Course]',
    platform: 'TechWorld with Nana (YouTube)',
    url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    type: 'Video Course',
    level: 'Beginner to Intermediate',
    estimatedHours: '3 Hours',
    rating: 4.9,
    description: 'Learn Docker images, containers, Dockerfile creation, port binding, and Docker Compose multi-container setup.'
  },
  {
    id: 'res_java_1',
    skill: 'Java',
    title: 'Java Programming for Beginners – Full Course',
    platform: 'freeCodeCamp (YouTube)',
    url: 'https://www.youtube.com/watch?v=A74TOX803D0',
    type: 'Video Course',
    level: 'Beginner to Intermediate',
    estimatedHours: '9.5 Hours',
    rating: 4.8,
    description: 'Master object-oriented programming in Java, inheritance, polymorphism, interfaces, exception handling, and collections.'
  }
];

export function computeClientSkillGap(student, targetRoleId = 'role_swe') {
  const role = CAREER_ROLES.find(r => 
    r.id === targetRoleId || 
    r.title?.toLowerCase() === targetRoleId?.toLowerCase() ||
    r.title?.toLowerCase() === student?.targetRoleTitle?.toLowerCase() ||
    r.id === student?.targetRoleId
  ) || CAREER_ROLES[0];
  
  const studentSkills = Array.isArray(student?.skills) ? student.skills : [];
  const studentSkillMap = new Map();
  studentSkills.forEach(s => {
    if (s && s.name) {
      studentSkillMap.set(s.name.toLowerCase().trim(), s);
    }
  });

  const levelMultiplier = {
    'Beginner': 0.65,
    'Intermediate': 0.85,
    'Advanced': 1.0
  };

  const skillsHave = [];
  const skillsNeed = [];
  let totalWeight = 0;
  let earnedWeight = 0;

  role.industryRequirements.forEach(req => {
    totalWeight += req.weight;
    
    // Check match by exact or substring
    let matched = studentSkillMap.get(req.skill.toLowerCase());
    if (!matched) {
      for (const [sName, sObj] of studentSkillMap.entries()) {
        if (sName.includes(req.skill.toLowerCase()) || req.skill.toLowerCase().includes(sName)) {
          matched = sObj;
          break;
        }
      }
    }

    if (matched) {
      const studentScore = levelMultiplier[matched.level] || 0.85;
      const requiredScore = levelMultiplier[req.level] || 0.85;
      const ratio = Math.min(1.0, studentScore / requiredScore);
      earnedWeight += req.weight * ratio;

      skillsHave.push({
        skill: req.skill,
        category: req.category,
        studentLevel: matched.level || 'Intermediate',
        requiredLevel: req.level,
        weight: req.weight,
        verified: matched.verified || false,
        rating: matched.rating || 4.0
      });
    } else {
      const priority = req.weight >= 20 ? 'High' : req.weight >= 15 ? 'Medium' : 'Standard';
      skillsNeed.push({
        skill: req.skill,
        category: req.category,
        requiredLevel: req.level,
        weight: req.weight,
        priority,
        whyLearn: req.whyLearn || `Critical for ${role.title} evaluation (${req.weight}% role weight).`
      });
    }
  });

  const matchPercentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 60;
  
  const missingNames = skillsNeed.map(s => s.skill).slice(0, 3).join(', ');
  const recommendationSummary = skillsNeed.length > 0
    ? `You are currently ${matchPercentage}% matched with the ${role.title} industry benchmark. Master ${missingNames} to bridge your skill gap and maximize placement readiness.`
    : `Outstanding! You meet 100% of the core industry requirements for ${role.title}. Continue practicing advanced mock technical assessments.`;

  return {
    studentId: student?.id || 'usr_current',
    studentName: student?.name || 'Student',
    targetRole: role,
    matchPercentage,
    skillsHave,
    skillsNeed,
    recommendationSummary
  };
}
