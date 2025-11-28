import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Prefer cookie token; fall back to Authorization: Bearer
  let token = req.cookies.token;
  if (!token && req.headers.authorization) {
    const [scheme, value] = req.headers.authorization.split(" ");
    if (scheme === "Bearer" && value) token = value;
  }

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // match createToken payload
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
