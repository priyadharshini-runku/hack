// High-Toughness Technical & Engineering Assessment Engine
// Every Skill Test in the Learning Hub features 50 Challenging Questions with a 30-Minute Countdown

export const GRAND_50Q_QUESTIONS = [
  {
    "id": 1,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "In an AVL Tree, what is the maximum height difference allowed between the left and right subtrees of any node, and what rotation is needed for a Left-Right (LR) imbalance?",
    "options": [
      "Height difference <= 2; Single Right rotation",
      "Height difference <= 1; Left rotation on left child followed by Right rotation on parent",
      "Height difference <= 1; Right rotation on parent followed by Left rotation on left child",
      "Height difference = 0; Double Left rotation"
    ],
    "correctAnswer": 1,
    "explanation": "An AVL tree maintains a balance factor of {-1, 0, +1}. A Left-Right (LR) imbalance requires a Left rotation on the left child, followed by a Right rotation on the node itself."
  },
  {
    "id": 2,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "What is the amortized time complexity of inserting N elements into a dynamic array that doubles in capacity each time it fills?",
    "options": [
      "O(N) per insertion",
      "O(log N) per insertion",
      "O(1) amortized per insertion, though individual worst-case resize is O(N)",
      "O(N^2) total"
    ],
    "correctAnswer": 2,
    "explanation": "Although doubling the array takes O(K) when copying K elements, resizing happens exponentially infrequently (at 1, 2, 4, 8...), yielding an aggregate cost of ~2N operations for N inserts, or O(1) amortized per operation."
  },
  {
    "id": 3,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "Which of the following shortest path algorithms can correctly handle graphs with NEGATIVE edge weights but NO negative cycles?",
    "options": [
      "Dijkstra's Algorithm with a Min-Heap",
      "Bellman-Ford Algorithm",
      "Prim's Algorithm",
      "Kruskal's Algorithm"
    ],
    "correctAnswer": 1,
    "explanation": "Bellman-Ford algorithm relaxes all edges |V|-1 times and works with negative edge weights. Dijkstra fails on negative edge weights because it greedily locks finalized vertices."
  },
  {
    "id": 4,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "What is the optimal time complexity to find the Kth smallest element in an unsorted array of size N using QuickSelect on average?",
    "options": [
      "O(N log N)",
      "O(N) average time, O(N^2) worst-case",
      "O(K log N)",
      "O(N^2 log K)"
    ],
    "correctAnswer": 1,
    "explanation": "QuickSelect only recurses into one partition (halving the search space each step: N + N/2 + N/4 + ... = 2N), giving O(N) average time complexity."
  },
  {
    "id": 5,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "In a Trie (Prefix Tree) containing W words with a maximum word length of L and alphabet size Sigma, what is the search time complexity for a key of length K?",
    "options": [
      "O(W * L)",
      "O(K) independent of the total number of words W in the dictionary",
      "O(L log W)",
      "O(Sigma * K)"
    ],
    "correctAnswer": 1,
    "explanation": "Trie lookups traverse down node pointers character-by-character. Searching a string of length K takes exactly O(K) time, independent of how many millions of words W exist in the Trie."
  },
  {
    "id": 6,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "Which algorithmic paradigm is strictly required to solve the 0/1 Knapsack Problem with optimal sub-structure and overlapping sub-problems?",
    "options": [
      "Greedy Algorithm (Fractional sorting)",
      "Dynamic Programming (2D memoization or 1D array space optimization)",
      "Divide and Conquer (Merge Sort pattern)",
      "Simple Two-Pointer Technique"
    ],
    "correctAnswer": 1,
    "explanation": "0/1 Knapsack cannot be solved greedily because items cannot be divided. Dynamic Programming handles overlapping sub-problems in O(N * W) pseudo-polynomial time."
  },
  {
    "id": 7,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "In topological sorting of a Directed Graph, which condition guarantees the existence of at least one valid topological ordering?",
    "options": [
      "The graph must be undirected and connected",
      "The graph must be a Directed Acyclic Graph (DAG) with no directed cycles",
      "Every vertex must have equal in-degree and out-degree",
      "The graph must be a complete binary tree"
    ],
    "correctAnswer": 1,
    "explanation": "Topological sorting is only possible for DAGs (Directed Acyclic Graphs). If any directed cycle exists, no linear ordering can satisfy dependency constraints."
  },
  {
    "id": 8,
    "category": "Data Structures & Algorithms",
    "difficulty": "Hard",
    "question": "What is the auxiliary space complexity of Floyd-Warshall All-Pairs Shortest Path algorithm?",
    "options": [
      "O(V) where V is vertices",
      "O(V^2) matrix representation",
      "O(V^3)",
      "O(E log V) where E is edges"
    ],
    "correctAnswer": 1,
    "explanation": "Floyd-Warshall uses a 2D distance matrix of size V * V to store intermediate shortest paths between all pairs of nodes, resulting in O(V^2) auxiliary space."
  },
  {
    "id": 9,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "In React 18 Fiber architecture, how does the Concurrent Renderer allow interruptions during heavy component tree rendering?",
    "options": [
      "By executing React code in separate Web Worker threads",
      "By breaking the render phase into incremental work units (Fibers) yielded via cooperative scheduling",
      "By directly executing assembly code in WebAssembly",
      "By freezing browser event propagation until rendering completes"
    ],
    "correctAnswer": 1,
    "explanation": "React Fiber uses a linked-list work-in-progress tree with cooperative scheduling, pausing rendering to let high-priority browser events (clicks, typing) execute without UI freeze."
  },
  {
    "id": 10,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "Why is functional state update setCount(c => c + 1) necessary inside an interval callback with empty dependency array []?",
    "options": [
      "To prevent infinite re-rendering of the entire DOM",
      "To avoid stale closure bug where count would remain frozen at initial render value inside the interval callback",
      "Because React strict mode forbids integer arithmetic",
      "To convert synchronous state updates into background WebSockets"
    ],
    "correctAnswer": 1,
    "explanation": "With an empty dependency array [], the effect closes over the initial render scope. Using functional state updater setCount(c => c + 1) reads the fresh current state without capturing a stale closure."
  },
  {
    "id": 11,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "What is the exact distinction between useLayoutEffect and useEffect in React?",
    "options": [
      "useLayoutEffect runs asynchronously after browser paint; useEffect runs before painting",
      "useLayoutEffect fires synchronously AFTER DOM mutations but BEFORE the browser paints the screen, blocking visual render until complete",
      "useLayoutEffect only works on mobile browsers",
      "useEffect has access to the DOM while useLayoutEffect does not"
    ],
    "correctAnswer": 1,
    "explanation": "useLayoutEffect runs synchronously after all DOM mutations but before browser paint. It is used when you need to read layout (e.g. measuring element dimensions) and synchronously re-render to avoid visual flicker."
  },
  {
    "id": 12,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "In the JavaScript Event Loop, what is the execution order of: Macrotasks (setTimeout, setInterval), Microtasks (Promise.then, queueMicrotask), and synchronous script code?",
    "options": [
      "Macrotasks -> Microtasks -> Synchronous script",
      "Synchronous script -> Drain entire Microtask queue -> 1 Macrotask -> Drain Microtask queue again",
      "Microtasks -> Synchronous script -> Macrotasks",
      "All tasks execute concurrently in parallel threads"
    ],
    "correctAnswer": 1,
    "explanation": "Synchronous code runs first to completion. The engine then drains all microtasks (promises) before picking the next macrotask (timer) from the macrotask queue, repeating the cycle."
  },
  {
    "id": 13,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "Why does passing an inline object literal or arrow function directly in JSX props cause unnecessary re-renders in a child component wrapped with React.memo?",
    "options": [
      "Because React throws a memory leak error",
      "Because a new object/function reference is created on every parent render, failing shallow equality check Object.is",
      "React.memo only works with integer primitive props",
      "Inline functions disable JSX compilation"
    ],
    "correctAnswer": 1,
    "explanation": "React.memo performs shallow comparison (prevProps === nextProps). Inline objects or functions generate new memory references {} or () => {} on every render, causing the shallow check to fail."
  },
  {
    "id": 14,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "What is Core Web Vital metric INP (Interaction to Next Paint) measuring in modern web performance?",
    "options": [
      "The time taken to download the first HTML document byte",
      "Overall page responsiveness by observing latency of all user interactions (clicks, taps, key presses) throughout the page lifecycle",
      "The total file size of all downloaded CSS stylesheets",
      "The number of images without alt attributes"
    ],
    "correctAnswer": 1,
    "explanation": "INP measures user interface responsiveness across all interactions during a session, reflecting the longest time between a user action and the next visual frame paint."
  },
  {
    "id": 15,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "How does CSS contain: content or contain: strict optimize browser rendering engine performance?",
    "options": [
      "It converts CSS selectors into GPU shaders",
      "It isolates the subtree from the rest of the DOM, allowing the browser to skip layout and paint calculations outside that element",
      "It automatically hides all overflow content with scrollbars",
      "It enforces strict JavaScript typing on DOM nodes"
    ],
    "correctAnswer": 1,
    "explanation": "CSS containment tells the browser that an element subtree is independent of the rest of the page, allowing the browser to isolate paint/layout recalculations."
  },
  {
    "id": 16,
    "category": "Frontend & React Internals",
    "difficulty": "Hard",
    "question": "What is the primary cause of Memory Leaks in Single Page React Applications?",
    "options": [
      "Using CSS variables instead of inline styles",
      "Uncleaned event listeners, uncleared intervals/timeouts, and uncancelled asynchronous subscriptions on unmounted components",
      "Rendering SVG vector icons",
      "Using array .map() in JSX"
    ],
    "correctAnswer": 1,
    "explanation": "Failing to remove window.addEventListener, setInterval, or active RxJS/WebSocket subscriptions inside useEffect cleanup return functions retains component references in memory indefinitely."
  },
  {
    "id": 17,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "According to the CAP Theorem, in a distributed database experiencing a Network Partition (P), what trade-off must architecturally be made?",
    "options": [
      "You can maintain both Consistency (C) and Availability (A) simultaneously with zero trade-offs",
      "You must choose between Consistency (returning errors or blocking writes until partition heals) or Availability (returning stale local data)",
      "Network partitions can be completely prevented using fiber optic cables",
      "Performance (P) is sacrificed for Database Size (S)"
    ],
    "correctAnswer": 1,
    "explanation": "When nodes cannot communicate across a network partition, the system must either refuse requests to guarantee consistency (CP) or answer with potentially divergent data to guarantee availability (AP)."
  },
  {
    "id": 18,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "In a distributed caching architecture using Redis, what is the Cache Avalanche problem and how is it mitigated?",
    "options": [
      "Cache runs out of hard drive storage; fixed by deleting databases",
      "A massive number of cache keys expire simultaneously, causing all client requests to hit the database at once; mitigated by adding random jitter to key TTLs",
      "Network bandwidth saturates; fixed by using UDP instead of TCP",
      "Redis converts to read-only mode permanently"
    ],
    "correctAnswer": 1,
    "explanation": "Cache Avalanche happens when thousands of keys expire at the exact same second, hammering the database. Adding random jitter (e.g. TTL = 3600s + rand(0, 300s)) staggers expirations."
  },
  {
    "id": 19,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "Which Rate Limiting algorithm allows bursts of traffic up to a maximum capacity while processing requests at a strictly constant average rate?",
    "options": [
      "Fixed Window Counter",
      "Leaky Bucket Algorithm (or Token Bucket with rate shaping)",
      "Random Drop Algorithm",
      "Linear Regression Balancer"
    ],
    "correctAnswer": 1,
    "explanation": "Token/Leaky Bucket algorithms allow short bursts up to bucket capacity while smoothly discharging requests at a constant, predictable rate to protect downstream services."
  },
  {
    "id": 20,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "In Microservices architectures, how does the SAGA pattern handle distributed transactions without 2-Phase Commit (2PC) blocking locks?",
    "options": [
      "By locking all databases globally across the network for 60 seconds",
      "By executing a sequence of local transactions where each step publishes an event, and failures trigger compensating rollback transactions backwards",
      "By storing all data in a single monolithic SQL table",
      "By ignoring failed write errors"
    ],
    "correctAnswer": 1,
    "explanation": "Sagas coordinate local transactions. If any step fails, the coordinator (or choreography) executes compensating transactions in reverse order to restore eventual consistency."
  },
  {
    "id": 21,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "What is Consistent Hashing and why is it critical in distributed caching clusters (e.g., Memcached / DynamoDB)?",
    "options": [
      "It encrypts passwords with SHA-256",
      "It maps both keys and servers to a virtual 360-degree ring, so adding or removing a cache node only remaps K/N keys instead of re-hashing all keys",
      "It forces all clients to connect to a single master server",
      "It guarantees zero network latency"
    ],
    "correctAnswer": 1,
    "explanation": "With standard modulo hashing (key % N), changing N invalidates 100% of keys. Consistent hashing on a ring ensures only 1/N of keys need reassignment when nodes join or fail."
  },
  {
    "id": 22,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "What is the purpose of an Idempotency Key in RESTful API payment processing endpoints?",
    "options": [
      "To encrypt credit card numbers",
      "To ensure that duplicate network retries with the same unique key do not execute duplicate billing or charges on the server",
      "To bypass OAuth authentication",
      "To compress HTTP headers"
    ],
    "correctAnswer": 1,
    "explanation": "Network timeouts can cause clients to retry requests. The server stores the Idempotency Key; if a duplicate key arrives, it returns the previous cached response rather than charging the customer twice."
  },
  {
    "id": 23,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "In Event-Driven architectures using Apache Kafka, what determines the maximum level of consumer concurrency within a single Consumer Group?",
    "options": [
      "The number of CPU cores on the producer client machine",
      "The number of partitions configured for that Kafka topic",
      "The total RAM on the ZooKeeper / KRaft controller",
      "The number of active HTTP connections"
    ],
    "correctAnswer": 1,
    "explanation": "In Kafka, each partition in a topic can only be assigned to a single consumer within a consumer group at any given time. Thus, number of active consumers cannot exceed partition count."
  },
  {
    "id": 24,
    "category": "Backend & System Design",
    "difficulty": "Hard",
    "question": "What is the difference between Layer 4 (L4) and Layer 7 (L7) Load Balancers?",
    "options": [
      "L4 balances based on IP and TCP/UDP ports without inspecting packet payload; L7 inspects HTTP headers, cookies, and URL paths for intelligent routing",
      "L4 only works with optical fiber, L7 works with satellite",
      "L4 is strictly software-based, L7 is strictly hardware-based",
      "L7 cannot handle HTTPS encryption"
    ],
    "correctAnswer": 0,
    "explanation": "L4 load balancers operate at transport layer (fast routing via IP:Port). L7 operates at application layer, enabling header manipulation, path-based routing, and SSL termination."
  },
  {
    "id": 25,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "In a Relational Database with a composite B-Tree index on (department_id, salary, hire_date), which query can fully utilize the index?",
    "options": [
      "WHERE salary = 50000 AND hire_date > '2022-01-01' (Skipping leading column)",
      "WHERE department_id = 10 AND salary >= 75000 (Following the Leftmost Prefix Rule)",
      "WHERE hire_date = '2023-05-10' only",
      "WHERE YEAR(hire_date) = 2023"
    ],
    "correctAnswer": 1,
    "explanation": "B-Tree composite indexes strictly obey the Leftmost Prefix rule. The index can only be used if search conditions filter on the leading columns from left to right."
  },
  {
    "id": 26,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "What concurrency phenomenon is prevented by the SERIALIZABLE isolation level that is allowed under REPEATABLE READ in standard SQL?",
    "options": [
      "Dirty Reads",
      "Non-Repeatable Reads",
      "Phantom Reads (inserts by concurrent transactions altering range queries)",
      "Table drop operations"
    ],
    "correctAnswer": 2,
    "explanation": "REPEATABLE READ guarantees existing rows read won't change, but concurrent transactions can insert new matching rows (Phantom Reads). SERIALIZABLE eliminates phantoms via range locks or MVCC validation."
  },
  {
    "id": 27,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "Why does applying a function to an indexed column (e.g. WHERE UPPER(email) = 'USER@EXAMPLE.COM') cause a Full Table Scan?",
    "options": [
      "Because SQL syntax forbids string uppercase conversions",
      "Because the B-Tree index is ordered by raw email values; the engine cannot use index lookup without a functional/expression index",
      "Because strings cannot be indexed in SQL databases",
      "Because uppercase characters take twice as much disk storage"
    ],
    "correctAnswer": 1,
    "explanation": "Functions wrap the column value at query runtime, preventing the B-Tree index from performing binary search seeks unless a functional index was created."
  },
  {
    "id": 28,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "What is the structural difference between a Clustered Index and a Non-Clustered (Secondary) Index in PostgreSQL/MySQL InnoDB?",
    "options": [
      "A Clustered index stores the actual physical table row data in its leaf nodes; secondary indexes store index keys and pointer/Primary Key references",
      "A table can have up to 50 clustered indexes but only 1 non-clustered index",
      "Non-clustered indexes are stored in RAM only and lost on server reboot",
      "Clustered indexes only support integer data types"
    ],
    "correctAnswer": 0,
    "explanation": "In InnoDB, the primary key forms the Clustered Index where leaf pages contain the entire table row. Secondary indexes contain key columns plus the primary key pointer."
  },
  {
    "id": 29,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "What is Database Normalization to Boyce-Codd Normal Form (BCNF)?",
    "options": [
      "Removing all foreign keys from the schema",
      "A stricter version of 3NF where for every functional dependency X -> Y, X must strictly be a Super Key",
      "Duplicating all tables across 3 separate database servers",
      "Converting all relational tables into JSON documents"
    ],
    "correctAnswer": 1,
    "explanation": "BCNF requires that for every non-trivial functional dependency X -> Y, the determinant X must be a super key. It eliminates redundancies not fully caught by standard 3NF."
  },
  {
    "id": 30,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "In PostgreSQL, what is the critical purpose of the VACUUM background process in MVCC (Multi-Version Concurrency Control)?",
    "options": [
      "To reformat the hard drive partitions",
      "To reclaim disk space by removing dead row tuples generated by UPDATE and DELETE operations, and prevent transaction ID wraparound",
      "To compress JPEG images stored as blobs",
      "To terminate slow client connections"
    ],
    "correctAnswer": 1,
    "explanation": "MVCC writes new row versions instead of overwriting in-place. VACUUM cleans up unreachable dead tuples created by updates/deletions and updates visibility maps."
  },
  {
    "id": 31,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "What is the time complexity difference between an INDEX SEEK and an INDEX SCAN in SQL Query Execution Plans?",
    "options": [
      "Index Seek navigates the B-Tree in O(log N) to pinpoint matching rows; Index Scan reads through the entire index leaf chain in O(N)",
      "Index Seek is O(N^2); Index Scan is O(1)",
      "There is no performance difference; they are synonymous",
      "Index Seek is only executed on empty tables"
    ],
    "correctAnswer": 0,
    "explanation": "An Index Seek uses tree traversal (O(log N)) to find specific rows. An Index Scan scans through all leaf pages sequentially (O(N)), which is much slower on large datasets."
  },
  {
    "id": 32,
    "category": "Databases & SQL Optimization",
    "difficulty": "Hard",
    "question": "In SQL Window Functions, what does DENSE_RANK() do compared to RANK() when two rows have identical values?",
    "options": [
      "DENSE_RANK() skips the next rank numbers (e.g. 1, 2, 2, 4); RANK() leaves no gaps (e.g. 1, 2, 2, 3)",
      "DENSE_RANK() leaves no gaps in rank sequence (e.g. 1, 2, 2, 3); RANK() skips subsequent ranks (e.g. 1, 2, 2, 4)",
      "DENSE_RANK() only works with decimal values",
      "DENSE_RANK() deletes tie rows automatically"
    ],
    "correctAnswer": 1,
    "explanation": "RANK() creates gaps in numbering after ties (1, 2, 2, 4), whereas DENSE_RANK() assigns consecutive integers without gaps (1, 2, 2, 3)."
  },
  {
    "id": 33,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "During a TCP 3-Way Handshake, what sequence of flag packets are exchanged between client and server?",
    "options": [
      "ACK -> SYN -> FIN",
      "SYN -> SYN-ACK -> ACK",
      "RST -> SYN -> ACK",
      "PING -> PONG -> ACK"
    ],
    "correctAnswer": 1,
    "explanation": "TCP connection establishment: Client sends SYN packet, Server replies with SYN-ACK packet, and Client completes with ACK packet."
  },
  {
    "id": 34,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "What is the primary architectural improvement of HTTP/2 and HTTP/3 over HTTP/1.1?",
    "options": [
      "HTTP/2 introduced binary multiplexing over single TCP connection; HTTP/3 replaced TCP with QUIC (UDP) to eliminate Head-of-Line (HoL) blocking on packet loss",
      "HTTP/3 abolished SSL/TLS encryption entirely to increase speed",
      "HTTP/2 only supports plain text ASCII data",
      "HTTP/1.1 was faster than HTTP/3"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP/2 multiplexes streams over 1 TCP connection. HTTP/3 runs over QUIC/UDP, isolating streams so one dropped packet doesn't stall other streams."
  },
  {
    "id": 35,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "What are the 4 Coffman conditions required for an Operating System Deadlock to occur?",
    "options": [
      "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
      "High CPU, Low RAM, Network Partition, Disk Full",
      "Single Threading, Garbage Collection, Paging, Virtualization",
      "Semaphore, Mutex, Spinlock, Barrier"
    ],
    "correctAnswer": 0,
    "explanation": "Deadlocks can only happen when all 4 Coffman conditions hold: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait."
  },
  {
    "id": 36,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "How does Virtual Memory Paging translate a Virtual Address to a Physical Memory address in modern OS architectures?",
    "options": [
      "By performing a linear search across all RAM memory sticks",
      "Using the Memory Management Unit (MMU) and Page Tables (accelerated by the Translation Lookaside Buffer / TLB cache)",
      "By saving all addresses to a text file on SSD",
      "By random integer hashing without hardware support"
    ],
    "correctAnswer": 1,
    "explanation": "The MMU splits virtual addresses into page numbers and offsets, checking the TLB cache to resolve physical frame addresses."
  },
  {
    "id": 37,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "What is the security difference between storing JWT authentication tokens in localStorage vs HttpOnly SameSite=Strict Cookies?",
    "options": [
      "localStorage is completely immune to Cross-Site Scripting (XSS); cookies are not",
      "localStorage is vulnerable to theft via JavaScript XSS attacks; HttpOnly cookies cannot be accessed by JS scripts, protecting against XSS token exfiltration",
      "HttpOnly cookies disable HTTPS encryption",
      "Cookies can only store up to 5 bytes of data"
    ],
    "correctAnswer": 1,
    "explanation": "localStorage is accessible to any script running on the page. If XSS occurs, tokens are stolen. HttpOnly flag prevents JavaScript document.cookie access, blocking XSS token theft."
  },
  {
    "id": 38,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "How does modern Prepared Statements (Parameterized Queries) completely neutralize SQL Injection attacks?",
    "options": [
      "By encoding all SQL statements in Base64",
      "By compiling the SQL query template and execution plan on the DB engine first, treating all user inputs strictly as literal parameter data rather than executable code",
      "By blocking all single quote characters from keyboard inputs",
      "By running database queries in sandbox containers"
    ],
    "correctAnswer": 1,
    "explanation": "Parameterized queries compile the AST before parameters are bound. User inputs are treated strictly as scalar data, making injection of arbitrary SQL syntax mathematically impossible."
  },
  {
    "id": 39,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "What is the mathematical foundation of RSA Public-Key Asymmetric Cryptography?",
    "options": [
      "The computational difficulty of factoring the product of two large prime numbers (Prime Factorization Problem)",
      "Computing simple modular arithmetic additions in O(1)",
      "Rotating letters through the Caesar Cipher 256 times",
      "Multiplying floating-point matrices"
    ],
    "correctAnswer": 0,
    "explanation": "RSA security relies on the trapdoor one-way function: multiplying two 2048-bit prime numbers is trivial, but factoring their product back into primes is computationally infeasible."
  },
  {
    "id": 40,
    "category": "OS, Networks & Cyber Security",
    "difficulty": "Hard",
    "question": "What is the purpose of Subnet Mask 255.255.255.0 (/24 CIDR prefix) in IPv4 Networking?",
    "options": [
      "To allow 16 million host addresses on the LAN",
      "To define that the first 24 bits represent the Network ID, leaving the last 8 bits for up to 254 usable Host IP addresses",
      "To encrypt network packets using AES-256",
      "To assign MAC addresses to network switches"
    ],
    "correctAnswer": 1,
    "explanation": "/24 subnet mask specifies 24 bits of network prefix. 8 bits remain for hosts (256 minus network and broadcast addresses = 254 usable hosts)."
  },
  {
    "id": 41,
    "category": "Cloud, DevOps & Linux",
    "difficulty": "Hard",
    "question": "What is the key difference in Git between git merge and git rebase when integrating feature branch changes?",
    "options": [
      "git merge creates a non-linear history with a dedicated merge commit; git rebase replays commits on top of the target base branch creating a linear history",
      "git rebase deletes all commit history forever",
      "git merge can only be used on the master branch",
      "git rebase bypasses merge conflict resolution"
    ],
    "correctAnswer": 0,
    "explanation": "git merge combines branches preserving full chronological branching with a merge commit. git rebase rewrites commit history by transplanting branch commits sequentially on top of master."
  },
  {
    "id": 42,
    "category": "Cloud, DevOps & Linux",
    "difficulty": "Hard",
    "question": "In Docker containerization, how does the copy-on-write (CoW) storage driver (e.g. overlay2) optimize disk usage across multiple containers running the same image?",
    "options": [
      "By duplicating the entire 2GB image file into a new directory for every container",
      "By sharing immutable read-only image layers across all containers, and only allocating storage for a thin writable layer on top when files are modified",
      "By compressing all container processes into zip files in RAM",
      "By disabling disk writes entirely"
    ],
    "correctAnswer": 1,
    "explanation": "Docker images consist of read-only layers. Hundreds of containers share the exact same underlying image layers in memory, only writing modified blocks to their thin container writable layer."
  },
  {
    "id": 43,
    "category": "Cloud, DevOps & Linux",
    "difficulty": "Hard",
    "question": "In Kubernetes architecture, what is the role of the kube-scheduler component on the control plane?",
    "options": [
      "To compile container Dockerfiles into binaries",
      "To evaluate resource requirements, affinity/anti-affinity, taints, and assign newly created unscheduled Pods to suitable worker Nodes",
      "To route external HTTPS web traffic into pods",
      "To backup PostgreSQL databases every night"
    ],
    "correctAnswer": 1,
    "explanation": "kube-scheduler monitors unscheduled pods and determines the most optimal worker node to place each pod based on resource capacity, taints, tolerations, and affinity rules."
  },
  {
    "id": 44,
    "category": "Cloud, DevOps & Linux",
    "difficulty": "Hard",
    "question": "In Linux, what happens when a parent process terminates BEFORE its child process completes?",
    "options": [
      "The child process crashes with segmentation fault",
      "The child becomes an Orphan process and is automatically adopted by init (PID 1 / systemd) to handle exit reaping",
      "The child turns into an unkillable Kernel panic",
      "The entire operating system reboots"
    ],
    "correctAnswer": 1,
    "explanation": "When a parent exits before its child, the child becomes an orphan. The kernel re-parents the orphan to PID 1 (init or systemd), which reaps the child when it finishes."
  },
  {
    "id": 45,
    "category": "Cloud, DevOps & Linux",
    "difficulty": "Hard",
    "question": "What is Blue-Green Deployment strategy and what is its primary operational benefit?",
    "options": [
      "Deploying code only on Mondays and Wednesdays",
      "Maintaining two identical production environments (Blue active, Green staging); switching load balancer router traffic instantly to Green with zero downtime and instant rollback capability",
      "Deploying half of the code in Python and half in Java",
      "Running applications without automated testing"
    ],
    "correctAnswer": 1,
    "explanation": "Blue-Green deployments eliminate downtime. New code is verified on the idle Green environment; once ready, the load balancer switches traffic. If an issue occurs, switching back to Blue is instantaneous."
  },
  {
    "id": 46,
    "category": "Quantitative Aptitude & Logic",
    "difficulty": "Hard",
    "question": "A bag contains 5 Red, 4 Green, and 3 Blue balls. If 3 balls are drawn at random without replacement, what is the exact probability that all 3 balls are of DIFFERENT colors?",
    "options": [
      "3 / 11 (approx 27.27%)",
      "5 / 22",
      "1 / 6",
      "7 / 22"
    ],
    "correctAnswer": 0,
    "explanation": "Total balls = 12. Total ways to pick 3 balls = C(12, 3) = 220. Ways to pick 1 Red, 1 Green, 1 Blue = 5 * 4 * 3 = 60. Probability = 60 / 220 = 3 / 11."
  },
  {
    "id": 47,
    "category": "Quantitative Aptitude & Logic",
    "difficulty": "Hard",
    "question": "Pipe A can fill a tank in 12 hours, Pipe B in 15 hours, and Pipe C can empty the full tank in 20 hours. If all 3 pipes are opened simultaneously, in how many hours will the empty tank be filled completely?",
    "options": [
      "10 hours",
      "8.5 hours",
      "12 hours",
      "15 hours"
    ],
    "correctAnswer": 0,
    "explanation": "LCM of (12, 15, 20) = 60 units. Rate of A = +5 units/hr, Rate of B = +4 units/hr, Rate of C = -3 units/hr. Net rate = 5 + 4 - 3 = 6 units/hr. Time = 60 / 6 = 10 hours."
  },
  {
    "id": 48,
    "category": "Quantitative Aptitude & Logic",
    "difficulty": "Hard",
    "question": "A train traveling at 72 km/h crosses a 250m long railway platform in 25 seconds. What is the length of the train in meters?",
    "options": [
      "250 meters",
      "300 meters",
      "200 meters",
      "180 meters"
    ],
    "correctAnswer": 0,
    "explanation": "Speed = 72 * (5/18) = 20 m/s. Total distance in 25s = 20 * 25 = 500 meters. Distance = Train Length + Platform Length. Train Length = 500 - 250 = 250 meters."
  },
  {
    "id": 49,
    "category": "Quantitative Aptitude & Logic",
    "difficulty": "Hard",
    "question": "In how many distinct ways can the letters of the word ENGINEERING be arranged?",
    "options": [
      "277,200 ways",
      "39,916,800 ways",
      "11! ways",
      "55,440 ways"
    ],
    "correctAnswer": 0,
    "explanation": "Total letters = 11. Counts: E=3, N=3, G=2, I=2, R=1. Total permutations = 11! / (3! * 3! * 2! * 2!) = 39,916,800 / 144 = 277,200."
  },
  {
    "id": 50,
    "category": "Quantitative Aptitude & Logic",
    "difficulty": "Hard",
    "question": "A clock is set right at 5:00 AM. The clock gains 16 minutes in 24 hours. What will be the true time when the clock indicates 10:00 PM on the 4th day?",
    "options": [
      "9:00 PM",
      "9:15 PM",
      "8:45 PM",
      "9:30 PM"
    ],
    "correctAnswer": 0,
    "explanation": "Time from 5:00 AM on day 1 to 10:00 PM on day 4 = 89 hours. 24 hours 16 mins (89/60 days) of this clock = 24 true hours. 89 hours of this clock corresponds exactly to 88 true hours (9:00 PM)."
  }
];

export const getSkillAssessment = (skillName = 'React') => {
  const targetSkill = (skillName && skillName !== 'Grand Exam' && skillName !== 'All-India Grand Exam') 
    ? skillName 
    : 'Full-Stack Software Engineering';

  // Deep clone the 50 tough questions base
  const clonedQuestions = JSON.parse(JSON.stringify(GRAND_50Q_QUESTIONS));

  // Customize header & top questions to target the selected skill while testing broad engineering depth
  return {
    id: `exam_50q_${targetSkill.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    title: `${targetSkill} Advanced Competency Examination`,
    subtitle: `Comprehensive 50-Question Technical & Architectural Benchmark (${targetSkill} & Core Engineering)`,
    skill: targetSkill,
    totalQuestions: 50,
    timeLimitSeconds: 1800, // 30 Minutes
    passingScore: 60, // 60% Passing Benchmark
    categories: [
      `${targetSkill} & Core Concepts`,
      'Data Structures & Algorithms',
      'System Design & Concurrency',
      'Databases & Query Optimization',
      'OS, Networks & Web Security',
      'Cloud, DevOps & Tooling',
      'Quantitative Reasoning'
    ],
    questions: clonedQuestions.map((q, idx) => {
      // For the first question, contextualize with target skill
      if (idx === 0) {
        return {
          ...q,
          category: `${targetSkill} & Architecture`,
          question: `In production enterprise systems using ${targetSkill}, which architectural principle is most critical for ensuring horizontal scalability, low memory footprint, and fault isolation?`,
          options: [
            'Deploying monolithic single-threaded scripts with synchronous file locking',
            'Enforcing stateless service layers, immutable state transforms, modular decoupling, and robust connection pooling',
            'Disabling all caching layers and querying the database directly on every user action',
            'Storing plain-text credentials in client-side code'
          ],
          correctAnswer: 1,
          explanation: `Statelessness, immutability, decoupling, and proper resource management are universal hallmarks of enterprise-grade ${targetSkill} production engineering.`
        };
      }
      return q;
    })
  };
};
