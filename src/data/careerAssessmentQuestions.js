/**
 * SkillBridge Career Assessment Question Bank & Category Engine
 * 
 * Supports 6 core engineering domains:
 * - Software
 * - Hardware
 * - AI/ML
 * - Data
 * - Cybersecurity
 * - Electronics
 * 
 * Modular design allows seamless expansion with new questions and domains.
 */

export const ASSESSMENT_CATEGORIES = [
  {
    id: 'software',
    name: 'Software Engineering',
    defaultRole: 'Software Developer',
    description: 'Data structures, algorithms, object-oriented design, APIs, and concurrent system architecture.',
    iconName: 'Code'
  },
  {
    id: 'hardware',
    name: 'Hardware & Embedded',
    defaultRole: 'Embedded Systems Engineer',
    description: 'Microcontrollers, embedded C, peripheral bus protocols (I2C/SPI), and firmware architecture.',
    iconName: 'Cpu'
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning',
    defaultRole: 'AI/ML Engineer',
    description: 'Model optimization, loss functions, neural architectures, evaluation metrics, and data preparation.',
    iconName: 'Brain'
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    defaultRole: 'Data Analyst & Scientist',
    description: 'Complex SQL queries, window functions, relational normalization, transformations, and BI metrics.',
    iconName: 'Database'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    defaultRole: 'Cybersecurity Engineer',
    description: 'Network security, authentication protocols, OWASP vulnerabilities, cryptography, and threat defense.',
    iconName: 'Shield'
  },
  {
    id: 'electronics',
    name: 'VLSI & Electronics',
    defaultRole: 'VLSI Design Engineer',
    description: 'Digital logic, CMOS circuits, Verilog HDL, setup/hold timing analysis, and state machine design.',
    iconName: 'Zap'
  }
];

export const CAREER_ASSESSMENT_QUESTIONS = {
  // ==================== SOFTWARE ====================
  software: [
    {
      id: 'sw_1',
      skill: 'Data Structures & Algorithms',
      question: 'What is the average and worst-case time complexity of lookup in a hash table when collisions are resolved using separate chaining?',
      options: [
        'Average: O(1), Worst: O(n)',
        'Average: O(log n), Worst: O(n)',
        'Average: O(1), Worst: O(log n)',
        'Average: O(n), Worst: O(n^2)'
      ],
      correctAnswer: 0,
      explanation: 'Under a uniform hash distribution, average lookup is O(1). However, if all keys hash to the same bucket, the linked list degenerates into linear search taking O(n) time.',
      recommendedTopic: 'Hash Tables, Collision Resolution & Amortized Complexity'
    },
    {
      id: 'sw_2',
      skill: 'Object-Oriented Programming (OOP)',
      question: 'Which object-oriented mechanism enables a subclass method to be dynamically resolved at runtime rather than compile-time?',
      options: [
        'Dynamic Method Dispatch (Virtual Functions / Polymorphism)',
        'Method Overloading (Compile-time Polymorphism)',
        'Encapsulation and Data Hiding',
        'Static Method Binding'
      ],
      correctAnswer: 0,
      explanation: 'Dynamic method dispatch uses virtual function tables (vtables) to resolve overridden method calls based on the actual runtime instance rather than the reference type.',
      recommendedTopic: 'Runtime Polymorphism, Virtual Tables & SOLID Principles'
    },
    {
      id: 'sw_3',
      skill: 'System Design & APIs',
      question: 'Which HTTP method is required by REST standards to be idempotent and used specifically to replace a full target resource representation?',
      options: [
        'PUT',
        'POST',
        'PATCH',
        'CONNECT'
      ],
      correctAnswer: 0,
      explanation: 'PUT is idempotent—executing multiple identical PUT requests produces the exact same server state as a single request. POST is non-idempotent, and PATCH applies partial modifications.',
      recommendedTopic: 'RESTful API Design Standards & Idempotency'
    },
    {
      id: 'sw_4',
      skill: 'Concurrency & Operating Systems',
      question: 'Which of the following conditions is NOT one of the four necessary Coffman conditions required for a deadlock to occur?',
      options: [
        'Preemptive Resource Allocation',
        'Mutual Exclusion',
        'Hold and Wait',
        'Circular Wait'
      ],
      correctAnswer: 0,
      explanation: 'The four Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption (non-preemption), and Circular Wait. Preemptive resource allocation breaks deadlocks rather than causing them.',
      recommendedTopic: 'Process Synchronization, Mutexes & Deadlock Prevention'
    },
    {
      id: 'sw_5',
      skill: 'Software Architecture & Testing',
      question: 'In software design, what is the primary purpose of the Dependency Inversion Principle (DIP)?',
      options: [
        'High-level modules should depend on abstractions rather than concrete low-level implementations',
        'Classes should be closed for modification and closed for extension',
        'Every class must have only a single public method to ensure isolation',
        'Functions should never accept interface parameters'
      ],
      correctAnswer: 0,
      explanation: 'DIP states that high-level modules should not depend on low-level modules; both should depend on abstractions (interfaces), decoupling modules for testability and modularity.',
      recommendedTopic: 'Clean Architecture, Dependency Injection & Unit Testing'
    },
    {
      id: 'sw_6',
      skill: 'Database Design & Transactions',
      question: 'In the context of database transactions, what does the "Isolation" property of ACID guarantee?',
      options: [
        'Concurrent transactions execute without interfering with one another as if they were sequential',
        'Transactions survive unexpected system crashes through write-ahead logging',
        'Either all changes in a transaction occur or none occur',
        'Database integrity constraints are never violated before a commit'
      ],
      correctAnswer: 0,
      explanation: 'Isolation ensures that concurrently running transactions execute independently without reading uncommitted or conflicting dirty states from other concurrent transactions.',
      recommendedTopic: 'ACID Transaction Isolation Levels & Concurrency Control'
    }
  ],

  // ==================== HARDWARE ====================
  hardware: [
    {
      id: 'hw_1',
      skill: 'Embedded C Programming',
      question: 'Why must a shared flag modified inside an Interrupt Service Routine (ISR) and checked in the main loop be declared as "volatile" in C?',
      options: [
        'To prevent the compiler optimizer from caching the variable in a CPU register',
        'To allocate the variable in high-speed hardware EEPROM instead of SRAM',
        'To automatically protect the variable with a hardware mutex lock',
        'To ensure the variable retains its value across power resets'
      ],
      correctAnswer: 0,
      explanation: 'The "volatile" qualifier informs the compiler that the variable value can change asynchronously outside the normal program flow (e.g. by hardware/ISR), forcing it to read from RAM every time.',
      recommendedTopic: 'Embedded C Qualifiers, ISR Programming & Memory Mapping'
    },
    {
      id: 'hw_2',
      skill: 'Peripheral Communication Protocols',
      question: 'In an I2C communication bus, what hardware components are required on the SDA and SCL lines because devices use open-drain/open-collector outputs?',
      options: [
        'Pull-up resistors to VDD',
        'Series decoupling capacitors',
        'Zener diodes in reverse parallel',
        'Active operational amplifiers'
      ],
      correctAnswer: 0,
      explanation: 'I2C lines are open-drain, meaning devices can only pull lines low (GND). Pull-up resistors to VDD are required to pull lines high when all devices release the bus.',
      recommendedTopic: 'I2C, SPI & UART Protocol Electrical Specifications'
    },
    {
      id: 'hw_3',
      skill: 'Computer Architecture',
      question: 'What fundamental architectural distinction separates Harvard Architecture from Von Neumann Architecture?',
      options: [
        'Harvard uses physically separate memories and buses for instructions and data',
        'Von Neumann architecture uses separate instruction and data caches',
        'Harvard architecture does not use an Arithmetic Logic Unit (ALU)',
        'Von Neumann can execute multiple instructions in a single clock cycle'
      ],
      correctAnswer: 0,
      explanation: 'Harvard architecture possesses physically distinct memory banks and bus paths for code and data, permitting simultaneous instruction fetch and data read/write without bus contention.',
      recommendedTopic: 'RISC vs CISC & Processor Bus Architectures'
    },
    {
      id: 'hw_4',
      skill: 'Microcontrollers & Timers',
      question: 'A microcontroller running at a 16 MHz clock uses an 8-bit timer with a prescaler of 64. What is the frequency at which the timer counter increments?',
      options: [
        '250 kHz',
        '1 MHz',
        '4 MHz',
        '62.5 kHz'
      ],
      correctAnswer: 0,
      explanation: 'Timer clock frequency = System Clock / Prescaler = 16,000,000 Hz / 64 = 250,000 Hz = 250 kHz.',
      recommendedTopic: 'Timer Prescaling, PWM Generation & Interrupt Latency'
    },
    {
      id: 'hw_5',
      skill: 'Embedded Systems & RTOS',
      question: 'What is "Priority Inversion" in a Real-Time Operating System (RTOS)?',
      options: [
        'A low-priority task holds a resource needed by a high-priority task, while a medium task preempts the low-priority task',
        'A high-priority task enters an infinite loop starving low-priority threads',
        'The RTOS scheduler reverses task execution order when memory is low',
        'An interrupt preempts all software threads regardless of OS priority'
      ],
      correctAnswer: 0,
      explanation: 'Priority inversion happens when a low-priority task holds a shared mutex needed by a high-priority task, and an unrelated medium-priority task runs, delaying the high-priority task indefinitely.',
      recommendedTopic: 'RTOS Task Scheduling & Priority Inheritance Protocols'
    },
    {
      id: 'hw_6',
      skill: 'Hardware Debugging & Memory',
      question: 'What is the primary operational difference between Flash memory and EEPROM in microcontroller architectures?',
      options: [
        'Flash is erased and rewritten in multi-byte blocks/sectors, whereas EEPROM allows byte-level erasure',
        'EEPROM is volatile and loses memory on power loss, while Flash is non-volatile',
        'Flash memory has unlimited write endurance cycles whereas EEPROM is read-only',
        'EEPROM can only store executable machine code'
      ],
      correctAnswer: 0,
      explanation: 'Flash memory is organized into sectors and must be erased block-by-block before writing, while EEPROM allows granular single-byte modification.',
      recommendedTopic: 'Non-Volatile Memory Architecture & Sector Management'
    }
  ],

  // ==================== AI / ML ====================
  aiml: [
    {
      id: 'ai_1',
      skill: 'Machine Learning Fundamentals',
      question: 'A model exhibits 99% accuracy on the training dataset but drops to 61% on the validation dataset. What condition is this, and how can it be alleviated?',
      options: [
        'Overfitting (High Variance); apply L2 regularization, dropout, or collect more data',
        'Underfitting (High Bias); increase model parameter complexity or train longer',
        'Data Leakage; remove test set normalization',
        'Exploding Gradients; reduce batch size and learning rate'
      ],
      correctAnswer: 0,
      explanation: 'High training accuracy coupled with poor validation performance indicates overfitting (high variance). Regularization (L1/L2), dropout, pruning, and data augmentation help generalize.',
      recommendedTopic: 'Bias-Variance Tradeoff, L1/L2 Regularization & Cross-Validation'
    },
    {
      id: 'ai_2',
      skill: 'Model Evaluation Metrics',
      question: 'In an automated cancer detection system where missing a positive malignancy has catastrophic consequences, which metric must be maximized?',
      options: [
        'Recall (Sensitivity)',
        'Precision (Positive Predictive Value)',
        'Accuracy',
        'Specificity'
      ],
      correctAnswer: 0,
      explanation: 'Recall = TP / (TP + FN). Maximizing recall minimizes False Negatives (FN), ensuring patients with cancer are not mistakenly diagnosed as disease-free.',
      recommendedTopic: 'Confusion Matrix, Precision-Recall Curves & ROC-AUC'
    },
    {
      id: 'ai_3',
      skill: 'Deep Learning & Neural Networks',
      question: 'Why does the Rectified Linear Unit (ReLU) activation function generally outperform Sigmoid in deep feed-forward neural networks?',
      options: [
        'It avoids the vanishing gradient problem for positive inputs since its derivative is a constant 1',
        'It outputs normalized values strictly bounded between 0 and 1',
        'It is continuously differentiable across all real numbers including zero',
        'It automatically scales weights using batch normalization'
      ],
      correctAnswer: 0,
      explanation: 'Sigmoid saturates at both tails with derivatives approaching 0, causing vanishing gradients during backpropagation. ReLU has a gradient of 1 for all x > 0, allowing gradients to propagate deeply.',
      recommendedTopic: 'Activation Functions, Backpropagation & Gradient Flow'
    },
    {
      id: 'ai_4',
      skill: 'Feature Engineering & Data Preprocessing',
      question: 'Why is feature scaling (Standardization / Normalization) strictly required before applying gradient-descent based algorithms like Logistic Regression and Neural Networks?',
      options: [
        'To ensure the cost function contours are spherical, preventing oscillation and speeding up gradient convergence',
        'To convert categorical strings into numerical vectors automatically',
        'To prevent collinearity between independent feature columns',
        'To guarantee the dataset satisfies normal Gaussian distribution'
      ],
      correctAnswer: 0,
      explanation: 'Unscaled features result in elongated elliptical loss surfaces, causing gradient descent to oscillate slowly. Feature standardization creates balanced contours for efficient, direct descent.',
      recommendedTopic: 'Feature Standardization (Z-Score) & Min-Max Normalization'
    },
    {
      id: 'ai_5',
      skill: 'Ensemble Learning Algorithms',
      question: 'What is the principal algorithmic difference between Bagging (e.g. Random Forest) and Boosting (e.g. XGBoost, Gradient Boosting)?',
      options: [
        'Bagging trains independent models in parallel to reduce variance; Boosting trains sequentially where each model corrects previous errors',
        'Bagging trains trees sequentially, while Boosting trains trees on random subsets in parallel',
        'Bagging is only used for classification, whereas Boosting is strictly for regression',
        'Boosting only uses unpruned linear decision stumps'
      ],
      correctAnswer: 0,
      explanation: 'Bagging aggregates independently trained parallel estimators on bootstrap samples to reduce variance. Boosting fits sequential weak learners focused on residual errors of previous steps.',
      recommendedTopic: 'Random Forests, Gradient Boosted Trees & Ensemble Methods'
    },
    {
      id: 'ai_6',
      skill: 'Loss Functions & Optimization',
      question: 'Which loss function is the mathematical standard for training a multi-class classification neural network with a Softmax output layer?',
      options: [
        'Categorical Cross-Entropy Loss',
        'Mean Squared Error (MSE)',
        'Hinge Loss',
        'Binary Cross-Entropy'
      ],
      correctAnswer: 0,
      explanation: 'Categorical Cross-Entropy measures the distance between the true one-hot probability distribution and the predicted softmax probabilities, heavily penalizing confident incorrect classes.',
      recommendedTopic: 'Loss Functions, Maximum Likelihood & Softmax Optimization'
    }
  ],

  // ==================== DATA ====================
  data: [
    {
      id: 'da_1',
      skill: 'SQL Querying & Joins',
      question: 'Given two tables "Students" (100 rows) and "Scholarships" (20 rows), what is the result of a LEFT JOIN from Students to Scholarships for students without a scholarship?',
      options: [
        'All student rows are returned, with NULL values in the Scholarship columns',
        'Those students are filtered out and excluded from the result set',
        'The query produces a runtime syntax error',
        'Scholarship columns contain empty strings instead of NULL'
      ],
      correctAnswer: 0,
      explanation: 'A LEFT JOIN preserves every row from the left table ("Students"). If no corresponding match exists in the right table ("Scholarships"), all right table attributes populate as NULL.',
      recommendedTopic: 'SQL Joins, Outer Joins & Nullable Logic'
    },
    {
      id: 'da_2',
      skill: 'SQL Aggregations & Grouping',
      question: 'What is the critical syntax rule distinguishing the WHERE clause from the HAVING clause in SQL?',
      options: [
        'WHERE filters rows before aggregation occurs; HAVING filters grouped aggregate results',
        'WHERE can only be used with subqueries, while HAVING cannot',
        'HAVING filters individual rows before GROUP BY executes',
        'WHERE is used exclusively for numeric comparisons'
      ],
      correctAnswer: 0,
      explanation: 'WHERE filters rows prior to the GROUP BY stage. HAVING is evaluated after data has been aggregated by GROUP BY and can evaluate aggregate functions like SUM(), COUNT(), and AVG().',
      recommendedTopic: 'SQL GROUP BY, HAVING Clause & Query Execution Order'
    },
    {
      id: 'da_3',
      skill: 'SQL Window Functions',
      question: 'In SQL, if three employees tie with the identical top salary of $100,000, what will DENSE_RANK() assign to the next employee earning $90,000?',
      options: [
        'Rank 2',
        'Rank 4',
        'Rank 3',
        'Rank 1'
      ],
      correctAnswer: 0,
      explanation: 'DENSE_RANK() does not skip rank numbers after ties (1, 1, 1, 2). RANK() on the other hand would produce gaps, ranking the next person 4 (1, 1, 1, 4).',
      recommendedTopic: 'Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG)'
    },
    {
      id: 'da_4',
      skill: 'Database Normalization',
      question: 'A relational table is in Second Normal Form (2NF). What additional requirement must be satisfied for it to achieve Third Normal Form (3NF)?',
      options: [
        'It must contain no transitive functional dependencies of non-prime attributes on candidate keys',
        'All multi-valued dependencies must be eliminated',
        'It must not have composite primary keys',
        'Every column must store atomic values only'
      ],
      correctAnswer: 0,
      explanation: '3NF requires that the table is in 2NF and that no non-prime attribute is transitively dependent on any candidate key (i.e. every non-key column must depend on nothing but the key).',
      recommendedTopic: 'Database Normalization (1NF, 2NF, 3NF & BCNF)'
    },
    {
      id: 'da_5',
      skill: 'Database Indexing & Performance',
      question: 'How does creating a B-Tree index on a frequently queried foreign key column accelerate SELECT queries?',
      options: [
        'It allows logarithmic O(log n) tree traversal instead of performing an O(n) full table scan',
        'It compresses the underlying disk blocks to save storage space',
        'It forces the database to cache the entire table permanently in RAM',
        'It rewrites queries into parallel map-reduce jobs'
      ],
      correctAnswer: 0,
      explanation: 'B-Tree indexes store sorted key-pointer pairs, allowing the database query planner to find records in O(log n) time using binary tree search rather than reading every page on disk.',
      recommendedTopic: 'Database Indexing, Execution Plans & Query Tuning'
    },
    {
      id: 'da_6',
      skill: 'Data Analysis & Wrangling',
      question: 'When performing Exploratory Data Analysis (EDA) on skewed financial data with extreme outliers, which metric is the most robust measure of central tendency?',
      options: [
        'Median',
        'Arithmetic Mean',
        'Standard Deviation',
        'Mid-Range'
      ],
      correctAnswer: 0,
      explanation: 'The median represents the 50th percentile and is resistant to extreme outliers. The arithmetic mean is heavily distorted by extreme values in skewed distributions.',
      recommendedTopic: 'Descriptive Statistics, Quartiles & Outlier Detection'
    }
  ],

  // ==================== CYBERSECURITY ====================
  cybersecurity: [
    {
      id: 'sec_1',
      skill: 'Web Application Security (OWASP)',
      question: 'What is the most effective industry mechanism for completely preventing SQL Injection vulnerabilities in backend database interactions?',
      options: [
        'Using Parameterized Queries / Prepared Statements',
        'Encoding user input in Base64 before concatenation',
        'Relying exclusively on client-side JavaScript regex validation',
        'Encrypting the database storage with AES-256'
      ],
      correctAnswer: 0,
      explanation: 'Prepared statements treat user input strictly as literal data parameters, ensuring the SQL compiler never parses or executes malicious user input as SQL commands.',
      recommendedTopic: 'OWASP Top 10, SQL Injection & Secure Parameter Binding'
    },
    {
      id: 'sec_2',
      skill: 'Cryptography & Encryption',
      question: 'In asymmetric public-key cryptography (e.g. RSA), which key is used by the recipient to decrypt a confidential message sent by a sender?',
      options: [
        'The recipient’s private key',
        'The recipient’s public key',
        'The sender’s public key',
        'A shared pre-shared symmetric key'
      ],
      correctAnswer: 0,
      explanation: 'The sender encrypts the message using the recipient’s public key. Only the matching recipient’s private key, which is kept strictly secret, can decrypt the ciphertext.',
      recommendedTopic: 'Public Key Infrastructure (PKI), RSA & Asymmetric Cryptography'
    },
    {
      id: 'sec_3',
      skill: 'Network Security & Protocols',
      question: 'How does a TCP SYN Flood Denial of Service (DoS) attack exhaust server resources?',
      options: [
        'By sending repeated SYN packets and ignoring the server’s SYN-ACK response, leaving half-open connections in the backlog',
        'By cracking the server’s root password via brute-force dictionary attacks',
        'By injecting corrupted packets that cause the network interface card to overheat',
        'By poisoning local DNS caches with invalid IP mappings'
      ],
      correctAnswer: 0,
      explanation: 'In a SYN flood, the attacker sends SYN requests without completing the 3-way handshake with an ACK. The server allocates memory for half-open sockets until its connection table is exhausted.',
      recommendedTopic: 'TCP/IP Handshake, SYN Cookies & DoS/DDoS Mitigation'
    },
    {
      id: 'sec_4',
      skill: 'Web Security & Headers',
      question: 'Which HTTP response header helps mitigate Cross-Site Scripting (XSS) by restricting the domains from which scripts, images, and styles can be loaded?',
      options: [
        'Content-Security-Policy (CSP)',
        'X-Frame-Options',
        'Access-Control-Allow-Origin',
        'Strict-Transport-Security (HSTS)'
      ],
      correctAnswer: 0,
      explanation: 'Content-Security-Policy (CSP) allows server administrators to declare an approved whitelist of trusted sources from which the browser is allowed to execute dynamic scripts.',
      recommendedTopic: 'XSS Prevention, Content Security Policy & Security Headers'
    },
    {
      id: 'sec_5',
      skill: 'Authentication & Identity',
      question: 'What prevents a malicious user from tampering with user permissions inside the payload of a JSON Web Token (JWT)?',
      options: [
        'The cryptographic digital signature verified using the server’s secret or private key',
        'The Base64Url encoding makes the content unreadable to clients',
        'JWT tokens are stored in read-only hardware registers on the browser',
        'The payload is automatically hashed with client IP cookies'
      ],
      correctAnswer: 0,
      explanation: 'A JWT consists of Header.Payload.Signature. Any alteration of the payload invalidates the signature, which can only be generated or validated with the server’s secret key.',
      recommendedTopic: 'JWT Token Security, HMAC Signing & OAuth2 Flows'
    },
    {
      id: 'sec_6',
      skill: 'Threat Defense & Cryptographic Hashes',
      question: 'Why should passwords NEVER be stored using plain MD5 or SHA-256 hashes without salt and key derivation functions (e.g. bcrypt, Argon2)?',
      options: [
        'They are fast to compute, making them vulnerable to precomputed Rainbow Table and GPU brute-force attacks',
        'MD5 and SHA-256 produce variable length hashes that corrupt database indexes',
        'They can be reversed into plaintext using simple division algorithms',
        'They are incompatible with modern SQL database column encodings'
      ],
      correctAnswer: 0,
      explanation: 'Fast cryptographic hashes like MD5 and SHA-256 can be computed billions of times per second on GPUs. Slow, salted key derivation algorithms like bcrypt and Argon2 resist brute-force.',
      recommendedTopic: 'Password Hashing, Salting & Argon2/Bcrypt Implementations'
    }
  ],

  // ==================== ELECTRONICS ====================
  electronics: [
    {
      id: 'el_1',
      skill: 'Digital Logic & Timing Analysis',
      question: 'What is the "Setup Time" requirement of an edge-triggered D flip-flop?',
      options: [
        'The minimum duration the data input (D) must remain stable BEFORE the active clock edge',
        'The minimum duration the data input (D) must remain stable AFTER the active clock edge',
        'The delay time between the clock edge and output Q transitioning',
        'The total clock period required for signal propagation'
      ],
      correctAnswer: 0,
      explanation: 'Setup time (t_setup) is the minimum time the data signal must be held stable before the clock edge occurs. Violating setup time causes metastability in the flip-flop.',
      recommendedTopic: 'Static Timing Analysis (STA), Setup/Hold Slack & Metastability'
    },
    {
      id: 'el_2',
      skill: 'Verilog HDL & RTL Design',
      question: 'In synthesizeable Verilog, which type of assignment operator must be used inside clocked sequential always blocks (`always @(posedge clk)`)?',
      options: [
        'Non-blocking assignment (`<=`)',
        'Blocking assignment (`=`)',
        'Continuous assignment (`assign`)',
        'Procedural continuous assignment (`force`)'
      ],
      correctAnswer: 0,
      explanation: 'Non-blocking assignments (`<=`) execute concurrently in Verilog scheduled events, correctly modeling parallel flip-flop registers without introducing simulation race conditions.',
      recommendedTopic: 'Verilog RTL Synthesis, Blocking vs Non-Blocking Assignments'
    },
    {
      id: 'el_3',
      skill: 'CMOS & VLSI Circuit Design',
      question: 'In a standard CMOS static logic gate, what is the composition of the Pull-Up Network (PUN) and Pull-Down Network (PDN)?',
      options: [
        'PUN consists of PMOS transistors connected to VDD; PDN consists of NMOS transistors connected to GND',
        'PUN consists of NMOS transistors connected to VDD; PDN consists of PMOS transistors connected to GND',
        'Both PUN and PDN are built entirely from PMOS transistors',
        'Both networks use bipolar junction transistors (BJTs)'
      ],
      correctAnswer: 0,
      explanation: 'CMOS logic uses complementary networks: PMOS transistors conduct logic 1 strongly and form the Pull-Up Network to VDD; NMOS conduct logic 0 strongly and form the Pull-Down Network to GND.',
      recommendedTopic: 'CMOS Inverter Characteristics, Static/Dynamic Power & Stick Diagrams'
    },
    {
      id: 'el_4',
      skill: 'Finite State Machine (FSM) Design',
      question: 'What is the key architectural difference between a Mealy State Machine and a Moore State Machine?',
      options: [
        'In a Mealy machine, outputs depend on both current state and current inputs; in a Moore machine, outputs depend solely on the current state',
        'Moore machines have asynchronous state transitions without a clock',
        'Mealy machines cannot be synthesized into digital hardware',
        'Moore machines require twice as many flip-flops as Mealy machines'
      ],
      correctAnswer: 0,
      explanation: 'In Moore FSMs, output = f(State). In Mealy FSMs, output = f(State, Input), which can produce faster responses but may introduce output glitches when inputs change asynchronously.',
      recommendedTopic: 'FSM State Encoding (One-Hot, Binary, Gray) & Glitch Prevention'
    },
    {
      id: 'el_5',
      skill: 'Analog & Circuit Analysis',
      question: 'What is the cutoff frequency (-3dB point) of a passive first-order RC low-pass filter with R = 10 kΩ and C = 100 nF?',
      options: [
        '159 Hz',
        '1.59 kHz',
        '100 Hz',
        '15.9 kHz'
      ],
      correctAnswer: 0,
      explanation: 'f_c = 1 / (2 * pi * R * C) = 1 / (2 * 3.14159 * 10,000 * 100e-9) = 1 / 0.006283 = ~159.15 Hz.',
      recommendedTopic: 'Frequency Response, Bode Plots & Passive Filter Design'
    },
    {
      id: 'el_6',
      skill: 'Static Timing Analysis & Clock Trees',
      question: 'How does positive clock skew (clock arrives at the destination flip-flop later than the launch flip-flop) affect timing analysis?',
      options: [
        'It helps satisfy setup time requirements but worsens hold time margins',
        'It worsens setup time and helps hold time',
        'It has zero impact on digital register timing',
        'It causes the clock frequency to double automatically'
      ],
      correctAnswer: 0,
      explanation: 'Positive clock skew extends the effective clock period available for combinational logic propagation (benefiting setup time), but reduces hold time margin, making hold violations more likely.',
      recommendedTopic: 'Clock Tree Synthesis (CTS), Clock Skew & Jitter Analysis'
    }
  ]
};

