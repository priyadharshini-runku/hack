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

export const SKILL_LEARNING_HUB_MAP = {
  'python': {
    courseId: 'python',
    courseName: 'Python',
    category: 'Programming Languages',
    youtubeTitle: 'Python for Beginners – Full Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    duration: '4.5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://docs.python.org/3/tutorial/',
    practiceUrl: 'https://www.hackerrank.com/domains/python',
    whyLearn: 'Primary industry language for backend services, automation, scripting, and data pipelines.'
  },
  'dsa': {
    courseId: 'dsa',
    courseName: 'Data Structures & Algorithms (DSA)',
    category: 'Core Computer Science',
    youtubeTitle: 'Data Structures and Algorithms in Java / Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=RBSGKlAnoiM',
    duration: '14 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.geeksforgeeks.org/data-structures/',
    practiceUrl: 'https://leetcode.com/problemset/all/',
    whyLearn: 'Essential for technical interview screening rounds and algorithmic problem solving at tier-1 tech firms.'
  },
  'data structures & algorithms': {
    courseId: 'dsa',
    courseName: 'Data Structures & Algorithms (DSA)',
    category: 'Core Computer Science',
    youtubeTitle: 'Data Structures and Algorithms in Java / Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=RBSGKlAnoiM',
    duration: '14 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.geeksforgeeks.org/data-structures/',
    practiceUrl: 'https://leetcode.com/problemset/all/',
    whyLearn: 'Core foundational competence for technical placement drives and high-efficiency code implementation.'
  },
  'data structures': {
    courseId: 'dsa',
    courseName: 'Data Structures & Algorithms (DSA)',
    category: 'Core Computer Science',
    youtubeTitle: 'Data Structures and Algorithms in Java / Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=RBSGKlAnoiM',
    duration: '14 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.geeksforgeeks.org/data-structures/',
    practiceUrl: 'https://leetcode.com/problemset/all/',
    whyLearn: 'Fundamental memory organization techniques needed for all software engineering roles.'
  },
  'algorithms': {
    courseId: 'dsa',
    courseName: 'Data Structures & Algorithms (DSA)',
    category: 'Core Computer Science',
    youtubeTitle: 'Algorithms & Complexity Analysis Masterclass',
    youtubeUrl: 'https://www.youtube.com/watch?v=RBSGKlAnoiM',
    duration: '14 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.geeksforgeeks.org/fundamentals-of-algorithms/',
    practiceUrl: 'https://leetcode.com/problemset/all/',
    whyLearn: 'Crucial for passing coding rounds and optimizing computational complexity.'
  },
  'sql': {
    courseId: 'sql',
    courseName: 'SQL',
    category: 'Core Computer Science',
    youtubeTitle: 'SQL Tutorial - Full Database Course for Beginners',
    youtubeUrl: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
    duration: '4.5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.postgresqltutorial.com/',
    practiceUrl: 'https://www.hackerrank.com/domains/sql',
    whyLearn: 'Crucial for querying enterprise databases, joins, aggregations, schema design, and transactional data.'
  },
  'sql & database design': {
    courseId: 'sql',
    courseName: 'SQL',
    category: 'Core Computer Science',
    youtubeTitle: 'SQL Database Architecture & Schema Design',
    youtubeUrl: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
    duration: '4.5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.postgresqltutorial.com/',
    practiceUrl: 'https://www.hackerrank.com/domains/sql',
    whyLearn: 'Required for schema normalization, query optimization, indexing, and transactional integrity.'
  },
  'dbms': {
    courseId: 'dbms',
    courseName: 'DBMS',
    category: 'Core Computer Science',
    youtubeTitle: 'Database Management Systems Full Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
    duration: '5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.geeksforgeeks.org/dbms/',
    practiceUrl: 'https://leetcode.com/problemset/database/',
    whyLearn: 'Deep understanding of ACID properties, indexing, concurrency control, and recovery.'
  },
  'git': {
    courseId: 'git',
    courseName: 'Git & GitHub',
    category: 'Core Computer Science',
    youtubeTitle: 'Git and GitHub for Beginners - Crash Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=RGOj5yHMFew',
    duration: '1.5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://git-scm.com/doc',
    practiceUrl: 'https://learngitbranching.js.org/',
    whyLearn: 'Universal industry standard for team collaboration, CI/CD branching strategies, and open-source workflows.'
  },
  'git & github': {
    courseId: 'git',
    courseName: 'Git & GitHub',
    category: 'Core Computer Science',
    youtubeTitle: 'Git and GitHub for Beginners - Crash Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=RGOj5yHMFew',
    duration: '1.5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://git-scm.com/doc',
    practiceUrl: 'https://learngitbranching.js.org/',
    whyLearn: 'Universal prerequisite for source code management and collaborative engineering.'
  },
  'git & version control': {
    courseId: 'git',
    courseName: 'Git & GitHub',
    category: 'Core Computer Science',
    youtubeTitle: 'Git and GitHub for Beginners - Crash Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=RGOj5yHMFew',
    duration: '1.5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://git-scm.com/doc',
    practiceUrl: 'https://learngitbranching.js.org/',
    whyLearn: 'Required for production PR reviews, merge conflict resolution, and version tracking.'
  },
  'react': {
    courseId: 'react',
    courseName: 'React & Modern Frontend',
    category: 'Web Development',
    youtubeTitle: 'React 18 Full Course – Build 4 Projects',
    youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    duration: '12 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://react.dev/learn',
    practiceUrl: 'https://react.dev/learn/describing-the-ui',
    whyLearn: 'Industry standard for building dynamic, responsive, component-based user interfaces.'
  },
  'javascript': {
    courseId: 'javascript',
    courseName: 'JavaScript',
    category: 'Web Development',
    youtubeTitle: 'JavaScript Programming - Full Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    duration: '3.5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    practiceUrl: 'https://www.hackerrank.com/domains/javascript',
    whyLearn: 'Core language of modern web applications, event-driven architectures, and Node.js.'
  },
  'typescript': {
    courseId: 'javascript',
    courseName: 'JavaScript / TypeScript',
    category: 'Web Development',
    youtubeTitle: 'TypeScript Full Course for Beginners',
    youtubeUrl: 'https://www.youtube.com/watch?v=30LWjhZzg50',
    duration: '3 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.typescriptlang.org/docs/',
    practiceUrl: 'https://www.typescriptlang.org/play',
    whyLearn: 'Brings type safety, interfaces, and maintainability to enterprise web codebases.'
  },
  'java': {
    courseId: 'java',
    courseName: 'Java',
    category: 'Programming Languages',
    youtubeTitle: 'Java Full Course for Beginners',
    youtubeUrl: 'https://www.youtube.com/watch?v=xk4_1vDrzzo',
    duration: '12 Hours',
    provider: 'Bro Code (YouTube)',
    docsUrl: 'https://docs.oracle.com/en/java/',
    practiceUrl: 'https://www.hackerrank.com/domains/java',
    whyLearn: 'Enterprise standard for multi-threaded backend microservices and high-throughput systems.'
  },
  'c': {
    courseId: 'c',
    courseName: 'C Programming',
    category: 'Programming Languages',
    youtubeTitle: 'C Programming Full Course for Beginners',
    youtubeUrl: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
    duration: '4 Hours',
    provider: 'freeCodeCamp (Mike Dane)',
    docsUrl: 'https://en.cppreference.com/w/c',
    practiceUrl: 'https://www.hackerrank.com/domains/c',
    whyLearn: 'Foundational procedural language for low-level memory control, pointers, and embedded systems.'
  },
  'cpp': {
    courseId: 'cpp',
    courseName: 'C++',
    category: 'Programming Languages',
    youtubeTitle: 'C++ Programming Course - Beginner to Advanced',
    youtubeUrl: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
    duration: '10 Hours',
    provider: 'freeCodeCamp (The Cherno)',
    docsUrl: 'https://en.cppreference.com/w/cpp',
    practiceUrl: 'https://leetcode.com/problemset/all/',
    whyLearn: 'High-performance systems programming, STL containers, game engines, and competitive programming.'
  },
  'c++': {
    courseId: 'cpp',
    courseName: 'C++',
    category: 'Programming Languages',
    youtubeTitle: 'C++ Programming Course - Beginner to Advanced',
    youtubeUrl: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
    duration: '10 Hours',
    provider: 'freeCodeCamp (The Cherno)',
    docsUrl: 'https://en.cppreference.com/w/cpp',
    practiceUrl: 'https://leetcode.com/problemset/all/',
    whyLearn: 'High-performance systems programming, STL containers, game engines, and competitive programming.'
  },
  'docker': {
    courseId: 'cloud',
    courseName: 'Cloud Computing (Docker & AWS)',
    category: 'Cloud & Security',
    youtubeTitle: 'Docker Tutorial for Beginners [Full Free Course]',
    youtubeUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    duration: '3 Hours',
    provider: 'TechWorld with Nana (YouTube)',
    docsUrl: 'https://docs.docker.com/get-started/',
    practiceUrl: 'https://labs.play-with-docker.com/',
    whyLearn: 'Containerization, microservices packaging, and standardized production deployment environments.'
  },
  'docker & containerization': {
    courseId: 'cloud',
    courseName: 'Cloud Computing (Docker & AWS)',
    category: 'Cloud & Security',
    youtubeTitle: 'Docker & Containerization Masterclass',
    youtubeUrl: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    duration: '3 Hours',
    provider: 'TechWorld with Nana (YouTube)',
    docsUrl: 'https://docs.docker.com/',
    practiceUrl: 'https://labs.play-with-docker.com/',
    whyLearn: 'Essential DevOps skill demanded in modern cloud infrastructure.'
  },
  'aws': {
    courseId: 'cloud',
    courseName: 'Cloud Computing',
    category: 'Cloud & Security',
    youtubeTitle: 'AWS Certified Cloud Practitioner Training',
    youtubeUrl: 'https://www.youtube.com/watch?v=k1RI5locZE4',
    duration: '4 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://aws.amazon.com/getting-started/',
    practiceUrl: 'https://aws.amazon.com/free/',
    whyLearn: 'Leading cloud provider for scalable computing, storage, serverless, and IAM security.'
  },
  'cloud': {
    courseId: 'cloud',
    courseName: 'Cloud Computing',
    category: 'Cloud & Security',
    youtubeTitle: 'Cloud Computing Architecture & Infrastructure',
    youtubeUrl: 'https://www.youtube.com/watch?v=k1RI5locZE4',
    duration: '4 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://aws.amazon.com/what-is-cloud-computing/',
    practiceUrl: 'https://aws.amazon.com/free/',
    whyLearn: 'Modern infrastructure deployment, horizontal scaling, and cloud native services.'
  },
  'vlsi': {
    courseId: 'vlsi',
    courseName: 'VLSI Design',
    category: 'Hardware & VLSI',
    youtubeTitle: 'CMOS VLSI Design & Static Timing Analysis',
    youtubeUrl: 'https://www.youtube.com/watch?v=N_8q6h2YpA4',
    duration: '6 Hours',
    provider: 'NPTEL (YouTube)',
    docsUrl: 'https://nptel.ac.in/courses/117101105',
    practiceUrl: 'https://www.eda.org/',
    whyLearn: 'Silicon chip architecture, CMOS stick diagrams, and timing closure for semiconductor engineering.'
  },
  'verilog': {
    courseId: 'verilog',
    courseName: 'Verilog HDL',
    category: 'Hardware & VLSI',
    youtubeTitle: 'Verilog HDL RTL Design & Testbenches',
    youtubeUrl: 'https://www.youtube.com/watch?v=PJGvPyx_N6Y',
    duration: '4 Hours',
    provider: 'NPTEL (YouTube)',
    docsUrl: 'https://www.chipverify.com/verilog/verilog-tutorial',
    practiceUrl: 'https://hdlbits.01xz.net/wiki/Main_Page',
    whyLearn: 'Standard hardware description language for ASIC synthesis, FPGA programming, and digital logic.'
  },
  'machine learning': {
    courseId: 'ml',
    courseName: 'Machine Learning',
    category: 'AI & Data Science',
    youtubeTitle: 'Machine Learning for Everybody – Full Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
    duration: '10 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://scikit-learn.org/stable/tutorial/',
    practiceUrl: 'https://www.kaggle.com/learn',
    whyLearn: 'Core statistical models, regression, classification, clustering, and predictive intelligence.'
  },
  'ai': {
    courseId: 'ai',
    courseName: 'Artificial Intelligence',
    category: 'AI & Data Science',
    youtubeTitle: 'Artificial Intelligence – MIT 6.034 Full Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=JMUxmLyrhSk',
    duration: '6 Hours',
    provider: 'MIT OpenCourseWare (YouTube)',
    docsUrl: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/',
    practiceUrl: 'https://www.kaggle.com/learn',
    whyLearn: 'Search heuristics, constraint satisfaction, game theory, and modern autonomous reasoning.'
  },
  'networks': {
    courseId: 'networks',
    courseName: 'Computer Networks',
    category: 'Core Computer Science',
    youtubeTitle: 'Computer Networking Course - Network Engineering [Hands-On]',
    youtubeUrl: 'https://www.youtube.com/watch?v=IPvYjXCsTg8',
    duration: '9 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
    practiceUrl: 'https://www.wireshark.org/',
    whyLearn: 'OSI 7-layer model, TCP/IP handshakes, routing, DNS, HTTP/3, and socket programming.'
  },
  'os': {
    courseId: 'os',
    courseName: 'Operating Systems',
    category: 'Core Computer Science',
    youtubeTitle: 'Operating Systems Full Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=26QPDBe-NB8',
    duration: '8 Hours',
    provider: 'NPTEL (YouTube)',
    docsUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    practiceUrl: 'https://www.geeksforgeeks.org/operating-systems/',
    whyLearn: 'Processes, threads, CPU scheduling algorithms, virtual memory, paging, and deadlock resolution.'
  },
  'oop': {
    courseId: 'oop',
    courseName: 'Object-Oriented Programming (OOP)',
    category: 'Core Computer Science',
    youtubeTitle: 'Object-Oriented Programming (OOP) Principles',
    youtubeUrl: 'https://www.youtube.com/watch?v=SiBw7os-_zI',
    duration: '5 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
    practiceUrl: 'https://leetcode.com/problemset/all/',
    whyLearn: 'SOLID design principles, design patterns, encapsulation, polymorphism, and maintainable software architecture.'
  },
  'cybersecurity': {
    courseId: 'cybersecurity',
    courseName: 'Cybersecurity',
    category: 'Cloud & Security',
    youtubeTitle: 'Cybersecurity for Beginners - Full Course',
    youtubeUrl: 'https://www.youtube.com/watch?v=U_P23dqUrNE',
    duration: '6 Hours',
    provider: 'freeCodeCamp (YouTube)',
    docsUrl: 'https://owasp.org/www-project-top-ten/',
    practiceUrl: 'https://overthewire.org/wargames/bandit/',
    whyLearn: 'OWASP Top 10 vulnerabilities, cryptography, authentication, network defense, and zero-trust security.'
  }
};

