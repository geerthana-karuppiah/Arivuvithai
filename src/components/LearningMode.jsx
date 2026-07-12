import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Lightbulb,
  Code2,
  ChevronRight,
} from 'lucide-react';
import CelebrationModal from './CelebrationModal';

const topics = [
  {
    id: 'if',
    title: 'IF Condition',
    description: 'Learn how to make decisions in your code',
    code: `if (age >= 18) {
    System.out.println("You can vote!");
}`,
    explanation: [
      'Step 1: Check the condition (age >= 18)',
      'Step 2: If condition is TRUE, execute the code inside { }',
      'Step 3: Print the message',
      'Step 4: If FALSE, skip the code block',
    ],
    realLifeExample:
      '🚦 Like a traffic light: IF light is GREEN → you can cross the road. Otherwise, wait!',
  },
  {
    id: 'if-else',
    title: 'IF-ELSE Condition',
    description: 'Choose between two paths',
    code: `if (marks >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}`,
    explanation: [
      'Step 1: Check the condition (marks >= 50)',
      'Step 2: If TRUE → execute first block (Pass)',
      'Step 3: If FALSE → execute else block (Fail)',
      'Step 4: Only ONE block runs, never both',
    ],
    realLifeExample:
      '🎓 Like an exam: IF marks >= 50 → Pass, ELSE → Fail. You get one result, not both!',
  },
  {
    id: 'for-loop',
    title: 'FOR Loop',
    description: 'Repeat tasks multiple times',
    code: `for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`,
    explanation: [
      'Step 1: Initialize i = 0',
      'Step 2: Check condition i < 5',
      'Step 3: If TRUE, print i',
      'Step 4: Increment i (i++)',
      'Step 5: Repeat steps 2-4',
    ],
    realLifeExample:
      '👆 Like counting on fingers: Start at 0, count till 4 (5 fingers total). Each time, show one more finger!',
  },
  {
    id: 'while-loop',
    title: 'WHILE Loop',
    description: 'Repeat while condition is true',
    code: `int i = 0;
while (i < 3) {
    System.out.println("Hello");
    i++;
}`,
    explanation: [
      'Step 1: Initialize i = 0 before loop',
      'Step 2: Check condition i < 3',
      'Step 3: If TRUE, print "Hello"',
      'Step 4: Increment i',
      'Step 5: Go back to step 2',
    ],
    realLifeExample:
      '🔁 Like washing dishes: WHILE dishes remain → keep washing. When done, stop!',
  },
  {
    id: 'basic-program',
    title: 'Complete Program',
    description: 'Putting it all together',
    code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum = sum + i;
        }
        System.out.println("Sum: " + sum);
    }
}`,
    explanation: [
      'Step 1: Start with sum = 0',
      'Step 2: Loop from 1 to 5',
      'Step 3: Add each number to sum',
      'Step 4: After loop, print total sum',
      'Step 5: Result will be 1+2+3+4+5 = 15',
    ],
    realLifeExample:
      '💰 Like collecting coins: Start with 0 rupees. Pick up 1 coin, then 2, then 3, 4, 5. Count total at the end!',
  },
];

export default function LearningMode({
  onBack,
  progress,
  onUpdateProgress,
  userName,
  completedTopics,
  onCompleteTopics,
}) {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationTopic, setCelebrationTopic] = useState('');

  const currentTopic = topics[currentTopicIndex];

  const handleComplete = () => {
    if (!completedTopics.includes(currentTopic.id)) {
      const newCompleted = [...completedTopics, currentTopic.id];
      onCompleteTopics(newCompleted);

      const newProgress = Math.round(
        (newCompleted.length / topics.length) * 100
      );

      onUpdateProgress(newProgress);

      setCelebrationTopic(currentTopic.title);
      setShowCelebration(true);
    }

    if (currentTopicIndex < topics.length - 1) {
      setTimeout(() => {
        setCurrentTopicIndex(currentTopicIndex + 1);
      }, 500);
    }
  };

  const isTopicCompleted = (topicId) =>
    completedTopics.includes(topicId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] p-6">
      <CelebrationModal
        show={showCelebration}
        onClose={() => setShowCelebration(false)}
        topicTitle={celebrationTopic}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-[#faf6ed] border-2 border-[#6d4c41] rounded-lg hover:bg-[#6d4c41] hover:text-[#faf6ed] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex items-center gap-3 bg-[#faf6ed] border-2 border-[#6d4c41] rounded-lg px-6 py-3">
            <span className="text-[#3e2723]">Progress:</span>
            <span className="text-xl font-serif text-[#6d4c41]">
              {progress}%
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl sticky top-6">
              <h3 className="text-xl font-serif text-[#3e2723] mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Topics
              </h3>

              <div className="space-y-3">
                {topics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => setCurrentTopicIndex(index)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      currentTopicIndex === index
                        ? 'bg-[#6d4c41] text-[#faf6ed] border-[#6d4c41]'
                        : 'bg-[#faf6ed] text-[#3e2723] border-[#8d6e63] hover:border-[#6d4c41]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isTopicCompleted(topic.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                      <span className="font-serif">{topic.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
              <h2 className="text-3xl font-serif text-[#3e2723] mb-2">
                {currentTopic.title}
              </h2>

              <p className="text-[#5d4037]">
                {currentTopic.description}
              </p>

              <div className="mt-3 text-sm text-[#8d6e63]">
                Lesson {currentTopicIndex + 1} of {topics.length}
              </div>
            </div>

            <div className="bg-[#3e2723] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
              <pre className="text-[#a1887f] font-mono text-sm overflow-x-auto">
                <code>{currentTopic.code}</code>
              </pre>
            </div>

            <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
              <h3 className="text-xl font-serif text-[#3e2723] mb-4">
                Step-by-Step Explanation
              </h3>

              <div className="space-y-3">
                {currentTopic.explanation.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-[#6d4c41] text-[#faf6ed] rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>

                    <p className="text-[#3e2723] pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#8d6e63] to-[#6d4c41] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl text-[#faf6ed]">
              <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                Real-Life Example
              </h3>

              <p className="text-lg">
                {currentTopic.realLifeExample}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-8 py-4 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037]"
              >
                {isTopicCompleted(currentTopic.id)
                  ? 'Completed'
                  : 'Mark Complete'}
                {currentTopicIndex < topics.length - 1 && (
                  <>
                    &nbsp;Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}