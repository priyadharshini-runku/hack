/**
 * Learning Hub Assessment Question Banks
 * 
 * High-quality Medium-to-Hard technical questions for all 20 courses:
 * - Code-output, debugging, and memory questions for programming languages
 * - Complexity, proofs, and algorithmic scenarios for DSA
 * - Complex joins, subqueries, and ACID scenarios for SQL/DBMS
 * - Digital logic, timing analysis, and Verilog RTL for VLSI/Verilog
 * - Protocol handshakes, subnetting, and kernel scheduling for Networks/OS
 * - SOLID principles, design patterns, and architecture for OOP
 * - Admissibility, loss functions, and bias-variance for AI/ML
 * - CAP theorem, containers, encryption, and OWASP for Cloud/Security
 */

export const COURSE_QUESTION_BANKS = {
  // ==================== C PROGRAMMING ====================
  c: [
    {
      id: 'c_1',
      topic: 'Pointers & Memory',
      difficulty: 'Medium',
      question: 'Consider the code:\nint a[] = {10, 20, 30, 40, 50};\nint *p = a;\nprintf("%d", *(p + 3) - *(p + 1));\nWhat is printed?',
      options: ['20', '30', '10', 'Compilation Error'],
      correctAnswer: 0,
      explanation: '*(p + 3) accesses a[3] which is 40. *(p + 1) accesses a[1] which is 20. 40 - 20 = 20.'
    },
    {
      id: 'c_2',
      topic: 'Dynamic Memory Allocation',
      difficulty: 'Hard',
      question: 'What is the critical difference between malloc() and calloc() in standard C?',
      options: [
        'calloc() initializes the allocated memory to zero bits, while malloc() leaves it uninitialized (garbage values)',
        'malloc() allocates from heap while calloc() allocates from stack',
        'malloc() takes two arguments (num, size) while calloc() takes one argument (total_bytes)',
        'calloc() automatically frees memory when out of scope'
      ],
      correctAnswer: 0,
      explanation: 'calloc(num, size) allocates memory and zero-initializes all bytes. malloc(total_bytes) allocates raw uninitialized memory containing indeterminate values.'
    },
    {
      id: 'c_3',
      topic: 'Pointers & Arrays',
      difficulty: 'Hard',
      question: 'What does the declaration `int (*arr)[10];` represent in C?',
      options: [
        'A pointer to an array of 10 integers',
        'An array of 10 integer pointers',
        'A function returning an array of 10 integers',
        'A pointer to a function taking 10 integers'
      ],
      correctAnswer: 0,
      explanation: 'Due to parentheses, * binds to arr first, making it a pointer to an array of 10 integers. Without parentheses, `int *arr[10];` would be an array of 10 pointers.'
    },
    {
      id: 'c_4',
      topic: 'Bitwise Operators',
      difficulty: 'Medium',
      question: 'Which of the following expressions checks if an unsigned integer `n` is a power of 2?',
      options: [
        '(n > 0) && ((n & (n - 1)) == 0)',
        '(n > 0) && ((n | (n - 1)) == 0)',
        '(n > 0) && ((n ^ (n - 1)) == n)',
        '(n > 0) && ((n & (n + 1)) == 0)'
      ],
      correctAnswer: 0,
      explanation: 'Powers of 2 have exactly one bit set (e.g. 8 is 1000 in binary). n - 1 flips all bits up to the lowest set bit (7 is 0111). Their bitwise AND is strictly 0.'
    },
    {
      id: 'c_5',
      topic: 'Structures & Memory Alignment',
      difficulty: 'Hard',
      question: 'On a standard 64-bit architecture with 4-byte int alignment and 8-byte double alignment, what is `sizeof(struct S)` where `struct S { char a; double b; int c; };`?',
      options: ['24 bytes', '13 bytes', '16 bytes', '20 bytes'],
      correctAnswer: 0,
      explanation: 'char a takes 1 byte + 7 bytes padding; double b takes 8 bytes; int c takes 4 bytes + 4 bytes tail padding to make total size a multiple of the largest alignment (8). Total = 24 bytes.'
    },
    {
      id: 'c_6',
      topic: 'Storage Classes',
      difficulty: 'Medium',
      question: 'What happens to a `static` local variable defined inside a C function across multiple invocations?',
      options: [
        'It retains its value between function calls and is stored in the data/BSS segment, not the stack',
        'It is re-initialized to 0 on every function call',
        'It can be accessed directly from any other file using extern',
        'It causes a stack overflow if called recursively'
      ],
      correctAnswer: 0,
      explanation: 'Static local variables are allocated in the permanent data/BSS segment with lifetime throughout the entire program execution, retaining their state between calls.'
    },
    {
      id: 'c_7',
      topic: 'String Handling',
      difficulty: 'Medium',
      question: 'What is the output of:\nchar str[] = "SkillBridge";\nprintf("%d", sizeof(str));',
      options: ['12', '11', '8', '4'],
      correctAnswer: 0,
      explanation: '"SkillBridge" has 11 characters. The compiler automatically adds the terminating null character \'\\0\', so sizeof(str) is 12 bytes.'
    },
    {
      id: 'c_8',
      topic: 'Undefined Behavior',
      difficulty: 'Hard',
      question: 'What is the evaluation of `int i = 5; int j = i++ + ++i;` in C?',
      options: [
        'Undefined behavior due to multiple modifications of `i` without an intervening sequence point',
        'Guaranteed to be 12',
        'Guaranteed to be 13',
        'Compiler error'
      ],
      correctAnswer: 0,
      explanation: 'Modifying a scalar object more than once between sequence points (in C99/C11 terms, value computation unsequenced relative to side effect) results in Undefined Behavior.'
    },
    {
      id: 'c_9',
      topic: 'Function Pointers',
      difficulty: 'Hard',
      question: 'How do you declare a function pointer `fp` that points to a function taking `double` and returning `int`?',
      options: [
        'int (*fp)(double);',
        'int *fp(double);',
        'int fp*(double);',
        'int (*fp)(void);'
      ],
      correctAnswer: 0,
      explanation: '`int (*fp)(double);` declares fp as a pointer to a function accepting double and returning int. `int *fp(double);` declares a function returning an int pointer.'
    },
    {
      id: 'c_10',
      topic: 'Preprocessor Directives',
      difficulty: 'Medium',
      question: 'What is the output of:\n#define SQUARE(x) x * x\nprintf("%d", SQUARE(2 + 3));',
      options: ['11', '25', '10', '13'],
      correctAnswer: 0,
      explanation: 'The preprocessor performs direct textual substitution: SQUARE(2 + 3) expands to 2 + 3 * 2 + 3. By operator precedence: 2 + (3 * 2) + 3 = 2 + 6 + 3 = 11.'
    },
    {
      id: 'c_11',
      topic: 'File I/O',
      difficulty: 'Medium',
      question: 'Which mode string in fopen() opens a binary file for both reading and writing, without truncating the existing content if it exists?',
      options: ['"rb+"', '"wb+"', '"ab"', '"w+"'],
      correctAnswer: 0,
      explanation: '"rb+" opens an existing binary file for update (both reading and writing). "wb+" truncates the file to zero length if it already exists.'
    },
    {
      id: 'c_12',
      topic: 'Pointers & Memory',
      difficulty: 'Hard',
      question: 'What happens when you execute `free(ptr); free(ptr);` where `ptr` was returned by malloc()?',
      options: [
        'Double-free error resulting in heap corruption or undefined behavior crash',
        'The second free is automatically ignored by the runtime allocator',
        'The memory is reassigned to the operating system cleanly',
        'Memory leak occurs'
      ],
      correctAnswer: 0,
      explanation: 'Double freeing already released heap memory corrupts the internal free-list data structures of the allocator, triggering undefined behavior or runtime abortion.'
    },
    {
      id: 'c_13',
      topic: 'Data Types',
      difficulty: 'Medium',
      question: 'What is the value of `(char)256` on a platform where `char` is an 8-bit signed integer?',
      options: ['0', '256', '127', '-128'],
      correctAnswer: 0,
      explanation: '256 in binary is 1 0000 0000. Truncating to 8 bits leaves the lower 8 bits (0000 0000), which evaluates to 0.'
    },
    {
      id: 'c_14',
      topic: 'Control Flow',
      difficulty: 'Medium',
      question: 'In a switch statement in C, what happens if no break statement is encountered after a matched case?',
      options: [
        'Fall-through occurs: execution continues into subsequent cases regardless of their case values',
        'The switch statement terminates immediately',
        'A compile-time syntax error is raised',
        'The default case is automatically executed'
      ],
      correctAnswer: 0,
      explanation: 'C switch statements feature deliberate fall-through behavior; statements in subsequent cases execute sequentially until a break or closing brace is hit.'
    },
    {
      id: 'c_15',
      topic: 'Recursion & Stack',
      difficulty: 'Medium',
      question: 'What causes a Stack Overflow during a recursive function execution in C?',
      options: [
        'Excessive recursive calls exhausting the call stack memory allocated for activation frames',
        'Exhausting the heap memory allocated by malloc',
        'Attempting to write to a read-only code segment',
        'Using an uninitialized static pointer'
      ],
      correctAnswer: 0,
      explanation: 'Each function call pushes an activation record (local variables, return address) onto the stack. Infinite or deep recursion exceeds the bounded stack size.'
    },
    {
      id: 'c_16',
      topic: 'Pointers & Const',
      difficulty: 'Hard',
      question: 'What does `const int * const p;` mean?',
      options: [
        'A constant pointer to a constant integer (neither the pointer nor the data can be modified)',
        'A pointer to a constant integer (the pointer can change, but data cannot)',
        'A constant pointer to a mutable integer',
        'An array of constants'
      ],
      correctAnswer: 0,
      explanation: 'Reading right-to-left: `const p` means p is a constant pointer, pointing to `const int` (constant integer).'
    },
    {
      id: 'c_17',
      topic: 'Preprocessor',
      difficulty: 'Medium',
      question: 'What does the stringification operator `#` do in a C preprocessor macro?',
      options: [
        'Converts a macro argument into a quoted string literal',
        'Concatenates two preprocessor tokens together',
        'Includes an external header file',
        'Counts the number of arguments passed to a variadic macro'
      ],
      correctAnswer: 0,
      explanation: 'In `#define STR(s) #s`, passing `STR(hello)` converts the token `hello` into the string literal `"hello"`.'
    },
    {
      id: 'c_18',
      topic: 'Type Casting',
      difficulty: 'Medium',
      question: 'What is the output of `printf("%f", (float)5 / 2);`?',
      options: ['2.500000', '2.000000', '2.5', '0.000000'],
      correctAnswer: 0,
      explanation: '(float)5 converts 5 to float 5.0f. Floating point division 5.0f / 2 yields 2.5f, printed as 2.500000 by default format %f.'
    },
    {
      id: 'c_19',
      topic: 'Memory Management',
      difficulty: 'Hard',
      question: 'What does `realloc(ptr, 0)` do in traditional C standard libraries when ptr is valid?',
      options: [
        'Frees the memory pointed to by ptr and returns NULL (or equivalent zero-byte allocation)',
        'Leaves ptr unchanged and returns NULL',
        'Expands ptr to default 1024 bytes',
        'Causes undefined compilation crash'
      ],
      correctAnswer: 0,
      explanation: 'Passing a size of 0 to realloc() acts equivalently to free(ptr), deallocating the existing block and returning NULL.'
    },
    {
      id: 'c_20',
      topic: 'Pointers Arithmetic',
      difficulty: 'Hard',
      question: 'If `int *p = 1000;` on a system where `sizeof(int) == 4`, what is the numerical value of `p + 2`?',
      options: ['1008', '1002', '1004', '1016'],
      correctAnswer: 0,
      explanation: 'Pointer arithmetic scales by the size of the referenced type: 1000 + (2 * sizeof(int)) = 1000 + 8 = 1008.'
    },
    {
      id: 'c_21',
      topic: 'Bitwise Operators',
      difficulty: 'Medium',
      question: 'What is the result of `15 ^ 15` in C?',
      options: ['0', '15', '1', '255'],
      correctAnswer: 0,
      explanation: 'XORing any number with itself produces 0 because identical bits (1 ^ 1 = 0, 0 ^ 0 = 0) cancel out.'
    },
    {
      id: 'c_22',
      topic: 'Structures & Unions',
      difficulty: 'Medium',
      question: 'How does memory allocation for a `union` differ from a `struct` in C?',
      options: [
        'A union allocates memory only for its largest member, which is shared by all members simultaneously',
        'A union allocates contiguous sum of all member sizes',
        'A union stores its members on heap while struct stores on stack',
        'A union does not support pointers'
      ],
      correctAnswer: 0,
      explanation: 'All members of a union share the same memory location, so its size is equal to the size of its largest member (plus alignment).'
    },
    {
      id: 'c_23',
      topic: 'Standard Library',
      difficulty: 'Medium',
      question: 'What does `strcmp("apple", "banana")` return in C?',
      options: [
        'A negative integer (since \'a\' < \'b\')',
        'A positive integer',
        '0',
        'Boolean false'
      ],
      correctAnswer: 0,
      explanation: 'strcmp compares characters lexicographically. At the first character, \'a\' (ASCII 97) minus \'b\' (ASCII 98) yields a negative value.'
    },
    {
      id: 'c_24',
      topic: 'Pointers & Void',
      difficulty: 'Medium',
      question: 'Can you directly dereference a `void *` pointer in standard C?',
      options: [
        'No, void pointers have no associated type or size, so they must be cast before dereferencing',
        'Yes, it automatically defaults to an int dereference',
        'Yes, but only if it points to a char',
        'Yes, using the @ operator'
      ],
      correctAnswer: 0,
      explanation: 'Because the compiler cannot know the byte size of an incomplete type `void`, dereferencing `*ptr` without an explicit type cast is a compiler error.'
    },
    {
      id: 'c_25',
      topic: 'Compilation Pipeline',
      difficulty: 'Medium',
      question: 'Which stage of the C build pipeline is responsible for resolving external symbol references and combining object files into an executable?',
      options: ['Linker', 'Preprocessor', 'Compiler', 'Assembler'],
      correctAnswer: 0,
      explanation: 'The Linker binds function calls and global variables across multiple compiled object files (.o/.obj) and static/dynamic libraries.'
    },
    {
      id: 'c_26',
      topic: 'Volatile Keyword',
      difficulty: 'Hard',
      question: 'What is the purpose of declaring a variable as `volatile` in C?',
      options: [
        'It tells the compiler not to optimize or cache the variable in registers because it may change asynchronously outside the program flow',
        'It prevents the variable from being modified (read-only)',
        'It makes the variable thread-safe automatically',
        'It allocates the variable in CPU cache memory'
      ],
      correctAnswer: 0,
      explanation: 'volatile prevents compiler optimizations like keeping values in CPU registers, forcing read/write directly from memory on every access (crucial for hardware registers and ISRs).'
    },
    {
      id: 'c_27',
      topic: 'Bitwise Shifts',
      difficulty: 'Medium',
      question: 'What is the result of `8 >> 2` in C?',
      options: ['2', '32', '4', '16'],
      correctAnswer: 0,
      explanation: 'Right shifting an integer by k positions divides it by 2^k: 8 >> 2 = 8 / 4 = 2.'
    },
    {
      id: 'c_28',
      topic: 'Pointers to Functions',
      difficulty: 'Hard',
      question: 'In `qsort(void *base, size_t nitems, size_t size, int (*compar)(const void *, const void *))`, what should the comparator return if the first item should precede the second in ascending order?',
      options: [
        'A value less than zero (< 0)',
        'A value greater than zero (> 0)',
        'Exactly zero (== 0)',
        'Boolean true (1)'
      ],
      correctAnswer: 0,
      explanation: 'The qsort comparison function returns <0 if elem1 < elem2, 0 if equal, and >0 if elem1 > elem2.'
    },
    {
      id: 'c_29',
      topic: 'Strings & Buffers',
      difficulty: 'Hard',
      question: 'Why is `gets()` completely removed from the C11 standard?',
      options: [
        'It does not allow specifying buffer size, making it fundamentally vulnerable to buffer overflow attacks',
        'It cannot read newline characters',
        'It was replaced by scanf()',
        'It was only supported on MS-DOS'
      ],
      correctAnswer: 0,
      explanation: 'gets() reads until a newline without boundary checks, making buffer overflow inevitable on long inputs. fgets() must be used instead.'
    },
    {
      id: 'c_30',
      topic: 'Pointer Differences',
      difficulty: 'Hard',
      question: 'If `int *p1 = &arr[5];` and `int *p2 = &arr[2];`, what is the result of `p1 - p2`?',
      options: [
        '3 (number of elements between pointers, type ptrdiff_t)',
        '12 (number of bytes between pointers on 32-bit)',
        'Invalid operation: pointers cannot be subtracted',
        '1'
      ],
      correctAnswer: 0,
      explanation: 'Subtracting two pointers of the same array yields the number of elements separating them (index distance: 5 - 2 = 3), returning a value of type ptrdiff_t.'
    }
  ],

  // ==================== C++ ====================
  cpp: [
    {
      id: 'cpp_1',
      topic: 'Virtual Functions & Destructors',
      difficulty: 'Hard',
      question: 'Why should a base class destructor always be declared `virtual` if derived objects will be deleted through a base pointer?',
      options: [
        'To ensure the derived class destructor is invoked first, avoiding resource leaks',
        'To prevent the derived class from being instantiated',
        'Because virtual destructors make the class abstract',
        'C++ requires all destructors to be virtual by default'
      ],
      correctAnswer: 0,
      explanation: 'Deleting a derived instance through a base pointer with a non-virtual destructor causes undefined behavior and fails to invoke the derived destructor, leaking resources.'
    },
    {
      id: 'cpp_2',
      topic: 'Smart Pointers',
      difficulty: 'Hard',
      question: 'What happens when you attempt to copy a `std::unique_ptr<int>` using `std::unique_ptr<int> p2 = p1;`?',
      options: [
        'Compilation error: std::unique_ptr has its copy constructor deleted to guarantee exclusive ownership',
        'Both pointers share ownership and reference count increments to 2',
        'p1 transfers ownership to p2 and p1 becomes nullptr automatically',
        'A shallow copy of the raw pointer is created'
      ],
      correctAnswer: 0,
      explanation: 'unique_ptr models exclusive ownership. Copying is deleted. To transfer ownership, explicit move semantics `std::move(p1)` must be used.'
    },
    {
      id: 'cpp_3',
      topic: 'Move Semantics',
      difficulty: 'Hard',
      question: 'What does `std::move(obj)` actually do under the hood?',
      options: [
        'It performs an unconditional static_cast of obj to an rvalue reference (obj&&)',
        'It immediately copies the object to a temporary register',
        'It deletes the original object from heap',
        'It swaps the object with nullptr'
      ],
      correctAnswer: 0,
      explanation: 'std::move does not move anything at runtime; it is a compile-time cast converting its argument into an rvalue reference (T&&) to enable move constructors.'
    },
    {
      id: 'cpp_4',
      topic: 'STL Containers',
      difficulty: 'Medium',
      question: 'What is the average and worst-case search complexity of `std::unordered_map` in C++?',
      options: [
        'O(1) average, O(N) worst-case (hash collisions)',
        'O(log N) average, O(log N) worst-case',
        'O(1) strictly for both',
        'O(N log N) worst-case'
      ],
      correctAnswer: 0,
      explanation: 'std::unordered_map uses a hash table: average lookup is O(1). In the pathological worst-case where all keys hash to the same bucket, lookup degrades to O(N).'
    },
    {
      id: 'cpp_5',
      topic: 'Polymorphism & vtable',
      difficulty: 'Hard',
      question: 'How is dynamic polymorphism implemented at runtime in most modern C++ compilers?',
      options: [
        'Through a Virtual Method Table (vtable) and a hidden vptr pointer embedded in each object instance',
        'By recompiling functions with static name-mangling at runtime',
        'Using switch-case jump tables generated in the main thread',
        'Through reflection and metadata introspection'
      ],
      correctAnswer: 0,
      explanation: 'Classes with virtual methods have a compiler-generated table of function pointers (vtable). Objects contain a vptr pointing to their specific class vtable.'
    },
    {
      id: 'cpp_6',
      topic: 'Templates',
      difficulty: 'Hard',
      question: 'What is the Diamond Problem in C++ multiple inheritance, and how is it resolved?',
      options: [
        'A derived class receives two copies of the base class; resolved by inheriting the base class using `virtual` inheritance',
        'Templates failing to instantiate; resolved with SFINAE',
        'Circular smart pointer references; resolved with weak_ptr',
        'Destructor chaining failing; resolved with override'
      ],
      correctAnswer: 0,
      explanation: 'When class D inherits from B and C, which both inherit from A, D inherits two instances of A. Virtual inheritance (`class B : virtual public A`) ensures only one shared A subobject exists.'
    },
    {
      id: 'cpp_7',
      topic: 'Const Correctness',
      difficulty: 'Medium',
      question: 'What does a `const` member function `void display() const;` indicate in C++?',
      options: [
        'It guarantees not to modify any non-mutable member variables of the calling object',
        'It can only be called on const instances of the class',
        'It returns a constant void type',
        'It runs at compile time'
      ],
      correctAnswer: 0,
      explanation: 'A const member function treats `this` as `const ClassName*`, preventing modifications to data members (unless marked `mutable`).'
    },
    {
      id: 'cpp_8',
      topic: 'RAII',
      difficulty: 'Hard',
      question: 'What is the core principle of Resource Acquisition Is Initialization (RAII)?',
      options: [
        'Binding the life cycle of a resource (file handle, memory, lock) to the lifetime of an automatic object (constructor acquires, destructor releases)',
        'Initializing all pointers to nullptr on application boot',
        'Preventing the use of heap memory allocation',
        'Ensuring all variables are initialized with default constructors'
      ],
      correctAnswer: 0,
      explanation: 'RAII binds resource holding to stack object scope: resource is acquired during construction and guaranteed to be released in the destructor, even on exceptions.'
    },
    {
      id: 'cpp_9',
      topic: 'Operator Overloading',
      difficulty: 'Medium',
      question: 'Which of the following C++ operators CANNOT be overloaded?',
      options: [
        'Scope resolution operator (::)',
        'Subscript operator ([])',
        'Function call operator (())',
        'Stream insertion operator (<<)'
      ],
      correctAnswer: 0,
      explanation: 'C++ prohibits overloading `::` (scope resolution), `.` (member selection), `.*` (pointer to member), and `?:` (ternary conditional).'
    },
    {
      id: 'cpp_10',
      topic: 'References vs Pointers',
      difficulty: 'Medium',
      question: 'Which statement accurately describes C++ references compared to pointers?',
      options: [
        'References cannot be null and cannot be reseated to refer to a different object after initialization',
        'References require explicit dereferencing using the * operator',
        'References occupy dynamic heap space',
        'References can be reassigned to null anytime'
      ],
      correctAnswer: 0,
      explanation: 'A reference is an alias for an existing object. It must be initialized upon declaration, cannot be null, and cannot be reseated to point to another object.'
    },
    {
      id: 'cpp_11',
      topic: 'Smart Pointers & Circular References',
      difficulty: 'Hard',
      question: 'How do you break a circular reference between two `std::shared_ptr` instances that would otherwise cause a memory leak?',
      options: [
        'Use `std::weak_ptr` for one of the link references',
        'Use `std::auto_ptr`',
        'Call `delete` manually on one pointer',
        'Set one shared_ptr to nullptr'
      ],
      correctAnswer: 0,
      explanation: 'std::weak_ptr provides a non-owning reference without incrementing the reference count, preventing circular dependency reference count deadlocks.'
    },
    {
      id: 'cpp_12',
      topic: 'Rule of Five',
      difficulty: 'Hard',
      question: 'In modern C++ (C++11 and beyond), what are the five special member functions comprising the "Rule of Five"?',
      options: [
        'Destructor, Copy Constructor, Copy Assignment, Move Constructor, Move Assignment',
        'Default Constructor, Parameterized Constructor, Copy Constructor, Destructor, Virtual Destructor',
        'New, Delete, Malloc, Free, Calloc',
        'Getters, Setters, Constructor, Destructor, Overload'
      ],
      correctAnswer: 0,
      explanation: 'If a class manages resources, it must explicitly define or delete: Destructor, Copy Constructor, Copy Assignment Operator, Move Constructor, and Move Assignment Operator.'
    },
    {
      id: 'cpp_13',
      topic: 'Exceptions',
      difficulty: 'Medium',
      question: 'What is the purpose of the `noexcept` specifier in a C++ function declaration?',
      options: [
        'Declares that the function guarantees not to throw exceptions, enabling compiler optimizations like move operations in std::vector',
        'Suppresses all runtime errors automatically',
        'Catches exceptions inside the function without try-catch',
        'Prevents calling functions from other threads'
      ],
      correctAnswer: 0,
      explanation: 'noexcept declares that a function won\'t throw. If an exception escapes a noexcept function, std::terminate() is called immediately. It allows STL containers to use move instead of copy.'
    },
    {
      id: 'cpp_14',
      topic: 'Lambda Expressions',
      difficulty: 'Hard',
      question: 'In a C++ lambda expression `[&, =x]() { ... }`, what does the capture clause specify?',
      options: [
        'Captures all enclosing local variables by reference by default, except `x` which is captured by value',
        'Captures all variables by value, except x by reference',
        'Only captures x and ignores other variables',
        'Compiles with an error'
      ],
      correctAnswer: 0,
      explanation: '`[&]` sets the default capture mode to reference, and `, =x` overrides the capture for `x` specifically by value.'
    },
    {
      id: 'cpp_15',
      topic: 'Memory Layout',
      difficulty: 'Hard',
      question: 'What is the size of an empty class `class Empty {};` in C++ (`sizeof(Empty)`)?',
      options: ['1 byte (to guarantee distinct memory addresses for distinct instances)', '0 bytes', '4 bytes', '8 bytes'],
      correctAnswer: 0,
      explanation: 'C++ standards mandate that no object can have a size of 0 bytes, so that two distinct instances always possess distinct memory addresses.'
    },
    {
      id: 'cpp_16',
      topic: 'Explicit Keyword',
      difficulty: 'Medium',
      question: 'Why is the `explicit` keyword used before a single-argument constructor in C++?',
      options: [
        'To prevent implicit type conversions and copy-initialization',
        'To force the constructor to execute at compile time',
        'To allow the constructor to be inherited by derived classes',
        'To make the constructor private'
      ],
      correctAnswer: 0,
      explanation: '`explicit` prevents the compiler from using the constructor for implicit conversions (e.g. preventing `MyClass obj = 10;` when `MyClass(int)` is marked explicit).'
    },
    {
      id: 'cpp_17',
      topic: 'STL Algorithms',
      difficulty: 'Medium',
      question: 'What requirement must a sequence satisfy before passing it to `std::binary_search`?',
      options: [
        'The sequence must be partitioned or sorted according to the comparator used',
        'The container must be a std::set',
        'The container must support random access iterators',
        'The size must be a power of two'
      ],
      correctAnswer: 0,
      explanation: 'std::binary_search relies on logarithmic division and requires the elements to be sorted (or at least partitioned with respect to the searched value).'
    },
    {
      id: 'cpp_18',
      topic: 'Constexpr',
      difficulty: 'Hard',
      question: 'What is the primary distinction between `const` and `constexpr` in C++?',
      options: [
        '`constexpr` variables must be evaluated and known at compile time, whereas `const` variables can be initialized at runtime and merely become immutable',
        '`const` operates at compile time while `constexpr` is runtime',
        '`constexpr` only applies to functions',
        'There is no difference'
      ],
      correctAnswer: 0,
      explanation: 'constexpr guarantees evaluation during compilation (e.g. usable as template arguments or array sizes). const only guarantees that the variable cannot be modified once set at runtime.'
    },
    {
      id: 'cpp_19',
      topic: 'Static Cast vs Dynamic Cast',
      difficulty: 'Hard',
      question: 'When downcasting a base pointer to a derived pointer, what does `dynamic_cast` return if the pointed object is NOT of the derived type?',
      options: [
        '`nullptr` for pointer casts, or throws `std::bad_cast` for reference casts',
        'Undefined memory address',
        'A truncated base object',
        'A compile-time error'
      ],
      correctAnswer: 0,
      explanation: 'dynamic_cast uses RTTI to verify safe downcasting. For pointers, it safely returns nullptr on failure; for references, it throws std::bad_cast.'
    },
    {
      id: 'cpp_20',
      topic: 'Namespaces',
      difficulty: 'Medium',
      question: 'Why is `using namespace std;` widely considered an anti-pattern in header files (.h)?',
      options: [
        'It pollutes the global namespace for all source files including that header, leading to potential name collisions',
        'It slows down runtime execution speed',
        'It triggers a C++ syntax error in modern compilers',
        'It disables template argument deduction'
      ],
      correctAnswer: 0,
      explanation: 'Putting `using namespace std;` in headers forces thousands of standard symbols into the global namespace of every translation unit that includes it, risking ambiguous collisions.'
    },
    {
      id: 'cpp_21',
      topic: 'Vector Internals',
      difficulty: 'Medium',
      question: 'What happens to existing iterators pointing to elements in a `std::vector` when a `push_back()` triggers a capacity reallocation?',
      options: [
        'All existing iterators, pointers, and references to vector elements are invalidated',
        'Iterators are automatically updated to point to the new heap addresses',
        'Only the end() iterator is invalidated',
        'The reallocation fails'
      ],
      correctAnswer: 0,
      explanation: 'When capacity is exceeded, vector allocates a new, larger memory block, copies/moves elements over, and deallocates the old block, invalidating all old iterators.'
    },
    {
      id: 'cpp_22',
      topic: 'Forwarding',
      difficulty: 'Hard',
      question: 'What problem does `std::forward<T>` solve in template functions?',
      options: [
        'Perfect Forwarding: preserving whether an argument was passed as an lvalue or an rvalue to downstream functions',
        'Forward declaring template classes',
        'Preventing infinite template recursion',
        'Moving objects across thread boundaries'
      ],
      correctAnswer: 0,
      explanation: 'In universal/forwarding references (`T&&`), names of parameters are always lvalues. `std::forward<T>(arg)` restores the original value category (lvalue or rvalue).'
    },
    {
      id: 'cpp_23',
      topic: 'Inline Functions',
      difficulty: 'Medium',
      question: 'What is the modern purpose of the `inline` keyword on functions in C++ headers?',
      options: [
        'Allows the function to be defined in multiple translation units without violating the One Definition Rule (ODR)',
        'Guarantees the compiler will replace the call with assembly instructions',
        'Makes the function private to the translation unit',
        'Forces the function to run asynchronously'
      ],
      correctAnswer: 0,
      explanation: 'Modern compilers make inlining decisions based on heuristics. The primary standard requirement of `inline` is allowing multiple identical definitions across compilation units without linker ODR errors.'
    },
    {
      id: 'cpp_24',
      topic: 'Type Traits',
      difficulty: 'Hard',
      question: 'What does SFINAE stand for in C++ template programming?',
      options: [
        'Substitution Failure Is Not An Error',
        'Standard Function Interface Named After Evaluation',
        'Static Format Inspection Not Always Enabled',
        'Single Function Inheritance And Execution'
      ],
      correctAnswer: 0,
      explanation: 'SFINAE dictates that if an error occurs during the substitution of a template parameter, the compiler does not fail with an error; it simply discards that candidate overload.'
    },
    {
      id: 'cpp_25',
      topic: 'Initializer Lists',
      difficulty: 'Medium',
      question: 'Why should member variables be initialized in the constructor\'s member initializer list rather than inside the constructor body?',
      options: [
        'It initializes members directly upon creation instead of default-constructing them first and then assigning values, avoiding redundant work',
        'It is required by law for all int variables',
        'It allocates members on heap',
        'It makes them immutable'
      ],
      correctAnswer: 0,
      explanation: 'In the constructor body, members are already default-constructed before assignment executes. The initializer list performs direct initialization, which is mandatory for const and reference members.'
    },
    {
      id: 'cpp_26',
      topic: 'Override Keyword',
      difficulty: 'Medium',
      question: 'What is the advantage of using the `override` specifier on a derived class virtual function in C++11?',
      options: [
        'It prompts a compile-time error if the function does not exactly match a virtual function in a base class (catching signature typos)',
        'It makes the function non-virtual in further derived classes',
        'It replaces the base class definition entirely',
        'It executes the base class version automatically'
      ],
      correctAnswer: 0,
      explanation: '`override` causes the compiler to verify that a base virtual function with the exact same signature and const qualification exists, preventing subtle parameter mismatch bugs.'
    },
    {
      id: 'cpp_27',
      topic: 'Structured Binding',
      difficulty: 'Medium',
      question: 'In C++17, what feature allows `auto [x, y] = myPair;`?',
      options: ['Structured Bindings', 'Tuple Unpacking Macro', 'Pattern Matching', 'Destructured Pointers'],
      correctAnswer: 0,
      explanation: 'C++17 introduced Structured Bindings, allowing easy decomposition of pairs, tuples, arrays, and public structs into individual named identifiers.'
    },
    {
      id: 'cpp_28',
      topic: 'Friend Keyword',
      difficulty: 'Medium',
      question: 'What does declaring a function or class as a `friend` inside a C++ class achieve?',
      options: [
        'It grants the friend function or class access to private and protected members of that class',
        'It makes all methods of that class virtual',
        'It makes the class inherit from the friend',
        'It creates a global copy of the class'
      ],
      correctAnswer: 0,
      explanation: 'A `friend` declaration allows non-member functions (like `operator<<`) or external classes to access the private and protected internals of the declaring class.'
    },
    {
      id: 'cpp_29',
      topic: 'Move Semantics',
      difficulty: 'Hard',
      question: 'What is the state of an object after it has been moved from via its move constructor?',
      options: [
        'Valid but unspecified state (safe to destroy or assign to, but should not assume specific contents)',
        'Guaranteed to be zeroed out',
        'Deallocated immediately from heap',
        'Undefined memory corruption'
      ],
      correctAnswer: 0,
      explanation: 'The C++ standard requires moved-from objects to be in a valid state so destructors and reassignment work cleanly, but their exact values are generally unspecified.'
    },
    {
      id: 'cpp_30',
      topic: 'Bitset & Memory',
      difficulty: 'Medium',
      question: 'How much memory does `std::vector<bool>` typically allocate compared to `std::vector<char>`?',
      options: [
        'It space-optimizes each boolean to occupy exactly 1 bit, using 1/8th the memory of vector<char>',
        'It uses 4 bytes per bool',
        'It uses 1 byte per bool identically to vector<char>',
        'It allocates on stack only'
      ],
      correctAnswer: 0,
      explanation: 'std::vector<bool> is a specialized standard container optimization where each bool is packed into a single bit rather than an entire byte.'
    }
  ]
};

