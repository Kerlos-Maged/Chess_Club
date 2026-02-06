import jwt from 'jsonwebtoken';

export const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const sanitizeInput = (obj) => {
  const sanitized = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitized[key] = obj[key].trim();
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
};
