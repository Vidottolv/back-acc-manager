import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import user from "../models/user.js";

const SECRET = process.env.SECRET_KEY;

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    const userData = await user.findOne({ name: username }); 
    if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

    const valid = bcrypt.compareSync(password, userData.password);
    if (!valid) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign({ id: userData._id, username: userData.username }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  static async register(req, res) {
    const { username, email, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }
    const userExists = await user.findOne({ username }); 
    if (userExists) {
      return res.status(409).json({ message: "Usuário já existe" });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new user({
      name: username,
      email: email,
      password: hashedPassword
    });
    const userResponse = await newUser.save();
    return res.status(201).json({ userResponse, message: "Usuário criado com sucesso" });
  }
}

export default AuthController;