/**
 * Automatically maps a student's career role title or engineering branch to one of the 6 assessment categories.
 */
export function getCategoryForRole(roleTitle = '') {
  const r = roleTitle.toLowerCase();

  if (r.includes('ai') || r.includes('machine learning') || r.includes('deep learning')) {
    return 'aiml';
  }
  if (r.includes('data') || r.includes('analyst') || r.includes('database') || r.includes('dba') || r.includes('business intelligence')) {
    return 'data';
  }
  if (r.includes('security') || r.includes('cyber') || r.includes('penetration') || r.includes('network defense')) {
    return 'cybersecurity';
  }
  if (r.includes('vlsi') || r.includes('rtl') || r.includes('verification') || r.includes('semiconductor') || r.includes('electronics')) {
    return 'electronics';
  }
  if (r.includes('hardware') || r.includes('embedded') || r.includes('microcontroller') || r.includes('fpga') || r.includes('iot')) {
    return 'hardware';
  }

  // Default to software for software developer, fullstack, backend, frontend, qa, etc.
  return 'software';
}

/**
 * Retrieves assessment questions for a specific category ID.
 */
export function getQuestionsForCategory(categoryId = 'software') {
  return CAREER_ASSESSMENT_QUESTIONS[categoryId] || CAREER_ASSESSMENT_QUESTIONS.software;
}
