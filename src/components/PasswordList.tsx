import React from 'react';
import { Eye, EyeOff, Copy, Trash } from 'lucide-react';
import { StoredPassword } from '../utils/storage';

interface PasswordListProps {
  passwords: StoredPassword[];
  onDelete: (id: string) => void;
  t: any;
}

const PasswordList: React.FC<PasswordListProps> = ({ passwords, onDelete, t }) => {
  const [visiblePasswords, setVisiblePasswords] = React.useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const toggleVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisiblePasswords(newVisible);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {passwords.map((pwd) => (
        <div
          key={pwd.id}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{pwd.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{pwd.username}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleVisibility(pwd.id)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={visiblePasswords.has(pwd.id) ? t.hide : t.show}
              >
                {visiblePasswords.has(pwd.id) ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(pwd.password, pwd.id)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title={t.copy}
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(pwd.id)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                title={t.delete}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                {visiblePasswords.has(pwd.id)
                  ? pwd.password
                  : '•'.repeat(pwd.password.length)}
              </span>
              {copiedId === pwd.id && (
                <span className="text-xs text-green-500">{t.copied}</span>
              )}
            </div>
            {pwd.url && (
              <a
                href={pwd.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1 block"
              >
                {pwd.url}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordList;