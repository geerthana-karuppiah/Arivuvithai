import { CheckCircle, Trophy, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CelebrationModal({
  show,
  onClose,
  topicTitle,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => {
          onClose();
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className={`relative bg-[#faf6ed] border-4 border-[#6d4c41] rounded-lg p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#6d4c41] rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                opacity: Math.random() * 0.5 + 0.5,
              }}
            ></div>
          ))}
        </div>

        {/* Content */}
        <div className="relative text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="w-20 h-20 text-[#6d4c41] animate-bounce" />
              <Sparkles className="w-8 h-8 text-[#8d6e63] absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl font-serif text-[#3e2723] mb-2">
            Congratulations! 🎉
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />

            <p className="text-lg text-[#5d4037]">
              You completed{' '}
              <strong className="text-[#6d4c41]">
                {topicTitle}
              </strong>
              !
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#8d6e63] to-[#6d4c41] text-[#faf6ed] rounded-lg p-4 mt-4">
            <p className="text-sm italic">
              "Knowledge is power, and you just got stronger!"
            </p>
          </div>

          <div className="mt-4 text-xs text-[#8d6e63]">
            Keep learning! 📚
          </div>
        </div>
      </div>
    </div>
  );
}