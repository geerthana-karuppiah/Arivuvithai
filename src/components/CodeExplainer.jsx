import { useState } from 'react';
import { ArrowLeft, Send, Code2, Key, Lightbulb, BookOpen, Loader } from 'lucide-react';
import API from '../api/axios';

export default function CodeExplainer({ onBack, userName }) {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeCode = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setError('');
    setExplanation(null);

    try {
      const response = await API.post('/lessons/explain', { code });
      setExplanation(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not analyze code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-serif text-[#3e2723]">Code Explainer</h1>
            <p className="text-sm text-[#5d4037]">Paste any code — get a beginner-friendly explanation</p>
          </div>
        </div>

        {/* Code Input */}
        <div className="bg-[#faf6ed] rounded-lg border-2 border-[#8d6e63] p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-5 h-5 text-[#6d4c41]" />
            <span className="font-medium text-[#3e2723]">Paste Your Code</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Example:\nfor(int i=0; i<5; i++) {\n    System.out.println(i);\n}`}
            rows={8}
            className="w-full bg-[#f0e8d8] border border-[#c9b99a] rounded p-3 font-mono text-sm text-[#3e2723] focus:outline-none focus:ring-2 focus:ring-[#6d4c41] resize-none"
          />
          <button
            onClick={analyzeCode}
            disabled={isLoading || !code.trim()}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-[#6d4c41] text-[#faf6ed] rounded hover:bg-[#5d4037] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <><Loader className="w-4 h-4 animate-spin" /> Analyzing...</>
            ) : (
              <><Send className="w-4 h-4" /> Explain This Code</>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-300 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Explanation Result */}
        {explanation && (
          <div className="space-y-4">
            {/* Keywords */}
            {explanation.keywords && explanation.keywords.length > 0 && (
              <div className="bg-[#faf6ed] rounded-lg border-2 border-[#8d6e63] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-5 h-5 text-[#6d4c41]" />
                  <span className="font-medium text-[#3e2723]">Keywords Explained</span>
                </div>
                <div className="space-y-2">
                  {explanation.keywords.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-[#f0e8d8] rounded">
                      <code className="text-[#6d4c41] font-mono font-bold text-sm min-w-fit">{item.keyword}</code>
                      <span className="text-[#5d4037] text-sm">→ {item.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Explanation */}
            {explanation.fullExplanation && (
              <div className="bg-[#faf6ed] rounded-lg border-2 border-[#8d6e63] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-[#6d4c41]" />
                  <span className="font-medium text-[#3e2723]">What This Code Does</span>
                </div>
                <p className="text-[#5d4037] leading-relaxed">{explanation.fullExplanation}</p>
              </div>
            )}

            {/* Real Life Example */}
            {explanation.realLifeExample && (
              <div className="bg-[#e8f5e9] rounded-lg border-2 border-[#81c784] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#388e3c]" />
                  <span className="font-medium text-[#2e7d32]">Real-Life Example</span>
                </div>
                <p className="text-[#2e7d32] leading-relaxed">{explanation.realLifeExample}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
