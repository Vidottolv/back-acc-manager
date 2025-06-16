import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET_KEY;

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader == null || authHeader == undefined) 
    return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
}