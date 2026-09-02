const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { protect } = require('../middleware/authMiddleware');

const SUPPORTED_LANGUAGES = ['java', 'python', 'javascript', 'cpp', 'c'];

// GET /api/lessons/:language - Get all lessons for a specific language sorted by order
router.get('/:language', protect, async (req, res) => {
  try {
    const language = req.params.language.toLowerCase().trim();

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({
        message: `Unsupported language '${req.params.language}'. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
      });
    }

    const lessons = await Lesson.find({ language }).sort({ order: 1 }).select('-__v');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving lessons' });
  }
});

// GET /api/lessons/:language/:topicId - Get a single lesson by language and topicId
router.get('/:language/:topicId', protect, async (req, res) => {
  try {
    const language = req.params.language.toLowerCase().trim();
    const topicId = req.params.topicId.toLowerCase().trim();

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({
        message: `Unsupported language '${req.params.language}'. Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
      });
    }

    const lesson = await Lesson.findOne({
      language,
      topicId,
    }).select('-__v');

    if (!lesson) {
      return res.status(404).json({
        message: `Lesson '${req.params.topicId}' not found for language '${language}'`,
      });
    }

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: 'Server error retrieving lesson details' });
  }
});

// POST /api/lessons/explain - Explain pasted code (rule-based keyword + conceptual explanation + real-life analogy)
router.post('/explain', protect, async (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ message: 'Please enter some code to explain.' });
  }

  if (code.length > 10000) {
    return res.status(400).json({ message: 'Code snippet is too large. Please paste under 10,000 characters.' });
  }

  try {
    const trimmedCode = code.trim();
    const detectedKeywordsMap = new Map();

    // 1. Keyword Dictionary & Pattern Matcher
    const keywordRules = [
      // Conditionals
      { pattern: /\bif\b/, keyword: 'if', meaning: 'Conditional — checks whether a condition is true before running the block' },
      { pattern: /\belse\s+if\b/, keyword: 'else if', meaning: 'Multi-way branch — checks an alternative condition when the previous if is false' },
      { pattern: /\belse\b/, keyword: 'else', meaning: 'Fallback branch — executes when all preceding if/else conditions evaluate to false' },
      { pattern: /\bswitch\b/, keyword: 'switch', meaning: 'Selection control — selects one of many code blocks to execute based on a value' },
      { pattern: /\bcase\b/, keyword: 'case', meaning: 'Matches a specific value in a switch statement' },
      { pattern: /\bdefault\b/, keyword: 'default', meaning: 'Default fallback branch inside a switch statement' },
      { pattern: /\bbreak\b/, keyword: 'break', meaning: 'Terminates the current loop or switch block immediately' },
      { pattern: /\bcontinue\b/, keyword: 'continue', meaning: 'Skips the rest of the current loop iteration and moves to the next one' },

      // Loops
      { pattern: /\bfor\b/, keyword: 'for', meaning: 'Loop — repeats a code block a specific number of times' },
      { pattern: /\bwhile\b/, keyword: 'while', meaning: 'Loop — continues running as long as its condition remains true' },
      { pattern: /\bdo\s*\{/, keyword: 'do-while', meaning: 'Loop — executes the block at least once before checking the condition' },

      // Data Types & Variables
      { pattern: /\bint\b/, keyword: 'int', meaning: 'Data type — stores 32-bit whole numbers without decimals (e.g. 10, -5)' },
      { pattern: /\bString\b/, keyword: 'String', meaning: 'Data type — stores text sequences enclosed in double quotes (e.g. "Hello")' },
      { pattern: /\bboolean\b|\bbool\b/, keyword: 'boolean', meaning: 'Data type — stores logical true or false values only' },
      { pattern: /\bdouble\b/, keyword: 'double', meaning: 'Data type — stores high-precision numbers with decimals (e.g. 3.14159)' },
      { pattern: /\bfloat\b/, keyword: 'float', meaning: 'Data type — stores single-precision decimal numbers (e.g. 5.75f)' },
      { pattern: /\bchar\b/, keyword: 'char', meaning: 'Data type — stores a single character enclosed in single quotes (e.g. \'A\')' },
      { pattern: /\blong\b/, keyword: 'long', meaning: 'Data type — stores large 64-bit whole numbers' },
      { pattern: /\bvar\b/, keyword: 'var', meaning: 'Local variable type inference — compiler deduces the type automatically' },
      { pattern: /\bconst\b|\bfinal\b/, keyword: 'final/const', meaning: 'Constant modifier — value cannot be reassigned after initialization' },

      // OOP Concepts
      { pattern: /\bclass\b/, keyword: 'class', meaning: 'Blueprint — defines the properties (fields) and behaviors (methods) of objects' },
      { pattern: /\bnew\b/, keyword: 'new', meaning: 'Memory allocation — creates a new instance (object) of a class' },
      { pattern: /\bextends\b/, keyword: 'extends', meaning: 'Inheritance — indicates that a class inherits from a parent superclass' },
      { pattern: /\bimplements\b/, keyword: 'implements', meaning: 'Interface contract — indicates a class implements methods of an interface' },
      { pattern: /\binterface\b/, keyword: 'interface', meaning: 'Abstract blueprint — declares method signatures that implementing classes must define' },
      { pattern: /\babstract\b/, keyword: 'abstract', meaning: 'Declares an incomplete class or method that must be extended/implemented' },
      { pattern: /\bpublic\b/, keyword: 'public', meaning: 'Access modifier — visible and accessible from all other classes' },
      { pattern: /\bprivate\b/, keyword: 'private', meaning: 'Access modifier (Encapsulation) — visible only within the defining class' },
      { pattern: /\bprotected\b/, keyword: 'protected', meaning: 'Access modifier — visible within the same package and by subclasses' },
      { pattern: /\bstatic\b/, keyword: 'static', meaning: 'Belongs to the class itself rather than individual object instances' },
      { pattern: /\bthis\b/, keyword: 'this', meaning: 'Reference keyword — refers to the current instance of the class' },
      { pattern: /\bsuper\b/, keyword: 'super', meaning: 'Reference keyword — refers to the direct parent superclass' },

      // Functions & Methods
      { pattern: /\bvoid\b/, keyword: 'void', meaning: 'Return type — specifies that this method does not return any value' },
      { pattern: /\breturn\b/, keyword: 'return', meaning: 'Control flow — exits a method and optionally passes a value back to caller' },

      // Output & Console
      { pattern: /System\.out\.println/, keyword: 'System.out.println', meaning: 'Output — prints text/data followed by a new line to the console' },
      { pattern: /System\.out\.print/, keyword: 'System.out.print', meaning: 'Output — prints text/data to the console on the current line' },
      { pattern: /console\.log/, keyword: 'console.log', meaning: 'Output — logs message/data to the debug console' },
      { pattern: /printf\s*\(/, keyword: 'printf()', meaning: 'Output — formats and prints formatted data strings' },

      // Exception Handling
      { pattern: /\btry\b/, keyword: 'try', meaning: 'Exception handling — wraps code that may potentially throw an error' },
      { pattern: /\bcatch\b/, keyword: 'catch', meaning: 'Exception handling — catches and handles specific errors thrown inside try' },
      { pattern: /\bfinally\b/, keyword: 'finally', meaning: 'Exception handling — code block guaranteed to execute after try/catch' },

      // Arrays & Collections
      { pattern: /\[\s*\]/, keyword: '[] (Array)', meaning: 'Array syntax — declares a fixed-size indexed collection of elements' },
      { pattern: /\.length\b|\.length\(\)/, keyword: '.length', meaning: 'Property/Method — returns the total count of elements or characters' },

      // Common Operators
      { pattern: /\+\+|\-\-/, keyword: '++/--', meaning: 'Unary operators — increments (adds 1) or decrements (subtracts 1) a variable' },
      { pattern: /==|!=/, keyword: '== / !=', meaning: 'Comparison operators — tests whether two values are equal or not equal' },
      { pattern: /&&|\|\|/, keyword: '&& / ||', meaning: 'Logical operators — logical AND (both true) and logical OR (at least one true)' },
    ];

    // Detect unique keywords
    keywordRules.forEach(({ pattern, keyword, meaning }) => {
      if (pattern.test(trimmedCode) && !detectedKeywordsMap.has(keyword)) {
        detectedKeywordsMap.set(keyword, { keyword, meaning });
      }
    });

    const keywords = Array.from(detectedKeywordsMap.values());

    // 2. Rule-Based Pattern Analysis for Explanation & Analogy
    let fullExplanation = '';
    let realLifeExample = '';

    if (/class\s+\w+\s+extends\s+\w+/.test(trimmedCode)) {
      fullExplanation = 'This program demonstrates Object-Oriented "Inheritance" using the "extends" keyword. The child class inherits all attributes and methods from the parent superclass, enabling code reuse while allowing specialized behavior.';
      realLifeExample = '🚗 Like a SportsCar inheriting common vehicle traits (engine, wheels, steering) from Car, while adding specialized features like Turbo Boost.';
    } else if (/private\s+\w+/.test(trimmedCode) && (/get\w+\s*\(/.test(trimmedCode) || /set\w+\s*\(/.test(trimmedCode) || /return\s+\w+/.test(trimmedCode))) {
      fullExplanation = 'This program demonstrates "Encapsulation". Class variables are marked private to protect them from direct unauthorized access, and public getter/setter methods provide safe controlled access to read and update data.';
      realLifeExample = '💊 Like a medicine capsule: the active medicine inside is safely sealed away from direct exposure, accessible only in a controlled dosage through the capsule coating.';
    } else if (/class\s+\w+/.test(trimmedCode)) {
      fullExplanation = 'This program defines a "Class" — a fundamental blueprint in Object-Oriented Programming. It encapsulates related state (fields/variables) and actions (methods). Instances (objects) created from this class share this structure with their own data.';
      realLifeExample = '🏗️ Like an architectural blueprint for a house: the blueprint describes the layout and specifications, and multiple actual houses (objects) can be built from it.';
    } else if (/for\s*\(/.test(trimmedCode)) {
      const match = trimmedCode.match(/i\s*<\s*(\d+)/) || trimmedCode.match(/;\s*\w+\s*<\s*(\d+)/);
      const times = match ? match[1] : 'specified number of';
      fullExplanation = `This program utilizes a "for loop" to repeat an operation ${times} times. It initializes a loop counter, evaluates the termination condition before each iteration, executes the code inside the block, and increments the counter after each pass until the condition becomes false.`;
      realLifeExample = `🔁 Like a coach asking a runner to complete ${times} laps around a track: they start at lap 0, run each lap, record it, and stop as soon as they reach ${times}.`;
    } else if (/while\s*\(/.test(trimmedCode)) {
      fullExplanation = 'This program uses a "while loop" control structure. It evaluates a conditional expression before every iteration. As long as the condition remains true, the loop body executes repeatedly. When the condition becomes false, execution exits the loop.';
      realLifeExample = '🍽️ Like eating dinner while you are still hungry: before every bite, you ask "Am I still hungry?". As long as the answer is YES, you continue eating. When full (condition is FALSE), you stop.';
    } else if (/if\s*\(/.test(trimmedCode) && /else\s+if\s*\(/.test(trimmedCode)) {
      fullExplanation = 'This program implements a multi-branch "if-else if-else" ladder. It tests conditions sequentially from top to bottom. The first condition that evaluates to true executes its corresponding block and skips the rest. If none match, the final else block runs.';
      realLifeExample = '🏫 Like assigning school grades based on marks: IF marks >= 90 → Grade A, ELSE IF marks >= 80 → Grade B, ELSE → Grade C. Only one grade is awarded.';
    } else if (/if\s*\(/.test(trimmedCode) && /else\s*\{/.test(trimmedCode)) {
      fullExplanation = 'This program uses a two-way "if-else" decision structure. The condition inside if is evaluated: if true, the if branch executes; if false, the else branch executes. Exactly one branch is guaranteed to run.';
      realLifeExample = '🚦 Like a traffic light: IF the signal is green → drive forward. ELSE → stop and wait. You never do both simultaneously.';
    } else if (/if\s*\(/.test(trimmedCode)) {
      fullExplanation = 'This program uses a single "if condition". It tests whether the specified condition is true. If true, the code inside the block runs; if false, the block is safely bypassed and the program moves to the next line.';
      realLifeExample = '☂️ Like taking an umbrella: IF it is raining outside → open the umbrella. Otherwise, continue walking normally without opening it.';
    } else if (/void\s+\w+\s*\(/.test(trimmedCode) || /\w+\s+\w+\s*\([^)]*\)\s*\{/.test(trimmedCode)) {
      fullExplanation = 'This program defines a reusable "Method/Function". Methods group statements together under a name to perform a dedicated task and can be called repeatedly from different parts of the application.';
      realLifeExample = '☕ Like a coffee vending machine button: instead of manually grinding beans and boiling water each time, you press "Make Coffee" (call the method) and it executes the entire recipe automatically.';
    } else if (/\[\s*\]/.test(trimmedCode)) {
      fullExplanation = 'This program uses an "Array" to store an ordered collection of multiple elements of the same data type. Each element is stored at a consecutive index position starting from 0.';
      realLifeExample = '🏢 Like an apartment mail organizer: each resident has a numbered box (Index 0, Index 1, Index 2, ...) to store letters in a single organized unit.';
    } else if (keywords.length > 0) {
      fullExplanation = 'This program executes a series of sequential Java programming statements. Variables declare and hold data in memory, expressions perform computations, and system calls interact with the console.';
      realLifeExample = '📋 Like following a step-by-step recipe: each instruction is completed in order to produce the final output.';
    } else {
      fullExplanation = 'This code consists of basic programming statements. We could not match a specific complex Java construct yet. Try pasting examples with variables (int, String), conditionals (if/else), loops (for/while), arrays, methods, or classes.';
      realLifeExample = '🌱 Like a blank canvas: write your first Java statements to see keyword breakdowns and real-life analogies appear here!';
    }

    res.json({
      keywords,
      fullExplanation,
      realLifeExample,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error analyzing code snippet' });
  }
});

module.exports = router;