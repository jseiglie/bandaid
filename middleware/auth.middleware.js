const jwt = require("jsonwebtoken");
const { JWT_SECRET } =
  process.env || "Pw#u=z>y9Cq@s7+Fk3LZGVe<}&-AdBW?./h!;%8$nx]H~*S6rv";
const { JWT_EXPIRATION } = process.env || "24h";
const cron = require("node-cron");
const tokenBlacklistModel = require("../models/tokenBlackList.js");
const { Op } = require("sequelize");

const tokenGenerator = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};
const tokenVerifier = (token) => {
  try {
    // Check if the token is blacklisted
    const blacklistedToken = tokenBlacklistModel.findOne({
      where: { token },
    });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Token has been invalidated" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

const invalidateToken = async (token) => {
  const decoded = jwt.decode(token);
  if (decoded && decoded.exp) {
    await tokenBlacklistModel.create({
      token: token,
      expiration: decoded.exp * 1000, // Convert to milliseconds
    });
  }
};

const tokenExtractor = (req) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

const tokenMiddleware = (req, res, next) => {
  const token = tokenExtractor(req);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = tokenVerifier(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // blacklist actual token
  invalidateToken(token);

  //generate a new token with the same payload and a new expiration time
  req.token = jwt.sign(decoded, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  req.user = decoded;
  next();
};

// Schedule a cleanup task to run every hour
cron.schedule("0 * * * *", async () => {
  const now = Date.now();
  await tokenBlacklistModel.destroy({
    where: {
      expiration: { [Op.lt]: now },
    },
  });
  console.log("Token blacklist cleaned up");
});

module.exports = {
  tokenGenerator,
  tokenMiddleware,
  invalidateToken,
};
