import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface MasterPasswordModalProps {
  onSubmit: (password: string) => void;
  t: any;
}

const MasterPasswordModal: React.FC<MasterPasswordModalProps> = ({ onSubmit, t }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError(t.masterPasswordTooShort);
      return;
    }
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-indigo-600" />
          <h2 className="text-xl font-semibold">{t.enterMasterPassword}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.masterPasswordPlaceholder}
              className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {t.unlock}
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {t.masterPasswordHint}
          </p>
        </form>
      </div>
    </div>
  );
};

export default MasterPasswordModal;