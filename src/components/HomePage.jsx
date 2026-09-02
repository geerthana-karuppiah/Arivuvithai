import { useState, useEffect } from 'react';
import { BookOpen, Code, User, Trophy, Sparkles, RefreshCw, Loader2, Award, ChevronRight, CheckCircle } from 'lucide-react';
import API from '../api/axios';

export default function HomePage({
  userName,
  language,
  onStartLearning,
  onPasteCode,
  onChangeLanguage,
  onLogout,
}) {
  const [progressData, setProgressData] = useState({
    progressPercentage: 0,
    completedLessons: [],
    currentLesson: null,
  });
  const [totalLessons, setTotalLessons] = useState(0);
  const [currentLessonTitle, setCurrentLessonTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    if (!language) return;
    setIsLoading(true);
    setError('');

    try {
      const [progressRes, lessonsRes] = await Promise.allSettled([
        API.get(`/progress/${language.toLowerCase()}`),
        API.get(`/lessons/${language.toLowerCase()}`),
      ]);

      let loadedLessons = [];
      if (lessonsRes.status === 'fulfilled' && Array.isArray(lessonsRes.value.data)) {
        loadedLessons = lessonsRes.value.data;
        setTotalLessons(loadedLessons.length);
      }

      if (progressRes.status === 'fulfilled' && progressRes.value.data) {
        const pData = progressRes.value.data;
        setProgressData({
          progressPercentage: pData.progressPercentage !== undefined ? pData.progressPercentage : pData.progressPercent || 0,
          completedLessons: pData.completedLessons || pData.completedTopics || [],
          currentLesson: pData.currentLesson || null,
        });

        // Resolve human-readable title for currentLesson topicId
        const activeTopicId = pData.currentLesson;
        if (activeTopicId && loadedLessons.length > 0) {
          const matching = loadedLessons.find(
            (l) => l.topicId.toLowerCase() === activeTopicId.toLowerCase()
          );
          setCurrentLessonTitle(matching ? matching.title : activeTopicId);
        } else if (loadedLessons.length > 0) {
          setCurrentLessonTitle(loadedLessons[0].title);
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        if (onLogout) onLogout();
      } else {
        setError('Unable to load your progress.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [language]);

  const progressPercent = progressData.progressPercentage || 0;
  const completedCount = progressData.completedLessons?.length || 0;
  const isCompleted = progressPercent === 100 && totalLessons > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] flex items-center justify-center p-6">
        <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 max-w-md w-full shadow-2xl text-center">
          <div className="flex justify-center mb-4">
            <Loader2 className="w-12 h-12 text-[#6d4c41] animate-spin" />
          </div>
          <h2 className="text-2xl font-serif text-[#3e2723] mb-2">Loading Progress...</h2>
          <p className="text-[#5d4037] text-sm italic">
            Synchronizing your {language ? language.toUpperCase() : ''} learning stats
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Error Alert if any */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex items-center justify-between">
            <span className="text-red-700 text-sm">{error}</span>
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#6d4c41] rounded-full flex items-center justify-center shadow-md">
              <User className="w-8 h-8 text-[#faf6ed]" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#3e2723]">
                {userName || 'Learner'}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-[#d7ccc8] text-[#3e2723] rounded uppercase tracking-wider">
                  {language ? language.toUpperCase() : 'PROGRAMMING'}
                </span>
                {onChangeLanguage && (
                  <button
                    onClick={onChangeLanguage}
                    className="text-xs text-[#6d4c41] underline hover:text-[#3e2723] transition-colors"
                  >
                    Change
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Progress + Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#f4ecd8] border-2 border-[#8d6e63] px-4 py-2 rounded-lg">
              <Trophy className="w-7 h-7 text-[#6d4c41]" />
              <div>
                <p className="text-xs text-[#5d4037]">Overall Progress</p>
                <p className="text-xl font-serif font-bold text-[#6d4c41]">
                  {progressPercent}%
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-colors text-sm font-medium shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8 bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            <div>
              <span className="text-sm font-serif font-bold text-[#3e2723]">
                {isCompleted
                  ? '🎉 Course Completed!'
                  : progressPercent === 0
                  ? "You're just getting started!"
                  : 'Learning Journey Progress'}
              </span>
              {currentLessonTitle && !isCompleted && (
                <p className="text-xs text-[#5d4037] mt-0.5">
                  Current Lesson: <strong className="text-[#6d4c41]">{currentLessonTitle}</strong>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 bg-[#d7ccc8] text-[#3e2723] rounded-full">
                Completed: {completedCount} / {totalLessons}
              </span>
              <span className="text-sm font-bold text-[#6d4c41] font-serif">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-6 bg-[#d7ccc8] rounded-full overflow-hidden border-2 border-[#8d6e63]">
            <div
              className="h-full bg-gradient-to-r from-[#6d4c41] to-[#8d6e63] transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${Math.min(100, Math.max(progressPercent > 0 ? 5 : 0, progressPercent))}%` }}
            >
              {progressPercent > 0 && (
                <span className="text-xs text-[#faf6ed]">
                  ✨
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Continue Learning Card */}
          <button
            onClick={() => onStartLearning(progressData.currentLesson)}
            className="group relative bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#8d6e63] opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#8d6e63] opacity-20"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#6d4c41] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <BookOpen className="w-10 h-10 text-[#faf6ed]" />
              </div>

              <h2 className="text-3xl font-serif text-[#3e2723] mb-2">
                {isCompleted ? 'Review Lessons' : 'Continue Learning'}
              </h2>

              <p className="text-[#5d4037] mb-4 text-sm leading-relaxed">
                {isCompleted
                  ? 'You have completed all lessons in this course! Review topics anytime.'
                  : currentLessonTitle
                  ? `Pick up right where you left off at "${currentLessonTitle}".`
                  : 'Learn programming concepts step by step with code examples and analogies.'}
              </p>

              <div className="space-y-2 text-xs text-[#5d4037] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6d4c41] rounded-full"></div>
                  <span>{totalLessons} structured topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6d4c41] rounded-full"></div>
                  <span>Step-by-step breakdowns & real-world analogies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6d4c41] rounded-full"></div>
                  <span>Progress tracked in MongoDB</span>
                </div>
              </div>

              <div className="mt-2 text-[#6d4c41] font-serif font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1 text-base">
                {isCompleted ? 'Review Course' : 'Continue Learning'}
                <ChevronRight className="w-4 h-4" />
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
              <div className="w-20 h-20 bg-[#8d6e63] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                <Code className="w-10 h-10 text-[#faf6ed]" />
              </div>

              <h2 className="text-3xl font-serif text-[#3e2723] mb-2">
                Explain Code
              </h2>

              <p className="text-[#5d4037] mb-4 text-sm leading-relaxed">
                Paste any code snippet and get an instant beginner-friendly explanation.
              </p>

              <div className="space-y-2 text-xs text-[#5d4037] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8d6e63] rounded-full"></div>
                  <span>Keyword analysis & role definitions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8d6e63] rounded-full"></div>
                  <span>Line-by-line concept breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8d6e63] rounded-full"></div>
                  <span>Everyday analogies</span>
                </div>
              </div>

              <div className="mt-2 text-[#8d6e63] font-serif font-bold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1 text-base">
                Analyze Code
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl mb-8">
          <h3 className="text-xl font-serif text-[#3e2723] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#6d4c41]" />
            Quick Tips for Beginners
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#f4ecd8] p-4 rounded-lg border-2 border-[#8d6e63]">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-serif font-bold text-[#3e2723] mb-1">
                Start Small
              </h4>
              <p className="text-xs text-[#5d4037]">
                Learn one concept at a time and read the analogies carefully.
              </p>
            </div>

            <div className="bg-[#f4ecd8] p-4 rounded-lg border-2 border-[#8d6e63]">
              <div className="text-2xl mb-2">✍️</div>
              <h4 className="font-serif font-bold text-[#3e2723] mb-1">
                Practice Daily
              </h4>
              <p className="text-xs text-[#5d4037]">
                Type the code examples by hand to build muscle memory.
              </p>
            </div>

            <div className="bg-[#f4ecd8] p-4 rounded-lg border-2 border-[#8d6e63]">
              <div className="text-2xl mb-2">🤔</div>
              <h4 className="font-serif font-bold text-[#3e2723] mb-1">
                Ask Questions
              </h4>
              <p className="text-xs text-[#5d4037]">
                Paste unfamiliar code in Code Explainer whenever stuck.
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-10 mb-4">
          <div className="inline-block bg-[#faf6ed] border-2 border-[#8d6e63] rounded-lg px-8 py-4 shadow-lg">
            <p className="text-base font-serif italic text-[#3e2723]">
              "The beautiful thing about learning is that no one can take it away from you"
            </p>
            <p className="text-xs text-[#5d4037] mt-1">
              — B.B. King
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}