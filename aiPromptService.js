// src/services/aiPromptService.js

/**
 * System-level context instruction to guarantee the AI models 
 * return perfectly parsed JSON objects matching our client interface rules.
 */
const SYSTEM_QUIZ_ROLE = `
You are an expert academic AI Quiz Generator engine. 
Your sole task is to generate random quiz variations based on user constraints.
You MUST strictly return your response as a valid JSON array of objects. 
Do not include markdown wrappers like \`\`\`json or trailing text. 

Each object in the array must strictly match this shape:
{
  "id": number,
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correct": number (0-3 index of the correct option)
}
`;

/**
 * Generates structured variation prompts programmatically.
 */
export const aiPromptService = {
  
  /**
   * Constructs the text prompt string containing dynamic filters.
   * @param {string} topic - E.g., "Data Structures", "Databases", "Mathematics"
   * @param {string} difficulty - "Easy", "Medium", "Hard"
   * @param {number} totalQuestions - Number of quiz elements requested
   */
  buildQuizPrompt(topic, difficulty, totalQuestions = 5) {
    return {
      systemInstruction: SYSTEM_QUIZ_ROLE.trim(),
      userPrompt: `Generate a random variations quiz on the topic of "${topic}".
Difficulty level: ${difficulty}.
Total number of questions required: ${totalQuestions}.
Ensure questions are completely unique, diverse, and cover random core principles of the topic.`
    };
  },

  /**
   * Handles sending the prompt configuration securely to your backend API route layer.
   * Falls back to a clean procedural local backup engine if the API layer goes down.
   */
  async requestDynamicQuiz(topic, difficulty, totalQuestions = 3) {
    const promptConfig = this.buildQuizPrompt(topic, difficulty, totalQuestions);

    try {
      // Replace with your true runtime endpoint route when backend deployment goes live
      const response = await fetch("http://localhost:5000/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promptConfig),
      });

      if (!response.ok) throw new Error("Server generation failed.");
      
      const data = await response.json();
      return data.questions; // Expecting parsed valid array structure
    } catch (error) {
      console.warn("Backend unavailable. Initializing local procedural generation fallback...");
      return this.getLocalFallbackVariation(topic, difficulty, totalQuestions);
    }
  },

  /**
   * Local Procedural Generator Fallback engine to ensure 
   * your app never breaks during test scenarios when offline.
   */
  getLocalFallbackVariation(topic, difficulty, count) {
    const pool = {
      "Data Structures": [
        { id: 1, question: "Which data structure follows LIFO?", options: ["Queue", "Array", "Stack", "Tree"], correct: 2 },
        { id: 2, question: "What is searching time inside balanced BST?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: 2 },
        { id: 3, question: "Which structure is non-linear?", options: ["String", "Graph", "Stack", "Array"], correct: 1 },
        { id: 4, question: "What is the time complexity of an array insertion at the beginning?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correct: 2 },
        { id: 5, question: "Which data structure operates on a First-In-First-Out (FIFO) layout?", options: ["Stack", "Queue", "Heap", "Matrix"], correct: 1 },
        { id: 6, question: "Which data structure is used to implement recursion?", options: ["Queue", "Stack", "Linked List", "Tree"], correct: 1 },
        { id: 7, question: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], correct: 1 },
        { id: 8, question: "In a linked list, what does each node contain besides data?", options: ["An array index", "A pointer to the next node", "A hash key", "A parent reference"], correct: 1 },
        { id: 9, question: "Which algorithm is used to find the shortest path in a graph?", options: ["Dijkstra's", "Bubble Sort", "Binary Search", "Kruskal's"], correct: 0 },
        { id: 10, question: "What type of tree has at most two children per node?", options: ["B-Tree", "AVL Tree", "Binary Tree", "Trie"], correct: 2 },
        { id: 11, question: "Which data structure is best suited for implementing a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], correct: 2 },
        { id: 12, question: "What is the time complexity of pushing an item onto a stack?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correct: 0 },
        { id: 13, question: "Which layout is ideal for back-button functionality in a browser?", options: ["Queue", "Tree", "Stack", "Graph"], correct: 2 },
        { id: 14, question: "What does freeing a node in a linked list prevent?", options: ["Syntax errors", "Memory leaks", "Infinite loops", "Data sorting bugs"], correct: 1 },
        { id: 15, question: "Which graph traversal strategy uses a Queue data structure?", options: ["Depth-First Search", "Breadth-First Search", "Linear Search", "Binary Search"], correct: 1 }
      ],
       "Databases": [
        { id: 1, question: "What does SQL stand for?", options: ["Structured Query Language", "Sequential Queue List", "Simple Query Logic", "State Query Line"], correct: 0 },
        { id: 2, question: "Which constraint enforces uniqueness?", options: ["NOT NULL", "UNIQUE", "FOREIGN KEY", "CHECK"], correct: 1 },
        { id: 3, question: "Which SQL command is used to extract data from a database?", options: ["EXTRACT", "GET", "SELECT", "OPEN"], correct: 2 },
        { id: 4, question: "What is a primary key?", options: ["A key that opens files", "A unique identifier for a table record", "A shared index column", "A password string"], correct: 1 },
        { id: 5, question: "Which clause is used to filter group summary data rows in SQL?", options: ["WHERE", "FILTER", "HAVING", "GROUP BY"], correct: 2 },
        { id: 6, question: "Which command removes all rows from a table without logging individual deletions?", options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"], correct: 2 },
        { id: 7, question: "What does ACID stand for in database transactions?", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Index, Data", "Array, Core, Input, Design", "All, Clear, Internal, Delete"], correct: 0 },
        { id: 8, question: "Which JOIN returns all rows when there is a match in either left or right table?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], correct: 3 },
        { id: 9, question: "What type of key links two database tables together?", options: ["Primary Key", "Foreign Key", "Unique Key", "Composite Key"], correct: 1 },
        { id: 10, question: "What is the purpose of database indexing?", options: ["To encrypt sensitive passwords", "To speed up data retrieval queries", "To delete redundant files", "To back up server metrics"], correct: 1 },
        { id: 11, question: "Which SQL clause is used to sort the result-set?", options: ["SORT BY", "ORDER BY", "ARRANGE BY", "GROUP BY"], correct: 1 },
        { id: 12, question: "What command is used to add a new column to an existing table?", options: ["UPDATE TABLE", "MODIFY TABLE", "ALTER TABLE", "INSERT COLUMN"], correct: 2 },
        { id: 13, question: "Which SQL keyword is used to eliminate duplicate rows from results?", options: ["UNIQUE", "DISTINCT", "DIFFERENT", "ISOLATE"], correct: 1 },
        { id: 14, question: "What type of data relationship exists between a student and their courses?", options: ["One-to-One", "One-to-Many", "Many-to-Many", "Many-to-One"], correct: 2 },
        { id: 15, question: "Which normal form deals with eliminating partial functional dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], correct: 1 }
      ]
    };

    const selectedPool = pool[topic] || pool["Data Structures"];
    // Shuffle and pick requested number of items
    return [...selectedPool].sort(() => 0.5 - Math.random()).slice(0, count);
  }
};
