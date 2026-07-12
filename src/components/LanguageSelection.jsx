import { Code2, ChevronRight } from 'lucide-react';

const languages = [
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    description: 'Object-Oriented Programming',
    color: '#f89820',
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'Easy to Learn, Powerful',
    color: '#3776ab',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    description: 'Web Development',
    color: '#f7df1e',
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚙️',
    description: 'System Programming',
    color: '#00599c',
  },
  {
    id: 'c',
    name: 'C',
    icon: '📘',
    description: 'Foundation of Programming',
    color: '#a8b9cc',
  },
];

export default function LanguageSelection({
  onSelectLanguage,
  userName,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4ecd8] via-[#e8dcc4] to-[#d7cbb1] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-[#faf6ed] rounded-full border-2 border-[#6d4c41] shadow-lg">
            <Code2 className="w-6 h-6 text-[#6d4c41]" />
            <span className="text-[#3e2723]">
              Welcome, <strong>{userName}</strong> 👋
            </span>
          </div>

          <h1 className="text-5xl font-serif text-[#3e2723] mb-3">
            Choose Your Language
          </h1>

          <p className="text-lg text-[#5d4037] italic">
            Select a programming language to begin your learning journey
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#8d6e63] bg-opacity-20 rounded-lg">
            <span className="text-sm text-[#5d4037]">
              💡 Tip: Start with <strong>Python</strong> or{' '}
              <strong>Java</strong> for beginners
            </span>
          </div>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onSelectLanguage(lang.id)}
              className="group relative bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#8d6e63] opacity-20"></div>

              {/* Icon */}
              <div className="text-6xl mb-4">{lang.icon}</div>

              {/* Language Name */}
              <h3 className="text-2xl font-serif text-[#3e2723] mb-2 group-hover:text-[#6d4c41] transition-colors">
                {lang.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#5d4037] mb-4">
                {lang.description}
              </p>

              {/* Arrow */}
              <div className="flex items-center text-[#6d4c41] gap-1 group-hover:gap-2 transition-all">
                <span className="text-sm">Start Learning</span>
                <ChevronRight className="w-4 h-4" />
              </div>

              {/* Color Accent Bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
                style={{ backgroundColor: lang.color }}
              ></div>
            </button>
          ))}
        </div>

        {/* Decorative Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block border-t-2 border-[#8d6e63] w-32 opacity-30"></div>

          <p className="text-sm text-[#5d4037] mt-4 italic">
            Choose wisely, for knowledge is the greatest treasure
          </p>
        </div>
      </div>
    </div>
  );
}