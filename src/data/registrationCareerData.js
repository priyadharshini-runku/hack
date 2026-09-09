/**
 * Career Domains, Roles & Skills Data Engine
 * 
 * Provides industry domains, branch-to-role mappings, and categorized
 * engineering skills for student registration, profile tracking,
 * and skill gap analysis.
 */

export const INDUSTRY_DOMAINS = [
  'Software / IT',
  'Hardware / Electronics',
  'VLSI / Semiconductor',
  'AI & Machine Learning',
  'Data & Analytics',
  'Cybersecurity',
  'Cloud & DevOps',
  'Core Engineering',
  'Automotive',
  'Robotics & Automation',
  'Manufacturing',
  'Construction',
  'Energy & Power',
  'Telecommunications',
  'Research & Development',
  'Other'
];

/**
 * Maps an Engineering Branch (from ALL_ENGINEERING_DEPARTMENTS) to recommended default domains
 */
export function getDefaultDomainsForBranch(branchName = '') {
  const b = branchName.toLowerCase();

  if (b.includes('computer') || b.includes('information') || b.includes('software')) {
    return ['Software / IT', 'Cloud & DevOps'];
  }
  if (b.includes('intelligence') || b.includes('data science') || b.includes('ai &')) {
    return ['AI & Machine Learning', 'Data & Analytics'];
  }
  if (b.includes('cybersecurity')) {
    return ['Cybersecurity', 'Software / IT'];
  }
  if (b.includes('iot')) {
    return ['Hardware / Electronics', 'Cloud & DevOps'];
  }
  if (b.includes('electronics & communication') || b.includes('telecommunication') || b.includes('etc')) {
    return ['Hardware / Electronics', 'VLSI / Semiconductor'];
  }
  if (b.includes('electrical')) {
    return ['Energy & Power', 'Core Engineering'];
  }
  if (b.includes('mechanical') || b.includes('production') || b.includes('industrial')) {
    return ['Core Engineering', 'Manufacturing'];
  }
  if (b.includes('automobile')) {
    return ['Automotive', 'Core Engineering'];
  }
  if (b.includes('robotics') || b.includes('mechatronics')) {
    return ['Robotics & Automation', 'Hardware / Electronics'];
  }
  if (b.includes('civil') || b.includes('structural')) {
    return ['Construction', 'Core Engineering'];
  }
  if (b.includes('aerospace') || b.includes('aeronautical')) {
    return ['Core Engineering', 'Research & Development'];
  }
  if (b.includes('chemical') || b.includes('petroleum')) {
    return ['Core Engineering', 'Manufacturing'];
  }
  if (b.includes('biotechnology') || b.includes('biomedical')) {
    return ['Research & Development', 'Hardware / Electronics'];
  }

  return ['Software / IT', 'Core Engineering'];
}

/**
 * Comprehensive Career Roles across all Engineering Branches & Domains
 */
