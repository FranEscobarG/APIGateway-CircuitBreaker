import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    authServiceURL: process.env.AUTH_SERVICE_URL || 'http://localhost:3004',
    userServiceURL: process.env.USER_SERVICE_URL || 'http://localhost:3001',
};
