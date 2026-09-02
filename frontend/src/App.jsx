import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import LanguageSelection from './components/LanguageSelection';
import HomePage from './components/HomePage';
import LearningMode from './components/LearningMode';
import CodeExplainer from './components/CodeExplainer';
import API from './api/axios';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    progress: 0,
    completedTopics: [],
    token: '',
  });

  // On app load: restore session from localStorage with backend verification
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          const user = JSON.parse(savedUser);
          // Verify token validity with backend profile endpoint
          const res = await API.get('/users/profile');
          const verifiedUser = res.data;

          const activeLang = verifiedUser.selectedLanguage || user.language || user.selectedLanguage || '';
          setUserData({
            ...user,
            ...verifiedUser,
            token,
            language: activeLang,
          });

          if (activeLang) {
            setCurrentScreen('home');
            await loadProgress(token, activeLang);
          } else {
            setCurrentScreen('language-select');
          }
        } catch (err) {
          // Token invalid or expired: clear storage safely
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUserData({ name: '', email: '', phone: '', language: '', progress: 0, completedTopics: [], token: '' });
          setCurrentScreen('login');
        }
      } else {
        setCurrentScreen('login');
      }
    };

    restoreSession();
  }, []);

  const loadProgress = async (token, language) => {
    try {
      const targetLang = language || 'java';
      const res = await API.get(`/progress/${targetLang.toLowerCase()}`);
      const data = res.data || {};
      const completed = data.completedLessons || data.completedTopics || [];
      const percent = data.progressPercentage !== undefined ? data.progressPercentage : data.progressPercent || 0;
      setUserData((prev) => ({
        ...prev,
        completedTopics: completed,
        progress: percent,
      }));
    } catch (err) {
      console.log('Progress load skipped:', err.message);
    }
  };

  const handleLogin = async (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    const lang = user.selectedLanguage || user.language || '';
    setUserData({ ...user, language: lang, token, progress: 0, completedTopics: [] });

    if (lang) {
      setCurrentScreen('home');
      await loadProgress(token, lang);
    } else {
      setCurrentScreen('language-select');
    }
  };

  const handleLanguageSelect = async (languageId) => {
    try {
      await API.put('/users/language', { language: languageId });
      const updatedUser = { ...userData, language: languageId, selectedLanguage: languageId };
      setUserData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      await loadProgress(userData.token, languageId);
      setCurrentScreen('home');
    } catch (err) {
      console.error('Language save error:', err);
    }
  };

  const handleProgressUpdated = (updatedData) => {
    const completed = updatedData.completedLessons || updatedData.completedTopics || [];
    const percent = updatedData.progressPercentage !== undefined ? updatedData.progressPercentage : updatedData.progressPercent || 0;
    setUserData((prev) => {
      const updated = {
        ...prev,
        completedTopics: completed,
        progress: percent,
      };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserData({ name: '', email: '', phone: '', language: '', progress: 0, completedTopics: [], token: '' });
    setSelectedTopicId(null);
    setCurrentScreen('login');
  };

  return (
    <div className="size-full">
      {currentScreen === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}
      {currentScreen === 'language-select' && (
        <LanguageSelection onSelectLanguage={handleLanguageSelect} userName={userData.name} />
      )}
      {currentScreen === 'home' && (
        <HomePage
          userName={userData.name}
          language={userData.language || userData.selectedLanguage}
          onStartLearning={(topicId) => {
            setSelectedTopicId(topicId || null);
            setCurrentScreen('learning');
          }}
          onPasteCode={() => setCurrentScreen('code-explainer')}
          onChangeLanguage={() => setCurrentScreen('language-select')}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'learning' && (
        <LearningMode
          onBack={() => {
            setSelectedTopicId(null);
            setCurrentScreen('home');
          }}
          language={userData.language || userData.selectedLanguage}
          initialTopicId={selectedTopicId}
          progress={userData.progress}
          completedTopics={userData.completedTopics || []}
          onProgressUpdated={handleProgressUpdated}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'code-explainer' && (
        <CodeExplainer onBack={() => setCurrentScreen('home')} userName={userData.name} />
      )}
    </div>
  );
}
