import { randomBytes } from 'node:crypto';

const tokens = new Map();
const tokenLifetimeMs = 60 * 60 * 1000;

export const createAuthToken = (userId) => {
    const token = randomBytes(32).toString('hex');
    tokens.set(token, { userId, expiresAt: Date.now() + tokenLifetimeMs });
    return token;
};

export const getUserIdForToken = (token) => {
    const session = tokens.get(token);
    if (!session) return null;

    if (session.expiresAt <= Date.now()) {
        tokens.delete(token);
        return null;
    }

    return session.userId;
};