import React, { useState } from 'react';
import { Shield, Copy, RefreshCw, Shield as ShieldIcon, AlertTriangle } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import ThemeToggle from './components/ThemeToggle';
import { translations } from './translations';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });
  const [isChecking, setIsChecking] = useState(false);
  const [darkWebStatus, setDarkWebStatus] = useState<string | null>(null);

  // Get translations for current language
  const t = translations[language as keyof typeof translations];

  const generatePassword = (useQuantum = false) => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let validChars = '';
    if (options.uppercase) validChars += chars.uppercase;
    if (options.lowercase) validChars += chars.lowercase;
    if (options.numbers) validChars += chars.numbers;
    if (options.special) validChars += chars.special;

    if (!validChars) return '';

    if (useQuantum) {
      // Simulated quantum RNG for demo
      return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map(x => validChars[x % validChars.length])
        .join('');
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += validChars[array[i] % validChars.length];
    }

    return result;
  };

  const handleGenerate = (useQuantum = false) => {
    setPassword(generatePassword(useQuantum));
    setDarkWebStatus(null);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
  };

  const checkDarkWeb = async () => {
    setIsChecking(true);
    try {
      // Simulated API call to HIBP
      await new Promise(resolve => setTimeout(resolve, 1000));
      const compromised = Math.random() > 0.7;
      setDarkWebStatus(compromised ? t.darkWebFound : t.darkWebNotFound);
    } finally {
      setIsChecking(false);
    }
  };

  React.useEffect(() => {
    handleGenerate();
  }, [length, options]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector language={language} setLanguage={setLanguage} darkMode={darkMode} />
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-lg dark:text-white border border-gray-200 dark:border-gray-600"
            />
            <button
              onClick={copyToClipboard}
              className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              title={t.copyToClipboard}
            >
              <Copy className="w-5 h-5 dark:text-white" />
            </button>
            <button
              onClick={() => handleGenerate(false)}
              className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              title={t.generateNew}
            >
              <RefreshCw className="w-5 h-5 dark:text-white" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium dark:text-white">{t.passwordLength}: {length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.uppercase}
                onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="dark:text-white">{t.uppercase}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.lowercase}
                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="dark:text-white">{t.lowercase}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.numbers}
                onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="dark:text-white">{t.numbers}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.special}
                onChange={(e) => setOptions({ ...options, special: e.target.checked })}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="dark:text-white">{t.specialCharacters}</span>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleGenerate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <ShieldIcon className="w-4 h-4" />
              {t.generateQuantum}
            </button>
            <button
              onClick={checkDarkWeb}
              disabled={isChecking}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
            >
              <AlertTriangle className="w-4 h-4" />
              {isChecking ? t.checking : t.checkDarkWeb}
            </button>
          </div>

          {darkWebStatus && (
            <div className={`mt-4 p-3 rounded-lg ${
              darkWebStatus.includes('found') ? 
                'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' : 
                'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
            }`}>
              {darkWebStatus}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">{t.securityTips}</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm dark:text-gray-300">
              <span className="text-yellow-500">⚠️</span>
              {t.neverShare}
            </li>
            <li className="flex items-center gap-2 text-sm dark:text-gray-300">
              <span className="text-yellow-500">⚠️</span>
              {t.differentPasswords}
            </li>
            <li className="flex items-center gap-2 text-sm dark:text-gray-300">
              <span className="text-yellow-500">⚠️</span>
              {t.enableTwoFactor}
            </li>
          </ul>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Developed by Werry Rodrigues
        </div>
      </div>
    </div>
  );
}

export default App;