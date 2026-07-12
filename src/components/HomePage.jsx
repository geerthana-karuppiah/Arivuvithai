import { BookOpen, Code, User, Trophy, Sparkles } from 'lucide-react';

export default function HomePage({
  userName,
  language,
  progress,
  onStartLearning,
  onPasteCode,
  onLogout,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
          
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#6d4c41] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#faf6ed]" />
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#3e2723]">
                {userName || 'Learner'}
              </h2>

              <p className="text-sm text-[#5d4037]">
                Learning {language?.toUpperCase() || 'PROGRAMMING'}
              </p>
            </div>
          </div>

          {/* Progress + Logout */}
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-[#8d6e63]" />

            <div>
              <p className="text-sm text-[#5d4037]">
                Overall Progress
              </p>

              <p className="text-2xl font-serif text-[#6d4c41]">
                {progress || 0}%
              </p>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-12 bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-[#3e2723]">
              Learning Journey
            </span>

            <span className="text-sm text-[#6d4c41] font-serif">
              {progress || 0}% Complete
            </span>
          </div>

          <div className="w-full h-6 bg-[#d7ccc8] rounded-full overflow-hidden border-2 border-[#8d6e63]">
            <div
              className="h-full bg-gradient-to-r from-[#6d4c41] to-[#8d6e63] transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${progress || 0}%` }}
            >
              {progress > 0 && (
                <span className="text-xs text-[#faf6ed]">
                  ✨
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">

          {/* Learning Card */}
          <button
            onClick={onStartLearning}
            className="group relative bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#8d6e63] opacity-20"></div>

            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#8d6e63] opacity-20"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#6d4c41] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10 text-[#faf6ed]" />
              </div>

              <h2 className="text-3xl font-serif text-[#3e2723] mb-3">
                Start Learning
              </h2>

              <p className="text-[#5d4037] mb-6">
                Learn concepts step by step with examples and progress tracking.
              </p>

              <div className="space-y-2 text-sm text-[#5d4037]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6d4c41] rounded-full"></div>
                  <span>Step-by-step tutorials</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6d4c41] rounded-full"></div>
                  <span>Real-life examples</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6d4c41] rounded-full"></div>
                  <span>Track your progress</span>
                </div>
              </div>

              <div className="mt-6 text-[#6d4c41] font-serif group-hover:translate-x-2 transition-transform inline-block">
                Begin Journey →
              </div>
            </div>
          </button>

          {/* Code Explainer Card */}
          <button
            onClick={onPasteCode}
            className="group relative bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#8d6e63] opacity-20"></div>

            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#8d6e63] opacity-20"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#8d6e63] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-10 h-10 text-[#faf6ed]" />
              </div>

              <h2 className="text-3xl font-serif text-[#3e2723] mb-3">
                Explain Code
              </h2>

              <p className="text-[#5d4037] mb-6">
                Paste any code snippet and get a simple explanation.
              </p>

              <div className="space-y-2 text-sm text-[#5d4037]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8d6e63] rounded-full"></div>
                  <span>Keyword explanations</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8d6e63] rounded-full"></div>
                  <span>Line-by-line breakdown</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8d6e63] rounded-full"></div>
                  <span>Real-life analogies</span>
                </div>
              </div>

              <div className="mt-6 text-[#8d6e63] font-serif group-hover:translate-x-2 transition-transform inline-block">
                Analyze Code →
              </div>
            </div>
          </button>
        </div>

        {/* Tips */}
        <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl mb-8">
          <h3 className="text-xl font-serif text-[#3e2723] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#6d4c41]" />
            Quick Tips for Beginners
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#f4ecd8] p-4 rounded-lg border-2 border-[#8d6e63]">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-serif text-[#3e2723] mb-1">
                Start Small
              </h4>
              <p className="text-sm text-[#5d4037]">
                Learn one topic at a time.
              </p>
            </div>

            <div className="bg-[#f4ecd8] p-4 rounded-lg border-2 border-[#8d6e63]">
              <div className="text-2xl mb-2">✍️</div>
              <h4 className="font-serif text-[#3e2723] mb-1">
                Practice Daily
              </h4>
              <p className="text-sm text-[#5d4037]">
                Code for at least 10 minutes daily.
              </p>
            </div>

            <div className="bg-[#f4ecd8] p-4 rounded-lg border-2 border-[#8d6e63]">
              <div className="text-2xl mb-2">🤔</div>
              <h4 className="font-serif text-[#3e2723] mb-1">
                Ask Questions
              </h4>
              <p className="text-sm text-[#5d4037]">
                Use Code Explainer whenever stuck.
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-12">
          <div className="inline-block bg-[#faf6ed] border-2 border-[#8d6e63] rounded-lg px-8 py-4 shadow-lg">
            <p className="text-lg font-serif italic text-[#3e2723]">
              "The beautiful thing about learning is that no one can take it away from you"
            </p>

            <p className="text-sm text-[#5d4037] mt-2">
              — B.B. King
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}