const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "Pw#u=z>y9Cq@s7+Fk3LZGVe<}&-AdBW?./h!;%8$nx]H~*S6rv";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "24h";
const cron = require("node-cron");
const tokenBlacklistModel =require("../models").TokenBlackList;
const { Op } = require("sequelize");

const tokenGenerator = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

const tokenVerifier = async (token) => {
  const blacklisted = await tokenBlacklistModel.findOne({ where: { token } });
  if (blacklisted) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

const invalidateToken = async (token) => {
  const decoded = jwt.decode(token);
  if (decoded?.exp) {
    await tokenBlacklistModel.create({
      token,
      expiration: decoded.exp * 1000,
    });
  }
};

const tokenExtractor = (req) => {
  const auth = req.headers["authorization"];
  return auth?.startsWith("Bearer ") ? auth.split(" ")[1] : null;
};

const tokenMiddleware = async (req, res, next) => {
  const token = tokenExtractor(req);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = await tokenVerifier(token);
  if (!decoded) return res.status(401).json({ message: "Invalid token" });

  req.user = decoded;
  req.token = token;
  next();
};

// Limpieza automática cada hora
cron.schedule("0 * * * *", async () => {
  await tokenBlacklistModel.destroy({ where: { expiration: { [Op.lt]: Date.now() } } });
  console.log("Token blacklist cleaned");
});

module.exports = {
  tokenGenerator,
  tokenVerifier,
  tokenExtractor,
  invalidateToken,
  tokenMiddleware,
};