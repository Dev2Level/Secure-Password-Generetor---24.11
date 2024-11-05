export const calculatePasswordStrength = (password: string): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 12) {
    score += 2;
  } else if (password.length >= 8) {
    score += 1;
    feedback.push('Consider using a longer password (12+ characters)');
  } else {
    feedback.push('Password is too short');
  }

  // Character variety checks
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('Add special characters');

  // Pattern checks
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push('Avoid repeated characters');
  }

  if (/^[A-Za-z]+$|^[0-9]+$/.test(password)) {
    score -= 1;
    feedback.push('Mix different types of characters');
  }

  // Common patterns check
  const commonPatterns = [
    /password/i,
    /12345/,
    /qwerty/i,
    /admin/i,
    /letmein/i
  ];

  if (commonPatterns.some(pattern => pattern.test(password))) {
    score -= 2;
    feedback.push('Avoid common password patterns');
  }

  return {
    score: Math.max(0, Math.min(5, score)),
    feedback: feedback
  };
};