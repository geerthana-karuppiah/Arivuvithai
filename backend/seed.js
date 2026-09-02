const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lesson = require('./models/Lesson');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/arivuvithai';

// ==========================================
// 1. JAVA CURRICULUM (14 Lessons)
// ==========================================
const javaLessons = [
  {
    language: 'java',
    topicId: 'variables',
    title: 'Variables',
    description: 'Learn how variables act as labeled containers to store information in Java.',
    order: 1,
    difficulty: 'Beginner',
    content: 'A variable is a named storage container in computer memory. In Java, before storing a value in a variable, you must declare what type of data it will hold (such as int or String) and give it a descriptive name. Once declared, you can assign values and update them throughout your program.',
    codeExample: `public class VariablesDemo {
    public static void main(String[] args) {
        // Declare and initialize variables
        int studentAge = 19;
        String studentName = "Aarav";
        double examScore = 92.5;

        // Print variable values
        System.out.println("Student: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("Score: " + examScore);
    }
}`,
    explanation: [
      "Step 1: 'int studentAge = 19;' allocates memory for an integer named studentAge and assigns it the value 19.",
      "Step 2: 'String studentName = \"Aarav\";' creates a variable to store text.",
      "Step 3: 'double examScore = 92.5;' stores a decimal number.",
      "Step 4: 'System.out.println(...)' outputs the variable values combined with text labels."
    ],
    realLifeExample: '🏷️ Like labeled jars in a kitchen spice rack: one jar is labeled "Sugar" and holds sweet granules, another is labeled "Salt". You can always check or replace the contents of a jar using its label!',
    prerequisites: ['None'],
    estimatedTime: '10 mins',
  },
  {
    language: 'java',
    topicId: 'data-types',
    title: 'Data Types',
    description: 'Understand primitive and non-primitive data types to store numbers, characters, and text.',
    order: 2,
    difficulty: 'Beginner',
    content: 'Java is a strongly-typed language. Every variable has a specific data type that tells the compiler how much memory to allocate and what kind of values can be stored. Primitive types include int, double, char, and boolean. Non-primitive types include String and Arrays.',
    codeExample: `public class DataTypesDemo {
    public static void main(String[] args) {
        int rollNumber = 101;            // Whole numbers
        double temperature = 36.6;       // Decimal numbers
        char grade = 'A';                // Single character in single quotes
        boolean isPassed = true;         // True or False only
        String subject = "Computer Science"; // Text in double quotes

        System.out.println("Roll No: " + rollNumber);
        System.out.println("Temperature: " + temperature + " C");
        System.out.println("Grade: " + grade);
        System.out.println("Passed: " + isPassed);
        System.out.println("Subject: " + subject);
    }
}`,
    explanation: [
      "Step 1: 'int' stores 32-bit whole numbers without decimals.",
      "Step 2: 'double' stores 64-bit precision floating-point decimal numbers.",
      "Step 3: 'char' stores a single character enclosed in single quotes like 'A'.",
      "Step 4: 'boolean' stores either 'true' or 'false' for logic checks.",
      "Step 5: 'String' is an object that stores a sequence of characters enclosed in double quotes."
    ],
    realLifeExample: '📦 Like different storage boxes: you use a coin pouch for coins (int), a measuring cup for liquids (double), a stamp album for single stamps (char), and a cardboard box for books (String). Each item requires the right container!',
    prerequisites: ['Variables'],
    estimatedTime: '12 mins',
  },
  {
    language: 'java',
    topicId: 'operators',
    title: 'Operators',
    description: 'Learn arithmetic, relational, and logical operators to calculate values and make comparisons.',
    order: 3,
    difficulty: 'Beginner',
    content: 'Operators are special symbols in Java that perform operations on variables and values. Arithmetic operators (+, -, *, /, %) perform calculations. Comparison operators (==, !=, >, <, >=, <=) compare values and return a boolean. Logical operators (&&, ||, !) combine multiple conditions.',
    codeExample: `public class OperatorsDemo {
    public static void main(String[] args) {
        int a = 15;
        int b = 4;

        // Arithmetic Operators
        int sum = a + b;       // 19
        int remainder = a % b; // 3 (15 divided by 4 leaves 3)

        // Relational and Logical Operators
        boolean isGreater = a > b;               // true
        boolean isEligible = (a > 10) && (b < 5); // true

        System.out.println("Sum: " + sum);
        System.out.println("Remainder (Modulo): " + remainder);
        System.out.println("Is a > b? " + isGreater);
        System.out.println("Is eligible? " + isEligible);
    }
}`,
    explanation: [
      "Step 1: 'a + b' adds numbers together.",
      "Step 2: 'a % b' (modulus) calculates the remainder of division (useful for checking even/odd).",
      "Step 3: 'a > b' evaluates whether 15 is greater than 4, returning true.",
      "Step 4: '&&' (Logical AND) requires both conditions to be true for the whole expression to be true."
    ],
    realLifeExample: '🧮 Like shopping at a grocery store: the cash register uses "+" to calculate the total bill, "%" to apply group discounts, and checks "IF total > 500 AND member == true" to grant free delivery.',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '12 mins',
  },
  {
    language: 'java',
    topicId: 'if-condition',
    title: 'If Condition',
    description: 'Make decisions in code by executing blocks of code only when a condition is met.',
    order: 4,
    difficulty: 'Beginner',
    content: 'The if statement is the simplest decision-making structure in Java. It evaluates a boolean condition. If the condition evaluates to true, the code block inside curly braces executes. If the condition is false, the entire block is skipped and program execution continues on the next line.',
    codeExample: `public class IfDemo {
    public static void main(String[] args) {
        int age = 20;

        System.out.println("Checking voting eligibility...");

        // Condition check
        if (age >= 18) {
            System.out.println("Congratulations! You are eligible to vote.");
        }

        System.out.println("Verification process complete.");
    }
}`,
    explanation: [
      "Step 1: Define a variable 'age' with value 20.",
      "Step 2: The 'if (age >= 18)' condition evaluates whether 20 is greater than or equal to 18 (evaluates to true).",
      "Step 3: Because the condition is true, the code inside the curly braces runs.",
      "Step 4: If age was 16, the code block would be skipped entirely."
    ],
    realLifeExample: '🎟️ Like an automatic ticket gate at a metro station: IF your smart card balance >= minimum fare → the gate swings open. If not, the gate stays closed!',
    prerequisites: ['Operators', 'Data Types'],
    estimatedTime: '10 mins',
  },
  {
    language: 'java',
    topicId: 'if-else',
    title: 'If-Else',
    description: 'Handle both positive and alternate outcomes using if-else and else-if branching.',
    order: 5,
    difficulty: 'Beginner',
    content: 'When you need to choose between two or more mutually exclusive paths, you use if-else. If the condition is true, the if block executes. Otherwise, the else block executes. You can also chain else if statements to check multiple conditions sequentially.',
    codeExample: `public class IfElseDemo {
    public static void main(String[] args) {
        int marks = 78;

        if (marks >= 90) {
            System.out.println("Grade: Distinction (O)");
        } else if (marks >= 50) {
            System.out.println("Grade: Pass");
        } else {
            System.out.println("Grade: Fail - Needs improvement");
        }
    }
}`,
    explanation: [
      "Step 1: Check 'marks >= 90' (78 >= 90 is false) -> moves to the next check.",
      "Step 2: Check 'marks >= 50' (78 >= 50 is true) -> prints 'Grade: Pass'.",
      "Step 3: Because this condition matched, the remaining 'else' block is skipped.",
      "Step 4: Exactly one branch will always be executed."
    ],
    realLifeExample: '🚦 Like a traffic signal: IF the light is GREEN → Drive. ELSE IF the light is YELLOW → Slow down. ELSE (RED) → Stop completely.',
    prerequisites: ['If Condition'],
    estimatedTime: '12 mins',
  },
  {
    language: 'java',
    topicId: 'for-loop',
    title: 'For Loop',
    description: 'Automate repetitive tasks with count-controlled loops.',
    order: 6,
    difficulty: 'Beginner',
    content: 'A for loop is used when you know in advance how many times you want to repeat a block of code. It brings together three parts in a single line: initialization (where to start), condition (when to stop), and update/increment (how to step forward).',
    codeExample: `public class ForLoopDemo {
    public static void main(String[] args) {
        System.out.println("Printing 5-table multiplication:");

        // for (initialization; condition; increment)
        for (int i = 1; i <= 5; i++) {
            int result = 5 * i;
            System.out.println("5 x " + i + " = " + result);
        }
    }
}`,
    explanation: [
      "Step 1: Initialization: 'int i = 1' creates the loop counter starting at 1.",
      "Step 2: Condition check: 'i <= 5' is checked before each iteration. If true, the loop body runs.",
      "Step 3: Body execution: Computes 5 * i and prints the line.",
      "Step 4: Increment: 'i++' adds 1 to i, then steps back to condition check (Step 2).",
      "Step 5: When i becomes 6, '6 <= 5' is false, ending the loop."
    ],
    realLifeExample: '🏃 Like running laps around a sports track: You set a goal of 5 laps (i = 1 to 5). After each completed lap, you increment your lap count by 1. When you finish lap 5, your workout is complete!',
    prerequisites: ['Operators', 'Variables'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'while-loop',
    title: 'While Loop',
    description: 'Repeat actions dynamically as long as a specified condition remains true.',
    order: 7,
    difficulty: 'Beginner',
    content: 'A while loop repeats a block of code continuously as long as its boolean condition remains true. It is ideal when you do not know the exact number of iterations beforehand and want to loop until a specific state or event occurs.',
    codeExample: `public class WhileLoopDemo {
    public static void main(String[] args) {
        int batteryLevel = 3; // 3 bars remaining

        System.out.println("Phone is in use...");

        while (batteryLevel > 0) {
            System.out.println("Battery: " + batteryLevel + " bars. Phone working!");
            batteryLevel--; // Drain 1 bar
        }

        System.out.println("Battery empty! Please charge your phone.");
    }
}`,
    explanation: [
      "Step 1: Initialize 'batteryLevel = 3' before entering the loop.",
      "Step 2: Evaluate condition 'batteryLevel > 0'. Since 3 > 0 is true, the loop body runs.",
      "Step 3: Inside the loop, print the status and decrement 'batteryLevel--'.",
      "Step 4: Repeats for batteryLevel 2 and 1.",
      "Step 5: When batteryLevel reaches 0, '0 > 0' is false and the loop terminates."
    ],
    realLifeExample: '🍽️ Like drinking water from a bottle: WHILE there is water in the bottle → take another sip. Once empty → put the bottle down. You stop based on the condition (water left), not a pre-set count.',
    prerequisites: ['If Condition', 'For Loop'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'arrays',
    title: 'Arrays',
    description: 'Store and organize collections of multiple items of the same data type in a single variable.',
    order: 8,
    difficulty: 'Beginner',
    content: 'An array is a fixed-size contiguous memory container that holds multiple values of the same type. Instead of declaring 5 separate variables for 5 student marks, you can create a single integer array. Elements in an array are accessed using 0-based index numbers (from index 0 to length - 1).',
    codeExample: `public class ArraysDemo {
    public static void main(String[] args) {
        // Declare and initialize an array of integers
        int[] scores = { 85, 92, 78, 95, 88 };

        System.out.println("Total scores recorded: " + scores.length);
        System.out.println("First score (index 0): " + scores[0]);
        System.out.println("Third score (index 2): " + scores[2]);

        System.out.println("\\nAll student scores:");
        for (int i = 0; i < scores.length; i++) {
            System.out.println("Student " + (i + 1) + ": " + scores[i]);
        }
    }
}`,
    explanation: [
      "Step 1: 'int[] scores = { 85, 92, 78, 95, 88 };' creates an array with 5 integer elements.",
      "Step 2: Arrays are zero-indexed: scores[0] is 85, scores[1] is 92, up to scores[4] which is 88.",
      "Step 3: 'scores.length' gives the total number of elements (5).",
      "Step 4: A for loop iterates through indexes 0 to 4 to process each item sequentially."
    ],
    realLifeExample: '🥚 Like an egg carton with numbered slots: each slot holds one egg of the same kind. Slot 0 holds the first egg, slot 1 holds the second, and so forth. You can pick any egg directly by its slot number!',
    prerequisites: ['For Loop', 'Data Types'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'methods',
    title: 'Methods',
    description: 'Write clean, reusable blocks of code that perform specific tasks with parameters and return values.',
    order: 9,
    difficulty: 'Beginner',
    content: 'A method (also called a function) is a reusable block of code that only runs when it is called. Methods help eliminate code duplication (DRY principle - Do Not Repeat Yourself). You can pass data to a method via parameters and return a calculated result using the return keyword.',
    codeExample: `public class MethodsDemo {
    // Method that calculates and returns the square of a number
    public static int calculateSquare(int number) {
        return number * number;
    }

    // Method that prints a personalized greeting
    public static void greetUser(String name) {
        System.out.println("Hello, " + name + "! Welcome to ARIVUVITHAI.");
    }

    public static void main(String[] args) {
        greetUser("Priya");
        
        int result = calculateSquare(7);
        System.out.println("Square of 7 is: " + result);
    }
}`,
    explanation: [
      "Step 1: 'public static int calculateSquare(int number)' declares a method accepting an integer and returning an integer.",
      "Step 2: 'return number * number;' computes and sends the result back to the caller.",
      "Step 3: 'void' in greetUser indicates the method performs an action without returning any value.",
      "Step 4: 'main' invokes the methods by name passing actual arguments ('Priya', 7)."
    ],
    realLifeExample: '☕ Like a coffee vending machine: you press the "Cappuccino" button (call method) and insert coins (arguments). The machine runs its internal recipe and dispenses a hot cup of coffee (return value)!',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'classes-objects',
    title: 'Classes and Objects',
    description: 'Understand the core foundation of Object-Oriented Programming: Blueprints and Instances.',
    order: 10,
    difficulty: 'Beginner',
    content: 'Java is built on Object-Oriented Programming (OOP). A Class is a blueprint or template that defines properties (variables/fields) and behaviors (methods). An Object is an actual instance created in memory from that blueprint using the new keyword.',
    codeExample: `// Class definition (Blueprint)
class Book {
    String title;
    String author;
    double price;

    void displayInfo() {
        System.out.println("'" + title + "' by " + author + " - Rs." + price);
    }
}

public class ClassesObjectsDemo {
    public static void main(String[] args) {
        // Create object 1
        Book book1 = new Book();
        book1.title = "Wings of Fire";
        book1.author = "Dr. A.P.J. Abdul Kalam";
        book1.price = 350.0;

        // Create object 2
        Book book2 = new Book();
        book2.title = "Ponniyin Selvan";
        book2.author = "Kalki";
        book2.price = 500.0;

        book1.displayInfo();
        book2.displayInfo();
    }
}`,
    explanation: [
      "Step 1: 'class Book' defines the blueprint with fields (title, author, price) and a method (displayInfo).",
      "Step 2: 'Book book1 = new Book();' allocates memory for a new Book instance.",
      "Step 3: Properties of book1 and book2 are assigned independently.",
      "Step 4: Calling 'displayInfo()' on each object outputs that specific object's data."
    ],
    realLifeExample: '🏗️ Like an architectural building blueprint: the blueprint (Class) specifies where the rooms, windows, and doors will be. The actual buildings constructed on different streets (Objects) are instances of that blueprint, each with its own paint color and address!',
    prerequisites: ['Methods', 'Variables'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'encapsulation',
    title: 'Encapsulation',
    description: 'Protect data integrity by bundling variables with methods and controlling access using private fields.',
    order: 11,
    difficulty: 'Beginner',
    content: 'Encapsulation is the practice of keeping fields private and providing access to them through public methods called Getters and Setters. This prevents unauthorized direct modifications and allows you to validate data before saving it into an object.',
    codeExample: `class BankAccount {
    private String accountNumber;
    private double balance;

    // Constructor
    public BankAccount(String accNo, double initialBalance) {
        this.accountNumber = accNo;
        this.balance = initialBalance;
    }

    // Getter for balance
    public double getBalance() {
        return balance;
    }

    // Controlled deposit method with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited Rs." + amount + ". New balance: Rs." + balance);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        BankAccount myAccount = new BankAccount("SB-10024", 1000.0);
        myAccount.deposit(500.0);
        System.out.println("Current Balance: Rs." + myAccount.getBalance());
    }
}`,
    explanation: [
      "Step 1: 'private double balance;' hides the balance variable so external code cannot directly tamper with it.",
      "Step 2: 'public double getBalance()' provides safe read-only access to the balance.",
      "Step 3: 'deposit(double amount)' validates that the amount is positive before modifying the balance.",
      "Step 4: This protects sensitive data and keeps the object in a valid, secure state."
    ],
    realLifeExample: '💊 Like a medicine capsule: the chemical powder inside is sealed and protected by the outer shell. You consume the safe capsule as intended without tampering with the raw medicine inside!',
    prerequisites: ['Classes and Objects'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'inheritance',
    title: 'Inheritance',
    description: 'Reuse and extend existing code by creating child classes derived from parent classes with extends.',
    order: 12,
    difficulty: 'Beginner',
    content: 'Inheritance allows a new class (child/subclass) to inherit attributes and methods from an existing class (parent/superclass) using the extends keyword. It promotes code reusability and creates a hierarchical is-a relationship.',
    codeExample: `// Superclass (Parent)
class Vehicle {
    String brand = "TVS";

    void startEngine() {
        System.out.println("Engine started. Vehicle is ready to move.");
    }
}

// Subclass (Child) inheriting from Vehicle
class ElectricScooter extends Vehicle {
    int batteryPercent = 95;

    void checkBattery() {
        System.out.println("Battery at: " + batteryPercent + "%");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        ElectricScooter myScooter = new ElectricScooter();
        
        // Inherited from Vehicle
        System.out.println("Brand: " + myScooter.brand);
        myScooter.startEngine();

        // Unique to ElectricScooter
        myScooter.checkBattery();
    }
}`,
    explanation: [
      "Step 1: 'Vehicle' is the superclass containing common fields (brand) and methods (startEngine).",
      "Step 2: 'class ElectricScooter extends Vehicle' inherits everything from Vehicle.",
      "Step 3: 'ElectricScooter' can add its own specific features like 'batteryPercent' and 'checkBattery()'.",
      "Step 4: 'myScooter' can access both its parent's methods and its own methods."
    ],
    realLifeExample: '🧬 Like inheriting genetic traits from parents: you inherit features like eye color and height from your parents (superclass), but you also develop your own unique skills and personality (subclass)!',
    prerequisites: ['Classes and Objects', 'Methods'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'polymorphism',
    title: 'Polymorphism',
    description: 'Enable objects to take on many forms using method overriding and method overloading.',
    order: 13,
    difficulty: 'Beginner',
    content: 'Polymorphism means many forms. It allows methods to perform different tasks based on the object that invokes them. In Java, runtime polymorphism is achieved through Method Overriding (where a subclass provides a specific implementation of a method defined in its parent class).',
    codeExample: `// Parent class
class Notification {
    void send(String message) {
        System.out.println("Sending generic notification: " + message);
    }
}

// Child class 1
class SMSNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("📱 SMS to Mobile: " + message);
    }
}

// Child class 2
class EmailNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("📧 Email to Inbox: " + message);
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Notification n1 = new SMSNotification();
        Notification n2 = new EmailNotification();

        n1.send("Your OTP is 482910");
        n2.send("Welcome to ARIVUVITHAI!");
    }
}`,
    explanation: [
      "Step 1: 'Notification' defines a general 'send' method.",
      "Step 2: 'SMSNotification' and 'EmailNotification' override 'send()' with their own specific behavior.",
      "Step 3: Variables of type 'Notification' (n1, n2) can hold child instances.",
      "Step 4: At runtime, Java automatically calls the correct overridden version based on the actual object in memory."
    ],
    realLifeExample: '🎭 Like a person playing different roles: a person can act as a student in a classroom, a customer at a store, and a passenger on a bus. The same person responds differently depending on the context!',
    prerequisites: ['Inheritance', 'Classes and Objects'],
    estimatedTime: '15 mins',
  },
  {
    language: 'java',
    topicId: 'abstraction',
    title: 'Abstraction',
    description: 'Hide complex implementation details and show only essential interfaces using abstract classes.',
    order: 14,
    difficulty: 'Beginner',
    content: 'Abstraction is the concept of hiding internal complexities and exposing only what is necessary to the user. An abstract class cannot be instantiated directly and serves as a contract containing abstract methods (without body) that all subclasses must implement.',
    codeExample: `// Abstract class
abstract class PaymentGateway {
    // Abstract method (no body - must be implemented by subclasses)
    abstract void processPayment(double amount);

    // Concrete method
    void printReceipt(double amount) {
        System.out.println("Receipt: Rs." + amount + " paid successfully.");
    }
}

// Concrete implementation
class UPIPayment extends PaymentGateway {
    @Override
    void processPayment(double amount) {
        System.out.println("Connecting to UPI app... debited Rs." + amount);
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        PaymentGateway payment = new UPIPayment();
        payment.processPayment(250.0);
        payment.printReceipt(250.0);
    }
}`,
    explanation: [
      "Step 1: 'abstract class PaymentGateway' defines the blueprint for all payment types.",
      "Step 2: 'abstract void processPayment(double amount);' forces every payment subclass to implement its own processing logic.",
      "Step 3: 'UPIPayment' provides the exact implementation for UPI transactions.",
      "Step 4: The caller interacts with simple methods (processPayment, printReceipt) without worrying about complex bank server protocols."
    ],
    realLifeExample: '🚗 Like driving a car: you press the accelerator pedal to speed up and the brake pedal to stop. You do not need to understand fuel injection, pistons, or brake hydraulic fluid physics to drive safely!',
    prerequisites: ['Inheritance', 'Polymorphism'],
    estimatedTime: '15 mins',
  },
];

// ==========================================
// 2. PYTHON CURRICULUM (14 Lessons)
// ==========================================
const pythonLessons = [
  {
    language: 'python',
    topicId: 'variables',
    title: 'Variables',
    description: 'Learn how variables store data dynamically in Python without explicit type declarations.',
    order: 1,
    difficulty: 'Beginner',
    content: 'In Python, a variable is created the moment you first assign a value to it. Unlike statically typed languages, you do not need to declare variable types explicitly — Python dynamically detects whether the value is an integer, float, string, or boolean.',
    codeExample: `# Creating variables in Python
student_name = "Kavya"
student_age = 19
exam_score = 94.5
is_enrolled = True

print("Student:", student_name)
print("Age:", student_age)
print("Score:", exam_score)
print("Enrolled:", is_enrolled)`,
    explanation: [
      "Step 1: 'student_name = \"Kavya\"' creates a string variable.",
      "Step 2: 'student_age = 19' stores an integer.",
      "Step 3: 'exam_score = 94.5' stores a floating-point number.",
      "Step 4: 'print()' outputs text and variables directly to the terminal."
    ],
    realLifeExample: '🏷️ Like sticky notes on a desk: you write "Name: Kavya" on a note and stick it to your file. Whenever you need the information, you refer to that note!',
    prerequisites: ['None'],
    estimatedTime: '10 mins',
  },
  {
    language: 'python',
    topicId: 'data-types',
    title: 'Data Types',
    description: 'Understand Python core built-in data types: int, float, str, and bool.',
    order: 2,
    difficulty: 'Beginner',
    content: 'Python has several built-in data types: int (whole numbers), float (decimals), str (text enclosed in single or double quotes), and bool (True or False). You can inspect any variable data type using the type() function.',
    codeExample: `age = 20                # int
price = 199.99          # float
course = "Python 101"   # str
is_active = True        # bool

print("age type:", type(age))
print("price type:", type(price))
print("course type:", type(course))
print("is_active type:", type(is_active))`,
    explanation: [
      "Step 1: Whole numbers like 20 are automatically classified as 'int'.",
      "Step 2: Numbers with decimal points are 'float'.",
      "Step 3: Characters wrapped in quotes are 'str'.",
      "Step 4: 'type()' returns the class name of the given data."
    ],
    realLifeExample: '📦 Like organizer trays for desk supplies: one slot for pens (text), one for coins (numbers), and one for stamp clips (booleans).',
    prerequisites: ['Variables'],
    estimatedTime: '10 mins',
  },
  {
    language: 'python',
    topicId: 'input-output',
    title: 'Input and Output',
    description: 'Interact with users using print(), input(), and modern f-string formatting.',
    order: 3,
    difficulty: 'Beginner',
    content: 'The print() function displays output to the screen, while input() prompts the user to type text from the keyboard. By default, input() returns a string, so you use int() or float() to convert user input for calculations. f-strings provide clean, readable string interpolation.',
    codeExample: `# User interaction with f-strings
name = "Deepak"
age = 21

# Modern f-string formatting
print(f"Hello, {name}! You will be {age + 1} next year.")`,
    explanation: [
      "Step 1: 'input()' captures keyboard input from the user as a string.",
      "Step 2: 'int(input())' converts numeric text into a computable integer.",
      "Step 3: 'f\"...{variable}...\"' embeds variables directly inside the text string."
    ],
    realLifeExample: '🗣️ Like an ATM screen: the machine displays instructions on screen (print) and waits for you to type your PIN on the keypad (input)!',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '10 mins',
  },
  {
    language: 'python',
    topicId: 'operators',
    title: 'Operators',
    description: 'Perform math calculations, logic checks, and membership tests with Python operators.',
    order: 4,
    difficulty: 'Beginner',
    content: 'Python supports arithmetic operators (+, -, *, /, // for floor division, % for remainder, ** for exponents), comparison operators (==, !=, >, <, >=, <=), and logical operators (and, or, not).',
    codeExample: `a = 10
b = 3

print("Addition:", a + b)       # 13
print("Division:", a / b)       # 3.3333...
print("Floor Division:", a // b)# 3
print("Remainder (Mod):", a % b)# 1
print("Power (10^3):", a ** b)  # 1000

# Logical operators
is_valid = (a > 5) and (b < 5)
print("Is valid?", is_valid)    # True`,
    explanation: [
      "Step 1: '//' performs integer floor division, discarding the decimal fraction.",
      "Step 2: '**' computes exponentiation (powers).",
      "Step 3: 'and' requires both conditions to be True; 'or' requires at least one condition to be True."
    ],
    realLifeExample: '🧮 Like calculating bill splits at a restaurant: "+" sums items, "//" divides whole rupees evenly among friends, and "%" calculates the leftover change.',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '12 mins',
  },
  {
    language: 'python',
    topicId: 'if-condition',
    title: 'If Condition',
    description: 'Execute blocks of code conditionally using Python indentation-based if statements.',
    order: 5,
    difficulty: 'Beginner',
    content: 'In Python, the if statement evaluates a boolean expression. If True, the indented code block below it runs. Python uses indentation (4 spaces) instead of curly braces to define code blocks.',
    codeExample: `temperature = 38

print("Checking weather conditions...")

if temperature > 35:
    print("Warning: Extreme Heat! Stay hydrated.")
    print("Carry an umbrella or water bottle.")

print("Weather check complete.")`,
    explanation: [
      "Step 1: Define 'temperature = 38'.",
      "Step 2: 'if temperature > 35:' checks if 38 is greater than 35 (True).",
      "Step 3: All indented lines under the if statement execute.",
      "Step 4: The unindented line at the end runs regardless of the condition."
    ],
    realLifeExample: '🚪 Like an automatic supermarket door: IF motion sensor detects a customer approaching → slide the door open!',
    prerequisites: ['Operators'],
    estimatedTime: '10 mins',
  },
  {
    language: 'python',
    topicId: 'if-else',
    title: 'If-Else and Elif',
    description: 'Build multi-way decision trees using if, elif (else if), and else branches.',
    order: 6,
    difficulty: 'Beginner',
    content: 'The if-elif-else ladder allows you to test multiple conditions sequentially. As soon as one condition evaluates to True, its block runs and Python skips the remaining branches. If none match, the fallback else block executes.',
    codeExample: `marks = 82

if marks >= 90:
    grade = "A+ (Outstanding)"
elif marks >= 75:
    grade = "A (Distinction)"
elif marks >= 50:
    grade = "B (Pass)"
else:
    grade = "C (Needs Improvement)"

print(f"Final Score: {marks} | Grade: {grade}")`,
    explanation: [
      "Step 1: Checks 'marks >= 90' (False for 82).",
      "Step 2: Checks 'marks >= 75' (True for 82) -> sets grade to 'A (Distinction)'.",
      "Step 3: Bypasses the subsequent elif and else checks.",
      "Step 4: Prints the resulting grade."
    ],
    realLifeExample: '🚦 Like grading movie age ratings: IF under 13 → PG, ELIF under 18 → PG-13, ELSE → R. Only one rating applies!',
    prerequisites: ['If Condition'],
    estimatedTime: '12 mins',
  },
  {
    language: 'python',
    topicId: 'for-loop',
    title: 'For Loop',
    description: 'Iterate over sequences and number ranges cleanly using for loops and range().',
    order: 7,
    difficulty: 'Beginner',
    content: 'Python for loops iterate over items in any sequence (like a list, string, or range of numbers). The range(start, stop, step) function generates a progression of numbers starting at start and ending just before stop.',
    codeExample: `print("Multiplication Table for 3:")

# range(1, 6) generates numbers 1, 2, 3, 4, 5
for i in range(1, 6):
    result = 3 * i
    print(f"3 x {i} = {result}")`,
    explanation: [
      "Step 1: 'range(1, 6)' produces the sequence [1, 2, 3, 4, 5].",
      "Step 2: In the first pass, 'i' is assigned 1, runs the block, and prints '3 x 1 = 3'.",
      "Step 3: In subsequent passes, 'i' takes 2, 3, 4, 5 in order.",
      "Step 4: When the sequence is exhausted, the loop exits."
    ],
    realLifeExample: '📚 Like stamping 5 library books: you pick up book 1, stamp it, move to book 2, and repeat until all 5 books are stamped.',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '12 mins',
  },
  {
    language: 'python',
    topicId: 'while-loop',
    title: 'While Loop',
    description: 'Repeat actions dynamically based on ongoing condition checks.',
    order: 8,
    difficulty: 'Beginner',
    content: 'A while loop repeats a block of code as long as its condition remains True. You can use break to exit the loop early or continue to skip the rest of the current iteration.',
    codeExample: `countdown = 5

print("Rocket launch sequence initiated:")

while countdown > 0:
    print(f"{countdown}...")
    countdown -= 1  # Decrement counter

print("🚀 Blast off!")`,
    explanation: [
      "Step 1: 'countdown = 5' initializes the loop state.",
      "Step 2: 'while countdown > 0:' verifies 5 > 0 (True).",
      "Step 3: Prints countdown and decrements by 1 ('countdown -= 1').",
      "Step 4: When countdown becomes 0, condition is False and loop finishes."
    ],
    realLifeExample: '⏳ Like an hourglass timer: WHILE sand remains in the top bulb → keep flowing. When empty → stop.',
    prerequisites: ['If Condition', 'For Loop'],
    estimatedTime: '12 mins',
  },
  {
    language: 'python',
    topicId: 'lists',
    title: 'Lists',
    description: 'Store, modify, sort, and slice ordered collections of items using Python lists.',
    order: 9,
    difficulty: 'Beginner',
    content: 'A list in Python is an ordered, mutable (changeable) collection of items defined with square brackets []. Lists support indexing (starting at 0), negative indexing (-1 is the last element), slicing ([start:stop]), and built-in methods like .append(), .pop(), and .sort().',
    codeExample: `# Creating and modifying lists
fruits = ["Apple", "Mango", "Banana"]

# Access by index
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])

# Adding a new item
fruits.append("Orange")
print("Updated list:", fruits)
print("Total items:", len(fruits))`,
    explanation: [
      "Step 1: 'fruits = [...]' creates a list of strings.",
      "Step 2: 'fruits[0]' accesses the first element; 'fruits[-1]' accesses the last.",
      "Step 3: 'fruits.append(\"Orange\")' inserts an item at the end.",
      "Step 4: 'len(fruits)' returns the total number of items."
    ],
    realLifeExample: '🛒 Like a shopping list on your phone: you add items (append), cross off purchased items (pop), or reorder your list anytime.',
    prerequisites: ['Data Types', 'For Loop'],
    estimatedTime: '15 mins',
  },
  {
    language: 'python',
    topicId: 'tuples',
    title: 'Tuples',
    description: 'Create immutable, protected sequences of data using parentheses ( ).',
    order: 10,
    difficulty: 'Beginner',
    content: 'A tuple is an ordered collection of items that is immutable (cannot be changed after creation). Tuples are defined using parentheses () and are ideal for fixed data like coordinates, RGB color values, or days of the week.',
    codeExample: `# Tuple containing GPS coordinates (Latitude, Longitude)
location = (13.0827, 80.2707)

print("Latitude:", location[0])
print("Longitude:", location[1])

# Unpacking a tuple
lat, lon = location
print(f"Coordinates: {lat} N, {lon} E")`,
    explanation: [
      "Step 1: 'location = (13.0827, 80.2707)' defines an immutable tuple.",
      "Step 2: Elements are accessed via 0-based indexing ('location[0]').",
      "Step 3: 'lat, lon = location' unpacks values into separate variables.",
      "Step 4: Trying to modify 'location[0] = 12.0' will raise a TypeError protecting the data."
    ],
    realLifeExample: '🆔 Like your date of birth or Aadhaar/Social Security number: once recorded, it cannot and should not be changed!',
    prerequisites: ['Lists'],
    estimatedTime: '12 mins',
  },
  {
    language: 'python',
    topicId: 'dictionaries',
    title: 'Dictionaries',
    description: 'Store and retrieve structured data using key-value pair associations.',
    order: 11,
    difficulty: 'Beginner',
    content: 'A dictionary is an unordered, changeable collection of key-value pairs defined with curly braces {}. Each key acts as an identifier to quickly look up its associated value in constant time.',
    codeExample: `# Student record dictionary
student = {
    "name": "Karthik",
    "role": "Frontend Developer",
    "score": 95,
    "is_certified": True
}

# Accessing and updating values
print("Student Name:", student["name"])
print("Role:", student.get("role"))

# Adding a new key-value pair
student["city"] = "Chennai"
print("Full Profile:", student)`,
    explanation: [
      "Step 1: '{\"name\": \"Karthik\", ...}' creates key-value mappings.",
      "Step 2: 'student[\"name\"]' looks up the value for the key 'name'.",
      "Step 3: '.get(\"role\")' safely retrieves values without raising KeyError.",
      "Step 4: 'student[\"city\"] = \"Chennai\"' assigns a new key-value entry."
    ],
    realLifeExample: '📖 Like a phone contacts list: each person\'s name (Key) maps directly to their mobile number (Value). You search by name to get the number instantly.',
    prerequisites: ['Lists', 'Data Types'],
    estimatedTime: '15 mins',
  },
  {
    language: 'python',
    topicId: 'functions',
    title: 'Functions',
    description: 'Organize code into modular, reusable blocks using def, parameters, and return.',
    order: 12,
    difficulty: 'Beginner',
    content: 'A function is a named block of reusable code created with the def keyword. Functions can accept input values (parameters) and send back a computed result using the return statement.',
    codeExample: `# Define a function to calculate total with tax
def calculate_total(price, tax_percent=5):
    tax_amount = price * (tax_percent / 100)
    final_amount = price + tax_amount
    return final_amount

# Call function with custom and default arguments
total1 = calculate_total(1000)
total2 = calculate_total(1000, 18)

print("Bill 1 (5% Tax): Rs.", total1)
print("Bill 2 (18% Tax): Rs.", total2)`,
    explanation: [
      "Step 1: 'def calculate_total(price, tax_percent=5):' declares the function with a default parameter.",
      "Step 2: 'return final_amount' sends the calculated result back to the caller.",
      "Step 3: 'calculate_total(1000)' executes the function and stores the result."
    ],
    realLifeExample: '🧃 Like a fruit blender: you drop in fruits and milk (parameters), press the blend button (run function), and it pours a smoothie (return value)!',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '15 mins',
  },
  {
    language: 'python',
    topicId: 'classes-objects',
    title: 'Classes and Objects',
    description: 'Learn Object-Oriented Programming in Python using class, __init__, and self.',
    order: 13,
    difficulty: 'Beginner',
    content: 'A class is a blueprint for creating objects. The __init__() method is the constructor that initializes object attributes when a new instance is created. The self parameter represents the current instance being manipulated.',
    codeExample: `class Smartphone:
    def __init__(self, brand, model, price):
        self.brand = brand
        self.model = model
        self.price = price

    def display_details(self):
        print(f"{self.brand} {self.model} - Rs.{self.price}")

# Creating object instances
phone1 = Smartphone("Samsung", "Galaxy S24", 79999)
phone2 = Smartphone("Apple", "iPhone 15", 74999)

phone1.display_details()
phone2.display_details()`,
    explanation: [
      "Step 1: 'class Smartphone:' defines the blueprint for mobile devices.",
      "Step 2: 'def __init__(self, ...):' runs automatically to set up initial attributes.",
      "Step 3: 'phone1 = Smartphone(...)' instantiates a new unique object in memory.",
      "Step 4: 'phone1.display_details()' invokes the method on that specific object."
    ],
    realLifeExample: '🏗️ Like an automobile assembly blueprint: the blueprint (Class) defines engine, seats, and doors. Each manufactured car driving on the road (Object) is an instance with its own chassis number and paint color.',
    prerequisites: ['Functions', 'Dictionaries'],
    estimatedTime: '15 mins',
  },
  {
    language: 'python',
    topicId: 'inheritance',
    title: 'Inheritance',
    description: 'Extend and reuse classes using Python inheritance and super().',
    order: 14,
    difficulty: 'Beginner',
    content: 'Inheritance allows a child class to inherit all methods and properties from a parent class. Using super().__init__(), the child class can initialize parent attributes while introducing its own unique behaviors.',
    codeExample: `# Parent class
class Employee:
    def __init__(self, name, emp_id):
        self.name = name
        self.emp_id = emp_id

    def work(self):
        print(f"{self.name} is performing general duties.")

# Child class inheriting from Employee
class Developer(Employee):
    def __init__(self, name, emp_id, tech_stack):
        super().__init__(name, emp_id)
        self.tech_stack = tech_stack

    def work(self):
        print(f"{self.name} is writing code in {self.tech_stack}!")

dev = Developer("Sanjay", 1042, "Python & MERN")
print("Employee ID:", dev.emp_id)
dev.work()`,
    explanation: [
      "Step 1: 'class Developer(Employee):' creates a child class inheriting from Employee.",
      "Step 2: 'super().__init__(name, emp_id)' passes common attributes to the parent constructor.",
      "Step 3: 'work()' overrides the parent method with a specialized developer implementation."
    ],
    realLifeExample: '🧬 Like genetics: you inherit basic biological attributes from your parents (superclass), while developing your own unique interests and career skills (subclass)!',
    prerequisites: ['Classes and Objects', 'Functions'],
    estimatedTime: '15 mins',
  },
];

// ==========================================
// 3. JAVASCRIPT CURRICULUM (14 Lessons)
// ==========================================
const javascriptLessons = [
  {
    language: 'javascript',
    topicId: 'variables',
    title: 'Variables',
    description: 'Declare and initialize variables using modern let and const in JavaScript.',
    order: 1,
    difficulty: 'Beginner',
    content: 'In modern JavaScript (ES6+), you declare variables using let (for values that can change) and const (for constant values that cannot be reassigned). Variables hold data that your web application can read and manipulate.',
    codeExample: `// Declaring variables in JavaScript
const appName = "ARIVUVITHAI";
let userCount = 1500;
let isOnline = true;

console.log("App:", appName);
console.log("Active Users:", userCount);

// Update let variable
userCount = userCount + 1;
console.log("New User Count:", userCount);`,
    explanation: [
      "Step 1: 'const appName = ...' creates an unchangeable constant value.",
      "Step 2: 'let userCount = 1500' creates a variable that can be updated later.",
      "Step 3: 'console.log(...)' outputs messages and values to the browser or terminal console."
    ],
    realLifeExample: '🏷️ Like writing with pencil vs pen: `const` is written in permanent ink (cannot be erased), while `let` is written in pencil (can be erased and changed anytime)!',
    prerequisites: ['None'],
    estimatedTime: '10 mins',
  },
  {
    language: 'javascript',
    topicId: 'data-types',
    title: 'Data Types',
    description: 'Understand JavaScript primitives: Number, String, Boolean, Null, and Undefined.',
    order: 2,
    difficulty: 'Beginner',
    content: 'JavaScript has dynamic typing. Primitive types include number (integers and floats), string (text in quotes), boolean (true/false), undefined (declared but unassigned), and null (intentional empty value). You can check types with typeof.',
    codeExample: `let score = 98.5;            // number
let playerName = "Sundar";   // string
let isWinner = true;         // boolean
let trophies = null;         // null (explicitly empty)
let rank;                    // undefined (not yet assigned)

console.log("score is:", typeof score);
console.log("name is:", typeof playerName);
console.log("isWinner is:", typeof isWinner);
console.log("rank is:", typeof rank);`,
    explanation: [
      "Step 1: All numbers in JavaScript are of type 'number' (including integers and decimals).",
      "Step 2: Text enclosed in single, double, or backtick quotes is 'string'.",
      "Step 3: 'typeof' keyword returns a string indicating the data type."
    ],
    realLifeExample: '📦 Like mail packages: a package can hold letters (string), cash (number), a checkbox (boolean), or be an empty envelope (null)!',
    prerequisites: ['Variables'],
    estimatedTime: '10 mins',
  },
  {
    language: 'javascript',
    topicId: 'operators',
    title: 'Operators',
    description: 'Perform arithmetic, strict equality comparisons, and logical evaluations.',
    order: 3,
    difficulty: 'Beginner',
    content: 'JavaScript provides arithmetic operators (+, -, *, /, %), comparison operators (strict equality ===, strict inequality !==, >, <), and logical operators (&&, ||, !). Always prefer === over == to check both value and type.',
    codeExample: `let x = 10;
let y = 3;

console.log("Sum:", x + y);        // 13
console.log("Remainder:", x % y);  // 1

// Strict equality check
console.log(5 === "5");            // false (different types)
console.log(5 == "5");             // true (loose type coercion)

// Logical AND
let isEligible = (x > 5) && (y < 5);
console.log("Is Eligible?", isEligible); // true`,
    explanation: [
      "Step 1: 'x % y' returns the remainder of division (useful for checking parity).",
      "Step 2: '===' checks both value and type strictly, preventing unexpected bugs.",
      "Step 3: '&&' requires both sub-conditions to be true."
    ],
    realLifeExample: '⚖️ Like airport security: `===` checks both your passport name AND biometric photo (strict check), whereas `==` only glances at the name!',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '12 mins',
  },
  {
    language: 'javascript',
    topicId: 'if-condition',
    title: 'If Condition',
    description: 'Execute JavaScript code blocks conditionally based on truthy evaluations.',
    order: 4,
    difficulty: 'Beginner',
    content: 'The if statement runs a code block enclosed in curly braces { } only if the condition inside parentheses ( ) evaluates to true (or a truthy value).',
    codeExample: `let batteryLevel = 15;

console.log("Checking device battery...");

if (batteryLevel <= 20) {
    console.log("⚠️ Low Battery! Please plug in your charger.");
}

console.log("System check complete.");`,
    explanation: [
      "Step 1: 'batteryLevel <= 20' is evaluated (15 <= 20 is true).",
      "Step 2: The code inside the { } block runs immediately.",
      "Step 3: If batteryLevel was 80, the warning block would be skipped."
    ],
    realLifeExample: '🚪 Like an automatic sensor: IF the temperature in a room exceeds 25°C → turn on the air conditioner automatically.',
    prerequisites: ['Operators'],
    estimatedTime: '10 mins',
  },
  {
    language: 'javascript',
    topicId: 'if-else',
    title: 'If-Else and Else-If',
    description: 'Handle branching logic with if, else if, and fallback else blocks.',
    order: 5,
    difficulty: 'Beginner',
    content: 'Use if-else to provide alternative code paths when the primary condition fails. Chain else if conditions to evaluate multiple possibilities in sequence.',
    codeExample: `let score = 88;

if (score >= 90) {
    console.log("Grade: Distinction");
} else if (score >= 50) {
    console.log("Grade: Passed");
} else {
    console.log("Grade: Retake Required");
}`,
    explanation: [
      "Step 1: Checks score >= 90 (false).",
      "Step 2: Checks score >= 50 (true) -> prints 'Grade: Passed'.",
      "Step 3: Skips remaining else block."
    ],
    realLifeExample: '🚦 Like deciding outdoor plans: IF heavy rain → stay inside. ELSE IF cloudy → take an umbrella. ELSE → wear sunglasses!',
    prerequisites: ['If Condition'],
    estimatedTime: '12 mins',
  },
  {
    language: 'javascript',
    topicId: 'for-loop',
    title: 'For Loop',
    description: 'Repeat actions a predetermined number of times using standard for loops.',
    order: 6,
    difficulty: 'Beginner',
    content: 'A for loop repeats statements until a specified condition evaluates to false. It bundles initialization, condition, and increment step together.',
    codeExample: `console.log("Counting countdown sequence:");

for (let i = 1; i <= 5; i++) {
    console.log("Step #" + i + " completed");
}

console.log("All 5 steps finished!");`,
    explanation: [
      "Step 1: 'let i = 1' creates the loop counter.",
      "Step 2: 'i <= 5' is tested before each pass.",
      "Step 3: Runs the block, then 'i++' increments the counter by 1.",
      "Step 4: Terminates when i becomes 6."
    ],
    realLifeExample: '🛎️ Like ringing a hotel bell 3 times: ring 1, ring 2, ring 3, then wait for the attendant.',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '12 mins',
  },
  {
    language: 'javascript',
    topicId: 'while-loop',
    title: 'While Loop',
    description: 'Loop continuously based on dynamic runtime conditions.',
    order: 7,
    difficulty: 'Beginner',
    content: 'A while loop executes its statements as long as a specified condition evaluates to true. Ensure the loop condition eventually becomes false to prevent infinite loops.',
    codeExample: `let ticketsAvailable = 3;

while (ticketsAvailable > 0) {
    console.log("Ticket sold! Remaining:", ticketsAvailable - 1);
    ticketsAvailable--;
}

console.log("Housefull! No tickets left.");`,
    explanation: [
      "Step 1: Verifies 'ticketsAvailable > 0' is true.",
      "Step 2: Executes sales log and decrements 'ticketsAvailable--'.",
      "Step 3: Stops when ticketsAvailable hits 0."
    ],
    realLifeExample: '🔋 Like recharging a battery: WHILE charge < 100% → continue pumping current. When 100% → stop charging.',
    prerequisites: ['For Loop'],
    estimatedTime: '12 mins',
  },
  {
    language: 'javascript',
    topicId: 'arrays',
    title: 'Arrays',
    description: 'Create, access, and manipulate lists of elements with JavaScript array methods.',
    order: 8,
    difficulty: 'Beginner',
    content: 'An array is an ordered collection of values defined with []. Arrays are 0-indexed and feature dynamic sizing and built-in methods like .push(), .pop(), .length, and .map().',
    codeExample: `let courses = ["Java", "Python", "JavaScript"];

console.log("First course:", courses[0]);
console.log("Total courses:", courses.length);

// Add item to array
courses.push("C++");
console.log("Updated list:", courses);`,
    explanation: [
      "Step 1: 'courses[0]' accesses the first element.",
      "Step 2: '.push(\"C++\")' adds an item to the end of the array.",
      "Step 3: '.length' returns the count of items."
    ],
    realLifeExample: '🚆 Like a train with passenger carriages: carriage 0 is behind the engine, carriage 1 is next, and you can couple more carriages (push) anytime.',
    prerequisites: ['Data Types', 'For Loop'],
    estimatedTime: '15 mins',
  },
  {
    language: 'javascript',
    topicId: 'objects',
    title: 'Objects',
    description: 'Represent real-world entities using key-value pair JavaScript objects.',
    order: 9,
    difficulty: 'Beginner',
    content: 'A JavaScript object is a standalone entity with properties and type, defined with curly braces {}. You access properties using dot notation (object.property) or bracket notation (object["property"]).',
    codeExample: `const learner = {
    name: "Arun",
    course: "Full Stack",
    progressPercent: 75,
    celebrate: function() {
        console.log(this.name + " reached " + this.progressPercent + "% progress! 🎉");
    }
};

console.log("Learner Name:", learner.name);
learner.celebrate();`,
    explanation: [
      "Step 1: 'const learner = { ... }' creates an object with key-value properties and a method.",
      "Step 2: 'learner.name' accesses property values using dot notation.",
      "Step 3: 'this.name' refers to the property on the current object."
    ],
    realLifeExample: '🚗 Like a car passport: it lists brand: "Hyundai", model: "Creta", year: 2024, and color: "White". All data is grouped in one record!',
    prerequisites: ['Data Types', 'Arrays'],
    estimatedTime: '15 mins',
  },
  {
    language: 'javascript',
    topicId: 'functions',
    title: 'Functions',
    description: 'Write reusable code blocks using standard function declarations and return values.',
    order: 10,
    difficulty: 'Beginner',
    content: 'Functions allow you to encapsulate a piece of logic, accept inputs (parameters), perform calculations, and return an output using the return statement.',
    codeExample: `// Function declaration
function calculateDiscount(price, discountPercent) {
    let savings = price * (discountPercent / 100);
    return price - savings;
}

let finalPrice = calculateDiscount(2000, 15);
console.log("Final Price after 15% discount: Rs.", finalPrice);`,
    explanation: [
      "Step 1: 'function calculateDiscount(...)' declares the function.",
      "Step 2: 'return price - savings' sends the result back.",
      "Step 3: 'calculateDiscount(2000, 15)' invokes it with parameters."
    ],
    realLifeExample: '🧮 Like a tax calculator app: you enter income and deductions, and it calculates and shows the final payable tax amount.',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '15 mins',
  },
  {
    language: 'javascript',
    topicId: 'arrow-functions',
    title: 'Arrow Functions',
    description: 'Write concise, clean modern function expressions using ES6 arrow syntax (=>).',
    order: 11,
    difficulty: 'Beginner',
    content: 'Arrow functions provide a compact syntax for writing function expressions in modern JavaScript. If the function body contains a single expression, the return keyword and curly braces can be omitted.',
    codeExample: `// Standard function
const multiply = (a, b) => a * b;

// Multi-line arrow function
const greetUser = (name) => {
    let greeting = "Vanakkam, " + name + "! Welcome to ARIVUVITHAI.";
    return greeting;
};

console.log("5 x 4 =", multiply(5, 4));
console.log(greetUser("Shalini"));`,
    explanation: [
      "Step 1: '(a, b) => a * b' implicitly returns the result of a * b.",
      "Step 2: Multi-line arrow functions use { } and explicit 'return'.",
      "Step 3: Arrow functions are widely used in modern React and array methods."
    ],
    realLifeExample: '⚡ Like shorthand notes: instead of writing "Please turn to page number 5", you quickly jot down "p. 5" to achieve the same result faster!',
    prerequisites: ['Functions'],
    estimatedTime: '12 mins',
  },
  {
    language: 'javascript',
    topicId: 'scope',
    title: 'Scope',
    description: 'Understand Global, Function, and Block scope to prevent variable collision.',
    order: 12,
    difficulty: 'Beginner',
    content: 'Scope determines the accessibility/visibility of variables. Variables declared with let/const inside a block { } cannot be accessed from outside that block (block scope). Variables declared outside all functions have global scope.',
    codeExample: `let globalCourse = "JavaScript Mastery";

function checkScope() {
    let functionVar = "Accessible only inside this function";
    
    if (true) {
        let blockVar = "Accessible only inside this if block";
        console.log("Inside block:", blockVar);
    }
    // console.log(blockVar); // Would throw ReferenceError
    console.log("Inside function:", functionVar);
}

checkScope();
console.log("Global scope:", globalCourse);`,
    explanation: [
      "Step 1: 'globalCourse' is visible everywhere in the file.",
      "Step 2: 'functionVar' is confined to the 'checkScope' function.",
      "Step 3: 'blockVar' is confined strictly to the 'if' block { }."
    ],
    realLifeExample: '🏠 Like house rooms: the street address is visible globally to everyone, the living room TV is shared by the family (function scope), and the private diary in your drawer is for you alone (block scope)!',
    prerequisites: ['Variables', 'Functions'],
    estimatedTime: '15 mins',
  },
  {
    language: 'javascript',
    topicId: 'classes-objects',
    title: 'Classes and Objects',
    description: 'Create object templates using modern ES6 class syntax and constructors.',
    order: 13,
    difficulty: 'Beginner',
    content: 'ES6 classes provide cleaner syntax over constructor functions to implement Object-Oriented Programming in JavaScript. Classes include a constructor method and prototype methods.',
    codeExample: `class Course {
    constructor(title, durationWeeks) {
        this.title = title;
        this.durationWeeks = durationWeeks;
    }

    getSummary() {
        return \`\${this.title} (\${this.durationWeeks} weeks course)\`;
    }
}

const jsCourse = new Course("Modern JavaScript", 4);
console.log(jsCourse.getSummary());`,
    explanation: [
      "Step 1: 'class Course' defines the template.",
      "Step 2: 'constructor' initializes instance properties upon 'new Course()'.",
      "Step 3: 'getSummary()' is a reusable method shared by all Course instances."
    ],
    realLifeExample: '🍪 Like a cookie cutter: the cutter (Class) determines the star shape, and each cookie stamped out (Object) has that exact shape with its own sprinkles!',
    prerequisites: ['Objects', 'Functions'],
    estimatedTime: '15 mins',
  },
  {
    language: 'javascript',
    topicId: 'inheritance',
    title: 'Inheritance',
    description: 'Extend classes using extends and super to share common functionality.',
    order: 14,
    difficulty: 'Beginner',
    content: 'Inheritance allows a subclass to extend a parent class using the extends keyword and call the parent constructor using super().',
    codeExample: `class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    login() {
        console.log(\`\${this.name} (\${this.email}) logged in successfully.\`);
    }
}

class Admin extends User {
    constructor(name, email, permissions) {
        super(name, email); // Call parent constructor
        this.permissions = permissions;
    }

    manage() {
        console.log(\`Admin \${this.name} has permissions: \${this.permissions.join(", ")}\`);
    }
}

const adminUser = new Admin("Ganesh", "admin@arivuvithai.com", ["READ", "WRITE", "DELETE"]);
adminUser.login();
adminUser.manage();`,
    explanation: [
      "Step 1: 'class Admin extends User' derives Admin from User.",
      "Step 2: 'super(name, email)' forwards common fields to the User constructor.",
      "Step 3: Admin instances have access to both 'login()' and 'manage()'."
    ],
    realLifeExample: '👔 Like bank staff roles: an Employee has an ID badge and clock-in rights; a Bank Manager inherits all Employee traits while gaining authority to approve loans!',
    prerequisites: ['Classes and Objects'],
    estimatedTime: '15 mins',
  },
];

// ==========================================
// 4. C++ CURRICULUM (14 Lessons)
// ==========================================
const cppLessons = [
  {
    language: 'cpp',
    topicId: 'variables',
    title: 'Variables',
    description: 'Declare typed variables and print to terminal in C++ using std::cout.',
    order: 1,
    difficulty: 'Beginner',
    content: 'C++ is a high-performance, statically typed language. Every variable must have a declared type (like int, double, or char). The standard output stream std::cout is used to print values.',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int studentId = 1024;
    double gradeAverage = 91.8;
    char section = 'A';

    cout << "Student ID: " << studentId << endl;
    cout << "Grade Average: " << gradeAverage << endl;
    cout << "Section: " << section << endl;

    return 0;
}`,
    explanation: [
      "Step 1: '#include <iostream>' includes the standard input/output stream library.",
      "Step 2: 'int studentId = 1024;' reserves 4 bytes in memory for an integer.",
      "Step 3: 'cout << ... << endl;' streams formatted text to the console and prints a newline."
    ],
    realLifeExample: '🏷️ Like labeled storage bins in a workshop: one bin is specifically molded to hold small screws (int), another for fluid bottles (double).',
    prerequisites: ['None'],
    estimatedTime: '10 mins',
  },
  {
    language: 'cpp',
    topicId: 'data-types',
    title: 'Data Types',
    description: 'Understand C++ primitive types: int, float, double, char, bool, and string.',
    order: 2,
    difficulty: 'Beginner',
    content: 'C++ provides fundamental data types including integer types (int, short, long), floating-point types (float, double), boolean (bool), and character types (char). The string class handles text.',
    codeExample: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int count = 50;
    float pi = 3.14f;
    double precisePi = 3.1415926535;
    bool isCompleted = true;
    string title = "C++ Mastery";

    cout << "Title: " << title << endl;
    cout << "Count: " << count << endl;
    cout << "Boolean value: " << isCompleted << endl;

    return 0;
}`,
    explanation: [
      "Step 1: '#include <string>' enables the modern C++ std::string class.",
      "Step 2: 'bool' stores 1 (true) or 0 (false).",
      "Step 3: 'double' offers double precision (64-bit) compared to 32-bit 'float'."
    ],
    realLifeExample: '📦 Like different coin denominations and currency notes: each type represents specific value ranges and precision!',
    prerequisites: ['Variables'],
    estimatedTime: '10 mins',
  },
  {
    language: 'cpp',
    topicId: 'input-output',
    title: 'Input and Output',
    description: 'Interact with user input using std::cin and stream insertion/extraction operators.',
    order: 3,
    difficulty: 'Beginner',
    content: 'In C++, std::cout uses the insertion operator (<<) to output data, while std::cin uses the extraction operator (>>) to read input entered by the user from the keyboard.',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int length = 12;
    int width = 5;
    int area = length * width;

    cout << "Rectangle Dimensions:" << endl;
    cout << "Length: " << length << ", Width: " << width << endl;
    cout << "Calculated Area: " << area << " sq units." << endl;

    return 0;
}`,
    explanation: [
      "Step 1: 'cin >> variable;' extracts input from keyboard and stores it into variable.",
      "Step 2: 'cout << ...' outputs text and calculated expressions.",
      "Step 3: 'endl' flushes the stream and moves cursor to a new line."
    ],
    realLifeExample: '📠 Like a vending machine: you insert cash (cin >> money) and the machine displays your change on the LED screen (cout << change).',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '10 mins',
  },
  {
    language: 'cpp',
    topicId: 'operators',
    title: 'Operators',
    description: 'Master arithmetic, comparison, logical, and increment operators in C++.',
    order: 4,
    difficulty: 'Beginner',
    content: 'C++ provides operators for calculations (+, -, *, /, %), comparison (==, !=, <, >, <=, >=), logical evaluation (&&, ||, !), and shortcut assignments (+=, -=, ++, --).',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int a = 17;
    int b = 5;

    cout << "Division: " << (a / b) << endl;     // 3 (integer division)
    cout << "Remainder: " << (a % b) << endl;    // 2 (modulo)

    bool check = (a > 10) && (b < 10);
    cout << "Condition met: " << check << endl;  // 1 (true)

    return 0;
}`,
    explanation: [
      "Step 1: Integer division '17 / 5' truncates the decimal to 3.",
      "Step 2: Modulo '17 % 5' calculates the remainder 2.",
      "Step 3: Logical AND '&&' ensures both expressions evaluate to true."
    ],
    realLifeExample: '🧮 Like calculating exam percentages: you add all subject marks (+), divide by total marks (/), and compare if score >= 50% to determine pass status.',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '12 mins',
  },
  {
    language: 'cpp',
    topicId: 'if-condition',
    title: 'If Condition',
    description: 'Control C++ program flow using conditional if statements.',
    order: 5,
    difficulty: 'Beginner',
    content: 'An if statement tests a condition in parentheses. If the condition is true (non-zero), the statements inside the following block { } are executed.',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int age = 19;

    cout << "Checking driving license eligibility..." << endl;

    if (age >= 18) {
        cout << "Eligible: You may apply for a driving license!" << endl;
    }

    return 0;
}`,
    explanation: [
      "Step 1: 'age >= 18' is evaluated (19 >= 18 is true).",
      "Step 2: Code inside { } executes and prints confirmation.",
      "Step 3: If age were 15, the block would be skipped."
    ],
    realLifeExample: '🛑 Like a height check at a roller coaster: IF height >= 120 cm → board the ride!',
    prerequisites: ['Operators'],
    estimatedTime: '10 mins',
  },
  {
    language: 'cpp',
    topicId: 'if-else',
    title: 'If-Else and Else-If',
    description: 'Implement multi-branch decision structures using if, else if, and else in C++.',
    order: 6,
    difficulty: 'Beginner',
    content: 'When two or more paths exist, if-else selects the correct path based on Boolean evaluations. The else if chain allows sequential testing of multiple alternatives.',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int score = 76;

    if (score >= 90) {
        cout << "Grade: A (Excellent)" << endl;
    } else if (score >= 70) {
        cout << "Grade: B (Good)" << endl;
    } else {
        cout << "Grade: C (Pass)" << endl;
    }

    return 0;
}`,
    explanation: [
      "Step 1: First condition (76 >= 90) is false.",
      "Step 2: Second condition (76 >= 70) is true -> prints Grade: B.",
      "Step 3: Remaining else branch is skipped."
    ],
    realLifeExample: '🚦 Like a traffic light: IF Green → Go. ELSE IF Amber → Prepare to stop. ELSE → Stop.',
    prerequisites: ['If Condition'],
    estimatedTime: '12 mins',
  },
  {
    language: 'cpp',
    topicId: 'for-loop',
    title: 'For Loop',
    description: 'Execute count-controlled repetitive statements using C++ for loops.',
    order: 7,
    difficulty: 'Beginner',
    content: 'A for loop in C++ repeats a statement block a fixed number of times using initialization, condition testing, and iteration incrementation.',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    cout << "Table of 4:" << endl;

    for (int i = 1; i <= 5; i++) {
        cout << "4 x " << i << " = " << (4 * i) << endl;
    }

    return 0;
}`,
    explanation: [
      "Step 1: 'int i = 1' creates the loop index.",
      "Step 2: 'i <= 5' is tested before each pass.",
      "Step 3: Block outputs the multiplication step.",
      "Step 4: 'i++' increments i until it reaches 6, ending the loop."
    ],
    realLifeExample: '🏃 Like swimming 5 laps in a pool: you swim lap 1, increment counter, repeat until lap 5 is finished.',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '12 mins',
  },
  {
    language: 'cpp',
    topicId: 'while-loop',
    title: 'While Loop',
    description: 'Repeat actions dynamically while conditions remain true in C++.',
    order: 8,
    difficulty: 'Beginner',
    content: 'A while loop evaluates its boolean condition before executing the loop body. The loop repeats continuously until the condition becomes false.',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int attempts = 3;

    while (attempts > 0) {
        cout << "Security token verified. Attempts remaining: " << attempts << endl;
        attempts--;
    }

    cout << "Session locked. Max attempts reached." << endl;
    return 0;
}`,
    explanation: [
      "Step 1: 'attempts = 3' initializes state.",
      "Step 2: 'while (attempts > 0)' tests condition.",
      "Step 3: Decrements counter each time until reaching 0."
    ],
    realLifeExample: '🔋 Like using flashlight batteries: WHILE battery power > 0 → light shines. When empty → turns off.',
    prerequisites: ['For Loop'],
    estimatedTime: '12 mins',
  },
  {
    language: 'cpp',
    topicId: 'arrays',
    title: 'Arrays',
    description: 'Store and manipulate fixed-size contiguous collections of elements.',
    order: 9,
    difficulty: 'Beginner',
    content: 'An array in C++ stores multiple items of the same data type in sequential memory locations. Elements are referenced using 0-based integer indexes.',
    codeExample: `#include <iostream>
using namespace std;

int main() {
    int marks[5] = {88, 92, 79, 95, 84};

    cout << "First student mark: " << marks[0] << endl;
    cout << "Third student mark: " << marks[2] << endl;

    cout << "\\nAll marks:" << endl;
    for (int i = 0; i < 5; i++) {
        cout << "Student #" << (i + 1) << ": " << marks[i] << endl;
    }

    return 0;
}`,
    explanation: [
      "Step 1: 'int marks[5] = {...}' allocates 5 contiguous integer slots.",
      "Step 2: 'marks[0]' accesses the first slot; 'marks[4]' accesses the last.",
      "Step 3: A for loop traverses indexes 0 through 4."
    ],
    realLifeExample: '🏢 Like pigeonhole mailboxes in an office lobby: slot 0 for office 101, slot 1 for 102, each holding letters for that office.',
    prerequisites: ['Data Types', 'For Loop'],
    estimatedTime: '15 mins',
  },
  {
    language: 'cpp',
    topicId: 'strings',
    title: 'Strings',
    description: 'Manipulate text easily using the C++ std::string class and methods.',
    order: 10,
    difficulty: 'Beginner',
    content: 'C++ provides the std::string class in the <string> header. Strings support dynamic resizing, concatenation with +, and member methods like .length() and .substr().',
    codeExample: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string greeting = "Hello";
    string name = "ARIVUVITHAI";

    string message = greeting + ", " + name + "!";
    cout << message << endl;
    cout << "Message character length: " << message.length() << endl;

    return 0;
}`,
    explanation: [
      "Step 1: 'greeting + \", \" + name' concatenates text strings seamlessly.",
      "Step 2: 'message.length()' returns the count of characters in the string."
    ],
    realLifeExample: '🚂 Like linking toy train cars: you attach "Engine" + "Coach A" + "Coach B" into a single long train!',
    prerequisites: ['Data Types', 'Arrays'],
    estimatedTime: '12 mins',
  },
  {
    language: 'cpp',
    topicId: 'functions',
    title: 'Functions',
    description: 'Modularize C++ code into reusable functions with parameter passing and return values.',
    order: 11,
    difficulty: 'Beginner',
    content: 'A function in C++ is a block of code with a return type, name, and parameter list. Functions allow you to break large programs into manageable, reusable units.',
    codeExample: `#include <iostream>
using namespace std;

// Function declaration and definition
int findMax(int num1, int num2) {
    if (num1 > num2) return num1;
    else return num2;
}

int main() {
    int maxVal = findMax(45, 82);
    cout << "Maximum value is: " << maxVal << endl;
    return 0;
}`,
    explanation: [
      "Step 1: 'int findMax(int num1, int num2)' accepts two ints and returns an int.",
      "Step 2: 'return ...' hands the result back to main.",
      "Step 3: 'findMax(45, 82)' executes the function logic."
    ],
    realLifeExample: '☕ Like a coffee machine: insert water and coffee beans (parameters) -> press start -> collect hot espresso (return value)!',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '15 mins',
  },
  {
    language: 'cpp',
    topicId: 'classes-objects',
    title: 'Classes and Objects',
    description: 'Learn C++ Object-Oriented Programming: classes, public/private access, and objects.',
    order: 12,
    difficulty: 'Beginner',
    content: 'A class in C++ is a user-defined data type that groups data members and member functions. The public specifier makes members accessible outside the class, while private hides them.',
    codeExample: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int rollNo;

    void displayInfo() {
        cout << "Roll No: " << rollNo << " | Name: " << name << endl;
    }
};

int main() {
    Student s1;
    s1.name = "Meera";
    s1.rollNo = 101;

    s1.displayInfo();
    return 0;
}`,
    explanation: [
      "Step 1: 'class Student' creates the blueprint.",
      "Step 2: 'public:' exposes attributes to external code.",
      "Step 3: 'Student s1;' instantiates an object instance in memory.",
      "Step 4: 's1.displayInfo()' calls the member function on s1."
    ],
    realLifeExample: '🏗️ Like an architectural house plan: the blueprint (Class) defines room layouts; the physical house built on the plot (Object) is the real instance.',
    prerequisites: ['Functions', 'Variables'],
    estimatedTime: '15 mins',
  },
  {
    language: 'cpp',
    topicId: 'inheritance',
    title: 'Inheritance',
    description: 'Derive new classes from base classes using C++ public inheritance.',
    order: 13,
    difficulty: 'Beginner',
    content: "Inheritance in C++ allows a derived class to inherit member variables and functions from a base class using ': public BaseClass', promoting code reuse.",
    codeExample: `#include <iostream>
using namespace std;

// Base Class
class Device {
public:
    void powerOn() {
        cout << "Device powered on successfully." << endl;
    }
};

// Derived Class
class Laptop : public Device {
public:
    void openCodeEditor() {
        cout << "Opening ARIVUVITHAI coding portal..." << endl;
    }
};

int main() {
    Laptop myLaptop;
    myLaptop.powerOn();        // Inherited method
    myLaptop.openCodeEditor();  // Derived method
    return 0;
}`,
    explanation: [
      "Step 1: 'class Laptop : public Device' establishes inheritance.",
      "Step 2: Laptop inherits 'powerOn()' from Device.",
      "Step 3: 'myLaptop' can access both base and derived class functions."
    ],
    realLifeExample: '🧬 Like biological inheritance: child inherits eye color from parents (base class) while learning to play the piano (derived skill).',
    prerequisites: ['Classes and Objects'],
    estimatedTime: '15 mins',
  },
  {
    language: 'cpp',
    topicId: 'polymorphism',
    title: 'Polymorphism',
    description: 'Implement runtime polymorphism using C++ virtual functions and method overriding.',
    order: 14,
    difficulty: 'Beginner',
    content: 'Polymorphism allows member functions to execute different behaviors depending on the actual derived object invoked at runtime. In C++, this is achieved using the virtual keyword in base classes.',
    codeExample: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() {
        cout << "Animal makes a generic sound." << endl;
    }
};

class Dog : public Animal {
public:
    void speak() override {
        cout << "🐕 Dog barks: Woof Woof!" << endl;
    }
};

int main() {
    Animal* myPet = new Dog();
    myPet->speak(); // Calls Dog's overridden speak() method at runtime

    delete myPet;
    return 0;
}`,
    explanation: [
      "Step 1: 'virtual void speak()' in Animal permits dynamic binding.",
      "Step 2: 'Dog' overrides 'speak()' with its custom sound.",
      "Step 3: Calling speak() via an Animal pointer pointing to a Dog executes the Dog's version."
    ],
    realLifeExample: '🎭 Like pressing a power button: on a TV, it turns on the screen; on an air conditioner, it starts the cooling fan. The same command produces context-specific behavior!',
    prerequisites: ['Inheritance', 'Classes and Objects'],
    estimatedTime: '15 mins',
  },
];

// ==========================================
// 5. C CURRICULUM (14 Lessons)
// ==========================================
const cLessons = [
  {
    language: 'c',
    topicId: 'variables',
    title: 'Variables',
    description: 'Learn typed variable declarations and format printing in C using printf.',
    order: 1,
    difficulty: 'Beginner',
    content: 'C is a procedural programming language and the foundation of modern computing. Variables in C are explicitly typed memory locations that store numbers or characters.',
    codeExample: `#include <stdio.h>

int main() {
    // Variable declarations
    int studentId = 101;
    float examScore = 92.5;
    char section = 'B';

    printf("Student ID: %d\\n", studentId);
    printf("Score: %.1f\\n", examScore);
    printf("Section: %c\\n", section);

    return 0;
}`,
    explanation: [
      "Step 1: '#include <stdio.h>' includes standard input/output header.",
      "Step 2: 'int studentId = 101;' allocates integer storage.",
      "Step 3: 'printf' uses format specifiers (%d for integer, %.1f for float, %c for char) to output values."
    ],
    realLifeExample: '🏷️ Like labeled cubbies in a kindergarten: one cubby holds jackets (int), another holds water bottles (float).',
    prerequisites: ['None'],
    estimatedTime: '10 mins',
  },
  {
    language: 'c',
    topicId: 'data-types',
    title: 'Data Types',
    description: 'Master primitive C types: int, float, double, and char with format specifiers.',
    order: 2,
    difficulty: 'Beginner',
    content: 'C data types define the size and type of values variables can hold. Key types are int (integer), float (single precision decimal), double (double precision decimal), and char (single ASCII byte).',
    codeExample: `#include <stdio.h>

int main() {
    int items = 15;
    float unitPrice = 24.50f;
    double taxRate = 0.0525;
    char currency = '$';

    printf("Items: %d\\n", items);
    printf("Price: %c%.2f\\n", currency, unitPrice);
    printf("Tax Rate: %lf\\n", taxRate);

    return 0;
}`,
    explanation: [
      "Step 1: 'int' typically takes 4 bytes of memory.",
      "Step 2: 'float' takes 4 bytes; 'double' takes 8 bytes.",
      "Step 3: 'char' stores a single byte containing the character's ASCII code."
    ],
    realLifeExample: '📦 Like toolboxes: small trays for nails (char), medium for wrenches (int), and large for power drills (double).',
    prerequisites: ['Variables'],
    estimatedTime: '10 mins',
  },
  {
    language: 'c',
    topicId: 'input-output',
    title: 'Input and Output',
    description: 'Read user inputs and print formatted output using scanf and printf.',
    order: 3,
    difficulty: 'Beginner',
    content: 'In C, printf displays output to the screen, and scanf reads keyboard input into variables by passing their memory addresses using the address-of operator (&).',
    codeExample: `#include <stdio.h>

int main() {
    int length = 8;
    int width = 4;
    int area = length * width;

    printf("Rectangle Dimensions: %d x %d\\n", length, width);
    printf("Total Area: %d square units\\n", area);

    return 0;
}`,
    explanation: [
      "Step 1: 'printf' prints text and formatted numbers to stdout.",
      "Step 2: 'scanf(\"%d\", &var)' reads user input into memory address &var.",
      "Step 3: Format specifiers must match variable types."
    ],
    realLifeExample: '📮 Like sending and receiving postal letters: printf writes and posts the letter; scanf receives and places the letter at your home address (&).',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '10 mins',
  },
  {
    language: 'c',
    topicId: 'operators',
    title: 'Operators',
    description: 'Learn arithmetic, relational, logical, and unary operators in C.',
    order: 4,
    difficulty: 'Beginner',
    content: 'C supports arithmetic (+, -, *, /, %), relational (==, !=, <, >, <=, >=), logical (&&, ||, !), and unary increment/decrement (++, --) operators.',
    codeExample: `#include <stdio.h>

int main() {
    int a = 20;
    int b = 6;

    printf("Addition: %d\\n", a + b);     // 26
    printf("Division: %d\\n", a / b);     // 3 (integer division)
    printf("Remainder: %d\\n", a % b);    // 2 (modulo)

    int isValid = (a > 10) && (b < 10);
    printf("Is valid (1=True, 0=False): %d\\n", isValid);

    return 0;
}`,
    explanation: [
      "Step 1: 'a / b' performs integer division, discarding fractional parts.",
      "Step 2: 'a % b' calculates remainder.",
      "Step 3: C evaluates true as 1 and false as 0."
    ],
    realLifeExample: '🧮 Like a cash register: sums prices (+), calculates change (%), and checks coupon validity (&&).',
    prerequisites: ['Variables', 'Data Types'],
    estimatedTime: '12 mins',
  },
  {
    language: 'c',
    topicId: 'if-condition',
    title: 'If Condition',
    description: 'Control sequential flow with boolean condition evaluations in C.',
    order: 5,
    difficulty: 'Beginner',
    content: 'An if statement tests whether an expression evaluates to true (non-zero in C). If true, the code block inside curly braces executes.',
    codeExample: `#include <stdio.h>

int main() {
    int balance = 500;
    int withdrawalAmount = 200;

    printf("Processing withdrawal of Rs. %d...\\n", withdrawalAmount);

    if (balance >= withdrawalAmount) {
        printf("Transaction Approved! Please collect your cash.\\n");
    }

    return 0;
}`,
    explanation: [
      "Step 1: Condition (500 >= 200) evaluates to non-zero (true).",
      "Step 2: The code inside { } executes.",
      "Step 3: If balance was 100, the block would be skipped."
    ],
    realLifeExample: '🏧 Like an ATM withdrawal: IF account balance >= requested amount → dispense banknotes!',
    prerequisites: ['Operators'],
    estimatedTime: '10 mins',
  },
  {
    language: 'c',
    topicId: 'if-else',
    title: 'If-Else and Else-If',
    description: 'Implement multi-path decision logic using if, else if, and else in C.',
    order: 6,
    difficulty: 'Beginner',
    content: 'If-else branching executes one code block when the condition is true and an alternate code block when false.',
    codeExample: `#include <stdio.h>

int main() {
    int marks = 68;

    if (marks >= 85) {
        printf("Grade: Excellent\\n");
    } else if (marks >= 50) {
        printf("Grade: Passed\\n");
    } else {
        printf("Grade: Needs Improvement\\n");
    }

    return 0;
}`,
    explanation: [
      "Step 1: Checks 68 >= 85 (false).",
      "Step 2: Checks 68 >= 50 (true) -> prints 'Grade: Passed'.",
      "Step 3: Bypasses the final else block."
    ],
    realLifeExample: '🚦 Like a traffic light: Green -> Go; Yellow -> Slow Down; Red -> Stop.',
    prerequisites: ['If Condition'],
    estimatedTime: '12 mins',
  },
  {
    language: 'c',
    topicId: 'for-loop',
    title: 'For Loop',
    description: 'Automate repetitive tasks with count-controlled for loops in C.',
    order: 7,
    difficulty: 'Beginner',
    content: 'A for loop in C bundles loop counter initialization, condition testing, and incrementation in a single structured header.',
    codeExample: `#include <stdio.h>

int main() {
    printf("Multiplication Table of 2:\\n");

    for (int i = 1; i <= 5; i++) {
        printf("2 x %d = %d\\n", i, 2 * i);
    }

    return 0;
}`,
    explanation: [
      "Step 1: 'int i = 1' initializes counter.",
      "Step 2: 'i <= 5' checks continuation condition.",
      "Step 3: 'i++' steps forward after each iteration.",
      "Step 4: Exits when i reaches 6."
    ],
    realLifeExample: '🏃 Like jogging 5 laps around a sports ground: lap 1, lap 2, up to lap 5.',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '12 mins',
  },
  {
    language: 'c',
    topicId: 'while-loop',
    title: 'While Loop',
    description: 'Repeat actions dynamically based on ongoing condition tests in C.',
    order: 8,
    difficulty: 'Beginner',
    content: 'A while loop repeats its body continuously as long as the test condition evaluates to non-zero (true).',
    codeExample: `#include <stdio.h>

int main() {
    int counter = 3;

    while (counter > 0) {
        printf("Counting down: %d\\n", counter);
        counter--;
    }

    printf("Timer expired!\\n");
    return 0;
}`,
    explanation: [
      "Step 1: 'counter = 3' initializes state.",
      "Step 2: Condition tested before each pass.",
      "Step 3: 'counter--' decrements until reaching 0."
    ],
    realLifeExample: '🍽️ Like eating dinner: WHILE food remains on plate -> take a bite. When empty -> stop.',
    prerequisites: ['For Loop'],
    estimatedTime: '12 mins',
  },
  {
    language: 'c',
    topicId: 'arrays',
    title: 'Arrays',
    description: 'Store sequential lists of homogeneous elements in contiguous C memory.',
    order: 9,
    difficulty: 'Beginner',
    content: 'An array in C is a contiguous block of memory holding multiple elements of the same type, accessed using 0-based indexing.',
    codeExample: `#include <stdio.h>

int main() {
    int scores[5] = {85, 90, 78, 92, 88};

    printf("First score: %d\\n", scores[0]);
    printf("Third score: %d\\n", scores[2]);

    printf("\\nAll recorded scores:\\n");
    for (int i = 0; i < 5; i++) {
        printf("Student %d: %d\\n", i + 1, scores[i]);
    }

    return 0;
}`,
    explanation: [
      "Step 1: 'int scores[5] = {...}' reserves 5 contiguous integer spaces.",
      "Step 2: 'scores[0]' references the first element; 'scores[4]' references the 5th.",
      "Step 3: Loop traverses indexes from 0 to 4."
    ],
    realLifeExample: '🥚 Like an egg tray with numbered slots: slot 0 holds egg 1, slot 1 holds egg 2.',
    prerequisites: ['Data Types', 'For Loop'],
    estimatedTime: '15 mins',
  },
  {
    language: 'c',
    topicId: 'strings',
    title: 'Strings',
    description: 'Understand null-terminated character arrays (\\0) and string functions in C.',
    order: 10,
    difficulty: 'Beginner',
    content: 'In C, strings are 1D character arrays terminated by a special null character \'\\0\'. The <string.h> library provides utilities like strlen and strcpy.',
    codeExample: `#include <stdio.h>
#include <string.h>

int main() {
    char greeting[] = "Hello, ARIVUVITHAI!";

    printf("Message: %s\\n", greeting);
    printf("String length: %lu characters\\n", strlen(greeting));

    return 0;
}`,
    explanation: [
      "Step 1: 'char greeting[] = \"Hello\"' creates an array containing ['H','e','l','l','o','\\0'].",
      "Step 2: '%s' prints the character array up to the null terminator '\\0'.",
      "Step 3: 'strlen()' counts characters excluding '\\0'."
    ],
    realLifeExample: '🚂 Like train carriages with a red caboose at the end: the conductor reads carriages until seeing the caboose (\\0).',
    prerequisites: ['Arrays'],
    estimatedTime: '12 mins',
  },
  {
    language: 'c',
    topicId: 'functions',
    title: 'Functions',
    description: 'Create modular, reusable procedures with parameter passing and return values.',
    order: 11,
    difficulty: 'Beginner',
    content: 'Functions in C enable modular programming by grouping code blocks that perform dedicated calculations or actions under a unique name.',
    codeExample: `#include <stdio.h>

// Function prototype and definition
int computeSquare(int n) {
    return n * n;
}

int main() {
    int num = 6;
    int result = computeSquare(num);

    printf("Square of %d is: %d\\n", num, result);
    return 0;
}`,
    explanation: [
      "Step 1: 'int computeSquare(int n)' defines a function returning an integer.",
      "Step 2: 'return n * n' sends calculated output back to main.",
      "Step 3: 'computeSquare(num)' executes the function."
    ],
    realLifeExample: '☕ Like a coffee machine: input water + beans (parameters) -> dispense coffee (return value).',
    prerequisites: ['Variables', 'Operators'],
    estimatedTime: '15 mins',
  },
  {
    language: 'c',
    topicId: 'pointers',
    title: 'Pointers',
    description: 'Learn memory addresses, the address-of operator (&), and dereferencing (*).',
    order: 12,
    difficulty: 'Beginner',
    content: 'A pointer is a variable that stores the memory address of another variable. The address-of operator (&) gets a variable\'s address, and the dereference operator (*) accesses the value stored at that address.',
    codeExample: `#include <stdio.h>

int main() {
    int count = 42;
    int *ptr = &count; // ptr stores memory address of count

    printf("Value of count: %d\\n", count);
    printf("Memory address of count (&count): %p\\n", (void*)&count);
    printf("Value accessed via pointer (*ptr): %d\\n", *ptr);

    // Modifying value via pointer
    *ptr = 100;
    printf("New value of count: %d\\n", count);

    return 0;
}`,
    explanation: [
      "Step 1: 'int *ptr = &count;' assigns the physical memory address of 'count' to 'ptr'.",
      "Step 2: '%p' prints hexadecimal memory addresses.",
      "Step 3: '*ptr' (dereferencing) directly reads or modifies the value at that address."
    ],
    realLifeExample: '🏠 Like a house GPS address written on a paper: the paper (pointer) points to your house location, allowing anyone with the address to visit your house!',
    prerequisites: ['Variables', 'Functions'],
    estimatedTime: '15 mins',
  },
  {
    language: 'c',
    topicId: 'structures',
    title: 'Structures',
    description: 'Group heterogeneous data types into composite records using struct.',
    order: 13,
    difficulty: 'Beginner',
    content: 'A structure (struct) in C is a user-defined composite data type that allows grouping variables of different types (int, float, char[]) into a single unit.',
    codeExample: `#include <stdio.h>
#include <string.h>

// Define struct template
struct Student {
    int id;
    char name[50];
    float gpa;
};

int main() {
    struct Student s1;
    s1.id = 101;
    strcpy(s1.name, "Aakash");
    s1.gpa = 3.85f;

    printf("Student ID: %d\\n", s1.id);
    printf("Name: %s\\n", s1.name);
    printf("GPA: %.2f\\n", s1.gpa);

    return 0;
}`,
    explanation: [
      "Step 1: 'struct Student' defines a composite type with id, name, and gpa fields.",
      "Step 2: 'struct Student s1;' creates an instance variable.",
      "Step 3: Dot operator '.' accesses individual struct fields."
    ],
    realLifeExample: '📇 Like an identity card: an ID card bundles photo (image), ID number (int), name (string), and blood group (char) in one plastic card.',
    prerequisites: ['Data Types', 'Arrays'],
    estimatedTime: '15 mins',
  },
  {
    language: 'c',
    topicId: 'file-handling',
    title: 'File Handling',
    description: 'Read and write persistent files on disk using FILE*, fopen, fprintf, and fclose.',
    order: 14,
    difficulty: 'Beginner',
    content: 'File handling in C allows programs to create, write, read, and append data to persistent files on the hard drive using standard library functions like fopen, fprintf, and fclose.',
    codeExample: `#include <stdio.h>

int main() {
    printf("Simulating File Operations in C:\\n");

    // FILE* filePtr = fopen("notes.txt", "w");
    // fprintf(filePtr, "Welcome to ARIVUVITHAI C Programming!\\n");
    // fclose(filePtr);

    printf("1. fopen() opens or creates a file stream.\\n");
    printf("2. fprintf() writes structured text into the file.\\n");
    printf("3. fclose() flushes buffers and safely closes the file.\\n");
    printf("Status: File operations completed successfully.\\n");

    return 0;
}`,
    explanation: [
      "Step 1: 'FILE*' declares a pointer to a file stream.",
      "Step 2: 'fopen(\"filename\", \"mode\")' opens the file in read (\"r\") or write (\"w\") mode.",
      "Step 3: 'fprintf()' writes formatted text into the file.",
      "Step 4: 'fclose()' releases system file locks and memory."
    ],
    realLifeExample: '📁 Like writing in a physical diary: you open the diary (fopen), write your notes on a page (fprintf), and close the cover when finished (fclose)!',
    prerequisites: ['Pointers', 'Functions'],
    estimatedTime: '15 mins',
  },
];

const allLessons = [
  ...javaLessons,
  ...pythonLessons,
  ...javascriptLessons,
  ...cppLessons,
  ...cLessons,
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully.');

    console.log(`🌱 Seeding multi-language curriculum (${allLessons.length} total lessons across 5 languages)...`);

    let insertedOrUpdated = 0;

    for (const lesson of allLessons) {
      await Lesson.findOneAndUpdate(
        { language: lesson.language, topicId: lesson.topicId },
        lesson,
        { upsert: true, returnDocument: 'after' }
      );
      insertedOrUpdated++;
    }

    console.log(`🎉 Successfully verified & upserted ${insertedOrUpdated} lessons!`);

    // Verify counts per language
    const languages = ['java', 'python', 'javascript', 'cpp', 'c'];
    console.log('\n📊 Breakdown of Lessons in MongoDB:');
    let totalCount = 0;

    for (const lang of languages) {
      const count = await Lesson.countDocuments({ language: lang });
      console.log(`   - ${lang.toUpperCase().padEnd(10)}: ${count} lessons`);
      totalCount += count;
    }

    console.log(`\n📦 Total Lessons in Collection: ${totalCount} lessons`);

    await mongoose.connection.close();
    console.log('🔒 MongoDB connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

seedDatabase();
