export const env = {
  jwtSecret: process.env.JWT_SECRET || 'senhasecreta',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
};