export const ALL_CAREER_ROLES = [
  // ==================== IT / CSE / SOFTWARE ====================
  {
    id: 'role_swe',
    title: 'Software Developer',
    category: 'Software / IT',
    branches: ['CSE', 'IT', 'AI & ML', 'AI & DS', 'Data Science', 'IoT', 'Software Systems', 'ECE', 'General'],
    domains: ['Software / IT'],
    coreSkills: ['Data Structures & Algorithms', 'Java', 'Python', 'C++', 'SQL', 'Git & GitHub', 'OOP', 'Operating Systems', 'DBMS'],
    industryRequirements: [
      { skill: 'Data Structures & Algorithms', level: 'Intermediate', weight: 25, category: 'Core CS', whyLearn: 'Essential for technical interview rounds and algorithmic problem solving.' },
      { skill: 'Java', level: 'Intermediate', weight: 20, category: 'Programming', whyLearn: 'Enterprise standard for backend services and scalable microservices.' },
      { skill: 'Python', level: 'Intermediate', weight: 15, category: 'Programming', whyLearn: 'Widely used for backend scripting, automation, and API development.' },
      { skill: 'SQL', level: 'Intermediate', weight: 15, category: 'Databases', whyLearn: 'Crucial for querying relational databases, transaction handling, and schema optimization.' },
      { skill: 'Git & GitHub', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Standard version control for modern distributed engineering teams.' },
      { skill: 'Operating Systems', level: 'Intermediate', weight: 10, category: 'Core CS', whyLearn: 'Fundamental for understanding concurrency, memory management, and process lifecycle.' }
    ]
  },
  {
    id: 'role_fullstack',
    title: 'Full Stack Developer',
    category: 'Software / IT',
    branches: ['CSE', 'IT', 'Software Systems', 'General'],
    domains: ['Software / IT', 'Cloud & DevOps'],
    coreSkills: ['JavaScript', 'React', 'Node.js', 'Web Development', 'SQL', 'MongoDB', 'Git & GitHub', 'REST APIs', 'HTML/CSS'],
    industryRequirements: [
      { skill: 'JavaScript', level: 'Advanced', weight: 25, category: 'Languages', whyLearn: 'Core language powering modern full-stack web architectures.' },
      { skill: 'React', level: 'Intermediate', weight: 20, category: 'Frontend', whyLearn: 'Industry standard for building dynamic, reactive single-page applications.' },
      { skill: 'Web Development', level: 'Intermediate', weight: 15, category: 'Web', whyLearn: 'Mastery of semantic HTML, responsive CSS, and DOM rendering.' },
      { skill: 'SQL', level: 'Intermediate', weight: 15, category: 'Databases', whyLearn: 'Schema design, normalization, joins, and indexing.' },
      { skill: 'Git & GitHub', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Collaborative development and automated deployment workflows.' },
      { skill: 'REST APIs', level: 'Intermediate', weight: 10, category: 'Backend', whyLearn: 'Architecting secure, stateless RESTful client-server contracts.' }
    ]
  },
  {
    id: 'role_frontend',
    title: 'Frontend Developer',
    category: 'Software / IT',
    branches: ['CSE', 'IT', 'Software Systems', 'General'],
    domains: ['Software / IT'],
    coreSkills: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Web Development', 'Git & GitHub', 'Tailwind CSS'],
    industryRequirements: [
      { skill: 'JavaScript', level: 'Advanced', weight: 30, category: 'Languages', whyLearn: 'Deep understanding of closures, event loop, promises, and modern ES6+.' },
      { skill: 'React', level: 'Advanced', weight: 25, category: 'Frontend', whyLearn: 'Component lifecycle, hooks, state management, and virtual DOM diffing.' },
      { skill: 'HTML/CSS', level: 'Advanced', weight: 20, category: 'Styling', whyLearn: 'Responsive flexbox, grid, animations, and cross-browser accessibility.' },
      { skill: 'Git & GitHub', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Team version control and PR code reviews.' },
      { skill: 'Web Development', level: 'Intermediate', weight: 10, category: 'Web', whyLearn: 'Web performance, Core Web Vitals, and browser caching.' }
    ]
  },
  {
    id: 'role_backend',
    title: 'Backend Developer',
    category: 'Software / IT',
    branches: ['CSE', 'IT', 'Software Systems', 'General'],
    domains: ['Software / IT', 'Cloud & DevOps'],
    coreSkills: ['Java', 'Python', 'SQL', 'DBMS', 'REST APIs', 'Data Structures & Algorithms', 'Operating Systems', 'Docker'],
    industryRequirements: [
      { skill: 'Java', level: 'Advanced', weight: 25, category: 'Programming', whyLearn: 'Primary language for enterprise microservices and high-concurrency servers.' },
      { skill: 'SQL', level: 'Advanced', weight: 25, category: 'Databases', whyLearn: 'Query optimization, transactions, ACID compliance, and indexing.' },
      { skill: 'DBMS', level: 'Intermediate', weight: 20, category: 'Core CS', whyLearn: 'Relational data modeling, concurrency control, and storage engines.' },
      { skill: 'Data Structures & Algorithms', level: 'Intermediate', weight: 15, category: 'Core CS', whyLearn: 'Optimized server-side execution and memory efficiency.' },
      { skill: 'Operating Systems', level: 'Intermediate', weight: 15, category: 'Core CS', whyLearn: 'Multithreading, networking sockets, and I/O multiplexing.' }
    ]
  },
  {
    id: 'role_data_analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    branches: ['CSE', 'IT', 'AI & DS', 'Data Science', 'General'],
    domains: ['Data & Analytics', 'Software / IT'],
    coreSkills: ['SQL', 'Python', 'Excel Modeling', 'PowerBI & Tableau', 'Data Science', 'DBMS'],
    industryRequirements: [
      { skill: 'SQL', level: 'Advanced', weight: 35, category: 'Databases', whyLearn: 'Aggregations, window functions, CTEs, and data extraction.' },
      { skill: 'Python', level: 'Intermediate', weight: 25, category: 'Programming', whyLearn: 'Exploratory data analysis with Pandas, NumPy, and visualization libraries.' },
      { skill: 'PowerBI & Tableau', level: 'Intermediate', weight: 20, category: 'Analytics', whyLearn: 'Executive dashboards, KPI tracking, and data storytelling.' },
      { skill: 'DBMS', level: 'Intermediate', weight: 20, category: 'Databases', whyLearn: 'Data warehousing concepts, star schemas, and ETL workflows.' }
    ]
  },
  {
    id: 'role_data_scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    branches: ['AI & DS', 'Data Science', 'CSE', 'IT', 'General'],
    domains: ['Data & Analytics', 'AI & Machine Learning', 'Research & Development'],
    coreSkills: ['Python', 'SQL', 'Machine Learning', 'Data Science', 'Pandas & NumPy', 'R', 'Data Structures & Algorithms'],
    industryRequirements: [
      { skill: 'Python', level: 'Advanced', weight: 30, category: 'Programming', whyLearn: 'Standard language for predictive modeling, statistics, and machine learning.' },
      { skill: 'Machine Learning', level: 'Intermediate', weight: 25, category: 'AI/ML', whyLearn: 'Supervised/unsupervised algorithms, evaluation metrics, and feature engineering.' },
      { skill: 'SQL', level: 'Intermediate', weight: 20, category: 'Databases', whyLearn: 'Querying massive analytical datasets and data warehouses.' },
      { skill: 'Pandas & NumPy', level: 'Advanced', weight: 15, category: 'Analytics', whyLearn: 'High-performance vector operations and matrix manipulations.' },
      { skill: 'Data Science', level: 'Intermediate', weight: 10, category: 'Analytics', whyLearn: 'Statistical hypothesis testing, probability distributions, and A/B testing.' }
    ]
  },
  {
    id: 'role_aiml',
    title: 'AI/ML Engineer',
    category: 'AI & Machine Learning',
    branches: ['AI & ML', 'AI & DS', 'CSE', 'IT', 'Robotics', 'General'],
    domains: ['AI & Machine Learning', 'Data & Analytics', 'Research & Development'],
    coreSkills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Data Structures & Algorithms', 'SQL', 'Pandas & NumPy'],
    industryRequirements: [
      { skill: 'Python', level: 'Advanced', weight: 20, category: 'Programming', whyLearn: 'The indispensable language for AI/ML development and library integration.' },
      { skill: 'Machine Learning', level: 'Advanced', weight: 20, category: 'AI/ML', whyLearn: 'Supervised/unsupervised algorithms, evaluation metrics, and model optimization.' },
      { skill: 'Deep Learning', level: 'Intermediate', weight: 15, category: 'AI/ML', whyLearn: 'Convolutional neural networks, transformer architectures, and backpropagation.' },
      { skill: 'TensorFlow', level: 'Intermediate', weight: 15, category: 'AI/ML', whyLearn: 'Industry production model training, neural network graphs, and deployment.' },
      { skill: 'NumPy', level: 'Intermediate', weight: 10, category: 'Data', whyLearn: 'High-performance n-dimensional array computing and matrix math.' },
      { skill: 'Pandas', level: 'Intermediate', weight: 10, category: 'Data', whyLearn: 'Data wrangling, feature engineering, and tabular dataset manipulation.' },
      { skill: 'SQL', level: 'Intermediate', weight: 10, category: 'Databases', whyLearn: 'Dataset feature extraction and relational database querying.' }
    ]
  },
  {
    id: 'role_cybersecurity',
    title: 'Cybersecurity Engineer',
    category: 'Cybersecurity',
    branches: ['Cybersecurity', 'CSE', 'IT', 'ECE', 'General'],
    domains: ['Cybersecurity', 'Cloud & DevOps'],
    coreSkills: ['Cybersecurity', 'Computer Networks', 'Operating Systems', 'Linux / Unix', 'Cryptography', 'Python'],
    industryRequirements: [
      { skill: 'Cybersecurity', level: 'Advanced', weight: 30, category: 'Security', whyLearn: 'Vulnerability assessment, threat modeling, and defense architectures.' },
      { skill: 'Computer Networks', level: 'Advanced', weight: 25, category: 'Core CS', whyLearn: 'Deep understanding of TCP/IP, OSI layers, DNS, firewalls, and routing protocols.' },
      { skill: 'Operating Systems', level: 'Intermediate', weight: 20, category: 'Core CS', whyLearn: 'System internals, kernel security, privilege escalation, and access controls.' },
      { skill: 'Linux / Unix', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Command line fluency, permissions, security auditing, and server hardening.' },
      { skill: 'Python', level: 'Intermediate', weight: 10, category: 'Programming', whyLearn: 'Security automation, packet parsing, and forensic scripting.' }
    ]
  },
  {
    id: 'role_cloud',
    title: 'Cloud Engineer',
    category: 'Cloud & DevOps',
    branches: ['CSE', 'IT', 'IoT & Cloud', 'General'],
    domains: ['Cloud & DevOps', 'Software / IT'],
    coreSkills: ['Cloud Computing', 'AWS', 'Docker', 'Linux / Unix', 'Computer Networks', 'Git & GitHub'],
    industryRequirements: [
      { skill: 'Cloud Computing', level: 'Advanced', weight: 30, category: 'Cloud', whyLearn: 'Core architectures, IAM policies, virtual private clouds, and compute clusters.' },
      { skill: 'Docker', level: 'Intermediate', weight: 25, category: 'DevOps', whyLearn: 'Microservices containerization, multi-stage builds, and container registries.' },
      { skill: 'Linux / Unix', level: 'Intermediate', weight: 20, category: 'Tools', whyLearn: 'Production server administration, shell automation, and networking config.' },
      { skill: 'Computer Networks', level: 'Intermediate', weight: 15, category: 'Core CS', whyLearn: 'Subnetting, routing tables, CIDR blocks, and load balancing.' },
      { skill: 'Git & GitHub', level: 'Intermediate', weight: 10, category: 'Tools', whyLearn: 'Infrastructure as Code deployment strategies and automated workflows.' }
    ]
  },
  {
    id: 'role_devops',
    title: 'DevOps Engineer',
    category: 'Cloud & DevOps',
    branches: ['CSE', 'IT', 'Software Systems', 'General'],
    domains: ['Cloud & DevOps', 'Software / IT'],
    coreSkills: ['Docker', 'Kubernetes', 'Linux / Unix', 'Git & GitHub', 'Cloud Computing', 'CI/CD Pipelines', 'Python'],
    industryRequirements: [
      { skill: 'Docker', level: 'Advanced', weight: 25, category: 'DevOps', whyLearn: 'Containerization standards, lightweight deployment packaging, and volume mapping.' },
      { skill: 'Linux / Unix', level: 'Advanced', weight: 25, category: 'Tools', whyLearn: 'System automation, cron scheduling, monitoring, and kernel configuration.' },
      { skill: 'Cloud Computing', level: 'Intermediate', weight: 20, category: 'Cloud', whyLearn: 'Scalable infrastructure provisioning and managed cloud services.' },
      { skill: 'Git & GitHub', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Automated CI/CD triggers, release management, and version control.' },
      { skill: 'Computer Networks', level: 'Intermediate', weight: 15, category: 'Core CS', whyLearn: 'DNS, SSL/TLS certificates, reverse proxies, and VPC peering.' }
    ]
  },
  {
    id: 'role_dba',
    title: 'Database Administrator',
    category: 'Software / IT',
    branches: ['CSE', 'IT', 'Software Systems', 'General'],
    domains: ['Software / IT', 'Data & Analytics'],
    coreSkills: ['SQL', 'DBMS', 'Operating Systems', 'Linux / Unix', 'Python'],
    industryRequirements: [
      { skill: 'SQL', level: 'Advanced', weight: 35, category: 'Databases', whyLearn: 'High-throughput query tuning, indexing execution plans, and storage optimization.' },
      { skill: 'DBMS', level: 'Advanced', weight: 35, category: 'Core CS', whyLearn: 'High availability, replication, backup recovery, clustering, and shard balancing.' },
      { skill: 'Operating Systems', level: 'Intermediate', weight: 15, category: 'Core CS', whyLearn: 'Disk I/O latency, memory allocation, and swap configuration.' },
      { skill: 'Linux / Unix', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Server maintenance, automated cron backups, and security auditing.' }
    ]
  },
  {
    id: 'role_qa',
    title: 'QA/Test Engineer',
    category: 'Software / IT',
    branches: ['CSE', 'IT', 'Software Systems', 'General'],
    domains: ['Software / IT'],
    coreSkills: ['Java', 'Python', 'SQL', 'Git & GitHub', 'Web Development'],
    industryRequirements: [
      { skill: 'Java', level: 'Intermediate', weight: 25, category: 'Programming', whyLearn: 'Selenium automation framework and test automation architecture.' },
      { skill: 'Python', level: 'Intermediate', weight: 25, category: 'Programming', whyLearn: 'API automation testing with PyTest and request libraries.' },
      { skill: 'SQL', level: 'Intermediate', weight: 20, category: 'Databases', whyLearn: 'Backend test data validation and database consistency checks.' },
      { skill: 'Git & GitHub', level: 'Intermediate', weight: 15, category: 'Tools', whyLearn: 'Integrating automated test suites into CI/CD build pipelines.' },
      { skill: 'Web Development', level: 'Intermediate', weight: 15, category: 'Web', whyLearn: 'DOM element locators, XPath, and responsive cross-browser testing.' }
    ]
  },

  // ==================== ECE / VLSI / EMBEDDED ====================
  {
    id: 'role_vlsi',
    title: 'VLSI Design Engineer',
    category: 'VLSI / Semiconductor',
    branches: ['ECE', 'ETC', 'EEE', 'General'],
    domains: ['VLSI / Semiconductor', 'Hardware / Electronics'],
    coreSkills: ['Digital Electronics', 'VLSI', 'Verilog', 'SystemVerilog', 'RTL Design', 'FPGA', 'Analog Electronics'],
    industryRequirements: [
      { skill: 'Digital Electronics', level: 'Advanced', weight: 25, category: 'Electronics', whyLearn: 'Karnaugh maps, sequential/combinational logic, flip-flops, and setup/hold timing.' },
      { skill: 'VLSI', level: 'Advanced', weight: 25, category: 'Hardware', whyLearn: 'CMOS technology, layout rules, stick diagrams, and physical synthesis.' },
      { skill: 'Verilog', level: 'Advanced', weight: 25, category: 'Hardware', whyLearn: 'Hardware description language for synthesizeable RTL implementation.' },
      { skill: 'SystemVerilog', level: 'Intermediate', weight: 15, category: 'Hardware', whyLearn: 'Industry standard for advanced verification and OOP testbenches.' },
      { skill: 'RTL Design', level: 'Intermediate', weight: 10, category: 'Hardware', whyLearn: 'Register transfer level architecture and clock domain crossing mitigation.' }
    ]
  },
  {
    id: 'role_rtl',
    title: 'RTL Design Engineer',
    category: 'VLSI / Semiconductor',
    branches: ['ECE', 'ETC', 'EEE', 'General'],
    domains: ['VLSI / Semiconductor', 'Hardware / Electronics'],
    coreSkills: ['RTL Design', 'Verilog', 'SystemVerilog', 'Digital Electronics', 'FPGA', 'VLSI'],
    industryRequirements: [
      { skill: 'RTL Design', level: 'Advanced', weight: 30, category: 'Hardware', whyLearn: 'Microarchitecture specification, finite state machines, and pipelined datapaths.' },
      { skill: 'Verilog', level: 'Advanced', weight: 25, category: 'Hardware', whyLearn: 'Writing robust synthesizeable RTL code adhering to design rules.' },
      { skill: 'Digital Electronics', level: 'Advanced', weight: 20, category: 'Electronics', whyLearn: 'Timing closure, critical path minimization, and race condition prevention.' },
      { skill: 'FPGA', level: 'Intermediate', weight: 15, category: 'Hardware', whyLearn: 'Prototyping designs on Xilinx/Altera FPGA boards before tape-out.' },
      { skill: 'VLSI', level: 'Intermediate', weight: 10, category: 'Hardware', whyLearn: 'Understanding ASIC physical flow from gate-level netlists to GDSII.' }
    ]
  },
  {
    id: 'role_verification',
    title: 'Verification Engineer',
    category: 'VLSI / Semiconductor',
    branches: ['ECE', 'ETC', 'CSE', 'General'],
    domains: ['VLSI / Semiconductor', 'Hardware / Electronics'],
    coreSkills: ['SystemVerilog', 'Verilog', 'Digital Electronics', 'VLSI', 'C++', 'Python'],
    industryRequirements: [
      { skill: 'SystemVerilog', level: 'Advanced', weight: 35, category: 'Hardware', whyLearn: 'Universal Verification Methodology (UVM), assertions, and coverage-driven testbenches.' },
      { skill: 'Digital Electronics', level: 'Intermediate', weight: 25, category: 'Electronics', whyLearn: 'Understanding bus protocols (AXI, AHB, APB) and timing specs.' },
      { skill: 'Verilog', level: 'Intermediate', weight: 20, category: 'Hardware', whyLearn: 'Evaluating RTL code correctness and debugging functional simulation failures.' },
      { skill: 'Python', level: 'Intermediate', weight: 10, category: 'Programming', whyLearn: 'Automating regression suites and simulation log parsers.' },
      { skill: 'VLSI', level: 'Intermediate', weight: 10, category: 'Hardware', whyLearn: 'ASIC validation lifecycle and defect-free silicon sign-off.' }
    ]
  },
  {
    id: 'role_embedded',
    title: 'Embedded Systems Engineer',
    category: 'Hardware / Electronics',
    branches: ['ECE', 'EEE', 'ETC', 'CSE', 'IoT', 'Robotics', 'General'],
    domains: ['Hardware / Electronics', 'Automotive', 'Robotics & Automation', 'IoT'],
    coreSkills: ['Embedded C', 'Microcontrollers', 'C', 'Embedded Systems', 'Digital Electronics', 'IoT', 'PCB Design'],
    industryRequirements: [
      { skill: 'Embedded C', level: 'Advanced', weight: 30, category: 'Programming', whyLearn: 'Direct register manipulation, interrupts, timers, and bare-metal programming.' },
      { skill: 'Microcontrollers', level: 'Advanced', weight: 25, category: 'Hardware', whyLearn: 'ARM Cortex-M, STM32, ESP32, and AVR peripheral configuration.' },
      { skill: 'Embedded Systems', level: 'Intermediate', weight: 20, category: 'Hardware', whyLearn: 'UART, SPI, I2C communication protocols and RTOS task scheduling.' },
      { skill: 'Digital Electronics', level: 'Intermediate', weight: 15, category: 'Electronics', whyLearn: 'Interfacing sensors, logic level shifters, and motor drivers.' },
      { skill: 'C', level: 'Intermediate', weight: 10, category: 'Programming', whyLearn: 'Pointers, bitwise operations, memory safety, and modular header structuring.' }
    ]
  },
  {
    id: 'role_fpga',
    title: 'FPGA Engineer',
    category: 'Hardware / Electronics',
    branches: ['ECE', 'ETC', 'EEE', 'General'],
    domains: ['Hardware / Electronics', 'VLSI / Semiconductor', 'Telecommunications'],
    coreSkills: ['FPGA', 'Verilog', 'VHDL', 'Digital Electronics', 'RTL Design', 'C'],
    industryRequirements: [
      { skill: 'FPGA', level: 'Advanced', weight: 35, category: 'Hardware', whyLearn: 'Vivado/Quartus toolchains, bitstream generation, timing constraints, and pin placement.' },
      { skill: 'Verilog', level: 'Advanced', weight: 25, category: 'Hardware', whyLearn: 'Writing synthesizeable RTL tailored for FPGA look-up tables (LUTs) and DSP blocks.' },
      { skill: 'Digital Electronics', level: 'Intermediate', weight: 20, category: 'Electronics', whyLearn: 'Clock tree synthesis, setup/hold slack analysis, and metastability resolution.' },
      { skill: 'RTL Design', level: 'Intermediate', weight: 20, category: 'Hardware', whyLearn: 'Pipelining high-speed digital signal processing algorithms.' }
    ]
  },
  {
    id: 'role_hardware',
    title: 'Hardware Engineer',
    category: 'Hardware / Electronics',
    branches: ['ECE', 'EEE', 'ETC', 'General'],
    domains: ['Hardware / Electronics', 'Automotive', 'Manufacturing'],
    coreSkills: ['PCB Design', 'Digital Electronics', 'Analog Electronics', 'Circuit Analysis', 'Microcontrollers'],
    industryRequirements: [
      { skill: 'PCB Design', level: 'Advanced', weight: 30, category: 'Hardware', whyLearn: 'Schematic capture, multi-layer routing, impedance matching, and Gerber generation.' },
      { skill: 'Analog Electronics', level: 'Intermediate', weight: 25, category: 'Electronics', whyLearn: 'Op-amp circuits, power regulators, filtering, and ADC/DAC converters.' },
      { skill: 'Digital Electronics', level: 'Intermediate', weight: 25, category: 'Electronics', whyLearn: 'High-speed signal integrity, logic gates, and bus terminations.' },
      { skill: 'Circuit Analysis', level: 'Intermediate', weight: 20, category: 'Electrical', whyLearn: "Ohm's Law, Kirchhoff's Laws, AC/DC analysis, and transient response." }
    ]
  },
  {
    id: 'role_iot',
    title: 'IoT Engineer',
    category: 'Hardware / Electronics',
    branches: ['IoT', 'ECE', 'CSE', 'IT', 'EEE', 'General'],
    domains: ['Hardware / Electronics', 'Cloud & DevOps', 'Software / IT'],
    coreSkills: ['IoT', 'Microcontrollers', 'Python', 'C', 'Cloud Computing', 'Computer Networks'],
    industryRequirements: [
      { skill: 'IoT', level: 'Advanced', weight: 30, category: 'Hardware', whyLearn: 'MQTT/CoAP protocols, edge sensors, low-power BLE/Zigbee networks, and gateway design.' },
      { skill: 'Microcontrollers', level: 'Intermediate', weight: 25, category: 'Hardware', whyLearn: 'Programming ESP32/NodeMCU boards for telemetry collection and actuation.' },
      { skill: 'Python', level: 'Intermediate', weight: 20, category: 'Programming', whyLearn: 'Data aggregation scripts and edge computer programming (Raspberry Pi).' },
      { skill: 'Cloud Computing', level: 'Intermediate', weight: 15, category: 'Cloud', whyLearn: 'AWS IoT Core, Azure IoT Hub, and serverless data storage ingestion.' },
      { skill: 'Computer Networks', level: 'Intermediate', weight: 10, category: 'Core CS', whyLearn: 'IP addressing, socket connections, and wireless network security.' }
    ]
  },
  {
    id: 'role_semiconductor',
    title: 'Semiconductor Engineer',
    category: 'VLSI / Semiconductor',
    branches: ['ECE', 'EEE', 'Materials', 'General'],
    domains: ['VLSI / Semiconductor', 'Manufacturing', 'Research & Development'],
    coreSkills: ['VLSI', 'Analog Electronics', 'Digital Electronics', 'Materials Science', 'Circuit Analysis'],
    industryRequirements: [
      { skill: 'VLSI', level: 'Advanced', weight: 35, category: 'Hardware', whyLearn: 'Wafer fabrication flow, photolithography, ion implantation, and cleanroom processes.' },
      { skill: 'Analog Electronics', level: 'Intermediate', weight: 25, category: 'Electronics', whyLearn: 'Semiconductor physics, PN junction diodes, MOSFET characteristics, and bandgaps.' },
      { skill: 'Digital Electronics', level: 'Intermediate', weight: 20, category: 'Electronics', whyLearn: 'Standard cell design, parasitics, and device power dissipation.' },
      { skill: 'Circuit Analysis', level: 'Intermediate', weight: 20, category: 'Electrical', whyLearn: 'Device modeling, parameter extraction, and yield optimization.' }
    ]
  },

  // ==================== EEE / ELECTRICAL ====================
  {
    id: 'role_electrical',
    title: 'Electrical Engineer',
    category: 'Energy & Power',
    branches: ['EEE', 'Electrical', 'Instrumentation', 'General'],
    domains: ['Energy & Power', 'Core Engineering', 'Manufacturing'],
    coreSkills: ['Circuit Analysis', 'Electrical Machines', 'Power Systems', 'Control Systems', 'MATLAB/Simulink'],
    industryRequirements: [
      { skill: 'Circuit Analysis', level: 'Advanced', weight: 30, category: 'Electrical', whyLearn: 'Three-phase systems, power factor correction, impedance calculations, and network theorems.' },
      { skill: 'Electrical Machines', level: 'Advanced', weight: 25, category: 'Electrical', whyLearn: 'Transformers, induction motors, synchronous generators, and DC machines.' },
      { skill: 'Power Systems', level: 'Intermediate', weight: 20, category: 'Electrical', whyLearn: 'Generation, transmission line parameters, fault calculations, and switchgear.' },
      { skill: 'Control Systems', level: 'Intermediate', weight: 15, category: 'Electrical', whyLearn: 'Feedback loops, Bode plots, transfer functions, and stability criteria.' },
      { skill: 'MATLAB/Simulink', level: 'Intermediate', weight: 10, category: 'Tools', whyLearn: 'Simulating electrical circuits, dynamic response, and power transients.' }
    ]
  },
  {
    id: 'role_power_systems',
    title: 'Power Systems Engineer',
    category: 'Energy & Power',
    branches: ['EEE', 'Electrical', 'General'],
    domains: ['Energy & Power', 'Core Engineering'],
    coreSkills: ['Power Systems', 'Electrical Machines', 'Circuit Analysis', 'Renewable Energy', 'MATLAB/Simulink'],
    industryRequirements: [
      { skill: 'Power Systems', level: 'Advanced', weight: 35, category: 'Electrical', whyLearn: 'Load flow analysis, symmetrical components, relay coordination, and grid stability.' },
      { skill: 'Electrical Machines', level: 'Intermediate', weight: 25, category: 'Electrical', whyLearn: 'Synchronous alternator operation, reactive power management, and turbine dynamics.' },
      { skill: 'Circuit Analysis', level: 'Intermediate', weight: 20, category: 'Electrical', whyLearn: 'High voltage AC/DC transmission calculations and corona losses.' },
      { skill: 'Renewable Energy', level: 'Intermediate', weight: 20, category: 'Energy', whyLearn: 'Solar photovoltaic grids, wind farm inverters, and grid code compliance.' }
    ]
  },
  {
    id: 'role_control_systems',
    title: 'Control Systems Engineer',
    category: 'Energy & Power',
    branches: ['EEE', 'Instrumentation', 'ECE', 'Mechanical', 'General'],
    domains: ['Robotics & Automation', 'Core Engineering', 'Energy & Power'],
    coreSkills: ['Control Systems', 'MATLAB/Simulink', 'PLC', 'SCADA', 'Circuit Analysis'],
    industryRequirements: [
      { skill: 'Control Systems', level: 'Advanced', weight: 35, category: 'Electrical', whyLearn: 'PID tuning, state-space representations, root locus, and Kalman filtering.' },
      { skill: 'MATLAB/Simulink', level: 'Advanced', weight: 25, category: 'Tools', whyLearn: 'Dynamic system modeling, feedback controller simulation, and automated code gen.' },
      { skill: 'PLC', level: 'Intermediate', weight: 20, category: 'Automation', whyLearn: 'Ladder logic programming for industrial sensors and actuator automation.' },
      { skill: 'SCADA', level: 'Intermediate', weight: 20, category: 'Automation', whyLearn: 'HMI visual interfaces, telemetry data logging, and industrial alarming.' }
    ]
  },
  {
    id: 'role_power_electronics',
    title: 'Power Electronics Engineer',
    category: 'Energy & Power',
    branches: ['EEE', 'ECE', 'Automobile', 'General'],
    domains: ['Energy & Power', 'Automotive', 'Hardware / Electronics'],
    coreSkills: ['Power Electronics', 'Circuit Analysis', 'Analog Electronics', 'EV Technology', 'MATLAB/Simulink'],
    industryRequirements: [
      { skill: 'Power Electronics', level: 'Advanced', weight: 35, category: 'Electrical', whyLearn: 'DC-DC converters (Buck/Boost), inverters, rectifiers, MOSFET/IGBT switching losses.' },
      { skill: 'Circuit Analysis', level: 'Advanced', weight: 25, category: 'Electrical', whyLearn: 'Magnetics design (inductors/transformers), EMI filtering, and thermal dissipation.' },
      { skill: 'Analog Electronics', level: 'Intermediate', weight: 20, category: 'Electronics', whyLearn: 'Gate driver circuits, current sense amplifiers, and PWM modulation techniques.' },
      { skill: 'EV Technology', level: 'Intermediate', weight: 20, category: 'Automotive', whyLearn: 'On-board chargers (OBC), DC fast charging standards, and inverter motor drives.' }
    ]
  },
  {
    id: 'role_ev',
    title: 'EV Engineer',
    category: 'Automotive',
    branches: ['EEE', 'Automobile', 'Mechanical', 'ECE', 'General'],
    domains: ['Automotive', 'Energy & Power', 'Core Engineering'],
    coreSkills: ['EV Technology', 'Power Electronics', 'Electrical Machines', 'Battery Management Systems (BMS)', 'MATLAB/Simulink'],
    industryRequirements: [
      { skill: 'EV Technology', level: 'Advanced', weight: 35, category: 'Automotive', whyLearn: 'Electric vehicle powertrain architecture, regenerative braking, and lithium battery chemistry.' },
      { skill: 'Power Electronics', level: 'Intermediate', weight: 25, category: 'Electrical', whyLearn: 'Traction inverters, bidirectional converters, and motor speed controllers.' },
      { skill: 'Electrical Machines', level: 'Intermediate', weight: 20, category: 'Electrical', whyLearn: 'Permanent Magnet Synchronous Motors (PMSM) and induction motor drives.' },
      { skill: 'MATLAB/Simulink', level: 'Intermediate', weight: 20, category: 'Tools', whyLearn: 'Vehicle drive cycle simulations (WLTP, FTP75) and state-of-charge (SOC) estimation.' }
    ]
  },
  {
    id: 'role_renewable',
    title: 'Renewable Energy Engineer',
    category: 'Energy & Power',
    branches: ['EEE', 'Environmental', 'Mechanical', 'General'],
    domains: ['Energy & Power', 'Core Engineering'],
    coreSkills: ['Renewable Energy', 'Power Systems', 'Circuit Analysis', 'Power Electronics', 'MATLAB/Simulink'],
    industryRequirements: [
      { skill: 'Renewable Energy', level: 'Advanced', weight: 35, category: 'Energy', whyLearn: 'Solar photovoltaic array sizing, MPPT algorithms, wind turbine aerodynamics, and energy storage.' },
      { skill: 'Power Systems', level: 'Intermediate', weight: 25, category: 'Electrical', whyLearn: 'Grid synchronization, islanding detection, and renewable penetration limits.' },
      { skill: 'Power Electronics', level: 'Intermediate', weight: 20, category: 'Electrical', whyLearn: 'Grid-tied solar inverters, active filters, and harmonic reduction.' },
      { skill: 'Circuit Analysis', level: 'Intermediate', weight: 20, category: 'Electrical', whyLearn: 'DC wiring drop calculations, protection fuses, and earthing design.' }
    ]
  },
  {
    id: 'role_plc_scada',
    title: 'PLC/SCADA Engineer',
    category: 'Robotics & Automation',
    branches: ['EEE', 'Instrumentation', 'Mechanical', 'General'],
    domains: ['Robotics & Automation', 'Manufacturing', 'Energy & Power'],
    coreSkills: ['PLC', 'SCADA', 'Control Systems', 'Circuit Analysis', 'Industrial Automation'],
    industryRequirements: [
      { skill: 'PLC', level: 'Advanced', weight: 40, category: 'Automation', whyLearn: 'Siemens/Allen-Bradley ladder logic, structured text, function block diagrams, and safety interlocks.' },
      { skill: 'SCADA', level: 'Advanced', weight: 30, category: 'Automation', whyLearn: 'Wonderware/WinCC HMI design, historical trend logging, alarm management, and OPC servers.' },
      { skill: 'Control Systems', level: 'Intermediate', weight: 15, category: 'Electrical', whyLearn: 'Closed-loop industrial process control, temperature PID loops, and valve actuators.' },
      { skill: 'Circuit Analysis', level: 'Intermediate', weight: 15, category: 'Electrical', whyLearn: '4-20mA current loops, relay wiring, digital input/output isolation, and panel schematics.' }
    ]
  },

  // ==================== MECHANICAL / AUTOMOTIVE / ROBOTICS ====================
  {
    id: 'role_mech_design',
    title: 'Mechanical Design Engineer',
    category: 'Core Engineering',
    branches: ['Mechanical', 'Automobile', 'Aerospace', 'General'],
    domains: ['Core Engineering', 'Manufacturing', 'Automotive'],
    coreSkills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'CATIA', 'Thermodynamics', 'Fluid Mechanics', 'Manufacturing', '3D Modelling'],
    industryRequirements: [
      { skill: 'SolidWorks', level: 'Advanced', weight: 30, category: 'Mechanical', whyLearn: 'Parametric 3D solid modeling, complex assemblies, sheet metal, and drawing standards.' },
      { skill: 'AutoCAD', level: 'Advanced', weight: 25, category: 'Mechanical', whyLearn: 'Geometric Dimensioning and Tolerancing (GD&T), orthographic projections, and shop drawings.' },
      { skill: 'ANSYS', level: 'Intermediate', weight: 20, category: 'Simulation', whyLearn: 'Finite element structural stress analysis (FEA), thermal distribution, and modal vibration.' },
      { skill: 'Manufacturing', level: 'Intermediate', weight: 15, category: 'Mechanical', whyLearn: 'Design for Manufacturing and Assembly (DFMA), casting, machining, and injection molding.' },
      { skill: 'Thermodynamics', level: 'Intermediate', weight: 10, category: 'Mechanical', whyLearn: 'Heat transfer, thermal expansion constraints, and energy efficiency calculations.' }
    ]
  },
  {
    id: 'role_cad',
    title: 'CAD Engineer',
    category: 'Core Engineering',
    branches: ['Mechanical', 'Civil', 'Automobile', 'General'],
    domains: ['Core Engineering', 'Construction', 'Manufacturing'],
    coreSkills: ['AutoCAD', 'SolidWorks', 'CATIA', '3D Modelling', 'Manufacturing'],
    industryRequirements: [
      { skill: 'AutoCAD', level: 'Advanced', weight: 35, category: 'Mechanical', whyLearn: 'Precision 2D engineering drafting, multi-layer drawing management, and revision standards.' },
      { skill: 'SolidWorks', level: 'Advanced', weight: 30, category: 'Mechanical', whyLearn: '3D feature creation, mating constraints, bill of materials (BOM), and exploded views.' },
      { skill: 'CATIA', level: 'Intermediate', weight: 20, category: 'Mechanical', whyLearn: 'Class-A surface modeling, aerodynamic curves, and aerospace component sculpting.' },
      { skill: 'Manufacturing', level: 'Intermediate', weight: 15, category: 'Mechanical', whyLearn: 'Tolerance stack-up analysis and standard machine tolerances.' }
    ]
  },
  {
    id: 'role_manufacturing',
    title: 'Manufacturing Engineer',
    category: 'Manufacturing',
    branches: ['Mechanical', 'Production', 'Industrial', 'General'],
    domains: ['Manufacturing', 'Core Engineering'],
    coreSkills: ['Manufacturing', 'CNC', 'CAD/CAM', 'SolidWorks', 'AutoCAD'],
    industryRequirements: [
      { skill: 'Manufacturing', level: 'Advanced', weight: 35, category: 'Mechanical', whyLearn: 'Lean manufacturing principles, Six Sigma, cycle time reduction, and plant layout.' },
      { skill: 'CNC', level: 'Advanced', weight: 25, category: 'Mechanical', whyLearn: 'G-code/M-code programming for 3-axis and 5-axis milling and turning centers.' },
      { skill: 'CAD/CAM', level: 'Intermediate', weight: 20, category: 'Mechanical', whyLearn: 'Mastercam toolpath generation, cutter speed/feed optimization, and post-processing.' },
      { skill: 'SolidWorks', level: 'Intermediate', weight: 20, category: 'Mechanical', whyLearn: 'Jig and fixture design to hold workpieces during mass machining operations.' }
    ]
  },
  {
    id: 'role_production',
    title: 'Production Engineer',
    category: 'Manufacturing',
    branches: ['Mechanical', 'Production', 'Industrial', 'General'],
    domains: ['Manufacturing', 'Core Engineering'],
    coreSkills: ['Manufacturing', 'CAD/CAM', 'AutoCAD', 'Industrial Engineering'],
    industryRequirements: [
      { skill: 'Manufacturing', level: 'Advanced', weight: 40, category: 'Mechanical', whyLearn: 'Material requirements planning (MRP), shop floor scheduling, and overall equipment effectiveness (OEE).' },
      { skill: 'AutoCAD', level: 'Intermediate', weight: 25, category: 'Mechanical', whyLearn: 'Production line assembly workflows and material handling routing maps.' },
      { skill: 'CAD/CAM', level: 'Intermediate', weight: 20, category: 'Mechanical', whyLearn: 'Evaluating tooling wear and component fabrication bottlenecks.' },
      { skill: 'SolidWorks', level: 'Intermediate', weight: 15, category: 'Mechanical', whyLearn: 'Inspection gauges and custom quality assurance fixture verification.' }
    ]
  },
  {
    id: 'role_automotive',
    title: 'Automotive Engineer',
    category: 'Automotive',
    branches: ['Automobile', 'Mechanical', 'General'],
    domains: ['Automotive', 'Core Engineering', 'Manufacturing'],
    coreSkills: ['CATIA', 'SolidWorks', 'ANSYS', 'Thermodynamics', 'Fluid Mechanics', 'EV Technology'],
    industryRequirements: [
      { skill: 'CATIA', level: 'Advanced', weight: 30, category: 'Mechanical', whyLearn: 'Automotive body-in-white (BIW) design, interior ergonomics, and surface styling.' },
      { skill: 'SolidWorks', level: 'Intermediate', weight: 25, category: 'Mechanical', whyLearn: 'Suspension geometry, steering links, braking systems, and chassis assembly.' },
      { skill: 'ANSYS', level: 'Intermediate', weight: 20, category: 'Simulation', whyLearn: 'Computational fluid dynamics (CFD) drag reduction and crash impact simulation.' },
      { skill: 'EV Technology', level: 'Intermediate', weight: 15, category: 'Automotive', whyLearn: 'Electric drive packaging, battery pack thermal management, and regenerative braking.' },
      { skill: 'Thermodynamics', level: 'Intermediate', weight: 10, category: 'Mechanical', whyLearn: 'Internal combustion/heat dissipation and automotive HVAC climate control.' }
    ]
  },
  {
    id: 'role_robotics',
    title: 'Robotics Engineer',
    category: 'Robotics & Automation',
    branches: ['Robotics', 'Mechatronics', 'Mechanical', 'ECE', 'CSE', 'General'],
    domains: ['Robotics & Automation', 'AI & Machine Learning', 'Hardware / Electronics'],
    coreSkills: ['Robotics', 'Python', 'C++', 'Control Systems', 'Microcontrollers', 'SolidWorks', 'ROS'],
    industryRequirements: [
      { skill: 'Robotics', level: 'Advanced', weight: 30, category: 'Robotics', whyLearn: 'Forward/inverse kinematics, path planning algorithms, and multi-axis manipulator dynamics.' },
      { skill: 'Python', level: 'Advanced', weight: 25, category: 'Programming', whyLearn: 'Robot Operating System (ROS) nodes, computer vision object detection, and motion script.' },
      { skill: 'C++', level: 'Intermediate', weight: 20, category: 'Programming', whyLearn: 'Real-time low-latency motor trajectory generation and sensor fusion algorithms.' },
      { skill: 'Control Systems', level: 'Intermediate', weight: 15, category: 'Electrical', whyLearn: 'Closed-loop servo feedback, PID tuning, and encoder position control.' },
      { skill: 'SolidWorks', level: 'Intermediate', weight: 10, category: 'Mechanical', whyLearn: 'Robot arm structural modeling, joint linkages, and actuator torque calculations.' }
    ]
  },

  // ==================== CIVIL / STRUCTURAL ====================
  {
    id: 'role_structural',
    title: 'Structural Engineer',
    category: 'Construction',
    branches: ['Civil', 'Structural', 'General'],
    domains: ['Construction', 'Core Engineering'],
    coreSkills: ['STAAD.Pro', 'Structural Analysis', 'AutoCAD', 'Revit', 'BIM', 'Construction Management'],
    industryRequirements: [
      { skill: 'STAAD.Pro', level: 'Advanced', weight: 35, category: 'Civil', whyLearn: '3D structural framing analysis, dead/live/wind/seismic load combinations to IS codes.' },
      { skill: 'Structural Analysis', level: 'Advanced', weight: 30, category: 'Civil', whyLearn: 'Bending moment/shear force diagrams, deflection checks, and reinforced concrete design.' },
      { skill: 'AutoCAD', level: 'Intermediate', weight: 20, category: 'Civil', whyLearn: 'Structural reinforcement detailing drawings, bar bending schedules, and foundation plans.' },
      { skill: 'Revit', level: 'Intermediate', weight: 15, category: 'Civil', whyLearn: 'Building Information Modeling (BIM) structural columns, beams, and clash detection.' }
    ]
  },
  {
    id: 'role_site',
    title: 'Site Engineer',
    category: 'Construction',
    branches: ['Civil', 'Construction', 'General'],
    domains: ['Construction', 'Core Engineering'],
    coreSkills: ['Construction Management', 'Surveying', 'AutoCAD', 'Structural Analysis'],
    industryRequirements: [
      { skill: 'Construction Management', level: 'Advanced', weight: 35, category: 'Civil', whyLearn: 'On-site execution, concrete pour monitoring, quality inspection, and contractor coordination.' },
      { skill: 'Surveying', level: 'Advanced', weight: 30, category: 'Civil', whyLearn: 'Total station operation, leveling, boundary demarcations, and foundation alignment.' },
      { skill: 'AutoCAD', level: 'Intermediate', weight: 20, category: 'Civil', whyLearn: 'Interpreting structural and architectural blueprints on-site accurately.' },
      { skill: 'Structural Analysis', level: 'Intermediate', weight: 15, category: 'Civil', whyLearn: 'Verifying rebar placement, lap lengths, and cover block compliance.' }
    ]
  },
  {
    id: 'role_construction',
    title: 'Construction Engineer',
    category: 'Construction',
    branches: ['Civil', 'Construction', 'General'],
    domains: ['Construction', 'Core Engineering', 'Manufacturing'],
    coreSkills: ['Construction Management', 'BIM', 'AutoCAD', 'Revit', 'Surveying'],
    industryRequirements: [
      { skill: 'Construction Management', level: 'Advanced', weight: 35, category: 'Civil', whyLearn: 'Project estimation, critical path method (CPM/PERT) scheduling, and safety compliance.' },
      { skill: 'BIM', level: 'Intermediate', weight: 25, category: 'Civil', whyLearn: '4D schedule simulation and 5D cost estimation integrated with 3D architectural models.' },
      { skill: 'AutoCAD', level: 'Intermediate', weight: 20, category: 'Civil', whyLearn: 'Site layout preparation, utility trenching schematics, and structural elevations.' },
      { skill: 'Revit', level: 'Intermediate', weight: 20, category: 'Civil', whyLearn: 'Coordinating multi-disciplinary MEP (mechanical, electrical, plumbing) models.' }
    ]
  },
  {
    id: 'role_transportation',
    title: 'Transportation Engineer',
    category: 'Construction',
    branches: ['Civil', 'General'],
    domains: ['Construction', 'Core Engineering'],
    coreSkills: ['Transportation Engineering', 'Surveying', 'AutoCAD', 'Construction Management'],
    industryRequirements: [
      { skill: 'Transportation Engineering', level: 'Advanced', weight: 40, category: 'Civil', whyLearn: 'Geometric highway design, horizontal/vertical curves, pavement thickness, and traffic volume studies.' },
      { skill: 'Surveying', level: 'Advanced', weight: 25, category: 'Civil', whyLearn: 'Longitudinal profile leveling, cross-section measurement, and earthwork cut/fill estimation.' },
      { skill: 'AutoCAD', level: 'Intermediate', weight: 20, category: 'Civil', whyLearn: 'Highway corridor plan and profile sheet production.' },
      { skill: 'Construction Management', level: 'Intermediate', weight: 15, category: 'Civil', whyLearn: 'Bituminous asphalt compaction standards and sub-base quality assurance.' }
    ]
  },
  {
    id: 'role_geotechnical',
    title: 'Geotechnical Engineer',
    category: 'Construction',
    branches: ['Civil', 'General'],
    domains: ['Construction', 'Core Engineering'],
    coreSkills: ['Geotechnical Engineering', 'Structural Analysis', 'AutoCAD'],
    industryRequirements: [
      { skill: 'Geotechnical Engineering', level: 'Advanced', weight: 45, category: 'Civil', whyLearn: 'Soil bearing capacity, standard penetration tests (SPT), pile foundation design, and slope stability.' },
      { skill: 'Structural Analysis', level: 'Intermediate', weight: 30, category: 'Civil', whyLearn: 'Earth retaining wall pressures, deep basement shoring, and raft foundation stresses.' },
      { skill: 'AutoCAD', level: 'Intermediate', weight: 25, category: 'Civil', whyLearn: 'Borehole log charting and subsurface soil profile drafting.' }
    ]
  },
  {
    id: 'role_environmental',
    title: 'Environmental Engineer',
    category: 'Construction',
    branches: ['Civil', 'Environmental', 'Chemical', 'General'],
    domains: ['Construction', 'Energy & Power', 'Core Engineering'],
    coreSkills: ['Environmental Engineering', 'Water & Wastewater Treatment', 'AutoCAD', 'Fluid Mechanics'],
    industryRequirements: [
      { skill: 'Environmental Engineering', level: 'Advanced', weight: 40, category: 'Civil', whyLearn: 'Environmental impact assessment (EIA), air quality modeling, and hazardous waste management.' },
      { skill: 'Water & Wastewater Treatment', level: 'Advanced', weight: 30, category: 'Civil', whyLearn: 'Effluent treatment plant (ETP) design, sedimentation basins, and biological aeration.' },
      { skill: 'AutoCAD', level: 'Intermediate', weight: 15, category: 'Civil', whyLearn: 'Piping and instrumentation diagrams (P&ID) for water supply schemes.' },
      { skill: 'Fluid Mechanics', level: 'Intermediate', weight: 15, category: 'Core Eng', whyLearn: 'Pipe friction head loss, hydraulic gradient lines, and pump selection.' }
    ]
  }
];

/**
 * Categorized Skills Library covering all Engineering Disciplines
 */
export const CATEGORIZED_SKILLS = {
  'Programming Languages': [
    'C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'C#', 'SQL', 'MATLAB', 'R', 'Go', 'Rust'
  ],
  'Computer Science & Core IT': [
    'Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP', 
    'Git & GitHub', 'Web Development', 'Cloud Computing', 'AI & Machine Learning', 'Data Science', 
    'Cybersecurity', 'System Design', 'REST APIs', 'Linux / Unix', 'Docker', 'Kubernetes'
  ],
  'Electronics & VLSI': [
    'Digital Electronics', 'Analog Electronics', 'VLSI', 'Verilog', 'SystemVerilog', 'FPGA', 
    'RTL Design', 'PCB Design', 'Embedded Systems', 'Microcontrollers', 'IoT', 'Embedded C', 
    'Static Timing Analysis (STA)', 'ASIC Design', 'Circuit Analysis'
  ],
  'Electrical & Power Systems': [
    'Circuit Analysis', 'Electrical Machines', 'Power Systems', 'Power Electronics', 'Control Systems', 
    'MATLAB/Simulink', 'PLC', 'SCADA', 'Renewable Energy', 'EV Technology', 'High Voltage Engineering', 
    'Battery Management Systems (BMS)'
  ],
  'Mechanical & CAD/CAM': [
    'AutoCAD', 'SolidWorks', 'CATIA', 'ANSYS', 'CAD/CAM', 'CNC', 'Thermodynamics', 
    'Fluid Mechanics', 'Manufacturing', 'Robotics', '3D Modelling', 'Mechatronics', 'Finite Element Analysis (FEA)'
  ],
  'Civil & Structural': [
    'AutoCAD', 'STAAD.Pro', 'Revit', 'BIM', 'Structural Analysis', 'Surveying', 
    'Construction Management', 'Geotechnical Engineering', 'Transportation Engineering', 
    'Environmental Engineering', 'Water & Wastewater Treatment'
  ],
  'Analytics & Data Science': [
    'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Pandas & NumPy', 
    'PowerBI & Tableau', 'Excel Modeling', 'Computer Vision', 'Natural Language Processing (NLP)'
  ],
  'Professional & Tools': [
    'Git & GitHub', 'Linux / Unix', 'Docker', 'AWS', 'Communication & STAR', 
    'Problem Solving', 'Team Collaboration', 'Time Management'
  ]
};

/**
 * Returns a flat list of all engineering skills (deduplicated)
 */
export function getAllEngineeringSkills() {
  const set = new Set();
  Object.values(CATEGORIZED_SKILLS).forEach(list => {
    list.forEach(skill => set.add(skill));
  });
  return Array.from(set).sort();
}

/**
 * Determines relevant roles based on the student's selected branch AND target domains
 */
export function getAvailableRoles(branchName = '', selectedDomains = []) {
  const b = branchName.toLowerCase();

  // Primary branch match tokens
  const isCSE = b.includes('computer') || b.includes('information') || b.includes('software');
  const isAI = b.includes('intelligence') || b.includes('data science') || b.includes('ai &');
  const isCyber = b.includes('cybersecurity');
  const isECE = b.includes('electronics & communication') || b.includes('telecommunication') || b.includes('etc');
  const isEEE = b.includes('electrical');
  const isMech = b.includes('mechanical') || b.includes('production') || b.includes('industrial');
  const isAuto = b.includes('automobile');
  const isRobotics = b.includes('robotics') || b.includes('mechatronics');
  const isCivil = b.includes('civil') || b.includes('structural') || b.includes('environmental');
  const isIoT = b.includes('iot');

  // Filter roles:
  // Role matches if:
  // 1. Its domain is in selectedDomains, OR
  // 2. Its branches match student's branch AND (no domains selected OR "Other" selected)
  return ALL_CAREER_ROLES.filter(role => {
    const domainMatch = selectedDomains.some(d => role.domains.includes(d));

    let branchMatch = false;
    if (isCSE && (role.branches.includes('CSE') || role.branches.includes('IT'))) branchMatch = true;
    if (isAI && (role.branches.includes('AI & ML') || role.branches.includes('AI & DS') || role.branches.includes('Data Science'))) branchMatch = true;
    if (isCyber && role.branches.includes('Cybersecurity')) branchMatch = true;
    if (isECE && (role.branches.includes('ECE') || role.branches.includes('ETC'))) branchMatch = true;
    if (isEEE && (role.branches.includes('EEE') || role.branches.includes('Electrical'))) branchMatch = true;
    if (isMech && (role.branches.includes('Mechanical') || role.branches.includes('Production'))) branchMatch = true;
    if (isAuto && role.branches.includes('Automobile')) branchMatch = true;
    if (isRobotics && role.branches.includes('Robotics')) branchMatch = true;
    if (isCivil && (role.branches.includes('Civil') || role.branches.includes('Structural'))) branchMatch = true;
    if (isIoT && role.branches.includes('IoT')) branchMatch = true;

    // If student selected specific domains, prioritize domain matches OR branch-native matches that align
    if (selectedDomains.length > 0 && !selectedDomains.includes('Other')) {
      return domainMatch || (branchMatch && role.domains.some(d => selectedDomains.includes(d)));
    }

    // Default fallback: match by branch
    return branchMatch || domainMatch || role.branches.includes('General');
  });
}

/**
 * Returns prioritized skills for a given target role, branch, and domains
 */
export function getPrioritizedSkills(targetRoleId, branchName = '', selectedDomains = []) {
  const role = ALL_CAREER_ROLES.find(r => r.id === targetRoleId);
  const prioritizedSet = new Set(role?.coreSkills || []);

  // Add branch-essential skills
  const b = branchName.toLowerCase();
  if (b.includes('computer') || b.includes('information') || b.includes('software')) {
    ['Java', 'Python', 'C++', 'Data Structures & Algorithms', 'SQL', 'Git & GitHub', 'DBMS'].forEach(s => prioritizedSet.add(s));
  } else if (b.includes('electronics & communication') || b.includes('etc')) {
    ['Digital Electronics', 'VLSI', 'Verilog', 'Embedded Systems', 'C', 'C++', 'Microcontrollers'].forEach(s => prioritizedSet.add(s));
  } else if (b.includes('electrical')) {
    ['Circuit Analysis', 'Electrical Machines', 'Power Systems', 'Power Electronics', 'MATLAB/Simulink'].forEach(s => prioritizedSet.add(s));
  } else if (b.includes('mechanical') || b.includes('automobile')) {
    ['AutoCAD', 'SolidWorks', 'ANSYS', 'Thermodynamics', 'Manufacturing', 'Fluid Mechanics'].forEach(s => prioritizedSet.add(s));
  } else if (b.includes('civil')) {
    ['AutoCAD', 'STAAD.Pro', 'Structural Analysis', 'Revit', 'Surveying', 'Construction Management'].forEach(s => prioritizedSet.add(s));
  }

  // Add domain-related skills
  selectedDomains.forEach(domain => {
    if (domain === 'Software / IT') {
      ['Java', 'Python', 'JavaScript', 'SQL', 'Data Structures & Algorithms', 'Git & GitHub'].forEach(s => prioritizedSet.add(s));
    } else if (domain === 'VLSI / Semiconductor') {
      ['Digital Electronics', 'VLSI', 'Verilog', 'SystemVerilog', 'RTL Design', 'FPGA'].forEach(s => prioritizedSet.add(s));
    } else if (domain === 'AI & Machine Learning') {
      ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Pandas & NumPy'].forEach(s => prioritizedSet.add(s));
    } else if (domain === 'Data & Analytics') {
      ['SQL', 'Python', 'PowerBI & Tableau', 'Excel Modeling', 'Pandas & NumPy'].forEach(s => prioritizedSet.add(s));
    } else if (domain === 'Cloud & DevOps') {
      ['Cloud Computing', 'Docker', 'Kubernetes', 'Linux / Unix', 'AWS', 'Git & GitHub'].forEach(s => prioritizedSet.add(s));
    } else if (domain === 'Cybersecurity') {
      ['Cybersecurity', 'Computer Networks', 'Operating Systems', 'Linux / Unix', 'Python'].forEach(s => prioritizedSet.add(s));
    }
  });

  return Array.from(prioritizedSet);
}
