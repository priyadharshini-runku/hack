export const initialData = {
  users: [
    {
      id: 'usr_student_1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@apex.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      collegeId: 'col_apex',
      createdAt: '2026-01-10T10:00:00Z'
    },
    {
      id: 'usr_student_2',
      name: 'Priya Patel',
      email: 'priya.patel@apex.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      collegeId: 'col_apex',
      createdAt: '2026-01-12T10:00:00Z'
    },
    {
      id: 'usr_student_3',
      name: 'Amit Verma',
      email: 'amit.verma@apex.edu',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      collegeId: 'col_apex',
      createdAt: '2026-01-15T10:00:00Z'
    },
    {
      id: 'usr_college_1',
      name: 'Dr. Suresh Kumar (Dean)',
      email: 'dean@apex.edu',
      role: 'college',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      collegeId: 'col_apex',
      createdAt: '2025-11-01T10:00:00Z'
    },
    {
      id: 'usr_company_1',
      name: 'Ananya Mehta (HR Lead)',
      email: 'recruiting@technova.io',
      role: 'company',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      companyId: 'comp_technova',
      createdAt: '2025-12-05T10:00:00Z'
    },
    {
      id: 'usr_company_2',
      name: 'David Wilson (Tech Recruiter)',
      email: 'talent@cloudmatrix.com',
      role: 'company',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      companyId: 'comp_cloudmatrix',
      createdAt: '2025-12-10T10:00:00Z'
    },
    {
      id: 'usr_admin_1',
      name: 'Platform Admin',
      email: 'admin@skillbridge.edu',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: '2025-01-01T00:00:00Z'
    }
  ],

  colleges: [
    {
      id: 'col_apex',
      name: 'Apex Institute of Technology',
      code: 'AIT-BANGALORE',
      location: 'Bangalore, Karnataka',
      established: 2004,
      accreditation: 'NAAC A++ | NBA Accredited',
      deanName: 'Dr. Suresh Kumar',
      email: 'info@apex.edu',
      phone: '+91 80 2345 6789',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
      departments: [
        { id: 'dept_cs', name: 'Computer Science & Engineering', studentCount: 480, hod: 'Dr. R. K. Iyer' },
        { id: 'dept_it', name: 'Information Technology', studentCount: 360, hod: 'Dr. Meena Swaminathan' },
        { id: 'dept_aids', name: 'Artificial Intelligence & Data Science', studentCount: 290, hod: 'Dr. P. Deshmukh' },
        { id: 'dept_ece', name: 'Electronics & Communication', studentCount: 310, hod: 'Dr. V. N. Sharma' }
      ],
      totalStudents: 1440,
      placementRate: '84.6%',
      avgPackage: '₹8.4 LPA',
      highestPackage: '₹42 LPA'
    }
  ],

  companies: [
    {
      id: 'comp_technova',
      name: 'TechNova Solutions',
      industry: 'Enterprise Software & Cloud Platforms',
      size: '1,000 - 5,000 employees',
      location: 'Bangalore & Remote',
      website: 'https://technova.io',
      logo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=150&auto=format&fit=crop&q=80',
      description: 'TechNova builds high-throughput enterprise SaaS backends, cloud distributed systems, and real-time data streaming architectures for Fortune 500 customers.',
      verified: true
    },
    {
      id: 'comp_cloudmatrix',
      name: 'CloudMatrix Labs',
      industry: 'Cloud Infrastructure & DevOps Automation',
      size: '500 - 1,000 employees',
      location: 'Hyderabad / Pune',
      website: 'https://cloudmatrix.com',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      description: 'Next-generation cloud optimization and Kubernetes orchestration software company powering resilient microservice architectures.',
      verified: true
    },
    {
      id: 'comp_cyberpeak',
      name: 'CyberPeak Security',
      industry: 'Cybersecurity & FinTech',
      size: '200 - 500 employees',
      location: 'Mumbai & Remote',
      website: 'https://cyberpeak.io',
      logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
      description: 'Pioneering zero-trust identity verification, threat intelligence, and algorithmic risk mitigation for modern fintech giants.',
      verified: true
    }
  ],

  jobRoles: [
    {
      id: 'role_swe',
      title: 'Software Developer',
      category: 'Software Engineering',
      demandLevel: 'Very High',
      avgStartingSalary: '₹9.2 LPA',
      description: 'Designs, develops, tests, and maintains robust backend microservices, algorithmic workflows, and clean code pipelines.',
      industryRequirements: [
        { skill: 'Java', level: 'Intermediate', weight: 15, category: 'Technical' },
        { skill: 'Python', level: 'Intermediate', weight: 15, category: 'Technical' },
        { skill: 'SQL', level: 'Intermediate', weight: 15, category: 'Technical' },
        { skill: 'Data Structures', level: 'Advanced', weight: 20, category: 'Technical' },
        { skill: 'Git', level: 'Intermediate', weight: 15, category: 'Tools' },
        { skill: 'React', level: 'Beginner', weight: 10, category: 'Technical' },
        { skill: 'Communication', level: 'Intermediate', weight: 10, category: 'Soft' }
      ]
    },
    {
      id: 'role_frontend',
      title: 'Frontend Developer',
      category: 'Web Development',
      demandLevel: 'High',
      avgStartingSalary: '₹8.0 LPA',
      description: 'Specializes in creating accessible, responsive, interactive user experiences with modern JavaScript frameworks.',
      industryRequirements: [
        { skill: 'JavaScript', level: 'Advanced', weight: 20, category: 'Technical' },
        { skill: 'React', level: 'Intermediate', weight: 25, category: 'Technical' },
        { skill: 'HTML/CSS', level: 'Advanced', weight: 15, category: 'Technical' },
        { skill: 'TypeScript', level: 'Intermediate', weight: 15, category: 'Technical' },
        { skill: 'Git', level: 'Intermediate', weight: 10, category: 'Tools' },
        { skill: 'Tailwind CSS', level: 'Intermediate', weight: 10, category: 'Tools' },
        { skill: 'Communication', level: 'Intermediate', weight: 5, category: 'Soft' }
      ]
    },
    {
      id: 'role_aiml',
      title: 'AI/ML Engineer',
      category: 'Artificial Intelligence',
      demandLevel: 'Extremely High',
      avgStartingSalary: '₹12.5 LPA',
      description: 'Builds predictive models, neural networks, natural language processing pipelines, and production machine learning workflows.',
      industryRequirements: [
        { skill: 'Python', level: 'Advanced', weight: 20, category: 'Technical' },
        { skill: 'Data Structures', level: 'Intermediate', weight: 15, category: 'Technical' },
        { skill: 'Machine Learning', level: 'Intermediate', weight: 20, category: 'Technical' },
        { skill: 'PyTorch', level: 'Intermediate', weight: 15, category: 'Technical' },
        { skill: 'SQL', level: 'Intermediate', weight: 10, category: 'Technical' },
        { skill: 'Docker', level: 'Beginner', weight: 10, category: 'Tools' },
        { skill: 'Problem Solving', level: 'Advanced', weight: 10, category: 'Soft' }
      ]
    },
    {
      id: 'role_devops',
      title: 'Cloud & DevOps Engineer',
      category: 'Infrastructure & Cloud',
      demandLevel: 'Very High',
      avgStartingSalary: '₹10.8 LPA',
      description: 'Automates CI/CD pipelines, provisions cloud infrastructure-as-code, and ensures 99.99% system resilience.',
      industryRequirements: [
        { skill: 'Linux', level: 'Advanced', weight: 15, category: 'Technical' },
        { skill: 'AWS', level: 'Intermediate', weight: 20, category: 'Technical' },
        { skill: 'Docker', level: 'Intermediate', weight: 15, category: 'Tools' },
        { skill: 'Kubernetes', level: 'Beginner', weight: 15, category: 'Tools' },
        { skill: 'CI/CD', level: 'Intermediate', weight: 15, category: 'Tools' },
        { skill: 'Git', level: 'Intermediate', weight: 10, category: 'Tools' },
        { skill: 'Teamwork', level: 'Intermediate', weight: 10, category: 'Soft' }
      ]
    },
    {
      id: 'role_data_analyst',
      title: 'Data Analyst',
      category: 'Data & Analytics',
      demandLevel: 'High',
      avgStartingSalary: '₹7.5 LPA',
      description: 'Transforms complex raw datasets into actionable executive dashboards, statistical insights, and business intelligence.',
      industryRequirements: [
        { skill: 'SQL', level: 'Advanced', weight: 25, category: 'Technical' },
        { skill: 'Python', level: 'Intermediate', weight: 20, category: 'Technical' },
        { skill: 'PowerBI', level: 'Intermediate', weight: 20, category: 'Tools' },
        { skill: 'Excel', level: 'Advanced', weight: 15, category: 'Tools' },
        { skill: 'Statistics', level: 'Intermediate', weight: 10, category: 'Technical' },
        { skill: 'Communication', level: 'Advanced', weight: 10, category: 'Soft' }
      ]
    }
  ],

  students: [
    {
      id: 'usr_student_1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@apex.edu',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      collegeId: 'col_apex',
      collegeName: 'Apex Institute of Technology',
      department: 'Computer Science & Engineering',
      year: '3rd Year (6th Semester)',
      batch: '2023 - 2027',
      cgpa: 8.85,
      targetRoleId: 'role_swe',
      targetRoleTitle: 'Software Developer',
      preferredIndustry: 'Enterprise Software & Cloud Platforms',
      bio: 'Enthusiastic CS undergraduate passionate about scalable backend microservices, clean object-oriented architecture, and building production-grade web systems.',
      resumeUrl: 'https://example.com/resumes/rahul_sharma_cs.pdf',
      visibilitySettings: {
        showCGPA: true,
        showContact: true,
        allowCompanyScouting: true
      },
      skills: [
        { name: 'Java', level: 'Intermediate', category: 'Technical', verified: true, verifiedBy: 'TechNova Solutions', rating: 4.5 },
        { name: 'Python', level: 'Advanced', category: 'Technical', verified: true, verifiedBy: 'Apex Lab Exam', rating: 4.8 },
        { name: 'SQL', level: 'Intermediate', category: 'Technical', verified: false, rating: 3.5 },
        { name: 'Communication', level: 'Intermediate', category: 'Soft', verified: true, verifiedBy: 'TechNova Solutions', rating: 4.0 },
        { name: 'Teamwork', level: 'Advanced', category: 'Soft', verified: true, verifiedBy: 'TechNova Solutions', rating: 4.9 }
      ],
      certifications: [
        {
          id: 'cert_1',
          title: 'Oracle Certified Associate: Java SE Programmer',
          issuer: 'Oracle',
          date: 'Nov 2025',
          credentialUrl: 'https://verify.oracle.com/cert/JAVA-2025-998',
          verified: true
        },
        {
          id: 'cert_2',
          title: 'Python for Data Structures & Algorithms',
          issuer: 'Coursera / UC San Diego',
          date: 'Aug 2025',
          credentialUrl: 'https://coursera.org/verify/DS-ALG-332',
          verified: true
        }
      ],
      projects: [
        {
          id: 'proj_1',
          title: 'Distributed Task Queue Engine',
          description: 'A fault-tolerant task execution queue in Java & Redis supporting priority workers, exponential retries, and REST management endpoints.',
          technologies: ['Java', 'Spring Boot', 'Redis', 'PostgreSQL', 'Docker'],
          githubUrl: 'https://github.com/rahul/task-queue-engine',
          liveUrl: 'https://taskqueue.demo.dev'
        },
        {
          id: 'proj_2',
          title: 'SQL Query Performance Visualizer',
          description: 'Web dashboard analyzing query execution plans, missing index suggestions, and database latency metrics.',
          technologies: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL'],
          githubUrl: 'https://github.com/rahul/sql-perf-viz',
          liveUrl: 'https://sqlviz.demo.dev'
        }
      ],
      internships: [
        {
          id: 'intern_1',
          company: 'TechNova Solutions',
          role: 'Backend Engineering Intern',
          duration: 'June 2025 - August 2025 (3 Months)',
          location: 'Bangalore / Hybrid',
          description: 'Refactored user authentication services to OAuth2 / JWT, optimized database index queries reducing p99 latency by 32%, and wrote unit tests with 88% coverage.',
          verified: true,
          feedbackId: 'fb_1'
        }
      ],
      achievements: [
        'Winner (1st Place) - AIT Annual CodeSprint Hackathon 2025 (out of 120 teams)',
        'LeetCode Knight: Top 5% Global Ranking (Solved 450+ algorithmic problems)',
        'Class Representative for CS Batch 2023-27'
      ]
    },
    {
      id: 'usr_student_2',
      name: 'Priya Patel',
      email: 'priya.patel@apex.edu',
      phone: '+91 98765 11223',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      collegeId: 'col_apex',
      collegeName: 'Apex Institute of Technology',
      department: 'Information Technology',
      year: '4th Year (8th Semester)',
      batch: '2022 - 2026',
      cgpa: 9.24,
      targetRoleId: 'role_frontend',
      targetRoleTitle: 'Frontend Developer',
      preferredIndustry: 'FinTech & Consumer Tech',
      bio: 'Design-minded Frontend Engineer specializing in high-performance React architectures, smooth UI animations, and web accessibility standards.',
      resumeUrl: 'https://example.com/resumes/priya_patel_it.pdf',
      visibilitySettings: {
        showCGPA: true,
        showContact: true,
        allowCompanyScouting: true
      },
      skills: [
        { name: 'JavaScript', level: 'Advanced', category: 'Technical', verified: true, rating: 4.8 },
        { name: 'React', level: 'Intermediate', category: 'Technical', verified: true, rating: 4.2 },
        { name: 'HTML/CSS', level: 'Advanced', category: 'Technical', verified: true, rating: 4.9 },
        { name: 'Tailwind CSS', level: 'Intermediate', category: 'Tools', verified: true, rating: 4.4 },
        { name: 'Communication', level: 'Intermediate', category: 'Soft', verified: true, rating: 4.3 }
      ],
      certifications: [
        {
          id: 'cert_3',
          title: 'Meta Certified Frontend Developer',
          issuer: 'Meta / Coursera',
          date: 'Oct 2025',
          credentialUrl: 'https://meta.credly.com/verify/10293',
          verified: true
        }
      ],
      projects: [
        {
          id: 'proj_3',
          title: 'FinTrack Wealth & Portfolio Manager',
          description: 'A real-time financial tracking dashboard with responsive charts, currency converters, and local data persistence.',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
          githubUrl: 'https://github.com/priya/fintrack',
          liveUrl: 'https://fintrack.demo.app'
        }
      ],
      internships: [],
      achievements: [
        'Dean’s Merit List for Academic Excellence (Semester 1 to 7)',
        'Lead Organizer of Apex Web Development Society'
      ]
    },
    {
      id: 'usr_student_3',
      name: 'Amit Verma',
      email: 'amit.verma@apex.edu',
      phone: '+91 98765 88990',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      collegeId: 'col_apex',
      collegeName: 'Apex Institute of Technology',
      department: 'Artificial Intelligence & Data Science',
      year: '3rd Year (6th Semester)',
      batch: '2023 - 2027',
      cgpa: 8.42,
      targetRoleId: 'role_aiml',
      targetRoleTitle: 'AI/ML Engineer',
      preferredIndustry: 'Autonomous Systems & Deep Tech',
      bio: 'Machine learning practitioner keen on deep learning models, computer vision, and building end-to-end ML inference services.',
      resumeUrl: 'https://example.com/resumes/amit_verma_ai.pdf',
      visibilitySettings: {
        showCGPA: true,
        showContact: true,
        allowCompanyScouting: true
      },
      skills: [
        { name: 'Python', level: 'Advanced', category: 'Technical', verified: true, rating: 4.7 },
        { name: 'Machine Learning', level: 'Intermediate', category: 'Technical', verified: false, rating: 3.8 },
        { name: 'SQL', level: 'Intermediate', category: 'Technical', verified: false, rating: 3.6 },
        { name: 'Problem Solving', level: 'Advanced', category: 'Soft', verified: true, rating: 4.5 }
      ],
      certifications: [
        {
          id: 'cert_4',
          title: 'Deep Learning Specialization',
          issuer: 'DeepLearning.AI',
          date: 'Jan 2026',
          credentialUrl: 'https://deeplearning.ai/verify/4819',
          verified: true
        }
      ],
      projects: [
        {
          id: 'proj_4',
          title: 'Medical Image Tumor Detection',
          description: 'A PyTorch CNN classifier identifying anomalies with 94.2% validation accuracy on open MRI datasets.',
          technologies: ['Python', 'PyTorch', 'OpenCV', 'Streamlit'],
          githubUrl: 'https://github.com/amit/mri-tumor-vision',
          liveUrl: 'https://mrivision.demo.app'
        }
      ],
      internships: [],
      achievements: [
        'Published research paper in IEEE Student Conference 2025',
        'Kaggle Competitions Expert (Top 2% in Computer Vision Challenge)'
      ]
    }
  ],

  learningResources: [
    // Data Structures
    {
      id: 'res_ds_1',
      skill: 'Data Structures',
      title: 'Data Structures and Algorithms in Java / Python Full Course',
      platform: 'YouTube (freeCodeCamp.org)',
      instructor: 'Dr. John Watson & freeCodeCamp',
      level: 'Beginner to Intermediate',
      estimatedHours: '14 Hours',
      type: 'Video Course',
      url: 'https://www.youtube.com/watch?v=RBSGKlAnoiM',
      thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13f5905d2?w=300&auto=format&fit=crop&q=80',
      description: 'Master Arrays, Linked Lists, Stacks, Queues, Binary Trees, Graphs, and Hash Tables with hands-on practice problems.',
      rating: 4.9,
      studentsCompleted: 1420
    },
    {
      id: 'res_ds_2',
      skill: 'Data Structures',
      title: 'Complete Data Structures Tutorial with Practice',
      platform: 'GeeksforGeeks',
      instructor: 'GFG Technical Editorial Team',
      level: 'All Levels',
      estimatedHours: '20 Hours',
      type: 'Interactive Tutorial',
      url: 'https://www.geeksforgeeks.org/data-structures/',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80',
      description: 'Comprehensive code snippets, time complexity breakdowns, and interview problem sets for all core data structures.',
      rating: 4.8,
      studentsCompleted: 2800
    },

    // Git
    {
      id: 'res_git_1',
      skill: 'Git',
      title: 'Git & GitHub Crash Course for Beginners',
      platform: 'YouTube (Traversy Media)',
      instructor: 'Brad Traversy',
      level: 'Beginner',
      estimatedHours: '2.5 Hours',
      type: 'Video Course',
      url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
      thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=300&auto=format&fit=crop&q=80',
      description: 'Learn init, commit, branching, merging, pull requests, resolving merge conflicts, and GitHub collaboration workflows.',
      rating: 4.9,
      studentsCompleted: 3100
    },
    {
      id: 'res_git_2',
      skill: 'Git',
      title: 'Pro Git Official Guide & Interactive Exercises',
      platform: 'Official Git Documentation',
      instructor: 'Scott Chacon & Ben Straub',
      level: 'Intermediate',
      estimatedHours: '6 Hours',
      type: 'Official Documentation',
      url: 'https://git-scm.com/book/en/v2',
      thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=300&auto=format&fit=crop&q=80',
      description: 'The definitive handbook covering Git internals, rebase workflows, submodules, and branch management strategies.',
      rating: 4.9,
      studentsCompleted: 1950
    },

    // React
    {
      id: 'res_react_1',
      skill: 'React',
      title: 'React 18 Full Course – Build Modern Web Apps',
      platform: 'YouTube (freeCodeCamp.org)',
      instructor: 'Bob Ziroll',
      level: 'Beginner to Intermediate',
      estimatedHours: '12 Hours',
      type: 'Video Course',
      url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=80',
      description: 'Understand JSX, Components, Props, State, useEffect hooks, Forms, and component lifecycle with 8 mini-projects.',
      rating: 4.9,
      studentsCompleted: 4500
    },
    {
      id: 'res_react_2',
      skill: 'React',
      title: 'Learn React – Interactive Official Docs & Sandboxes',
      platform: 'React.dev Official Docs',
      instructor: 'React Core Team',
      level: 'All Levels',
      estimatedHours: '10 Hours',
      type: 'Official Documentation',
      url: 'https://react.dev/learn',
      thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&auto=format&fit=crop&q=80',
      description: 'The modern interactive tutorial from the creators of React with visual diagrams and in-browser interactive sandboxes.',
      rating: 5.0,
      studentsCompleted: 3400
    },

    // TypeScript
    {
      id: 'res_ts_1',
      skill: 'TypeScript',
      title: 'TypeScript Tutorial for Beginners',
      platform: 'YouTube (Programming with Mosh)',
      instructor: 'Mosh Hamedani',
      level: 'Beginner to Intermediate',
      estimatedHours: '3 Hours',
      type: 'Video Course',
      url: 'https://www.youtube.com/watch?v=d56mG7DezGs',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=80',
      description: 'Master types, interfaces, generics, union types, enums, and TypeScript integration with React and Node.js.',
      rating: 4.9,
      studentsCompleted: 2100
    },

    // Docker & DevOps
    {
      id: 'res_dock_1',
      skill: 'Docker',
      title: 'Docker Containerization Full Course',
      platform: 'YouTube (TechWorld with Nana)',
      instructor: 'Nana Janashia',
      level: 'Beginner',
      estimatedHours: '4 Hours',
      type: 'Video Course',
      url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
      thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=300&auto=format&fit=crop&q=80',
      description: 'Containers vs VMs, Dockerfile creation, image building, docker-compose multi-service stacks, volumes, and networking.',
      rating: 4.9,
      studentsCompleted: 3900
    },

    // PyTorch
    {
      id: 'res_torch_1',
      skill: 'PyTorch',
      title: 'PyTorch for Deep Learning Bootcamp',
      platform: 'freeCodeCamp.org',
      instructor: 'Daniel Bourke',
      level: 'Intermediate',
      estimatedHours: '26 Hours',
      type: 'Video Course',
      url: 'https://www.youtube.com/watch?v=V_xro1bcAuA',
      thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=300&auto=format&fit=crop&q=80',
      description: 'Tensors, backpropagation, computer vision models, custom datasets, transfer learning, and model deployment.',
      rating: 4.9,
      studentsCompleted: 1600
    },

    // Communication & Soft Skills
    {
      id: 'res_comm_1',
      skill: 'Communication',
      title: 'Technical Communication & Behavioral Interview Mastery',
      platform: 'YouTube (CareerCraft & Harvard Extension)',
      instructor: 'Prof. David Brooks',
      level: 'All Levels',
      estimatedHours: '3.5 Hours',
      type: 'Video Series',
      url: 'https://www.youtube.com/watch?v=HAnw168huqA',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&auto=format&fit=crop&q=80',
      description: 'STAR methodology for tech interviews, concise technical explanations, presentation skills, and cross-functional teamwork.',
      rating: 4.8,
      studentsCompleted: 1850
    }
  ],

  internships: [
    {
      id: 'opp_1',
      companyId: 'comp_technova',
      companyName: 'TechNova Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=150&auto=format&fit=crop&q=80',
      title: 'Software Developer Intern (Backend)',
      type: 'Internship',
      category: 'Software Engineering',
      workMode: 'Hybrid',
      location: 'Bangalore, India',
      stipend: '₹25,000 / month',
      duration: '6 Months',
      openings: 5,
      eligibility: 'B.Tech / M.Tech CS, IT, AI-DS (Pre-final & Final Year, CGPA >= 7.5)',
      deadline: '2026-09-30',
      postedDate: '2026-08-20',
      description: 'Work with our core cloud infrastructure team building high-performance Java/Python REST microservices, Redis caching layers, and database optimization pipelines.',
      requiredSkills: [
        { name: 'Java', level: 'Intermediate', isMandatory: true },
        { name: 'Python', level: 'Intermediate', isMandatory: true },
        { name: 'SQL', level: 'Intermediate', isMandatory: true },
        { name: 'Data Structures', level: 'Intermediate', isMandatory: true },
        { name: 'Git', level: 'Intermediate', isMandatory: false },
        { name: 'Communication', level: 'Intermediate', isMandatory: false }
      ],
      perks: ['Pre-Placement Offer (PPO) Opportunity', 'Flexible Hours', 'Mentorship by Staff Engineers', 'Free Meal & Commute Subsidy'],
      status: 'Active'
    },
    {
      id: 'opp_2',
      companyId: 'comp_technova',
      companyName: 'TechNova Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=150&auto=format&fit=crop&q=80',
      title: 'Frontend Developer Intern',
      type: 'Internship',
      category: 'Web Development',
      workMode: 'Remote',
      location: 'Pan India (Remote)',
      stipend: '₹22,000 / month',
      duration: '4 Months',
      openings: 4,
      eligibility: 'B.Tech / BCA / MCA (Any branch, Strong Web Portfolio)',
      deadline: '2026-09-25',
      postedDate: '2026-08-22',
      description: 'Build polished, responsive customer-facing dashboard components in React, TypeScript, and Tailwind CSS. Implement unit tests and state management.',
      requiredSkills: [
        { name: 'JavaScript', level: 'Advanced', isMandatory: true },
        { name: 'React', level: 'Intermediate', isMandatory: true },
        { name: 'HTML/CSS', level: 'Advanced', isMandatory: true },
        { name: 'Tailwind CSS', level: 'Intermediate', isMandatory: false },
        { name: 'Git', level: 'Intermediate', isMandatory: false }
      ],
      perks: ['Certificate of Excellence', 'Letter of Recommendation', 'Work from Home Equipment Allowance'],
      status: 'Active'
    },
    {
      id: 'opp_3',
      companyId: 'comp_cloudmatrix',
      companyName: 'CloudMatrix Labs',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      title: 'Junior Cloud & DevOps Engineer',
      type: 'Full-Time Placement',
      category: 'Infrastructure & Cloud',
      workMode: 'On-site',
      location: 'Hyderabad, India',
      stipend: '₹10.5 LPA CTC',
      duration: 'Full-Time',
      openings: 3,
      eligibility: 'Graduating Batch 2026 (CS, IT, ECE with Linux fundamentals)',
      deadline: '2026-10-15',
      postedDate: '2026-08-15',
      description: 'Join our SRE team to manage multi-region AWS cloud infrastructure, configure Kubernetes clusters, automate deployment scripts, and maintain observability stacks.',
      requiredSkills: [
        { name: 'Linux', level: 'Advanced', isMandatory: true },
        { name: 'AWS', level: 'Intermediate', isMandatory: true },
        { name: 'Docker', level: 'Intermediate', isMandatory: true },
        { name: 'Kubernetes', level: 'Beginner', isMandatory: false },
        { name: 'CI/CD', level: 'Intermediate', isMandatory: false }
      ],
      perks: ['Health Insurance', 'Relocation Bonus', 'AWS Certification Sponsorship', 'Gym Membership'],
      status: 'Active'
    },
    {
      id: 'opp_4',
      companyId: 'comp_cyberpeak',
      companyName: 'CyberPeak Security',
      companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
      title: 'Machine Learning & AI Research Intern',
      type: 'Internship',
      category: 'Artificial Intelligence',
      workMode: 'Hybrid',
      location: 'Mumbai, India',
      stipend: '₹30,000 / month',
      duration: '6 Months',
      openings: 2,
      eligibility: 'B.Tech / M.Tech / MS in AI, DS, CS, Mathematics',
      deadline: '2026-10-05',
      postedDate: '2026-08-25',
      description: 'Develop anomaly detection algorithms and transformer-based risk prediction models for real-time financial transaction streams.',
      requiredSkills: [
        { name: 'Python', level: 'Advanced', isMandatory: true },
        { name: 'Machine Learning', level: 'Intermediate', isMandatory: true },
        { name: 'PyTorch', level: 'Intermediate', isMandatory: false },
        { name: 'SQL', level: 'Intermediate', isMandatory: false },
        { name: 'Problem Solving', level: 'Advanced', isMandatory: true }
      ],
      perks: ['Co-authorship on patents/papers', 'High conversion rate to Full-Time', 'Executive Tech Mentorship'],
      status: 'Active'
    }
  ],

  applications: [
    {
      id: 'app_1',
      opportunityId: 'opp_1',
      studentId: 'usr_student_1',
      studentName: 'Rahul Sharma',
      studentEmail: 'rahul.sharma@apex.edu',
      studentDepartment: 'Computer Science & Engineering',
      studentCGPA: 8.85,
      studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      appliedDate: '2026-08-21T14:30:00Z',
      status: 'Hired',
      matchScore: 83,
      resumeUrl: 'https://example.com/resumes/rahul_sharma_cs.pdf',
      coverNote: 'Excited about building high-throughput backend services. Completed 450+ DS problems and have hands-on Java & Spring Boot project experience.',
      timeline: [
        { status: 'Applied', date: '2026-08-21T14:30:00Z', note: 'Application submitted successfully' },
        { status: 'Shortlisted', date: '2026-08-23T11:00:00Z', note: 'Profile matched 83% of role requirements' },
        { status: 'Technical Interview', date: '2026-08-26T15:00:00Z', note: 'Cleared Live Coding round with 9.5/10' },
        { status: 'Hired', date: '2026-08-29T18:00:00Z', note: 'Offer letter released. Joining date: Sept 15, 2026' }
      ]
    },
    {
      id: 'app_2',
      opportunityId: 'opp_2',
      studentId: 'usr_student_2',
      studentName: 'Priya Patel',
      studentEmail: 'priya.patel@apex.edu',
      studentDepartment: 'Information Technology',
      studentCGPA: 9.24,
      studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      appliedDate: '2026-08-23T16:00:00Z',
      status: 'Shortlisted',
      matchScore: 92,
      resumeUrl: 'https://example.com/resumes/priya_patel_it.pdf',
      coverNote: 'Passionate about frontend UI engineering with deep React and Tailwind CSS expertise.',
      timeline: [
        { status: 'Applied', date: '2026-08-23T16:00:00Z', note: 'Application submitted' },
        { status: 'Shortlisted', date: '2026-08-25T10:30:00Z', note: 'Shortlisted for Portfolio Review & Task Round' }
      ]
    }
  ],

  companyFeedbacks: [
    {
      id: 'fb_1',
      opportunityId: 'opp_1',
      studentId: 'usr_student_1',
      companyId: 'comp_technova',
      companyName: 'TechNova Solutions',
      reviewerName: 'Ananya Mehta (HR & Engineering Mentor)',
      reviewerTitle: 'Lead Engineering Manager',
      internshipDuration: 'June 2025 - August 2025 (3 Months)',
      submittedAt: '2025-08-30T16:45:00Z',
      ratings: {
        technicalSkills: 4.5,
        communication: 4.0,
        teamwork: 4.9,
        problemSolving: 4.5,
        timeManagement: 4.2,
        adaptability: 4.8,
        professionalism: 4.7
      },
      overallRating: 4.5,
      verifiedSkillsAdded: [
        { name: 'Java', level: 'Intermediate', rating: 4.5 },
        { name: 'Python', level: 'Advanced', rating: 4.8 },
        { name: 'Teamwork', level: 'Advanced', rating: 4.9 }
      ],
      qualitativeFeedback: 'Rahul demonstrated exceptional discipline and technical curiosity throughout his 3-month internship. He successfully optimized database indexes and contributed clean, modular Java microservices. Highly recommend him for full-time engineering roles.',
      keyStrengths: ['Fast learner', 'Clean object-oriented design', 'Proactive team communication'],
      growthAreas: ['Deepen knowledge in distributed message queues (Kafka) and automated integration testing.'],
      recommendForHire: true
    }
  ],

  workshops: [
    {
      id: 'ws_1',
      collegeId: 'col_apex',
      title: 'Full-Stack React & Next.js Industry Intensive',
      targetSkill: 'React',
      department: 'Computer Science & Engineering',
      targetYear: '3rd Year & 4th Year',
      status: 'Upcoming',
      startDate: '2026-09-12',
      endDate: '2026-09-14',
      duration: '3 Days (18 Hours Total)',
      instructor: 'Arjun Nambiar (Senior Frontend Architect at TechNova)',
      location: 'AIT Tech Auditorium & Live Stream',
      maxSeats: 150,
      enrolledCount: 138,
      reasonForOrganizing: 'College analytics detected 71% of CS 3rd-year students lacking modern React frameworks required for top tech placements.',
      description: 'Hands-on practical bootcamp covering Modern React 18, State Management, API integration, Tailwind CSS, and deploying live production apps.',
      learningOutcomes: ['Build and deploy full-stack React applications', 'Master component architecture and custom hooks', 'Qualify for frontend internship opportunities']
    },
    {
      id: 'ws_2',
      collegeId: 'col_apex',
      title: 'Algorithmic Problem Solving & Data Structures Bootcamp',
      targetSkill: 'Data Structures',
      department: 'All Departments',
      targetYear: '2nd & 3rd Year',
      status: 'In Progress',
      startDate: '2026-09-02',
      endDate: '2026-09-10',
      duration: '8 Days',
      instructor: 'Dr. R. K. Iyer (HOD CS) + Industry Guest Mentors',
      location: 'Computer Center Lab 4',
      maxSeats: 200,
      enrolledCount: 194,
      reasonForOrganizing: 'Identified 65% student gap in core algorithmic problem solving during preliminary campus assessments.',
      description: 'Intensive problem-solving sessions on LeetCode Medium/Hard patterns: Dynamic Programming, Graph Traversals, Binary Trees, and Greedy Algorithms.',
      learningOutcomes: ['Solve 50+ interview-grade coding problems', 'Master space-time complexity analysis', 'Prepare for upcoming TechNova and Amazon on-campus drives']
    },
    {
      id: 'ws_3',
      collegeId: 'col_apex',
      title: 'Cloud Native & Docker Containerization Masterclass',
      targetSkill: 'Docker',
      department: 'Information Technology',
      targetYear: '3rd & 4th Year',
      status: 'Completed',
      startDate: '2026-08-10',
      endDate: '2026-08-12',
      duration: '2 Days',
      instructor: 'David Wilson (CloudMatrix Labs)',
      location: 'Virtual Workshop',
      maxSeats: 120,
      enrolledCount: 118,
      reasonForOrganizing: 'Rising industry demand for containerization in campus hiring drives.',
      description: 'Hands-on containerization of Python/Node apps, multi-stage Dockerfiles, Docker Compose, and CI/CD basics.',
      learningOutcomes: ['Successfully dockerize web applications', 'Understand microservice networking']
    }
  ],

  collegeAnalytics: {
    overview: {
      totalStudents: 1440,
      completeProfilesCount: 1285,
      profileCompletionRate: '89.2%',
      averageSkillMatch: 68.4,
      internshipParticipationRate: '72.1%',
      placementReadinessRate: '76.8%',
      partnerCompaniesCount: 48,
      verifiedSkillsIssued: 3420
    },
    topSkillGaps: [
      { skill: 'React', studentsLackingPct: 71, count: 1022, priority: 'High', departmentWorst: 'CS & IT', trend: 'Increasing Demand' },
      { skill: 'Data Structures', studentsLackingPct: 65, count: 936, priority: 'High', departmentWorst: 'ECE & IT', trend: 'Critical Core' },
      { skill: 'Docker & Containers', studentsLackingPct: 62, count: 892, priority: 'High', departmentWorst: 'All Branches', trend: 'Emerging Requirement' },
      { skill: 'Communication & STAR', studentsLackingPct: 58, count: 835, priority: 'High', departmentWorst: 'All Branches', trend: 'HR Essential' },
      { skill: 'SQL & Database Indexing', studentsLackingPct: 42, count: 604, priority: 'Medium', departmentWorst: 'ECE & Mech', trend: 'Standard Requirement' },
      { skill: 'Git & GitHub Workflows', studentsLackingPct: 38, count: 547, priority: 'Medium', departmentWorst: '1st & 2nd Year', trend: 'Foundation' },
      { skill: 'Cloud (AWS / Azure)', studentsLackingPct: 54, count: 777, priority: 'High', departmentWorst: 'IT & CS', trend: 'High Growth' }
    ],
    departmentMetrics: [
      { name: 'Computer Science', students: 480, avgMatch: 74, topGap: 'React (68%)', readiness: '82%' },
      { name: 'Information Tech', students: 360, avgMatch: 71, topGap: 'Docker (64%)', readiness: '78%' },
      { name: 'AI & Data Science', students: 290, avgMatch: 69, topGap: 'MLOps (73%)', readiness: '75%' },
      { name: 'Electronics (ECE)', students: 310, avgMatch: 59, topGap: 'Data Structures (78%)', readiness: '64%' }
    ],
    placementStatsByYear: [
      { year: '2023', placed: 81, avgLPA: 6.8 },
      { year: '2024', placed: 84, avgLPA: 7.4 },
      { year: '2025', placed: 89, avgLPA: 8.2 },
      { year: '2026 (Projected)', placed: 92, avgLPA: 8.9 }
    ]
  },

  industryTrends: {
    topDemandedSkills: [
      { rank: 1, name: 'Python', demandGrowth: '+34% YoY', jobOpenings: 18400, category: 'Technical', difficulty: 'Moderate' },
      { rank: 2, name: 'SQL & Data Engineering', demandGrowth: '+28% YoY', jobOpenings: 16200, category: 'Technical', difficulty: 'Moderate' },
      { rank: 3, name: 'Java & Spring Boot', demandGrowth: '+22% YoY', jobOpenings: 15100, category: 'Technical', difficulty: 'Moderate to Advanced' },
      { rank: 4, name: 'Data Structures & Algorithms', demandGrowth: '+40% YoY', jobOpenings: 21000, category: 'Foundation', difficulty: 'Challenging' },
      { rank: 5, name: 'Cloud (AWS / GCP / Azure)', demandGrowth: '+45% YoY', jobOpenings: 14800, category: 'Infrastructure', difficulty: 'Moderate' },
      { rank: 6, name: 'React & Next.js', demandGrowth: '+29% YoY', jobOpenings: 13900, category: 'Frontend', difficulty: 'Moderate' },
      { rank: 7, name: 'Communication & Behavioral', demandGrowth: '+50% YoY', jobOpenings: 25000, category: 'Soft Skill', difficulty: 'Continuous' },
      { rank: 8, name: 'Docker & Kubernetes', demandGrowth: '+38% YoY', jobOpenings: 11200, category: 'DevOps', difficulty: 'Moderate' },
      { rank: 9, name: 'Git Version Control', demandGrowth: '+18% YoY', jobOpenings: 19500, category: 'Tools', difficulty: 'Easy' },
      { rank: 10, name: 'AI / LLM Integration', demandGrowth: '+85% YoY', jobOpenings: 9400, category: 'Emerging', difficulty: 'Challenging' }
    ],
    emergingSkills: [
      { name: 'Generative AI & RAG', growth: '+140%', industry: 'All Tech Sectors', badge: 'Hottest' },
      { name: 'Rust for Systems', growth: '+68%', industry: 'FinTech & Embedded', badge: 'High Growth' },
      { name: 'MLOps & LLMOps', growth: '+92%', industry: 'AI & Data Platforms', badge: 'High Demand' },
      { name: 'Zero-Trust Cybersecurity', growth: '+54%', industry: 'Banking & Cloud', badge: 'Enterprise Priority' }
    ]
  }
};
