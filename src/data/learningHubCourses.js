/**
 * Learning Hub Technical Courses & Free Curated Resources
 * 
 * 20 Engineering Courses covering Programming, Core Computer Science,
 * Hardware/VLSI, Web Development, Systems, AI/ML, and Security.
 * 
 * Easily extensible by adding new course objects to the COURSES array.
 */

export const COURSE_CATEGORIES = [
  'All',
  'Programming Languages',
  'Core Computer Science',
  'Web Development',
  'Hardware & VLSI',
  'AI & Data Science',
  'Cloud & Security'
];

export const LEARNING_COURSES = [
  {
    id: 'c',
    name: 'C Programming',
    category: 'Programming Languages',
    icon: 'Terminal',
    tagline: 'Foundational Systems & Procedural Programming',
    description: 'Master the bedrock of modern computing: low-level memory management, pointers, bitwise operations, structures, and systems compilation.',
    topics: [
      'Data Types, Operators & Control Flow',
      'Functions & Storage Classes (auto, static, extern, register)',
      'Pointers, Pointer Arithmetic & Double Pointers',
      'Dynamic Memory Allocation (malloc, calloc, realloc, free)',
      'Structures, Unions & Bit-Fields',
      'File I/O & Preprocessor Directives (#define, macros, conditional compilation)',
      'Memory Leaks, Segmentation Faults & Debugging with GDB'
    ],
    learningPath: {
      beginner: [
        'Syntax, Primitive Data Types & Format Specifiers (%d, %c, %f, %p)',
        'Conditional Branches (if-else, switch) and Loops (for, while, do-while)',
        'Functions, Scope, Recursion and Standard Library (stdio.h, stdlib.h)'
      ],
      intermediate: [
        'Single & Multi-dimensional Arrays and String Manipulation (string.h)',
        'Pointers, Passing Pointers to Functions, Arrays of Pointers',
        'Structures, Nested Structures, Typedef, and Unions'
      ],
      advanced: [
        'Dynamic Memory Allocation and Memory Leak Prevention with Valgrind',
        'Function Pointers, Callbacks, and Generic Void Pointers',
        'Bitwise Operations, Endianness, Memory Alignment and Padding'
      ]
    },
    resources: [
      {
        title: 'C Programming Full Course for Beginners',
        provider: 'freeCodeCamp (Mike Dane)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
        description: 'Comprehensive 4-hour zero-to-hero introduction covering variables, pointers, arrays, and memory.',
        isFree: true
      },
      {
        title: 'CS50x: Introduction to Computer Science (C Weeks 1-5)',
        provider: 'Harvard University',
        type: 'Free Course & Lectures',
        url: 'https://cs50.harvard.edu/x/',
        description: 'World-renowned foundational course teaching memory, pointers, data structures, and algorithms in pure C.',
        isFree: true
      },
      {
        title: 'C Programming Documentation & Reference',
        provider: 'cppreference.com',
        type: 'Official Documentation',
        url: 'https://en.cppreference.com/w/c',
        description: 'Complete C standard library, syntax rules, header specifications, and compiler behavior reference.',
        isFree: true
      },
      {
        title: 'C Programming Practice & Problem Solving',
        provider: 'HackerRank C Domain',
        type: 'Free Practice Platform',
        url: 'https://www.hackerrank.com/domains/c',
        description: 'Hand-picked coding challenges focusing on conditionals, pointers, arrays, and structured I/O.',
        isFree: true
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    icon: 'Cpu',
    tagline: 'High-Performance Systems & Modern Object-Oriented C++',
    description: 'Learn modern C++ (C++11 through C++20): RAII, templates, STL containers, move semantics, smart pointers, and high-throughput systems design.',
    topics: [
      'Classes, Constructors, Destructors & Rule of Three/Five/Zero',
      'Inheritance, Polymorphism & Virtual Function Tables (vtable/vptr)',
      'Templates, Generic Programming & Template Metaprogramming',
      'Standard Template Library (vector, map, unordered_map, set, deque)',
      'Smart Pointers (unique_ptr, shared_ptr, weak_ptr) & RAII',
      'Lvalues, Rvalues, Move Semantics & Perfect Forwarding (std::move, std::forward)',
      'Concurrency & Multi-threading (std::thread, std::mutex, std::atomic)'
    ],
    learningPath: {
      beginner: [
        'C++ Syntax, References vs Pointers, Namespaces, and I/O Streams',
        'Classes, Access Specifiers, Constructors, Initializer Lists and Destructors',
        'Operator Overloading and Function Overloading'
      ],
      intermediate: [
        'Inheritance, Abstract Classes, Virtual Functions and Dynamic Polymorphism',
        'Standard Template Library (STL) Iterators, Algorithms, and Core Containers',
        'Exception Handling, Smart Pointers, and Memory Safety'
      ],
      advanced: [
        'Move Semantics, Rvalue References, and Perfect Forwarding',
        'Variadic Templates, SFINAE, Concepts (C++20), and Constexpr evaluation',
        'Thread Synchronization, Lock-Free Concurrency, and Memory Models'
      ]
    },
    resources: [
      {
        title: 'C++ Programming Course - Beginner to Advanced',
        provider: 'freeCodeCamp (The Cherno)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
        description: 'Deep dive into modern C++ mechanics, memory layout, pointers, references, and compiler optimization.',
        isFree: true
      },
      {
        title: 'Learn C++ (Comprehensive Guided Tutorial)',
        provider: 'LearnCPP.com',
        type: 'Free Tutorial',
        url: 'https://www.learncpp.com/',
        description: 'The highest-rated free interactive written guide covering basic syntax to modern C++20 standards.',
        isFree: true
      },
      {
        title: 'Modern C++ Standard Reference',
        provider: 'cppreference.com',
        type: 'Official Documentation',
        url: 'https://en.cppreference.com/w/cpp',
        description: 'Official authoritative reference for C++ language grammar, algorithms, and STL container complexities.',
        isFree: true
      },
      {
        title: 'LeetCode C++ Algorithm Practice',
        provider: 'LeetCode',
        type: 'Free Practice Platform',
        url: 'https://leetcode.com/problemset/all/',
        description: 'Implement high-performance algorithmic solutions utilizing the C++ Standard Template Library.',
        isFree: true
      }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    icon: 'Coffee',
    tagline: 'Enterprise-Grade Object-Oriented Software Engineering',
    description: 'Build robust scalable software with Java: JVM architecture, Collections Framework, Multithreading, Concurrency, Generics, and Functional Streams.',
    topics: [
      'JVM Architecture (Classloader, JVM Memory, Garbage Collection Algorithms)',
      'Object-Oriented Design (Encapsulation, Inheritance, Polymorphism, Interfaces)',
      'Java Collections Framework (List, Set, Map, PriorityQueue, ConcurrentHashMap)',
      'Exception Handling & Checked vs Unchecked Exceptions',
      'Generics & Type Erasure (extends, super wildcards)',
      'Multithreading, ThreadPools, Synchronized & java.util.concurrent',
      'Java 8+ Features: Lambdas, Stream API, Optional, and Functional Interfaces'
    ],
    learningPath: {
      beginner: [
        'Java Syntax, Primitive vs Reference Types, Control Statements, and Arrays',
        'Classes, Objects, Methods, Constructors, and Access Modifiers',
        'Core OOP Principles (Inheritance, Overriding, Abstract Classes, Interfaces)'
      ],
      intermediate: [
        'Collections Framework, Iterators, Comparable vs Comparator interfaces',
        'Exception Handling hierarchies, Try-With-Resources, and Custom Exceptions',
        'Generics, Wildcards, and File I/O (NIO.2)'
      ],
      advanced: [
        'Multithreading, ExecutorService, ReentrantLock, and Thread Safety',
        'JVM Internals, Garbage Collectors (G1, ZGC), and Heap Profiling',
        'Functional Programming with Java Streams, Method References, and CompletableFuture'
      ]
    },
    resources: [
      {
        title: 'Java Full Course for Beginners',
        provider: 'Bro Code (YouTube)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo',
        description: 'Over 12 hours of thorough hands-on instruction covering OOP, GUI, collections, and file handling.',
        isFree: true
      },
      {
        title: 'Oracle Java Documentation & Developer Tutorials',
        provider: 'Oracle',
        type: 'Official Documentation',
        url: 'https://docs.oracle.com/en/java/',
        description: 'Official Java SE guides, API specifications, and standard library documentation.',
        isFree: true
      },
      {
        title: 'Java Programming Mooc (University of Helsinki)',
        provider: 'University of Helsinki',
        type: 'Free Interactive Course',
        url: 'https://java-programming.mooc.fi/',
        description: 'Free open-source university curriculum with automated graded programming assignments.',
        isFree: true
      },
      {
        title: 'HackerRank Java Track',
        provider: 'HackerRank',
        type: 'Free Practice Platform',
        url: 'https://www.hackerrank.com/domains/java',
        description: 'Practice Java strings, big numbers, collections, data structures, and object-oriented problems.',
        isFree: true
      }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    icon: 'FileCode',
    tagline: 'Versatile Scripting, Automation, Data & Backend Development',
    description: 'Master idiomatic Python (Pythonic code): list comprehensions, generators, decorators, OOP, context managers, and high-efficiency packages.',
    topics: [
      'Built-in Data Structures (Lists, Tuples, Dictionaries, Sets)',
      'List, Dict & Set Comprehensions and Generator Expressions',
      'Functions, *args, **kwargs, Closures & Decorators',
      'Object-Oriented Python (Dunder/Magic Methods: __init__, __str__, __repr__)',
      'Iterators, Generators & the yield Statement',
      'Context Managers (with statement, __enter__, __exit__)',
      'Global Interpreter Lock (GIL), Multiprocessing vs Asyncio'
    ],
    learningPath: {
      beginner: [
        'Python Syntax, Indentation, Dynamic Typing, Loops and Functions',
        'Core Data Structures: Lists, Dictionaries, Tuples, and Set operations',
        'Modules, Packages, Virtual Environments, and pip package management'
      ],
      intermediate: [
        'Object-Oriented Programming, Inheritance, Encapsulation, and Magic Methods',
        'List Comprehensions, Lambda Functions, and Exception Handling',
        'File Handling, JSON Parsing, and Regular Expressions (re module)'
      ],
      advanced: [
        'Decorators, Function Wrappers, and Higher-Order Programming',
        'Generators, Itertools, and Memory-Efficient Streaming',
        'Asynchronous Programming with asyncio, ThreadPoolExecutor, and GIL Mechanics'
      ]
    },
    resources: [
      {
        title: 'Python for Beginners - Full Course',
        provider: 'Programming with Mosh (YouTube)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
        description: 'Clear, clean 6-hour introduction to Python fundamentals, data structures, and practical projects.',
        isFree: true
      },
      {
        title: 'Official Python Documentation & Tutorial',
        provider: 'Python Software Foundation',
        type: 'Official Documentation',
        url: 'https://docs.python.org/3/tutorial/',
        description: 'The definitive official Python tutorial, standard library reference, and language specification.',
        isFree: true
      },
      {
        title: 'Automate the Boring Stuff with Python',
        provider: 'Al Sweigart',
        type: 'Free Online Book',
        url: 'https://automatetheboringstuff.com/',
        description: 'Practical project-driven programming covering file automation, web scraping, and spreadsheet manipulation.',
        isFree: true
      },
      {
        title: 'LeetCode Python Practice',
        provider: 'LeetCode',
        type: 'Free Practice Platform',
        url: 'https://leetcode.com/problemset/all/?difficulty=EASY&page=1',
        description: 'Solve core algorithmic challenges utilizing Pythonic syntax and built-in collections.',
        isFree: true
      }
    ]
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms (DSA)',
    category: 'Core Computer Science',
    icon: 'Binary',
    tagline: 'Algorithmic Problem Solving & Optimal System Complexity',
    description: 'Build algorithmic mastery: asymptotic analysis, linked lists, balanced trees, heaps, graphs, dynamic programming, and greedy optimization.',
    topics: [
      'Asymptotic Notation: Big-O, Big-Omega, Big-Theta & Amortized Complexity',
      'Arrays, Two Pointers, Sliding Window & Prefix Sums',
      'Linked Lists, Stacks, Queues & Monotonic Stacks',
      'Binary Trees, BSTs, AVL Trees & Segment Trees',
      'Heaps & Priority Queues (Min-Heap, Max-Heap, HeapSort)',
      'Graph Theory: BFS, DFS, Dijkstra, Bellman-Ford, Prim, Kruskal, Topological Sort',
      'Dynamic Programming: Memoization, Tabulation, Knapsack, and Longest Common Subsequence'
    ],
    learningPath: {
      beginner: [
        'Time & Space Complexity analysis and mathematical Big-O foundations',
        'Linear Structures: Arrays, Strings, Singly & Doubly Linked Lists',
        'Fundamental Sorting (Merge Sort, Quick Sort) & Binary Search'
      ],
      intermediate: [
        'Trees: Binary Tree Traversals (Inorder, Preorder, Postorder, Level-Order)',
        'Binary Search Trees, Heaps, and Priority Queue operations',
        'Graph Representations (Adjacency List/Matrix) and BFS/DFS Traversals'
      ],
      advanced: [
        'Shortest Path Algorithms (Dijkstra, Bellman-Ford) & Minimum Spanning Trees',
        'Dynamic Programming Patterns (0/1 Knapsack, Coin Change, Edit Distance, Interval DP)',
        'Advanced Structures: Trie, Disjoint Set Union (DSU / Union-Find), and Monotonic Deque'
      ]
    },
    resources: [
      {
        title: 'Data Structures and Algorithms in 15 Hours',
        provider: 'freeCodeCamp (Abdul Bari style)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=8hly31xKli0',
        description: 'Comprehensive video covering stacks, queues, trees, heaps, sorting algorithms, and Big-O.',
        isFree: true
      },
      {
        title: 'NeetCode Roadmap & Problem Explanations',
        provider: 'NeetCode.io',
        type: 'Free Roadmap & Visual Guide',
        url: 'https://neetcode.io/roadmap',
        description: 'Interactive visual roadmap categorizing the top 150 LeetCode patterns with video explanations.',
        isFree: true
      },
      {
        title: 'GeeksforGeeks Data Structures Curriculum',
        provider: 'GeeksforGeeks',
        type: 'Free Tutorial & Articles',
        url: 'https://www.geeksforgeeks.org/data-structures/',
        description: 'Step-by-step written articles, code implementations in multiple languages, and algorithmic proofs.',
        isFree: true
      },
      {
        title: 'LeetCode Problem Archive',
        provider: 'LeetCode',
        type: 'Free Practice Platform',
        url: 'https://leetcode.com/problemset/all/',
        description: 'Industry-standard coding assessment practice platform with test cases and runtime analysis.',
        isFree: true
      }
    ]
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Core Computer Science',
    icon: 'Database',
    tagline: 'Relational Querying, Aggregation & Database Manipulation',
    description: 'Write high-performance relational queries: joins, nested subqueries, grouping, window functions, CTEs, and schema transactions.',
    topics: [
      'DML & DDL: SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP',
      'Filtering & Operators: WHERE, LIKE, IN, BETWEEN, IS NULL, CASE WHEN',
      'Table Joins: INNER, LEFT, RIGHT, FULL OUTER, CROSS & SELF JOINs',
      'Aggregation & Grouping: COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING',
      'Subqueries (Correlated vs Non-Correlated) & Common Table Expressions (CTEs)',
      'Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD()',
      'Database Indexing, Execution Plans & Query Performance Tuning'
    ],
    learningPath: {
      beginner: [
        'Relational concepts, basic SELECT queries, column aliasing, and ORDER BY',
        'Filtering rows with WHERE clause, boolean operators, and wildcard pattern matching',
        'Basic Aggregate functions (COUNT, SUM, AVG) and simple GROUP BY queries'
      ],
      intermediate: [
        'Mastering Multi-Table JOINs (INNER, LEFT, RIGHT, FULL OUTER, CROSS)',
        'HAVING vs WHERE clauses and aggregate grouping logic',
        'Subqueries in WHERE and FROM clauses and SET operators (UNION, INTERSECT)'
      ],
      advanced: [
        'Common Table Expressions (WITH clause) and Recursive CTEs',
        'Analytical Window Functions (ROW_NUMBER, DENSE_RANK, NTILE, Window Partitioning)',
        'Query Optimization, EXPLAIN ANALYZE, Index selection, and Transaction isolation'
      ]
    },
    resources: [
      {
        title: 'SQL Tutorial - Full Database Course for Beginners',
        provider: 'freeCodeCamp (Mike Dane)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4',
        description: '4-hour SQL fundamentals tutorial using relational databases, tables, joins, and queries.',
        isFree: true
      },
      {
        title: 'SQLZoo Interactive SQL Platform',
        provider: 'SQLZoo',
        type: 'Free Interactive Tutorial',
        url: 'https://sqlzoo.net/',
        description: 'Live in-browser SQL terminal exercises covering basic SELECT statements to nested window functions.',
        isFree: true
      },
      {
        title: 'PostgreSQL Official Documentation',
        provider: 'PostgreSQL Global Development Group',
        type: 'Official Documentation',
        url: 'https://www.postgresql.org/docs/current/tutorial.html',
        description: 'Authoritative documentation on SQL standard conformance, relational types, and query optimization.',
        isFree: true
      },
      {
        title: 'HackerRank SQL Practice Domain',
        provider: 'HackerRank',
        type: 'Free Practice Platform',
        url: 'https://www.hackerrank.com/domains/sql',
        description: 'Graded SQL query challenges ranging from basic joins to advanced aggregate reporting.',
        isFree: true
      }
    ]
  },
  {
    id: 'dbms',
    name: 'DBMS',
    category: 'Core Computer Science',
    icon: 'Server',
    tagline: 'Database Architecture, Storage Engines & Concurrency Control',
    description: 'Understand the internals of database engines: ER modeling, normalization (1NF-BCNF), B+ Trees, ACID transactions, 2PL, and WAL recovery.',
    topics: [
      'Database Architecture (Physical, Logical & View Levels)',
      'Entity-Relationship (ER) Modeling, Schemas & Constraints',
      'Functional Dependencies, Normalization (1NF, 2NF, 3NF, BCNF)',
      'Storage Structures: B-Trees, B+ Trees, and Hash Indexing',
      'Transaction Processing & ACID Properties (Atomicity, Consistency, Isolation, Durability)',
      'Concurrency Control: Two-Phase Locking (2PL), Timestamp Ordering, Deadlock Detection',
      'Crash Recovery: Write-Ahead Logging (WAL), Checkpoints & ARIES Algorithm'
    ],
    learningPath: {
      beginner: [
        'File Systems vs DBMS, 3-Tier Architecture, and Data Independence',
        'Relational Model, Primary Keys, Foreign Keys, and Integrity Constraints',
        'Entity-Relationship Diagrams and mapping ER models to Relational Schemas'
      ],
      intermediate: [
        'Functional Dependencies, Closure sets, and Attribute Keys',
        'Normalization Rules: Lossless Decomposition, Dependency Preservation, 1NF to BCNF',
        'File Organization, Clustered vs Non-Clustered Indexes, and B+ Tree structures'
      ],
      advanced: [
        'Transaction Schedules: Serializability, Conflict vs View Serializability',
        'Concurrency Control: Lock-based protocols (Strict 2PL), Multi-Version Concurrency (MVCC)',
        'Database Logging, System Failure Recovery, and Distributed Commit (2PC)'
      ]
    },
    resources: [
      {
        title: 'DBMS Full Course for University & Gate Preparation',
        provider: 'Gate Smashers (YouTube)',
        type: 'YouTube Playlist',
        url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8C9Xd64PYqzkNM36v',
        description: 'The most popular engineering exam playlist covering normalization, transactions, and indexing.',
        isFree: true
      },
      {
        title: 'Database Management Essentials',
        provider: 'University of Colorado (Coursera Audit)',
        type: 'Free Online Course',
        url: 'https://www.coursera.org/learn/database-management',
        description: 'Fundamental course on relational data modeling, schema design, and database integrity.',
        isFree: true
      },
      {
        title: 'GeeksforGeeks DBMS Complete Tutorial',
        provider: 'GeeksforGeeks',
        type: 'Free Tutorial',
        url: 'https://www.geeksforgeeks.org/dbms/',
        description: 'Comprehensive academic notes on normalization proofs, relational algebra, and recovery algorithms.',
        isFree: true
      },
      {
        title: 'Use The Index, Luke! (Database Performance Guide)',
        provider: 'Markus Winand',
        type: 'Free Practice Resource',
        url: 'https://use-the-index-luke.com/',
        description: 'The definitive guide to how database indexes, B-trees, and execution plans work under the hood.',
        isFree: true
      }
    ]
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Web Development',
    icon: 'Layout',
    tagline: 'Semantic Web Structure & Accessibility Standards',
    description: 'Learn modern semantic HTML5: document hierarchies, accessible forms, ARIA roles, media embedding, SEO metadata, and Web Components.',
    topics: [
      'HTML5 Document Structure, DOCTYPE & Meta Tags',
      'Semantic Tags: header, nav, main, article, section, aside, footer',
      'Forms & Validation: input types, patterns, required, labels, fieldsets',
      'Media Elements: audio, video, picture, source, and responsive images',
      'Web Accessibility (a11y), Screen Readers, and ARIA Roles',
      'Canvas API, SVG Integration & Embedded Elements (iframe)',
      'DOM Tree Architecture & Web Storage (localStorage, sessionStorage)'
    ],
    learningPath: {
      beginner: [
        'Basic HTML tags: headings, paragraphs, links, lists, and images',
        'Document Structure: head, title, body, and meta viewport tags',
        'Tables, structural dividers (div, span), and basic hyperlinks'
      ],
      intermediate: [
        'Semantic HTML5 elements and SEO best practices',
        'Form inputs, select dropdowns, radio/checkboxes, and HTML5 client-side validation',
        'Audio, Video, and responsive picture tag implementations'
      ],
      advanced: [
        'Web Accessibility (WAI-ARIA attributes, focus management, tab order)',
        'HTML5 Canvas graphics and SVG vector paths',
        'HTML APIs: Drag and Drop, Web Workers, and Web Storage'
      ]
    },
    resources: [
      {
        title: 'HTML Full Course - Build a Website Tutorial',
        provider: 'freeCodeCamp (Beau Carnes)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg',
        description: '2-hour beginner-friendly complete walkthrough of modern HTML elements and layout markup.',
        isFree: true
      },
      {
        title: 'MDN Web Docs: Learn HTML',
        provider: 'Mozilla Developer Network (MDN)',
        type: 'Official Documentation',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
        description: 'The industry-standard documentation covering elements, semantic structures, and accessibility.',
        isFree: true
      },
      {
        title: 'W3Schools HTML5 Tutorial',
        provider: 'W3Schools',
        type: 'Free Tutorial',
        url: 'https://www.w3schools.com/html/',
        description: 'Hands-on interactive "Try it Yourself" code playground with examples of every HTML tag.',
        isFree: true
      },
      {
        title: 'Frontend Mentor (HTML Challenges)',
        provider: 'Frontend Mentor',
        type: 'Free Practice Platform',
        url: 'https://www.frontendmentor.io/challenges',
        description: 'Build real-world accessible landing pages using pure HTML semantics from Figma designs.',
        isFree: true
      }
    ]
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Web Development',
    icon: 'Palette',
    tagline: 'Responsive Styling, Flexbox, Grid & Modern Animation',
    description: 'Master CSS3: Box Model, Specificity, Flexbox, CSS Grid, media queries, custom properties (variables), transitions, and container queries.',
    topics: [
      'CSS Box Model (Content, Padding, Border, Margin, box-sizing: border-box)',
      'Selectors, Cascade, Inheritance & Specificity Calculation',
      'Flexbox Layout: flex-direction, justify-content, align-items, flex-grow/shrink',
      'CSS Grid: grid-template-columns, grid-template-areas, auto-fit, minmax',
      'Responsive Web Design, Media Queries & Viewport Units',
      'CSS Variables, Transitions, Keyframe Animations & Transforms',
      'Modern CSS: :has() pseudo-class, Container Queries, and Aspect Ratio'
    ],
    learningPath: {
      beginner: [
        'CSS syntax, color representations (HEX, RGB, HSL), typography, and units (px, rem, em)',
        'The Box Model: margins, padding, borders, and box-sizing',
        'Normal Flow, Display properties (block, inline, inline-block, none)'
      ],
      intermediate: [
        'Positioning mechanics: static, relative, absolute, fixed, and sticky',
        'Flexbox Layout: building flexible responsive components',
        'CSS Media Queries and Mobile-First responsive design principles'
      ],
      advanced: [
        'CSS Grid: multi-dimensional layout systems and responsive templates',
        'CSS Keyframes, 2D/3D Transforms, Hardware Acceleration, and Transitions',
        'Modern features: CSS Custom Properties, Subgrid, and Container Queries'
      ]
    },
    resources: [
      {
        title: 'CSS Tutorial - Zero to Hero Full Course',
        provider: 'freeCodeCamp (Dave Gray)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=OXGznpKZ_sA',
        description: 'Comprehensive 11-hour deep dive into CSS fundamentals, Flexbox, Grid, and responsive design.',
        isFree: true
      },
      {
        title: 'Flexbox Froggy & Grid Garden (Interactive CSS Games)',
        provider: 'Codepip',
        type: 'Free Practice Platform',
        url: 'https://flexboxfroggy.com/',
        description: 'Interactive gamified visual puzzles to master Flexbox and CSS Grid layout properties.',
        isFree: true
      },
      {
        title: 'MDN Web Docs: CSS Reference',
        provider: 'Mozilla Developer Network',
        type: 'Official Documentation',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        description: 'Authoritative documentation on CSS properties, browser compatibility, and layout modules.',
        isFree: true
      },
      {
        title: 'CSS-Tricks: Complete Guide to Flexbox & Grid',
        provider: 'CSS-Tricks',
        type: 'Free Visual Guide',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        description: 'The world\'s most cited illustrated cheat-sheet for Flexbox parent/child properties and CSS Grid.',
        isFree: true
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Web Development',
    icon: 'Zap',
    tagline: 'Dynamic Scripting, Asynchronous Programming & Modern ES6+',
    description: 'Understand the language of the web: closures, the event loop, prototype inheritance, Promises, async/await, DOM manipulation, and ES6+ features.',
    topics: [
      'Execution Context, Call Stack, Hoisting & Lexical Scope',
      'Closures, Currying, and Higher-Order Functions',
      'Prototypes, Prototype Chaining & ES6 Classes',
      'The Event Loop, Microtask Queue (Promises) & Macrotask Queue (setTimeout)',
      'Asynchronous JS: Callbacks, Promises, async/await, Promise.all',
      'DOM Manipulation, Event Bubbling, Event Capturing & Delegation',
      'ES6+ Features: Destructuring, Spread/Rest, Modules, Sets, Maps, and Optional Chaining'
    ],
    learningPath: {
      beginner: [
        'Variables (let, const, var), Data Types, Operators, Functions, and Arrays',
        'DOM Selection, Event Listeners (click, submit, change), and Modifying Elements',
        'Array methods: forEach, map, filter, reduce, find, some, every'
      ],
      intermediate: [
        'Objects, JSON, Destructuring, Spread operator, and Template Literals',
        'Scope chains, Closures, this keyword binding (call, apply, bind)',
        'Promises, Fetch API, async/await, and REST API consumption'
      ],
      advanced: [
        'Event Loop, Microtasks vs Macrotasks, and Browser Rendering cycles',
        'Prototypes, Prototypal Inheritance, and Class syntax mechanics',
        'Memory management, Garbage Collection, Closures memory leaks, and Modules'
      ]
    },
    resources: [
      {
        title: 'JavaScript Programming - Full Course',
        provider: 'freeCodeCamp (Per Harald Borgen)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=jS4aFq5-91M',
        description: '8-hour hands-on beginner project-based course building interactive apps and games.',
        isFree: true
      },
      {
        title: 'The Modern JavaScript Tutorial (javascript.info)',
        provider: 'Ilya Kantor',
        type: 'Free Interactive Tutorial',
        url: 'https://javascript.info/',
        description: 'The gold standard tutorial covering JavaScript from the basics to advanced browser events and objects.',
        isFree: true
      },
      {
        title: 'MDN Web Docs: JavaScript Guide & Reference',
        provider: 'Mozilla Developer Network',
        type: 'Official Documentation',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        description: 'Authoritative documentation detailing JavaScript language specs, built-in objects, and Web APIs.',
        isFree: true
      },
      {
        title: 'JavaScript30: 30 Day Vanilla JS Coding Challenge',
        provider: 'Wes Bos',
        type: 'Free Practice Platform',
        url: 'https://javascript30.com/',
        description: 'Build 30 vanilla JavaScript projects in 30 days with zero frameworks or libraries.',
        isFree: true
      }
    ]
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Core Computer Science',
    icon: 'GitBranch',
    tagline: 'Distributed Version Control & Collaborative Open-Source Workflows',
    description: 'Master team collaboration with Git: commits, branching, merging vs rebasing, cherry-picking, resolving merge conflicts, and GitHub pull requests.',
    topics: [
      'Version Control Concepts: Working Tree, Staging Area, Local and Remote Repos',
      'Basic Commands: git init, add, commit, status, log, diff, clone',
      'Branching & Merging: git branch, checkout, switch, merge (fast-forward vs 3-way)',
      'Git Rebase vs Merge & Interactive Rebasing (squash, reword, fixup)',
      'Resolving Merge Conflicts & Undoing Changes (reset --soft/hard, revert, restore)',
      'Advanced Git: git stash, cherry-pick, reflog, and bisect for bug hunting',
      'GitHub Workflows: Pull Requests, Forking, Branch Protection Rules, and SSH keys'
    ],
    learningPath: {
      beginner: [
        'Installing Git, configuring user name and email, initializing repositories',
        'Staging files, committing with meaningful messages, viewing git log',
        'Connecting local repos to GitHub, git push, git pull, and git clone'
      ],
      intermediate: [
        'Creating and switching branches, feature branch development workflows',
        'Merging branches, understanding Fast-Forward vs Merge commits',
        'Inspecting and resolving merge conflicts cleanly'
      ],
      advanced: [
        'Git Rebase, Interactive Rebase (git rebase -i), and history rewriting',
        'Recovering lost commits with git reflog and cherry-picking commits',
        'GitHub Actions CI/CD overview, Fork-and-Pull-Request open source workflows'
      ]
    },
    resources: [
      {
        title: 'Git and GitHub for Beginners - Crash Course',
        provider: 'freeCodeCamp (Jason Taylor)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
        description: 'Clear, practical tutorial explaining the Git staging pipeline, branches, and GitHub remote pushes.',
        isFree: true
      },
      {
        title: 'Pro Git Book (Complete Official Book)',
        provider: 'Scott Chacon & Ben Straub',
        type: 'Official Documentation',
        url: 'https://git-scm.com/book/en/v2',
        description: 'The entire official Pro Git book available free online, covering Git internals and enterprise workflows.',
        isFree: true
      },
      {
        title: 'Learn Git Branching (Interactive Visual Game)',
        provider: 'LearnGitBranching',
        type: 'Free Practice Platform',
        url: 'https://learngitbranching.js.org/',
        description: 'Interactive visual sandbox with terminal simulations of commits, rebases, and cherry-picks.',
        isFree: true
      },
      {
        title: 'GitHub Skills Interactive Lab',
        provider: 'GitHub',
        type: 'Free Interactive Tutorial',
        url: 'https://skills.github.com/',
        description: 'Learn Git and GitHub directly inside repositories with automated pull request reviews.',
        isFree: true
      }
    ]
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    category: 'Core Computer Science',
    icon: 'Wifi',
    tagline: 'Network Architecture, Layered Protocols & Internet Engineering',
    description: 'Understand modern data communications: OSI 7-Layer model, TCP/IP, IP addressing, subnetting (CIDR), routing protocols, DNS, HTTP/HTTPS, and sockets.',
    topics: [
      'OSI 7-Layer Reference Model vs TCP/IP Protocol Stack',
      'Physical & Data Link Layers: Framing, MAC Addresses, CSMA/CD, ARP',
      'Network Layer: IPv4/IPv6 Addressing, Subnetting, CIDR, NAT, ICMP',
      'Routing Algorithms: Distance Vector (RIP), Link State (OSPF), BGP',
      'Transport Layer: TCP vs UDP, 3-Way Handshake, Flow Control (Sliding Window)',
      'TCP Congestion Control: Slow Start, Congestion Avoidance, AIMD, Fast Retransmit',
      'Application Layer: DNS, HTTP/1.1 vs HTTP/2 vs HTTP/3, TLS/SSL Handshake, DHCP'
    ],
    learningPath: {
      beginner: [
        'Network Topologies (Star, Mesh, Bus), Bandwidth, Throughput, and Latency',
        'OSI Model layers and their primary responsibilities and protocols',
        'Client-Server vs Peer-to-Peer architecture and basic socket communication'
      ],
      intermediate: [
        'IPv4 Addressing, Subnet Masks, Network/Broadcast IDs, and CIDR notation',
        'Data Link Layer: Ethernet, MAC addressing, Switches vs Routers vs Hubs',
        'DNS resolution process and HTTP request/response headers'
      ],
      advanced: [
        'Deep dive into TCP state machine (SYN, SYN-ACK, ACK, FIN, TIME_WAIT)',
        'TCP Congestion Control algorithms and packet loss mitigation',
        'Network Security: TLS 1.3 cryptographic handshake, Firewalls, and VPNs'
      ]
    },
    resources: [
      {
        title: 'Computer Networking Course - Network Engineering Fundamentals',
        provider: 'freeCodeCamp (David Bombal)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=IPvYjXCsTg8',
        description: 'Complete foundational networking course covering packets, IP addressing, switches, routers, and Wireshark.',
        isFree: true
      },
      {
        title: 'Computer Networks Playlist for GATE & University',
        provider: 'Gate Smashers (YouTube)',
        type: 'YouTube Playlist',
        url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
        description: 'Comprehensive video series breaking down subnetting calculations, sliding window protocols, and routing.',
        isFree: true
      },
      {
        title: 'Computer Networks: A Systems Approach',
        provider: 'Peterson & Davie (Open Source Book)',
        type: 'Official Documentation',
        url: 'https://book.systemsapproach.org/',
        description: 'Leading open-source university textbook covering internet protocols from ground up.',
        isFree: true
      },
      {
        title: 'SubnettingPractice.com (CIDR Calculator & Quizzes)',
        provider: 'SubnettingPractice',
        type: 'Free Practice Platform',
        url: 'https://www.subnettingpractice.com/',
        description: 'Test your IPv4 subnetting speed with randomized network address, mask, and host capacity problems.',
        isFree: true
      }
    ]
  },
  {
    id: 'os',
    name: 'Operating Systems',
    category: 'Core Computer Science',
    icon: 'HardDrive',
    tagline: 'Kernel Architecture, Concurrency, Memory & Virtualization',
    description: 'Learn how OS kernels manage hardware: processes, threads, CPU scheduling, synchronization, deadlocks, paging, virtual memory, and file systems.',
    topics: [
      'Operating System Architecture: Dual-Mode Operation, System Calls, Monolithic vs Microkernel',
      'Processes vs Threads, PCB, Context Switching, Fork/Exec Lifecycle',
      'CPU Scheduling: FCFS, SJF, Round Robin, Multi-Level Feedback Queues',
      'Process Synchronization: Race Conditions, Critical Section, Semaphores, Mutex, Monitored',
      'Deadlocks: Necessary Conditions (Coffman), Prevention, Avoidance (Banker\'s Algorithm)',
      'Memory Management: Paging, Segmentation, TLB, Page Faults, Virtual Memory',
      'Page Replacement Algorithms: FIFO, LRU, Optimal, Belady\'s Anomaly, Thrashing'
    ],
    learningPath: {
      beginner: [
        'Role of Operating System, Kernel vs User Space, and System Calls',
        'Process States (New, Ready, Running, Waiting, Terminated) and Context Switching',
        'Thread concepts, Multi-threading models, and CPU burst times'
      ],
      intermediate: [
        'CPU Scheduling algorithms and calculating Average Waiting & Turnaround times',
        'Critical Section Problem, Peterson\'s Algorithm, and Semaphores (Wait & Signal)',
        'Deadlock detection, Resource Allocation Graphs, and Banker\'s Algorithm'
      ],
      advanced: [
        'Virtual Memory, Demand Paging, Inverted Page Tables, and TLB hit ratios',
        'Page Replacement algorithms (LRU, Clock algorithm) and Thrashing resolution',
        'Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN) and Unix File System Inodes'
      ]
    },
    resources: [
      {
        title: 'Operating Systems Full Course for CS Students',
        provider: 'Gate Smashers (YouTube)',
        type: 'YouTube Playlist',
        url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p',
        description: 'Widely praised university course covering CPU scheduling formulas, paging numericals, and semaphore code.',
        isFree: true
      },
      {
        title: 'Operating Systems: Three Easy Pieces (OSTEP)',
        provider: 'Remzi & Andrea Arpaci-Dusseau (UW-Madison)',
        type: 'Free Online Book',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
        description: 'The premier modern textbook covering Virtualization, Concurrency, and Persistence with C code examples.',
        isFree: true
      },
      {
        title: 'GeeksforGeeks Operating Systems Archive',
        provider: 'GeeksforGeeks',
        type: 'Free Tutorial',
        url: 'https://www.geeksforgeeks.org/operating-systems/',
        description: 'Comprehensive tutorials, practice quizzes, and solved university numericals.',
        isFree: true
      },
      {
        title: 'MIT 6.S081: Operating System Engineering (xv6 Labs)',
        provider: 'MIT OpenCourseWare',
        type: 'Free Practice Resource',
        url: 'https://pdos.csail.mit.edu/6.828/2021/schedule.html',
        description: 'Hands-on kernel labs adding system calls, page table features, and locks to the xv6 RISC-V kernel.',
        isFree: true
      }
    ]
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming (OOP)',
    category: 'Core Computer Science',
    icon: 'Layers',
    tagline: 'Software Modularity, Design Patterns & Clean Architecture',
    description: 'Design robust maintainable architectures: Encapsulation, Abstraction, Inheritance, Polymorphism, SOLID principles, and Gang of Four (GoF) design patterns.',
    topics: [
      'Four Pillars of OOP: Encapsulation, Abstraction, Inheritance, Polymorphism',
      'Coupling vs Cohesion & Association, Aggregation, Composition',
      'Static vs Dynamic Binding & Method Overloading vs Overriding',
      'SOLID Design Principles (SRP, OCP, LSP, ISP, DIP)',
      'Creational Patterns: Singleton, Factory Method, Abstract Factory, Builder',
      'Structural Patterns: Adapter, Composite, Decorator, Facade, Proxy',
      'Behavioral Patterns: Observer, Strategy, Command, State, Template Method'
    ],
    learningPath: {
      beginner: [
        'Classes and Objects, State and Behavior, Constructors, and Methods',
        'Encapsulation using Getters/Setters and Access Modifiers',
        'Inheritance: IS-A relationship, Super keywords, and code reuse'
      ],
      intermediate: [
        'Polymorphism: Compile-time (Overloading) vs Run-time (Overriding) polymorphism',
        'Interfaces and Abstract Classes: defining contracts and partial implementations',
        'Composition over Inheritance (HAS-A relationship)'
      ],
      advanced: [
        'Deep dive into SOLID principles with real-world refactoring examples',
        'Gang of Four Design Patterns: Factory, Singleton, Observer, and Strategy',
        'Writing loosely coupled, unit-testable clean object-oriented code'
      ]
    },
    resources: [
      {
        title: 'Object Oriented Programming is not what you think',
        provider: 'freeCodeCamp / CodeWithHarry',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=SiBw7hnHpY0',
        description: 'Detailed video exploring OOP fundamentals, real-world modeling, interfaces, and architecture.',
        isFree: true
      },
      {
        title: 'Refactoring.Guru: Design Patterns & SOLID',
        provider: 'Refactoring.Guru',
        type: 'Free Visual Guide',
        url: 'https://refactoring.guru/design-patterns',
        description: 'The cleanest illustrated reference on design patterns, UML class diagrams, and SOLID principles.',
        isFree: true
      },
      {
        title: 'SourceMaking: Design Patterns & Clean Code',
        provider: 'SourceMaking',
        type: 'Free Tutorial',
        url: 'https://sourcemaking.com/design_patterns',
        description: 'Tutorials demonstrating anti-patterns, code smells, and step-by-step refactoring.',
        isFree: true
      },
      {
        title: 'Exercism Object-Oriented Exercises',
        provider: 'Exercism',
        type: 'Free Practice Platform',
        url: 'https://exercism.org/',
        description: 'Code-refactoring track with free automated mentors testing OOP structure in Java, C++, and Python.',
        isFree: true
      }
    ]
  },
  {
    id: 'vlsi',
    name: 'VLSI Design',
    category: 'Hardware & VLSI',
    icon: 'Cpu',
    tagline: 'Semiconductor Engineering, CMOS Logic & ASIC/FPGA Implementation',
    description: 'Design silicon chips: CMOS transistor physics, digital logic families, stick diagrams, Euler paths, setup & hold times, STA, and physical design flow.',
    topics: [
      'MOS Transistor Physics (NMOS, PMOS, Vth, Velocity Saturation)',
      'CMOS Inverter: Static Characteristics, VTC Curve, Noise Margins, Switching Threshold',
      'CMOS Dynamic Power, Static Leakage & RC Delay Models (Elmore Delay)',
      'CMOS Layout, Stick Diagrams, Design Rules & Euler Paths',
      'Static Timing Analysis (STA): Setup Time, Hold Time, Clock Skew, Clock Jitter',
      'Combinational & Sequential Circuit Design (Dynamic Logic, Transmission Gates)',
      'ASIC Design Flow: Synthesis, Floorplanning, Placement, Clock Tree Synthesis (CTS), Routing'
    ],
    learningPath: {
      beginner: [
        'Semiconductor fundamentals, MOSFET operation modes (Cutoff, Linear, Saturation)',
        'CMOS Inverter design, Pull-up Network (PUN) vs Pull-down Network (PDN)',
        'Basic logic gate synthesis (NAND, NOR, XOR) in complementary CMOS'
      ],
      intermediate: [
        'Noise Margins (NML, NMH), Sizing Transistors for symmetric delay (W/L ratios)',
        'Stick Diagrams, Layout design rules (Lambda rules), and Euler graph paths',
        'Propagation delay calculation, Inverter chains, and Logical Effort theory'
      ],
      advanced: [
        'Setup and Hold timing equations, Metastability, and Clock Domain Crossing (CDC)',
        'Static Timing Analysis (STA), Slack calculations, and Critical Path optimization',
        'Physical Design: Floorplanning, Global Routing, and Design for Testability (DFT/BIST)'
      ]
    },
    resources: [
      {
        title: 'NPTEL: VLSI Design Course by IIT Kharagpur',
        provider: 'NPTEL / IIT Kharagpur',
        type: 'YouTube Playlist',
        url: 'https://www.youtube.com/playlist?list=PLbRMhDVUMngcxE_42i_UvYrXybgG_XUv6',
        description: 'Authoritative 40-lecture premier course on CMOS logic, layout, delay modeling, and testability.',
        isFree: true
      },
      {
        title: 'CMOS VLSI Design Online Companion',
        provider: 'Weste & Harris (Harvey Mudd College)',
        type: 'Official Documentation',
        url: 'https://pages.hmc.edu/harris/cmosvlsi/4e/index.html',
        description: 'Course notes, lecture slides, and SPICE models from the world standard textbook on CMOS VLSI design.',
        isFree: true
      },
      {
        title: 'VLSI Expert & Physical Design Guide',
        provider: 'VLSI Expert',
        type: 'Free Tutorial',
        url: 'https://www.vlsiexpert.com/',
        description: 'Industry-level guides on Static Timing Analysis, Clock Tree Synthesis, and physical design.',
        isFree: true
      },
      {
        title: 'OpenROAD & Magic VLSI Tools',
        provider: 'The OpenROAD Project',
        type: 'Free Practice Resource',
        url: 'https://theopenroadproject.org/',
        description: 'Open-source autonomous digital layout generation tool for practicing ASIC silicon flows.',
        isFree: true
      }
    ]
  },
  {
    id: 'verilog',
    name: 'Verilog HDL',
    category: 'Hardware & VLSI',
    icon: 'Activity',
    tagline: 'Hardware Description Language, RTL Modeling & FPGA Synthesis',
    description: 'Model digital hardware in code: structural vs behavioral modeling, blocking vs non-blocking assignments, Finite State Machines, and testbench verification.',
    topics: [
      'Verilog Lexical Conventions, Data Types (wire, reg, integer) & Vector Arrays',
      'Gate-Level, Dataflow (assign) & Behavioral Modeling (always, initial)',
      'Blocking (=) vs Non-blocking (<=) Assignments & Race Conditions',
      'Synchronous & Asynchronous Sequential Circuits (D Flip-Flop, Counters, Shift Registers)',
      'Finite State Machine (FSM) Design: Mealy vs Moore Models & State Encodings',
      'Testbenches: Clock Generation, Stimulus Vectors, $display, $monitor, $dumpvars',
      'Synthesizable vs Non-Synthesizable Verilog Constructs & FPGA Prototyping'
    ],
    learningPath: {
      beginner: [
        'Module declaration, Port definitions (input, output, inout), and Wires vs Regs',
        'Continuous assignment (assign), Bitwise operators, and Multiplexer design',
        'Writing basic structural and dataflow logic for adders, decoders, and ALUs'
      ],
      intermediate: [
        'Behavioral modeling: always @(posedge clk) vs always @(*)',
        'Rules of assignments: Blocking for combinational, Non-blocking for sequential',
        'Designing D Flip-Flops, Synchronous Reset, Mod-N Counters, and Shift Registers'
      ],
      advanced: [
        'Finite State Machines: One-hot vs Gray encoding, Mealy vs Moore state diagrams',
        'Writing comprehensive self-checking testbenches with assertions and tasks',
        'Synthesizing Verilog for Xilinx/Intel FPGAs and timing constraints'
      ]
    },
    resources: [
      {
        title: 'Verilog HDL Tutorial for Beginners',
        provider: 'Neso Academy (YouTube)',
        type: 'YouTube Playlist',
        url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm',
        description: 'Structured clear video lectures explaining Verilog syntax, modeling styles, and testbenches.',
        isFree: true
      },
      {
        title: 'ASIC World: Complete Verilog Tutorial',
        provider: 'ASIC-World (Deepak Kumar Tala)',
        type: 'Free Tutorial',
        url: 'http://www.asic-world.com/verilog/veritut.html',
        description: 'The legendary hardware engineer reference with hundreds of code snippets, FSM examples, and pitfalls.',
        isFree: true
      },
      {
        title: 'ChipVerify Verilog Guide',
        provider: 'ChipVerify',
        type: 'Official Documentation',
        url: 'https://www.chipverify.com/verilog/verilog-tutorial',
        description: 'Comprehensive modern guide covering simulation, synthesis, behavioral constructs, and verification.',
        isFree: true
      },
      {
        title: 'EDA Playground (In-Browser Verilog Simulator)',
        provider: 'Doulos',
        type: 'Free Practice Platform',
        url: 'https://www.edaplayground.com/',
        description: 'Run Verilog code and view live waveform timing diagrams (EPWave) online with free compilers.',
        isFree: true
      }
    ]
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    category: 'AI & Data Science',
    icon: 'Sparkles',
    tagline: 'Intelligent Agents, Heuristic Search & Knowledge Representation',
    description: 'Explore the foundations of AI: State Space Search, A*, Minimax with Alpha-Beta pruning, Propositional & First-Order Logic, Constraint Satisfaction, and Reinforcement Learning.',
    topics: [
      'Agents & Environments: PEAS Descriptions & Rational Agent Architecture',
      'Uninformed Search: BFS, DFS, Depth-Limited, Iterative Deepening, Uniform Cost Search',
      'Informed (Heuristic) Search: Greedy Best-First, A* Search, Admissible & Consistent Heuristics',
      'Adversarial Search: Minimax Algorithm, Alpha-Beta Pruning, Evaluation Functions',
      'Constraint Satisfaction Problems (CSP): Backtracking, Forward Checking, Arc Consistency (AC-3)',
      'Knowledge Representation: Propositional Logic, Inference, First-Order Logic, Resolution',
      'Probabilistic Reasoning: Bayesian Networks, Markov Decision Processes (MDP), Q-Learning'
    ],
    learningPath: {
      beginner: [
        'Definition of AI, Turing Test, Rational Agents, and Environment types',
        'State Space representation, Path cost, and Uninformed Graph/Tree search',
        'Breadth-First and Depth-First algorithms with space/time complexity analysis'
      ],
      intermediate: [
        'Heuristics, A* Search algorithm, proofs of Admissibility and Monotonicity',
        'Game Playing: Minimax algorithm for zero-sum two-player games',
        'Alpha-Beta pruning optimization to reduce evaluated game tree branches'
      ],
      advanced: [
        'Constraint Satisfaction: Constraint graphs, Backtracking search, MRV and Degree heuristics',
        'Logical Agents: Propositional logic, Truth tables, Conjunctive Normal Form (CNF), and Resolution',
        'Markov Decision Processes, Bellman Equations, and Reinforcement Learning (Q-learning)'
      ]
    },
    resources: [
      {
        title: 'CS50\'s Introduction to Artificial Intelligence with Python',
        provider: 'Harvard University (Brian Yu)',
        type: 'Free Online Course',
        url: 'https://cs50.harvard.edu/ai/',
        description: 'Premier foundational course covering search, knowledge, uncertainty, optimization, and learning.',
        isFree: true
      },
      {
        title: 'Artificial Intelligence Full Course',
        provider: 'freeCodeCamp / Edureka',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=JMUxmLyrhSk',
        description: 'Comprehensive overview of AI techniques, algorithms, search graphs, and expert systems.',
        isFree: true
      },
      {
        title: 'UC Berkeley CS 188: Introduction to Artificial Intelligence',
        provider: 'UC Berkeley',
        type: 'Official Documentation',
        url: 'https://inst.eecs.berkeley.edu/~cs188/',
        description: 'The world\'s most popular university AI slides, homework projects (Pacman AI), and exams.',
        isFree: true
      },
      {
        title: 'Berkeley Pacman AI Projects',
        provider: 'UC Berkeley AI Lab',
        type: 'Free Practice Resource',
        url: 'http://ai.berkeley.edu/project_overview.html',
        description: 'Implement search agents, minimax ghosts, and Q-learning in Python within the Pacman game.',
        isFree: true
      }
    ]
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'AI & Data Science',
    icon: 'TrendingUp',
    tagline: 'Supervised, Unsupervised & Deep Learning Fundamentals',
    description: 'Learn data-driven predictive modeling: linear/logistic regression, decision trees, random forests, SVMs, clustering, neural networks, and regularization.',
    topics: [
      'Supervised vs Unsupervised vs Reinforcement Learning Paradigms',
      'Linear Regression, Cost Function, Mean Squared Error (MSE), Gradient Descent',
      'Logistic Regression, Odds Ratio, Sigmoid Function & Cross-Entropy Loss',
      'Bias-Variance Tradeoff, Overfitting, Underfitting, L1 (Lasso) vs L2 (Ridge) Regularization',
      'Decision Trees (Gini Impurity, Information Gain, Entropy) & Ensemble Methods (Random Forest, XGBoost)',
      'Model Evaluation: Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC Curve, Cross-Validation',
      'Unsupervised Learning: K-Means Clustering, Elbow Method, PCA (Principal Component Analysis)'
    ],
    learningPath: {
      beginner: [
        'ML Workflow: Data collection, train/test split, feature scaling, and preprocessing',
        'Simple & Multiple Linear Regression, interpreting slope and intercept',
        'Binary Classification with Logistic Regression and Decision Boundaries'
      ],
      intermediate: [
        'Bias vs Variance: detecting high bias vs high variance and tuning hyperparameters',
        'Evaluation metrics: Precision, Recall, F1-Score, Precision-Recall tradeoffs',
        'Support Vector Machines (SVM), Kernels, and K-Nearest Neighbors (KNN)'
      ],
      advanced: [
        'Tree Ensembles: Bagging (Random Forests) vs Boosting (Gradient Boost, XGBoost)',
        'Dimensionality Reduction with Principal Component Analysis (PCA)',
        'Introduction to Neural Networks, Backpropagation, and Scikit-Learn pipelines'
      ]
    },
    resources: [
      {
        title: 'Machine Learning Specialization by Andrew Ng',
        provider: 'DeepLearning.AI & Stanford (Coursera Free Audit)',
        type: 'Free Online Course',
        url: 'https://www.coursera.org/specializations/machine-learning-introduction',
        description: 'The gold standard machine learning course teaching mathematics and intuition from ground up.',
        isFree: true
      },
      {
        title: 'Machine Learning Course for Beginners',
        provider: 'freeCodeCamp',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=NWONtQFgm60',
        description: 'Hands-on 10-hour course implementing ML models with Python, Pandas, and Scikit-Learn.',
        isFree: true
      },
      {
        title: 'Scikit-Learn User Guide & Documentation',
        provider: 'Scikit-Learn Developers',
        type: 'Official Documentation',
        url: 'https://scikit-learn.org/stable/user_guide.html',
        description: 'Comprehensive tutorials, mathematical formulas, and API reference for Python ML algorithms.',
        isFree: true
      },
      {
        title: 'Kaggle Micro-Courses & Competitions',
        provider: 'Kaggle',
        type: 'Free Practice Platform',
        url: 'https://www.kaggle.com/learn',
        description: 'Hands-on interactive notebooks covering Pandas, Intro to ML, Feature Engineering, and model submission.',
        isFree: true
      }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    category: 'Cloud & Security',
    icon: 'Cloud',
    tagline: 'Distributed Infrastructure, Virtualization, Containers & Cloud Architectures',
    description: 'Design resilient distributed infrastructure: IaaS/PaaS/SaaS models, AWS/Azure core services, virtualization, Docker containers, Kubernetes, serverless, and high availability.',
    topics: [
      'Cloud Service Models (IaaS, PaaS, SaaS) & Deployment Models (Public, Private, Hybrid)',
      'Virtualization: Type 1 & Type 2 Hypervisors, Virtual Machines vs Containers (Docker)',
      'Compute, Storage & Networking: Virtual Servers, Block Storage, Object Storage (S3), VPCs',
      'High Availability, Fault Tolerance, Auto-Scaling & Elastic Load Balancing',
      'The CAP Theorem (Consistency, Availability, Partition Tolerance) & Distributed Systems',
      'Serverless Architecture, Microservices & Event-Driven Functions (AWS Lambda)',
      'Identity and Access Management (IAM), Least Privilege & Cloud Security Fundamentals'
    ],
    learningPath: {
      beginner: [
        'Cloud computing definition, CapEx vs OpEx, and cloud advantages',
        'Understanding IaaS (AWS EC2), PaaS (Heroku/Elastic Beanstalk), and SaaS (Google Workspace)',
        'Core Cloud concepts: Regions, Availability Zones, and Edge Locations'
      ],
      intermediate: [
        'Object Storage (Amazon S3) vs Block Storage (EBS) and lifecycle policies',
        'Virtual Private Clouds (VPC), Subnets, Route Tables, Internet Gateways, and Security Groups',
        'Containerization basics with Docker: Images, Containers, Dockerfiles, and volumes'
      ],
      advanced: [
        'Microservices architecture and container orchestration with Kubernetes (K8s)',
        'Designing High-Availability multi-AZ architectures with Elastic Load Balancers',
        'Serverless Computing, Event-driven pipelines, Infrastructure as Code (Terraform), and IAM'
      ]
    },
    resources: [
      {
        title: 'AWS Certified Cloud Practitioner Training Course',
        provider: 'freeCodeCamp (Andrew Brown)',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=SOTamWNgDKc',
        description: '14-hour complete training covering compute, storage, networking, security, and cloud economics.',
        isFree: true
      },
      {
        title: 'AWS Documentation & Architecture Center',
        provider: 'Amazon Web Services',
        type: 'Official Documentation',
        url: 'https://docs.aws.amazon.com/',
        description: 'Official whitepapers, Well-Architected Framework guides, and service documentation.',
        isFree: true
      },
      {
        title: 'Microsoft Learn: Azure Fundamentals',
        provider: 'Microsoft',
        type: 'Free Interactive Tutorial',
        url: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/',
        description: 'Structured free interactive modules explaining cloud concepts, architecture, and governance.',
        isFree: true
      },
      {
        title: 'Docker & Kubernetes Play-With-Docker Sandbox',
        provider: 'Docker Inc',
        type: 'Free Practice Platform',
        url: 'https://labs.play-with-docker.com/',
        description: 'Free browser-based multi-node terminal sandbox to practice running containers and clusters.',
        isFree: true
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    category: 'Cloud & Security',
    icon: 'Shield',
    tagline: 'Information Security, Cryptography, Vulnerability Assessment & Network Defense',
    description: 'Protect systems and networks: CIA Triad, symmetric/asymmetric encryption, hash algorithms, SQL injection, XSS, CSRF, authentication, firewalls, and penetration testing.',
    topics: [
      'Security Foundations: CIA Triad (Confidentiality, Integrity, Availability), AAA Model',
      'Cryptography: Symmetric (AES) vs Asymmetric (RSA, ECC), Hashing (SHA-256), Digital Signatures',
      'Network Security: Firewalls, IDS/IPS, VPNs, Man-In-The-Middle (MITM) & ARP Spoofing',
      'Web Application Security: OWASP Top 10, SQL Injection, Cross-Site Scripting (XSS), CSRF',
      'Identity & Authentication: Multi-Factor Authentication (MFA), OAuth 2.0, JWT, Passwords Hashing (Bcrypt)',
      'Endpoint Security, Malware Analysis (Trojans, Ransomware), Buffer Overflow Vulnerabilities',
      'Security Operations: SIEM, Incident Response, Zero Trust Architecture, Penetration Testing Flow'
    ],
    learningPath: {
      beginner: [
        'Information Security principles, Threat Actors, Attack Vectors, and Social Engineering',
        'Basic Cryptography: Difference between Encoding, Encryption, and Hashing',
        'Password security, Salting, and Multi-Factor Authentication mechanisms'
      ],
      intermediate: [
        'Network Attacks: Port scanning, Packet sniffing, DoS/DDoS, and DNS Spoofing',
        'OWASP Top 10 Web Vulnerabilities: SQLi, XSS, and broken authentication',
        'Public Key Infrastructure (PKI), SSL/TLS certificates, and asymmetric key exchange'
      ],
      advanced: [
        'Exploitation mechanics: Buffer Overflows, Memory Safety, and Stack Smashing',
        'Implementing Zero Trust Architecture and Network Segmentation',
        'Penetration testing methodology, Vulnerability scanning, and Security Information Event Management'
      ]
    },
    resources: [
      {
        title: 'Cybersecurity for Beginners - Full Course',
        provider: 'freeCodeCamp',
        type: 'YouTube Video',
        url: 'https://www.youtube.com/watch?v=U_P23uqUAtQ',
        description: 'Comprehensive 4-hour introduction to cybersecurity fundamentals, threats, and defensive controls.',
        isFree: true
      },
      {
        title: 'TryHackMe: Free Cyber Security Labs',
        provider: 'TryHackMe',
        type: 'Free Practice Platform',
        url: 'https://tryhackme.com/',
        description: 'Hands-on guided cybersecurity rooms with real virtual machines to practice hacking and defending.',
        isFree: true
      },
      {
        title: 'OWASP Top 10 Official Documentation',
        provider: 'OWASP Foundation',
        type: 'Official Documentation',
        url: 'https://owasp.org/www-project-top-ten/',
        description: 'Authoritative ranking and technical mitigation strategies for the 10 most critical web vulnerabilities.',
        isFree: true
      },
      {
        title: 'PortSwigger Web Security Academy',
        provider: 'PortSwigger (Burp Suite)',
        type: 'Free Interactive Tutorial',
        url: 'https://portswigger.net/web-security',
        description: 'Free interactive security training labs with real vulnerable applications to practice SQLi, XSS, and CSRF.',
        isFree: true
      }
    ]
  }
];

export function getAllCourses() {
  return LEARNING_COURSES;
}

export function getCourseById(courseId) {
  if (!courseId) return null;
  const clean = courseId.trim().toLowerCase();
  return LEARNING_COURSES.find(c => c.id.toLowerCase() === clean);
}

export function getCoursesByCategory(category) {
  if (!category || category === 'All') return LEARNING_COURSES;
  return LEARNING_COURSES.filter(c => c.category.toLowerCase() === category.toLowerCase());
}
