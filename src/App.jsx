import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import LanguageSelection from './components/LanguageSelection';
import HomePage from './components/HomePage';
import LearningMode from './components/LearningMode';
import CodeExplainer from './components/CodeExplainer';
import API from './api/axios';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    progress: 0,
    completedTopics: [],
    token: '',
  });

  // On app load: restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      const user = JSON.parse(savedUser);
      setUserData({ ...user, token });
      if (user.language || user.selectedLanguage) {
        setCurrentScreen('home');
        // Load latest progress from backend
        loadProgress(token, user.language || user.selectedLanguage);
      } else {
        setCurrentScreen('language-select');
      }
    }
  }, []);

  const loadProgress = async (token, language) => {
    try {
      const res = await API.get('/progress');
      const { completedTopics = [], progressPercent = 0 } = res.data;
      setUserData(prev => ({
        ...prev,
        completedTopics,
        progress: progressPercent,
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
      setCurrentScreen('home');
    } catch (err) {
      console.error('Language save error:', err);
    }
  };

  const handleCompleteTopics = async (newCompletedTopics) => {
    const totalTopics = 5; // if, if-else, for loop, while loop, basic programs
    const progressPercent = Math.round((newCompletedTopics.length / totalTopics) * 100);
    const language = userData.language || userData.selectedLanguage;

    // Update local state immediately
    const updatedUser = { ...userData, completedTopics: newCompletedTopics, progress: progressPercent };
    setUserData(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Save to backend
    try {
      await API.post('/progress', {
        completedTopics: newCompletedTopics,
        progressPercent,
        language,
      });
    } catch (err) {
      console.error('Progress save error:', err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserData({ name: '', email: '', phone: '', language: '', progress: 0, completedTopics: [], token: '' });
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
          progress={userData.progress}
          onStartLearning={() => setCurrentScreen('learning')}
          onPasteCode={() => setCurrentScreen('code-explainer')}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'learning' && (
        <LearningMode
          onBack={() => setCurrentScreen('home')}
          language={userData.language || userData.selectedLanguage}
          progress={userData.progress}
          completedTopics={userData.completedTopics || []}
          onCompleteTopics={handleCompleteTopics}
        />
      )}
      {currentScreen === 'code-explainer' && (
        <CodeExplainer onBack={() => setCurrentScreen('home')} userName={userData.name} />
      )}
    </div>
  );
}