/**
 * Resolves any skill string to its corresponding Learning Hub Course details,
 * free YouTube video, documentation, and 30-min assessment ID.
 */
export function getLearningHubMappingForSkill(skillName = '') {
  if (!skillName) return null;
  const clean = skillName.toLowerCase().trim();

  if (SKILL_LEARNING_HUB_MAP[clean]) {
    return SKILL_LEARNING_HUB_MAP[clean];
  }

  for (const [key, mapping] of Object.entries(SKILL_LEARNING_HUB_MAP)) {
    if (clean.includes(key) || key.includes(clean)) {
      return mapping;
    }
  }

  return {
    courseId: 'dsa',
    courseName: `${skillName} (Core Learning)`,
    category: 'Core Computer Science',
    youtubeTitle: `${skillName} Comprehensive Tutorial`,
    youtubeUrl: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(skillName + ' tutorial freecodecamp'),
    duration: '4 Hours',
    provider: 'freeCodeCamp / YouTube',
    docsUrl: 'https://www.geeksforgeeks.org/' + encodeURIComponent(skillName.toLowerCase().replace(/\s+/g, '-')),
    practiceUrl: 'https://leetcode.com/',
    whyLearn: 'Critical industry competency required for employer placement evaluation.'
  };
}

export function computeClientSkillGap(student, targetRoleId = 'role_swe', availableJobRoles = CAREER_ROLES) {
  // If targetRoleId is an object (e.g. Industry Role or Requirement)
  if (typeof targetRoleId === 'object' && targetRoleId !== null) {
    var role = targetRoleId;
  } else {
    // Find role from provided roles or CAREER_ROLES
    const rolePool = Array.isArray(availableJobRoles) && availableJobRoles.length > 0 ? availableJobRoles : CAREER_ROLES;
    const targetStr = typeof targetRoleId === 'string' ? targetRoleId.toLowerCase() : '';
    var role = rolePool.find(r => 
      r.id === targetRoleId || 
      (targetStr && r.title?.toLowerCase() === targetStr) ||
      (student?.targetRoleTitle && r.title?.toLowerCase() === student.targetRoleTitle.toLowerCase()) ||
      r.id === student?.targetRoleId
    ) || CAREER_ROLES[0];
  }

  // Standardize required skills from either industryRequirements or requiredSkills or currentSkills
  let reqs = [];
  if (Array.isArray(role.industryRequirements) && role.industryRequirements.length > 0) {
    reqs = role.industryRequirements;
  } else if (Array.isArray(role.requiredSkills) && role.requiredSkills.length > 0) {
    const defaultWeight = Math.round(100 / role.requiredSkills.length);
    reqs = role.requiredSkills.map(s => {
      const sName = typeof s === 'string' ? s : (s.name || s.skill);
      return {
        skill: sName,
        level: 'Intermediate',
        weight: defaultWeight,
        category: 'Industry Requirement',
        whyLearn: `Direct prerequisite competency published by industry for ${role.title || 'this position'}.`
      };
    });
  } else if (Array.isArray(role.currentSkills) && role.currentSkills.length > 0) {
    const defaultWeight = Math.round(100 / role.currentSkills.length);
    reqs = role.currentSkills.map(s => {
      const sName = typeof s === 'string' ? s : (s.name || s.skill);
      return {
        skill: sName,
        level: 'Intermediate',
        weight: defaultWeight,
        category: 'Industry Requirement',
        whyLearn: `Direct prerequisite competency published by industry for ${role.title || 'this position'}.`
      };
    });
  } else {
    reqs = CAREER_ROLES[0].industryRequirements;
  }

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

  reqs.forEach(req => {
    const weight = req.weight || Math.round(100 / (reqs.length || 1));
    totalWeight += weight;
    
    // Check match by exact or substring
    let matched = studentSkillMap.get(req.skill.toLowerCase());
    if (!matched) {
      for (const [sName, sObj] of studentSkillMap.entries()) {
        if (sName.toLowerCase() === req.skill.toLowerCase() || sName.toLowerCase().includes(req.skill.toLowerCase()) || req.skill.toLowerCase().includes(sName.toLowerCase())) {
          matched = sObj;
          break;
        }
      }
    }

    const hubMapping = getLearningHubMappingForSkill(req.skill);

    if (matched) {
      const studentScore = levelMultiplier[matched.level] || 0.85;
      const requiredScore = levelMultiplier[req.level || 'Intermediate'] || 0.85;
      const ratio = Math.min(1.0, studentScore / requiredScore);
      earnedWeight += weight * ratio;

      skillsHave.push({
        skill: req.skill,
        category: req.category || hubMapping?.category || 'Technical',
        studentLevel: matched.level || 'Intermediate',
        requiredLevel: req.level || 'Intermediate',
        weight: weight,
        verified: matched.verified || false,
        rating: matched.rating || 4.0,
        learningHub: hubMapping
      });
    } else {
      const priority = weight >= 25 ? 'High' : weight >= 15 ? 'Medium' : 'Standard';
      skillsNeed.push({
        skill: req.skill,
        category: req.category || hubMapping?.category || 'Technical',
        requiredLevel: req.level || 'Intermediate',
        weight: weight,
        priority,
        whyLearn: req.whyLearn || `Critical for ${role.title || 'target role'} evaluation (${weight}% role weight).`,
        learningHub: hubMapping
      });
    }
  });

  const matchPercentage = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 60;
  
  const missingNames = skillsNeed.map(s => s.skill).slice(0, 3).join(', ');
  const recommendationSummary = skillsNeed.length > 0
    ? `You are currently ${matchPercentage}% matched with the ${role.title || 'target role'} industry benchmark. Master ${missingNames} to bridge your skill gap and maximize placement readiness.`
    : `Outstanding! You meet 100% of the core industry requirements for ${role.title || 'target role'}. Continue practicing advanced mock technical assessments.`;

  // Aggregate curated Learning Hub resources for missing skills
  const recommendedLearningHubResources = skillsNeed.map(need => {
    const hub = need.learningHub;
    return {
      id: `hub_res_${need.skill.toLowerCase().replace(/\s+/g, '_')}`,
      skill: need.skill,
      title: hub.youtubeTitle || `${need.skill} Full Course`,
      platform: hub.provider || 'freeCodeCamp (YouTube)',
      url: hub.youtubeUrl,
      docsUrl: hub.docsUrl,
      practiceUrl: hub.practiceUrl,
      courseId: hub.courseId,
      courseName: hub.courseName,
      type: 'Video Course & Interactive Docs',
      level: need.requiredLevel || 'All Levels',
      estimatedHours: hub.duration || '4 Hours',
      rating: 4.9,
      description: hub.whyLearn || `Learn ${need.skill} from foundational principles to advanced application. Access free YouTube tutorials, documentation, and verified 30-min assessments in Learning Hub.`
    };
  });

  return {
    studentId: student?.id || 'usr_current',
    studentName: student?.name || 'Student',
    targetRole: role,
    matchPercentage,
    skillsHave,
    skillsNeed,
    recommendationSummary,
    recommendedLearningHubResources
  };
}

