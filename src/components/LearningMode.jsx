import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Lightbulb,
  Code2,
  ChevronRight,
  ChevronLeft,
  Clock,
  Award,
  RefreshCw,
  Loader2,
  BookOpen,
  Layers,
  Sparkles,
  Check,
} from 'lucide-react';
import API from '../api/axios';

export default function LearningMode({
  onBack,
  language,
  initialTopicId,
  progress: initialProgress = 0,
  completedTopics: initialCompletedTopics = [],
  onProgressUpdated,
  onLogout,
}) {
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedList, setCompletedList] = useState(initialCompletedTopics);
  const [progressPercent, setProgressPercent] = useState(initialProgress);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionSuccess, setCompletionSuccess] = useState(false);
  const [error, setError] = useState('');

  const loadLessonData = async () => {
    if (!language) {
      setError('No language selected.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Fetch lessons and user progress in parallel
      const [lessonsRes, progressRes] = await Promise.allSettled([
        API.get(`/lessons/${language.toLowerCase()}`),
        API.get(`/progress/${language.toLowerCase()}`),
      ]);

      let loadedLessons = [];
      if (lessonsRes.status === 'fulfilled' && Array.isArray(lessonsRes.value.data)) {
        loadedLessons = lessonsRes.value.data;
        setLessons(loadedLessons);
        setCurrentLessonIndex(0);
      } else if (lessonsRes.status === 'rejected') {
        throw lessonsRes.reason;
      }

      let activeTopic = initialTopicId;

      if (progressRes.status === 'fulfilled' && progressRes.value.data) {
        const pData = progressRes.value.data;
        const comp = pData.completedLessons || pData.completedTopics || [];
        setCompletedList(comp);
        setProgressPercent(pData.progressPercentage || pData.progressPercent || 0);

        if (!activeTopic && pData.currentLesson) {
          activeTopic = pData.currentLesson;
        }
      }

      // If activeTopic is determined, set current index to it
      if (activeTopic && loadedLessons.length > 0) {
        const foundIdx = loadedLessons.findIndex(
          (l) => l.topicId.toLowerCase() === activeTopic.toLowerCase()
        );
        if (foundIdx !== -1) {
          setCurrentLessonIndex(foundIdx);
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        if (onLogout) onLogout();
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || 'Unsupported language selected.');
      } else {
        setError('Unable to load lessons. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLessonData();
  }, [language]);

  const currentLesson = lessons[currentLessonIndex];

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
      setCompletionSuccess(false);
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
      setCompletionSuccess(false);
    }
  };

  const isTopicCompleted = (topicId) =>
    Array.isArray(completedList) && completedList.includes(topicId);

  const isCurrentCompleted = currentLesson && isTopicCompleted(currentLesson.topicId);

  const handleCompleteLesson = async () => {
    if (!currentLesson || isCurrentCompleted || isCompleting) return;

    setIsCompleting(true);
    setCompletionSuccess(false);

    try {
      const res = await API.post(`/progress/${language.toLowerCase()}/complete`, {
        topicId: currentLesson.topicId,
      });

      const updatedProgress = res.data;
      const newCompleted = updatedProgress.completedLessons || updatedProgress.completedTopics || [];
      const newPercent = updatedProgress.progressPercentage || updatedProgress.progressPercent || 0;

      setCompletedList(newCompleted);
      setProgressPercent(newPercent);
      setCompletionSuccess(true);

      if (onProgressUpdated) {
        onProgressUpdated(updatedProgress);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        if (onLogout) onLogout();
      } else {
        console.error('Failed to save progress:', err.message);
      }
    } finally {
      setIsCompleting(false);
    }
  };

  const hasPrerequisites =
    currentLesson &&
    Array.isArray(currentLesson.prerequisites) &&
    currentLesson.prerequisites.length > 0 &&
    !currentLesson.prerequisites.includes('None');

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] flex items-center justify-center p-6">
        <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 max-w-md w-full shadow-2xl text-center">
          <div className="flex justify-center mb-4">
            <Loader2 className="w-12 h-12 text-[#6d4c41] animate-spin" />
          </div>
          <h2 className="text-2xl font-serif text-[#3e2723] mb-2">Loading Lessons...</h2>
          <p className="text-[#5d4037] text-sm italic">
            Retrieving {language ? language.toUpperCase() : ''} curriculum from ARIVUVITHAI
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] flex items-center justify-center p-6">
        <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 max-w-md w-full shadow-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <BookOpen className="w-8 h-8 text-red-700" />
            </div>
          </div>
          <h2 className="text-2xl font-serif text-[#3e2723] mb-2">Something Went Wrong</h2>
          <p className="text-[#5d4037] text-sm mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-[#faf6ed] border-2 border-[#8d6e63] text-[#3e2723] rounded-lg hover:bg-[#e8dcc4] transition-colors text-sm font-medium"
            >
              Back to Home
            </button>
            <button
              onClick={loadLessonData}
              className="flex items-center gap-2 px-4 py-2 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty Lessons State
  if (!currentLesson || lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] flex items-center justify-center p-6">
        <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 max-w-md w-full shadow-2xl text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-[#8d6e63]" />
          </div>
          <h2 className="text-2xl font-serif text-[#3e2723] mb-2">Curriculum in Progress</h2>
          <p className="text-[#5d4037] text-sm mb-6">
            No lessons are available for <strong>{language?.toUpperCase()}</strong> yet.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-colors text-sm font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-[#faf6ed] border-2 border-[#6d4c41] rounded-lg hover:bg-[#6d4c41] hover:text-[#faf6ed] transition-colors font-medium text-sm text-[#3e2723]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#5d4037] uppercase tracking-wider px-3 py-1.5 bg-[#faf6ed] border-2 border-[#8d6e63] rounded-lg">
              {language} Course
            </span>
            <div className="flex items-center gap-2 bg-[#faf6ed] border-2 border-[#6d4c41] rounded-lg px-4 py-2">
              <span className="text-[#3e2723] text-sm">Progress:</span>
              <span className="text-lg font-serif font-bold text-[#6d4c41]">
                {Math.round(progressPercent)}%
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Lesson Details */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Topics Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-5 shadow-xl sticky top-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#d7ccc8]">
                <h3 className="text-xl font-serif text-[#3e2723] flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#6d4c41]" />
                  Course Topics ({lessons.length})
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 bg-[#d7ccc8] text-[#5d4037] rounded-full">
                  {completedList.length}/{lessons.length}
                </span>
              </div>

              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.topicId || index}
                    onClick={() => {
                      setCurrentLessonIndex(index);
                      setCompletionSuccess(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      currentLessonIndex === index
                        ? 'bg-[#6d4c41] text-[#faf6ed] border-[#6d4c41] shadow-md'
                        : 'bg-[#faf6ed] text-[#3e2723] border-[#8d6e63] hover:border-[#6d4c41] hover:bg-[#f4ecd8]'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {isTopicCompleted(lesson.topicId) ? (
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 ${currentLessonIndex === index ? 'text-green-300' : 'text-green-600'}`} />
                      ) : (
                        <Circle className="w-5 h-5 flex-shrink-0 opacity-40" />
                      )}
                      <span className="font-serif text-sm truncate">
                        {String(lesson.order || index + 1).padStart(2, '0')}. {lesson.title}
                      </span>
                    </div>

                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${currentLessonIndex === index ? 'opacity-100' : 'opacity-40'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Lesson Detail View */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. Header Box */}
            <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase px-3 py-1 bg-[#6d4c41] text-[#faf6ed] rounded-full tracking-wider">
                  # {String(currentLesson.order || currentLessonIndex + 1).padStart(2, '0')} — {language.toUpperCase()}
                </span>

                <div className="flex items-center gap-3 text-xs text-[#5d4037]">
                  {currentLesson.difficulty && (
                    <span className="flex items-center gap-1 font-semibold text-[#6d4c41] px-2.5 py-1 bg-[#f4ecd8] border border-[#8d6e63] rounded">
                      <Award className="w-3.5 h-3.5" />
                      {currentLesson.difficulty}
                    </span>
                  )}
                  {currentLesson.estimatedTime && (
                    <span className="flex items-center gap-1 font-medium px-2.5 py-1 bg-[#f4ecd8] border border-[#8d6e63] rounded">
                      <Clock className="w-3.5 h-3.5 text-[#6d4c41]" />
                      {currentLesson.estimatedTime}
                    </span>
                  )}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif text-[#3e2723] mb-2">
                {currentLesson.title}
              </h1>

              <p className="text-[#5d4037] text-base leading-relaxed">
                {currentLesson.description}
              </p>
            </div>

            {/* 2. Main Concept / Content Box */}
            {currentLesson.content && (
              <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-serif text-[#3e2723] mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#6d4c41]" />
                  What is {currentLesson.title}?
                </h3>
                <p className="text-[#3e2723] text-base leading-relaxed">
                  {currentLesson.content}
                </p>
              </div>
            )}

            {/* 3. Code Example Box */}
            {currentLesson.codeExample && (
              <div className="bg-[#3e2723] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#5d4037]">
                  <span className="text-xs font-mono text-[#d7ccc8] uppercase tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#faf6ed]" />
                    {language} Code Example
                  </span>
                </div>
                <pre className="text-[#f4ecd8] font-mono text-sm overflow-x-auto leading-relaxed p-1">
                  <code>{currentLesson.codeExample}</code>
                </pre>
              </div>
            )}

            {/* 4. Step-by-Step Explanation Box */}
            {currentLesson.explanation && currentLesson.explanation.length > 0 && (
              <div className="bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-serif text-[#3e2723] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#6d4c41]" />
                  Step-by-Step Breakdown
                </h3>

                <div className="space-y-3">
                  {currentLesson.explanation.map((step, index) => (
                    <div key={index} className="flex gap-3 items-start p-2.5 bg-[#f4ecd8] rounded-lg border border-[#d7ccc8]">
                      <div className="w-7 h-7 flex-shrink-0 bg-[#6d4c41] text-[#faf6ed] rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-[#3e2723] text-sm leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Real-Life Analogy Box */}
            {currentLesson.realLifeExample && (
              <div className="bg-gradient-to-br from-[#8d6e63] to-[#6d4c41] border-4 border-[#6d4c41] rounded-lg p-6 shadow-xl text-[#faf6ed]">
                <h3 className="text-xl font-serif mb-3 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-300" />
                  Real-Life Analogy
                </h3>
                <p className="text-base leading-relaxed text-[#faf6ed]">
                  {currentLesson.realLifeExample}
                </p>
              </div>
            )}

            {/* 6. Prerequisites Box */}
            <div className="bg-[#faf6ed] border-2 border-[#8d6e63] rounded-lg p-4 shadow-sm flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#6d4c41]" />
                <span className="text-xs font-semibold text-[#5d4037] uppercase tracking-wider">
                  Prerequisites:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {hasPrerequisites ? (
                  currentLesson.prerequisites.map((prereq, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#f4ecd8] border border-[#8d6e63] text-[#3e2723] text-xs font-medium rounded"
                    >
                      {prereq}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#5d4037] italic">
                    🌱 No prerequisites — Great starting point for beginners!
                  </span>
                )}
              </div>
            </div>

            {/* 7. Action Bar: Previous / Complete Lesson / Next */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrevious}
                disabled={currentLessonIndex === 0}
                className="flex items-center gap-2 px-5 py-3 bg-[#faf6ed] border-2 border-[#6d4c41] text-[#3e2723] rounded-lg hover:bg-[#6d4c41] hover:text-[#faf6ed] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Lesson
              </button>

              {isCurrentCompleted ? (
                <div className="flex items-center gap-2 px-6 py-3 bg-[#e8f5e9] border-2 border-[#81c784] text-[#2e7d32] rounded-lg text-sm font-medium shadow-sm">
                  <Check className="w-4 h-4" />
                  Lesson Completed ✓
                </div>
              ) : (
                <button
                  onClick={handleCompleteLesson}
                  disabled={isCompleting}
                  className="flex items-center gap-2 px-6 py-3 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {isCompleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving your progress...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Complete Lesson
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={currentLessonIndex >= lessons.length - 1}
                className="flex items-center gap-2 px-5 py-3 bg-[#6d4c41] text-[#faf6ed] rounded-lg hover:bg-[#5d4037] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