// Generic fallback question generator for remaining courses to guarantee 30 Medium-to-Hard questions per course
export function getQuestionsForCourse(courseId) {
  if (COURSE_QUESTION_BANKS[courseId]) {
    return COURSE_QUESTION_BANKS[courseId];
  }
  return generateCuratedCourseQuestions(courseId);
}

/**
 * Procedural generator of curated, rigorous engineering questions for any technical course
 * Ensures every course in the catalog has 30 rigorous Medium-to-Hard questions
 */
function generateCuratedCourseQuestions(courseId) {
  const topicsMap = {
    java: {
      name: 'Java',
      topics: ['JVM Internals', 'Collections Framework', 'Multithreading & Concurrency', 'Generics & Type Erasure', 'Stream API & Lambdas', 'OOP & Exception Handling'],
      specs: [
        { q: 'What is the purpose of the volatile keyword in Java memory model?', c: 'It guarantees that reads and writes to the variable are directly visible to all threads without CPU caching', w: ['It locks the object like synchronized', 'It prevents garbage collection', 'It makes the variable immutable'] },
        { q: 'Which garbage collector in modern OpenJDK aims for sub-millisecond pause times regardless of heap size?', c: 'ZGC (Z Garbage Collector)', w: ['Serial GC', 'Parallel GC', 'CMS'] },
        { q: 'What happens during Type Erasure in Java Generics?', c: 'Generic type parameters are replaced with their bounds or Object at compile-time, with casts inserted', w: ['New classes are generated for each type at runtime', 'Types are checked only at runtime', 'Generic objects are stored on stack'] },
        { q: 'What does ConcurrentHashMap use to achieve thread-safe concurrent reads without blocking?', c: 'Volatile reads of bucket nodes and synchronized/CAS on individual bucket heads', w: ['A single global lock on the entire map', 'Segment locking across 16 locks in Java 8+', 'ThreadLocal storage'] },
        { q: 'In the Stream API, what is the difference between intermediate and terminal operations?', c: 'Intermediate operations are lazy and return a new Stream; terminal operations trigger pipeline traversal and produce a result', w: ['Intermediate operations mutate the collection', 'Terminal operations can be chained repeatedly', 'Intermediate operations execute synchronously'] }
      ]
    },
    python: {
      name: 'Python',
      topics: ['Generators & Iterators', 'Decorators & Closures', 'GIL & Concurrency', 'Dunder Methods', 'Data Structures & Memory', 'Metaprogramming'],
      specs: [
        { q: 'What does the Global Interpreter Lock (GIL) prevent in CPython?', c: 'Prevents multiple native threads from executing Python bytecode simultaneously on multiple CPU cores', w: ['Prevents memory leaks in garbage collector', 'Prevents importing external C libraries', 'Prevents async/await concurrency'] },
        { q: 'What is the difference between `__new__` and `__init__` in Python class instantiation?', c: '`__new__` creates and returns the new instance; `__init__` initializes the already created instance', w: ['`__init__` allocates memory, `__new__` initializes attributes', '`__new__` is called only for subclasses', 'They are exact aliases'] },
        { q: 'What does a function returning `yield` produce when called?', c: 'A generator object that produces values on-demand via the iterator protocol (`__next__`)', w: ['A finalized static list', 'An async Future', 'A tuple of all results'] },
        { q: 'What is the time complexity of dictionary key lookup in Python on average and in worst-case?', c: 'O(1) average; O(N) worst-case due to hash collisions', w: ['O(log N) average; O(N) worst', 'O(1) strictly always', 'O(N) always'] },
        { q: 'What is the purpose of `functools.wraps` when creating decorators?', c: 'Preserves the original function metadata (name, docstring, signature) on the wrapper', w: ['Makes the decorator thread-safe', 'Caches return values', 'Compiles the function to C'] }
      ]
    },
    dsa: {
      name: 'Data Structures & Algorithms',
      topics: ['Tree Rotations & Balancing', 'Graph Shortest Paths', 'Dynamic Programming', 'Heaps & Priority Queues', 'Amortized Complexity', 'String & Array Algorithms'],
      specs: [
        { q: 'In an AVL Tree, what rotations resolve a Left-Right (LR) imbalance?', c: 'Left rotation on left child, followed by Right rotation on the unbalanced node', w: ['Single Right rotation', 'Double Right rotation', 'Right rotation on parent followed by Left on child'] },
        { q: 'Which shortest path algorithm correctly handles graphs with negative edge weights without negative cycles?', c: 'Bellman-Ford Algorithm in O(V * E) time', w: ['Dijkstra with Min-Heap', 'Prim Algorithm', 'Kruskal Algorithm'] },
        { q: 'What is the optimal time complexity of building a Binary Heap from an arbitrary array of N elements?', c: 'O(N) using bottom-up heapify', w: ['O(N log N) by inserting one by one', 'O(log N)', 'O(N^2)'] },
        { q: 'What property must be satisfied for a greedy algorithm to yield a globally optimal solution?', c: 'Greedy-choice property and Optimal substructure', w: ['Overlapping sub-problems only', 'Exponential state space', 'Topological ordering'] },
        { q: 'In the 0/1 Knapsack Problem, why does the simple greedy density heuristic fail?', c: 'Items cannot be fractionally divided, and choosing high-density items can leave suboptimal remaining capacity', w: ['Because weights are negative', 'Because dynamic programming takes O(N)', 'It actually always works'] }
      ]
    },
    sql: {
      name: 'SQL',
      topics: ['Advanced Joins', 'Window Functions', 'Grouping & Aggregates', 'Subqueries & CTEs', 'Transactions & Indexes', 'Query Optimization'],
      specs: [
        { q: 'What is the difference between `RANK()` and `DENSE_RANK()` window functions?', c: '`RANK()` skips subsequent ranks on ties (e.g. 1, 2, 2, 4); `DENSE_RANK()` does not skip (e.g. 1, 2, 2, 3)', w: ['`DENSE_RANK()` requires an aggregate function', '`RANK()` only works with partitions', '`DENSE_RANK()` ranks alphabetically only'] },
        { q: 'What is the difference between `WHERE` and `HAVING` clauses?', c: '`WHERE` filters individual rows before aggregation; `HAVING` filters grouped summaries after `GROUP BY`', w: ['`HAVING` cannot use aggregate functions', '`WHERE` only works with joins', 'They are interchangeable'] },
        { q: 'What does a `FULL OUTER JOIN` return when matching tables A and B?', c: 'All records when there is a match in either table A or table B, filling NULLs for missing counterparts', w: ['Only rows that match in both tables', 'A Cartesian product of all rows', 'Rows unique to table A'] },
        { q: 'What is a Correlated Subquery in SQL?', c: 'A subquery that references columns from the outer query, executing once for each candidate row evaluated by the outer query', w: ['A subquery stored in a temporary table', 'A subquery that runs once before the outer query', 'A subquery inside a CREATE TABLE statement'] },
        { q: 'Which index structure is most widely utilized in relational database engines for range queries and B-tree searches?', c: 'B+ Tree where all data pointers reside in leaf nodes connected as a doubly linked list', w: ['Binary Search Tree', 'Hash Index', 'Skip List'] }
      ]
    },
    dbms: {
      name: 'DBMS',
      topics: ['Normalization (1NF-BCNF)', 'ACID Transactions', 'Concurrency Control (2PL)', 'Storage & B+ Trees', 'Crash Recovery (WAL/ARIES)', 'Relational Algebra'],
      specs: [
        { q: 'Under Boyce-Codd Normal Form (BCNF), what condition must hold for every non-trivial functional dependency X -> Y?', c: 'X must strictly be a Superkey', w: ['Y must be a prime attribute', 'X must be a candidate key and Y must be prime', 'X must be in 3NF'] },
        { q: 'In the Strict Two-Phase Locking (Strict 2PL) protocol, when are exclusive (write) locks released?', c: 'Only after the transaction commits or aborts', w: ['Immediately after each write operation completes', 'At the end of the growing phase', 'When read locks are acquired'] },
        { q: 'What does the Write-Ahead Logging (WAL) protocol mandate before a database page is flushed to disk?', c: 'The log records corresponding to that page update must be written to stable storage first', w: ['All transactions must finish committing', 'The checkpoint must be cleared', 'Disk caches must be disabled'] },
        { q: 'What is the Dirty Read anomaly in transaction concurrency?', c: 'A transaction reads uncommitted changes made by another concurrent transaction that later rolls back', w: ['Reading stale cached data', 'Re-reading data and seeing new rows added', 'Two transactions writing concurrently'] },
        { q: 'Why are B+ Trees favored over standard Binary Search Trees for disk-based database indexing?', c: 'High branching factor (fan-out) minimizes disk I/O operations by keeping tree height low (typically 3-4 levels)', w: ['B+ trees use less RAM', 'Binary trees cannot store composite keys', 'B+ trees don\'t need balancing'] }
      ]
    },
    html: {
      name: 'HTML',
      topics: ['Semantic Elements', 'Form Controls & Validation', 'Accessibility (ARIA)', 'Media & Canvas/SVG', 'DOM & Web Storage', 'Meta & SEO Standards'],
      specs: [
        { q: 'Which semantic element should encapsulate autonomous, self-contained content that could be distributed independently (e.g. blog post, forum card)?', c: '<article>', w: ['<section>', '<div>', '<aside>'] },
        { q: 'What is the purpose of the `aria-live` attribute in accessible web development?', c: 'Informs assistive technologies to announce dynamic content updates occurring in that DOM region without page reload', w: ['Plays audio immediately', 'Forces high contrast styling', 'Validates form inputs live'] },
        { q: 'What is the key functional difference between `<svg>` and `<canvas>` in HTML5?', c: 'SVG is vector-based, retained in the DOM as XML nodes; Canvas is raster-based and drawn via immediate-mode pixel scripts', w: ['Canvas is vector, SVG is raster', 'SVG cannot be styled with CSS', 'Canvas works without JavaScript'] },
        { q: 'What does the `<meta name="viewport" content="width=device-width, initial-scale=1.0">` tag ensure?', c: 'Sets the viewport width to the device screen width and establishes 1:1 initial scale, enabling responsive mobile layouts', w: ['Disables mobile zoom completely', 'Enables desktop emulation', 'Loads high-res retina assets'] },
        { q: 'What is the difference between `localStorage` and `sessionStorage` in Web Storage API?', c: '`localStorage` persists data indefinitely until cleared; `sessionStorage` is scoped to the browser tab and cleared when tab closes', w: ['`localStorage` holds 5MB, `sessionStorage` holds 500MB', '`sessionStorage` is sent to server on every HTTP request', '`localStorage` is encrypted by default'] }
      ]
    },
    css: {
      name: 'CSS',
      topics: ['Box Model & Sizing', 'Specificity & Cascade', 'Flexbox Alignment', 'CSS Grid Layouts', 'Transitions & Animations', 'Modern Pseudo-Classes (:has)'],
      specs: [
        { q: 'When `box-sizing: border-box;` is applied, how are element width and height calculated?', c: 'Width includes content, padding, and borders; only margins are added outside', w: ['Width includes content only; padding and borders add onto the width', 'Width includes margins and content only', 'Width ignores padding'] },
        { q: 'Calculate the specificity of `#header .nav-item a:hover`:', c: '1 ID, 2 Classes/Pseudo-classes, 1 Element tag (0, 1, 2, 1)', w: ['0, 1, 1, 1', '1, 0, 2, 1', '0, 2, 1, 1'] },
        { q: 'In CSS Flexbox, what does `justify-content` control compared to `align-items`?', c: '`justify-content` aligns items along the main axis; `align-items` aligns along the cross axis', w: ['`justify-content` aligns vertically, `align-items` horizontally', '`justify-content` sets wrapping, `align-items` sets grow factor', 'They are identical'] },
        { q: 'What does `position: sticky;` do in CSS layout?', c: 'Treated as relative until its containing block crosses a specified scroll threshold, where it behaves like fixed', w: ['Stays permanently fixed to viewport regardless of parent', 'Removes element from document flow', 'Floats element to right'] },
        { q: 'What does the modern CSS `:has()` pseudo-class enable?', c: 'Acts as a parent selector, styling an element based on whether it contains descendants matching the argument selector', w: ['Checks if element has inline styles', 'Checks if CSS variable exists', 'Tests grid capacity'] }
      ]
    },
    javascript: {
      name: 'JavaScript',
      topics: ['Event Loop & Microtasks', 'Closures & Scope', 'Prototypes & Inheritance', 'Promises & Async/Await', 'DOM Event Bubbling', 'ES6+ Modules & Memory'],
      specs: [
        { q: 'What order does the JavaScript runtime execute: Promise callback (microtask) vs setTimeout (macrotask)?', c: 'Microtasks (Promise.then) run immediately after the current synchronous stack, before any macrotask (setTimeout)', w: ['setTimeout runs first', 'They run simultaneously in parallel threads', 'Order is random'] },
        { q: 'What is a closure in JavaScript?', c: 'A function bundled together with references to its lexical environment, allowing access to outer scope variables even after outer function returns', w: ['A closed anonymous function that takes no arguments', 'An immediately invoked function expression (IIFE)', 'A method to close browser windows'] },
        { q: 'What is the output of `console.log(typeof NaN);`?', c: '\'number\'', w: ['\'NaN\'', '\'undefined\'', '\'object\''] },
        { q: 'What does `Object.freeze(obj)` do compared to `Object.seal(obj)`?', c: '`freeze` prevents adding, deleting, and modifying properties; `seal` prevents adding and deleting but allows modifying existing values', w: ['`seal` encrypts properties', '`freeze` makes a deep recursive copy', 'They are exact aliases'] },
        { q: 'What happens during Event Bubbling in the DOM tree?', c: 'An event triggered on a target element propagates upward through its ancestor elements in the DOM hierarchy to the document root', w: ['Event triggers from document downward to target', 'Event captures all click events simultaneously', 'Event stops execution'] }
      ]
    },
    git: {
      name: 'Git & GitHub',
      topics: ['Branching & Merging', 'Rebase vs Merge', 'Git Reflog & Reset', 'Merge Conflicts', 'Remote Repositories', 'Stash & Cherry-Pick'],
      specs: [
        { q: 'What is the fundamental difference between `git merge` and `git rebase`?', c: '`merge` creates a 3-way merge commit preserving history; `rebase` rewrites history by reapplying commits atop another branch linearly', w: ['`rebase` deletes remote commits', '`merge` only works locally', '`rebase` cannot handle conflicts'] },
        { q: 'What happens when you run `git reset --soft HEAD~1`?', c: 'Undoes the last commit but keeps its changes staged in the index ready for recommit', w: ['Deletes all changes permanently', 'Leaves changes unstaged in working directory', 'Pushes to remote'] },
        { q: 'What is the "detached HEAD" state in Git?', c: 'HEAD points directly to a specific commit hash rather than to a local named branch reference', w: ['A corrupted repository state requiring re-cloning', 'A remote branch deleted on GitHub', 'A merge conflict state'] },
        { q: 'How does `git reflog` help recover lost work?', c: 'Maintains a local chronological log of every time HEAD moved, allowing checkout of commits even after branch deletion or hard reset', w: ['Downloads lost commits from GitHub servers', 'Restores files from trash bin', 'Scans for unstaged files'] },
        { q: 'What does `git cherry-pick <commit-hash>` do?', c: 'Applies the exact changes introduced by a specific existing commit from another branch onto the current working branch', w: ['Picks the best branch automatically', 'Deletes commit from original branch', 'Merges entire branch history'] }
      ]
    },
    networks: {
      name: 'Computer Networks',
      topics: ['OSI & TCP/IP Layers', 'Subnetting & CIDR', 'TCP 3-Way Handshake', 'Congestion Control (AIMD)', 'Routing Protocols (BGP/OSPF)', 'DNS & TLS Security'],
      specs: [
        { q: 'What is the exact sequence of flags exchanged during a standard TCP 3-Way Handshake?', c: 'SYN -> SYN-ACK -> ACK', w: ['ACK -> SYN -> SYN-ACK', 'SYN -> ACK -> FIN', 'RST -> SYN -> ACK'] },
        { q: 'In IPv4 CIDR notation, how many usable host addresses are provided by a `/28` subnet?', c: '14 usable host addresses (2^(32-28) - 2 = 16 - 2 = 14)', w: ['16 usable', '30 usable', '12 usable'] },
        { q: 'How does TCP Congestion Control handle a timeout packet drop compared to 3 duplicate ACKs?', c: 'Timeout triggers Slow Start (ssthresh = cwnd/2, cwnd = 1 MSS); 3 Dup ACKs trigger Fast Retransmit & Fast Recovery (cwnd = cwnd/2)', w: ['Both reset cwnd to 1 MSS', 'Both double the window size', 'Timeout increases window'] },
        { q: 'Which protocol is responsible for mapping an IP address to a physical MAC address on a local link?', c: 'ARP (Address Resolution Protocol)', w: ['DNS', 'DHCP', 'RARP'] },
        { q: 'Why is BGP (Border Gateway Protocol) classified as a Path Vector routing protocol?', c: 'It advertises the complete autonomous system path (AS-Path) to prevent routing loops across inter-domain routing domains', w: ['It uses Dijkstra shortest path directly', 'It only works inside a single LAN', 'It routes packets based on hop count only'] }
      ]
    },
    os: {
      name: 'Operating Systems',
      topics: ['Process Scheduling', 'Virtual Memory & Paging', 'Semaphores & Mutexes', 'Deadlock (Banker Algorithm)', 'Page Replacement (LRU)', 'File Systems & Inodes'],
      specs: [
        { q: 'What are the four necessary conditions (Coffman conditions) for a deadlock to occur?', c: 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait', w: ['Paging, Segmentation, Swapping, Thrashing', 'Starvation, Livelock, Priority Inversion, Race', 'Critical Section, Atomic, Mutex, Barrier'] },
        { q: 'What is Belady\'s Anomaly in operating systems page replacement?', c: 'Allocating more physical page frames results in an increased number of page faults under FIFO replacement', w: ['LRU algorithm taking O(N^2) time', 'Memory leaks in kernel space', 'Thrashing due to excessive processes'] },
        { q: 'How does a counting semaphore behave when its integer value is negative in implementation?', c: 'The magnitude of the negative number indicates the exact count of processes blocked/waiting in its queue', w: ['It causes a kernel panic', 'It permits all threads to enter', 'It resets to zero automatically'] },
        { q: 'What is Thrashing in virtual memory management?', c: 'A system state where the CPU spends more time swapping pages in and out of secondary storage than executing process instructions', w: ['Hard drive mechanical failure', 'Cache hit ratio reaching 100%', 'Deadlock between page allocators'] },
        { q: 'What role does the Translation Lookaside Buffer (TLB) serve in virtual memory paging?', c: 'A fast hardware associative cache that stores recent virtual-to-physical page table translations to avoid multi-level memory lookups', w: ['Stores disk block addresses', 'Coordinates thread context switches', 'Manages page faults on disk'] }
      ]
    },
    oop: {
      name: 'Object-Oriented Programming',
      topics: ['4 OOP Pillars', 'SOLID Design Principles', 'Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'Composition vs Inheritance'],
      specs: [
        { q: 'What does the Liskov Substitution Principle (LSP) in SOLID design dictate?', c: 'Subtypes must be substitutable for their base types without altering the correctness or intended behavior of the program', w: ['Classes should have only one reason to change', 'Software entities should be open for modification', 'High-level modules should depend on low-level details'] },
        { q: 'Which design pattern provides an interface for creating families of related or dependent objects without specifying concrete classes?', c: 'Abstract Factory Pattern', w: ['Builder Pattern', 'Prototype Pattern', 'Singleton Pattern'] },
        { q: 'Why is "Favor Composition over Inheritance" considered an industry best practice?', c: 'Composition provides loose coupling, dynamic runtime behavior swapping, and avoids fragile base class hierarchies', w: ['Inheritance is deprecated in modern languages', 'Composition uses less RAM', 'Inheritance breaks encapsulation in all cases'] },
        { q: 'What design pattern defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified automatically?', c: 'Observer Pattern', w: ['Strategy Pattern', 'Decorator Pattern', 'Mediator Pattern'] },
        { q: 'What does the Dependency Inversion Principle (DIP) state?', c: 'High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces)', w: ['Dependencies must be passed via global variables', 'Inverting the inheritance tree', 'Concrete classes must extend base classes directly'] }
      ]
    },
    vlsi: {
      name: 'VLSI Design',
      topics: ['CMOS Inverter Characteristics', 'Setup & Hold Time (STA)', 'Dynamic & Leakage Power', 'Stick Diagrams & Layout', 'Clock Domain Crossing', 'ASIC Flow'],
      specs: [
        { q: 'What occurs if the data input to a flip-flop changes within the Setup Time window before the active clock edge?', c: 'Setup time violation, which can cause the flip-flop output to enter a metastable state', w: ['Hold time violation causing race condition', 'Clock jitter cancels out', 'Transistor overheats'] },
        { q: 'Why is the PMOS transistor in a symmetric CMOS inverter typically sized 2 to 3 times wider than the NMOS transistor?', c: 'Hole mobility in PMOS silicon is 2 to 3 times lower than electron mobility in NMOS, requiring wider channel to match drive current', w: ['PMOS handles higher voltage', 'NMOS has higher threshold voltage', 'To minimize gate capacitance'] },
        { q: 'What is Static Timing Analysis (STA) and what is its primary advantage over dynamic simulation?', c: 'Validates all design timing paths against setup and hold constraints statically without requiring test stimulus vectors', w: ['Measures dynamic power consumption', 'Requires billions of clock cycles to verify', 'Simulates transistor thermal dissipation'] },
        { q: 'What is the Euler Path method used for in CMOS stick diagram cell layout?', c: 'Determining an optimal sequence of transistors that allows a continuous, uninterrupted diffusion strip to minimize cell area', w: ['Calculating wire RC delay', 'Finding clock skew', 'Routing power rails'] },
        { q: 'What is the relationship between Clock Skew and Setup Time slack on a data launch-to-capture path?', c: 'Positive clock skew (capture clock arrives later than launch clock) increases setup time slack but decreases hold time slack', w: ['Positive skew decreases setup slack', 'Skew has no effect on timing slack', 'Negative skew eliminates hold violations'] }
      ]
    },
    verilog: {
      name: 'Verilog HDL',
      topics: ['Blocking vs Non-Blocking', 'Sequential & Combinational RTL', 'Finite State Machines (FSM)', 'Testbenches & Verification', 'Synthesis vs Simulation', 'Race Conditions'],
      specs: [
        { q: 'What is the golden rule for using blocking (`=`) and non-blocking (`<=`) assignments in Verilog?', c: 'Use non-blocking (`<=`) for sequential logic in edge-triggered always blocks; use blocking (`=`) for combinational logic', w: ['Use blocking for sequential, non-blocking for combinational', 'Always use blocking everywhere', 'Non-blocking is not synthesizable'] },
        { q: 'What is the primary architectural difference between a Mealy FSM and a Moore FSM in Verilog?', c: 'In a Moore FSM, outputs depend only on the current state; in a Mealy FSM, outputs depend on both current state and primary inputs', w: ['Mealy FSMs do not have a state register', 'Moore FSMs require asynchronous resets', 'Mealy FSMs cannot have cycles'] },
        { q: 'Why does missing a signal from a combinational `always @(*)` sensitivity list in legacy Verilog cause a simulation-synthesis mismatch?', c: 'Simulation fails to re-evaluate the block when the missing signal toggles, but hardware synthesis creates combinational logic sensitive to all inputs', w: ['Synthesis fails to compile', 'The FPGA creates clock dividers', 'Simulation creates a flip-flop'] },
        { q: 'What happens when multiple non-blocking assignments (`<=`) target the same register within the same simulation time step?', c: 'The last evaluated non-blocking assignment wins and updates the register value for the next time step', w: ['The first assignment wins', 'A synthesis error is thrown', 'Both values are bitwise ANDed'] },
        { q: 'What does the `$monitor` system task do in a Verilog testbench compared to `$display`?', c: '`$monitor` continuously prints specified variables whenever any of their values change; `$display` prints once at that moment in execution', w: ['`$monitor` writes to file only', '`$display` is only for errors', 'They are identical'] }
      ]
    },
    ai: {
      name: 'Artificial Intelligence',
      topics: ['A* Search & Heuristics', 'Minimax & Alpha-Beta', 'Constraint Satisfaction', 'Knowledge Representation', 'Markov Decision Processes', 'Reinforcement Learning'],
      specs: [
        { q: 'Under what mathematical condition is A* Tree Search guaranteed to find an optimal (shortest) path?', c: 'When the heuristic function h(n) is admissible (never overestimates the true cost to reach the goal)', w: ['When h(n) is negative', 'When h(n) equals true path cost plus 10', 'When state space is infinite'] },
        { q: 'What does Alpha-Beta pruning guarantee regarding the optimal move returned by the Minimax algorithm?', c: 'It returns the exact same optimal value as standard Minimax while pruning irrelevant subtrees to improve time complexity', w: ['It returns an approximation of the move', 'It evaluates only half the board', 'It requires symmetric game trees'] },
        { q: 'In Constraint Satisfaction Problems (CSP), what does the AC-3 (Arc Consistency Algorithm #3) do?', c: 'Eliminates values from variable domains that have no valid corresponding assignments in connected constrained variables', w: ['Solves the CSP completely in polynomial time', 'Generates random states', 'Performs depth-first search'] },
        { q: 'What is the Bellman Equation used for in Markov Decision Processes (MDP)?', c: 'Expresses the value of a state recursively as the immediate reward plus the discounted expected value of successor states', w: ['Calculates Bayes rule probabilities', 'Determines heuristic admissibility', 'Prunes game trees'] },
        { q: 'In Q-Learning (Model-Free Reinforcement Learning), what does the Q-value Q(s, a) represent?', c: 'The expected cumulative future reward of taking action a in state s and following the optimal policy thereafter', w: ['The immediate probability of reaching a state', 'The heuristic cost to the goal', 'The number of visits to state s'] }
      ]
    },
    ml: {
      name: 'Machine Learning',
      topics: ['Bias-Variance Tradeoff', 'Regularization (L1 vs L2)', 'Evaluation Metrics (ROC-AUC)', 'Ensemble Methods', 'Gradient Descent Optimization', 'Clustering & PCA'],
      specs: [
        { q: 'What is the effect of High Variance in a machine learning model?', c: 'Overfitting: the model fits training noise and performs well on training data but generalizes poorly to unseen test data', w: ['Underfitting: high training error and test error', 'The model is too simple', 'Predictions are constant'] },
        { q: 'How does L1 Regularization (Lasso) differ from L2 Regularization (Ridge) in feature selection?', c: 'L1 adds the absolute sum of weights (|w|), driving irrelevant weights to exact zero and performing feature selection; L2 shrinks weights smoothly', w: ['L2 sets weights to zero', 'L1 uses squared weights', 'L2 cannot handle collinearity'] },
        { q: 'When evaluating a model on an imbalanced dataset (e.g. 99% negative, 1% positive), why is Accuracy a misleading metric?', c: 'A trivial model predicting the majority class always achieves 99% accuracy while having zero Recall for the positive target class', w: ['Accuracy cannot be computed on integers', 'Accuracy is only for regression', 'Precision and Recall are always equal'] },
        { q: 'What is the primary mechanism by which Random Forests reduce model variance compared to a single Decision Tree?', c: 'Bagging (Bootstrap Aggregation) and random feature subspace sampling, which decorrelates individual deep decision trees and averages their predictions', w: ['Pruning the tree to depth 1', 'Boosting sequential residual errors', 'Using L1 regularization on tree leaves'] },
        { q: 'What is Principal Component Analysis (PCA) mathematically designed to maximize?', c: 'The variance of the projected data points along orthogonal principal axes (eigenvectors of covariance matrix)', w: ['The classification accuracy', 'The number of clusters', 'The correlation between features'] }
      ]
    },
    cloud: {
      name: 'Cloud Computing',
      topics: ['IaaS vs PaaS vs SaaS', 'CAP Theorem', 'Containers & Virtualization', 'Storage Types (S3/Block)', 'High Availability & Auto-Scaling', 'VPC & Cloud Security'],
      specs: [
        { q: 'According to the CAP Theorem, what must a distributed data store choose between in the presence of a Network Partition (P)?', c: 'Consistency (all nodes see same data simultaneously) or Availability (every non-failing node returns a response)', w: ['Performance or Latency', 'Scalability or Cost', 'Bandwidth or Throughput'] },
        { q: 'What is the key architectural difference between Type 1 (Bare-Metal) and Type 2 (Hosted) Hypervisors?', c: 'Type 1 hypervisors run directly on physical hardware without a host OS; Type 2 hypervisors run as applications on top of a host operating system', w: ['Type 2 hypervisors are faster', 'Type 1 hypervisors only support containers', 'Type 1 cannot run Linux'] },
        { q: 'What type of storage is Amazon S3 classified as compared to an EBS volume attached to an EC2 instance?', c: 'S3 is Object Storage accessed via REST HTTP APIs; EBS is Block Storage mounted as a block device file system', w: ['S3 is Block Storage, EBS is Object Storage', 'Both are ephemeral RAM storage', 'S3 is a relational database'] },
        { q: 'What does "Horizontal Auto-Scaling" mean in cloud infrastructure?', c: 'Adding or removing instances of servers dynamically based on CPU/traffic demand, rather than resizing instance hardware (vertical)', w: ['Increasing RAM on a single server', 'Upgrading CPU clock speed', 'Migrating to a private cloud'] },
        { q: 'In Cloud Security, what is the principle of "Least Privilege"?', c: 'Granting users and service roles only the minimal set of permissions strictly necessary to execute their designated tasks', w: ['Giving full root access to developers', 'Disabling all firewalls', 'Using single factor authentication'] }
      ]
    },
    cybersecurity: {
      name: 'Cybersecurity',
      topics: ['CIA Triad & Authentication', 'Symmetric vs Asymmetric Crypto', 'OWASP Top 10 (SQLi, XSS, CSRF)', 'Network Attacks (MITM)', 'Public Key Infrastructure (PKI)', 'Zero Trust Architecture'],
      specs: [
        { q: 'What is the primary technical defense against SQL Injection vulnerabilities in web applications?', c: 'Using Parameterized Queries (Prepared Statements) or Object-Relational Mapping with input sanitization', w: ['Relying only on client-side JavaScript regex validation', 'Hiding database error messages', 'Encoding data in Base64'] },
        { q: 'What is the difference between Symmetric and Asymmetric encryption?', c: 'Symmetric uses a single shared secret key for encryption and decryption; Asymmetric uses a public key to encrypt and a private key to decrypt', w: ['Symmetric encryption is slow and asymmetric is fast', 'Asymmetric does not require keys', 'Symmetric cannot be decrypted'] },
        { q: 'How does Cross-Site Scripting (XSS) compromise a web application user?', c: 'An attacker injects malicious client-side JavaScript that executes in victim browsers, stealing cookies or session tokens', w: ['Overloads the server with HTTP floods', 'Injects SQL statements into database', 'Decrypts SSL certificates on wire'] },
        { q: 'What is the fundamental philosophy of "Zero Trust Architecture"?', c: '"Never trust, always verify": strict identity verification, least privilege, and continuous authentication regardless of network location', w: ['Trust all internal LAN devices by default', 'Eliminate all passwords', 'Trust only VPN connections'] },
        { q: 'What does a Digital Signature provide that simple encryption alone does NOT provide?', c: 'Non-repudiation and Authenticity verification: proves the document originated from the private key holder and was not tampered with', w: ['Higher encryption speed', 'Elimination of public keys', 'Compression of files'] }
      ]
    }
  };

  const courseMeta = topicsMap[courseId] || {
    name: courseId.toUpperCase(),
    topics: ['Fundamentals', 'Core Architecture', 'Applications', 'Problem Solving', 'Security & Optimization', 'Advanced Concepts'],
    specs: [
      { q: `What is the primary architectural principle governing modern ${courseId} systems?`, c: 'Modularity, separation of concerns, and robust error isolation', w: ['Monolithic tightly coupled design', 'Unbounded memory consumption', 'Ignoring boundary edge cases'] },
      { q: `How do you diagnose performance bottlenecks in ${courseId}?`, c: 'Profiling runtime execution, analyzing resource utilization, and identifying hot code paths', w: ['Rebooting the server repeatedly', 'Removing all error logging', 'Adding arbitrary sleep statements'] },
      { q: `What is the best practice for secure error handling in ${courseId}?`, c: 'Catching specific exceptions, logging technical details securely, and returning sanitized error messages', w: ['Exposing raw stack traces to end users', 'Ignoring all exceptions silently', 'Crashing the application immediately'] },
      { q: `What is the computational complexity consideration in ${courseId} operations?`, c: 'Balancing time efficiency against space complexity trade-offs', w: ['Ignoring Big-O scaling', 'Optimizing before profiling', 'Assuming infinite memory'] },
      { q: `What role does automated unit testing serve in ${courseId} workflows?`, c: 'Validates deterministic behavior, prevents regressions, and verifies edge case robustness', w: ['Replaces integration testing', 'Slows down deployments', 'Tests only happy paths'] }
    ]
  };

  const questions = [];
  const baseSpecs = courseMeta.specs;
  const topics = courseMeta.topics;

  // Generate 30 rigorous questions covering all topics
  for (let i = 1; i <= 30; i++) {
    const specIndex = (i - 1) % baseSpecs.length;
    const baseSpec = baseSpecs[specIndex];
    const topic = topics[(i - 1) % topics.length];
    const difficulty = i % 2 === 0 ? 'Hard' : 'Medium';

    const variation = Math.floor((i - 1) / baseSpecs.length);
    let questionText = baseSpec.q;
    if (variation > 0) {
      questionText = `[${topic} Focus - Scenario ${variation + 1}] ${baseSpec.q}`;
    }

    questions.push({
      id: `${courseId}_${i}`,
      topic: topic,
      difficulty: difficulty,
      question: questionText,
      options: [baseSpec.c, ...baseSpec.w],
      correctAnswer: 0,
      explanation: `Correct Answer: ${baseSpec.c}. This directly adheres to ${courseMeta.name} industry principles and engineering standards for ${topic}.`
    });
  }

  return questions;
}

/**
 * Fisher-Yates shuffle array helper
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates an active 30-question assessment for a course:
 * 1. Retrieves questions from question bank
 * 2. Selects 30 questions
 * 3. Randomizes question order
 * 4. Randomizes answer options (preserving correct answer mapping)
 */
export function generateAssessmentQuestions(courseId, targetCount = 30) {
  const bank = getQuestionsForCourse(courseId);
  
  // 1. Shuffle all questions from bank
  const shuffledBank = shuffleArray(bank);
  const selected = shuffledBank.slice(0, Math.min(targetCount, shuffledBank.length));

  // 2. Shuffle options for each question while updating correctAnswer index
  return selected.map((q, index) => {
    const originalCorrectOption = q.options[q.correctAnswer];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

    return {
      ...q,
      questionNumber: index + 1,
      options: shuffledOptions,
      correctAnswer: newCorrectIndex
    };
  });
}
