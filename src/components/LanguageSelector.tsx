import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage, darkMode }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'zh', name: '中文' },
    { code: 'ru', name: 'Русский' },
  ];

  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={`
          appearance-none pl-8 pr-4 py-2 rounded-lg cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${darkMode 
            ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' 
            : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'}
          border transition-colors
        `}
        style={{
          backgroundImage: 'none'
        }}
      >
        {languages.map((lang) => (
          <option 
            key={lang.code} 
            value={lang.code}
            className={darkMode 
              ? 'bg-gray-800 text-white' 
              : 'bg-white text-gray-900'}
          >
            {lang.name}
          </option>
        ))}
      </select>
      <Globe className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`} />
    </div>
  );
};

export default LanguageSelector;