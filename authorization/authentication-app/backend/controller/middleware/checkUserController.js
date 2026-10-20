import { users } from "../userController.js";
import { getUserIdForToken } from "./authTokens.js";

export const checkUser = (req, res, next) => {
    const { email, password } = req.body ?? {};
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.user = user;
    next();
}

export const requireAuth = (req, res, next) => {
    const [scheme, token] = (req.get('authorization') ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Bearer token required' });
    }

    const userId = getUserIdForToken(token);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();
};