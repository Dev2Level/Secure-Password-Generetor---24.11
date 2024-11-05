import React from 'react';

interface PasswordStrengthProps {
  password: string;
  t: any;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, t }) => {
  const calculateStrength = (pwd: string): number => {
    let score = 0;
    if (pwd.length >= 12) score += 1;
    if (pwd.match(/[A-Z]/)) score += 1;
    if (pwd.match(/[a-z]/)) score += 1;
    if (pwd.match(/[0-9]/)) score += 1;
    if (pwd.match(/[^A-Za-z0-9]/)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);
  const getStrengthLabel = () => {
    if (strength <= 2) return { label: t.weak, color: 'bg-red-500' };
    if (strength <= 3) return { label: t.moderate, color: 'bg-yellow-500' };
    return { label: t.strong, color: 'bg-green-500' };
  };

  const { label, color } = getStrengthLabel();

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{t.strength}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;