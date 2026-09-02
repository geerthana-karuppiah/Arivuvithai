import { useState } from 'react';
import {
  ArrowLeft,
  Send,
  Code2,
  Key,
  Lightbulb,
  BookOpen,
  Loader2,
  Trash2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import API from '../api/axios';

const SAMPLE_SNIPPETS = [
  {
    label: 'For Loop',
    code: 'for(int i = 0; i < 5; i++) {\n    System.out.println("Iteration: " + i);\n}',
  },
  {
    label: 'If-Else Condition',
    code: 'int score = 85;\nif(score >= 50) {\n    System.out.println("Passed!");\n} else {\n    System.out.println("Try again!");\n}',
  },
  {
    label: 'Class & Object',
    code: 'class Student {\n    String name;\n    int age;\n\n    void study() {\n        System.out.println(name + " is studying.");\n    }\n}',
  },
  {
    label: 'Array Example',
    code: 'int[] marks = {90, 85, 78, 92};\nfor(int i = 0; i < marks.length; i++) {\n    System.out.println(marks[i]);\n}',
  },
];

export default function CodeExplainer({ onBack, userName }) {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeCode = async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError('Please enter some code to explain.');
      return;
    }

    if (trimmed.length > 10000) {
      setError('Code snippet is too large. Please paste under 10,000 characters.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await API.post('/lessons/explain', { code: trimmed });
      setExplanation(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || 'Please enter valid code to explain.');
      } else {
        setError("We couldn't analyze your code right now. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setExplanation(null);
    setError('');
  };

  const handleSelectSample = (sampleCode) => {
    setCode(sampleCode);
    setExplanation(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-colors text-sm font-medium shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-serif text-[#3e2723] flex items-center gap-2">
                <Code2 className="w-6 h-6 text-[#6d4c41]" />
                Code Explainer
              </h1>
              <p className="text-xs text-[#5d4037]">
                Paste code snippet to see keywords, conceptual explanation, and real-life analogies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-[#f4ecd8] border border-[#8d6e63] text-[#5d4037] rounded-full font-medium">
              Rule-Based Analyzer
            </span>
          </div>
        </div>

        {/* Quick Sample Snippets Bar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#5d4037] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#6d4c41]" /> Quick Samples:
          </span>
          {SAMPLE_SNIPPETS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample.code)}
              className="px-2.5 py-1 bg-[#faf6ed] hover:bg-[#f4ecd8] border border-[#8d6e63] text-[#3e2723] text-xs font-medium rounded transition-colors shadow-sm"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Code Input Card */}
        <div className="bg-[#faf6ed] rounded-lg border-4 border-[#6d4c41] p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#d7ccc8]">
            <span className="font-serif text-[#3e2723] text-base font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#6d4c41]" />
              Paste Java Code Below
            </span>
            {code && (
              <button
                onClick={handleClear}
                className="text-xs text-red-700 hover:text-red-900 flex items-center gap-1 font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`// Paste your Java code here...\nfor(int i = 0; i < 5; i++) {\n    System.out.println("Hello ARIVUVITHAI: " + i);\n}`}
            rows={9}
            className="w-full bg-[#3e2723] text-[#f4ecd8] border-2 border-[#6d4c41] rounded-lg p-4 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#8d6e63] resize-y"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
            <span className="text-xs text-[#5d4037]">
              {code.length > 0 ? `${code.length} characters` : 'Supports common Java constructs'}
            </span>

            <button
              onClick={analyzeCode}
              disabled={isLoading || !code.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-all font-medium text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing your code...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Explain This Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              className="text-xs underline text-red-700 hover:text-red-900 ml-3 font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Explanation Results */}
        {explanation && (
          <div className="space-y-6">
            {/* 1. Detected Keywords Section */}
            <div className="bg-[#faf6ed] rounded-lg border-4 border-[#6d4c41] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#d7ccc8]">
                <h3 className="text-xl font-serif text-[#3e2723] flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#6d4c41]" />
                  🔍 Detected Keywords ({explanation.keywords?.length || 0})
                </h3>
              </div>

              {explanation.keywords && explanation.keywords.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {explanation.keywords.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 bg-[#f4ecd8] border border-[#8d6e63] rounded-lg flex items-start gap-3 shadow-sm"
                    >
                      <code className="px-2 py-0.5 bg-[#6d4c41] text-[#faf6ed] font-mono text-xs font-bold rounded min-w-fit">
                        {item.keyword}
                      </code>
                      <p className="text-[#3e2723] text-xs leading-relaxed pt-0.5">
                        {item.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#5d4037] italic">
                  No standard keyword tokens detected in this snippet.
                </p>
              )}
            </div>

            {/* 2. Conceptual Explanation Section */}
            {explanation.fullExplanation && (
              <div className="bg-[#faf6ed] rounded-lg border-4 border-[#6d4c41] p-6 shadow-xl">
                <h3 className="text-xl font-serif text-[#3e2723] mb-3 flex items-center gap-2 pb-2 border-b-2 border-[#d7ccc8]">
                  <BookOpen className="w-5 h-5 text-[#6d4c41]" />
                  📖 What This Code Does
                </h3>
                <p className="text-[#3e2723] text-base leading-relaxed">
                  {explanation.fullExplanation}
                </p>
              </div>
            )}

            {/* 3. Real-Life Analogy Section */}
            {explanation.realLifeExample && (
              <div className="bg-gradient-to-br from-[#8d6e63] to-[#6d4c41] rounded-lg border-4 border-[#6d4c41] p-6 shadow-xl text-[#faf6ed]">
                <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-300" />
                  💡 Real-Life Analogy
                </h3>
                <p className="text-base leading-relaxed text-[#faf6ed]">
                  {explanation.realLifeExample}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

