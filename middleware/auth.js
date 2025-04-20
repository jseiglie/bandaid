const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env || 'changeitlater';
const { JWT_EXPIRATION } = process.env || '24h';

const tokenGenerator = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
    }
const tokenVerifier = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}
const tokenExtractor = (req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
    }
    return null;
}
const tokenMiddleware = (req, res, next) => {
    const token = tokenExtractor(req);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = tokenVerifier(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
}

module.exports = {
    tokenGenerator,
    tokenVerifier,
    tokenExtractor,
    tokenMiddleware
}