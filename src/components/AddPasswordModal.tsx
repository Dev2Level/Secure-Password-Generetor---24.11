import React, { useState } from 'react';
import { X } from 'lucide-react';
import { StoredPassword } from '../utils/storage';
import { calculatePasswordStrength } from '../utils/passwordStrength';

interface AddPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (password: Omit<StoredPassword, 'id' | 'createdAt' | 'updatedAt'>) => void;
  t: any;
}

const AddPasswordModal: React.FC<AddPasswordModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  t,
}) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      username,
      password,
      url,
      notes,
    });
    onClose();
  };

  const strength = calculatePasswordStrength(password);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t.addPassword}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t.title}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.username}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="mt-1">
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className={`h-1 rounded-full transition-all ${
                    strength.score <= 2
                      ? 'bg-red-500'
                      : strength.score <= 3
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${(strength.score / 5) * 100}%` }}
                />
              </div>
              {strength.feedback.map((feedback, index) => (
                <p key={index} className="text-xs text-gray-500 mt-1">
                  {feedback}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.url}</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.notes}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {t.add}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPasswordModal;