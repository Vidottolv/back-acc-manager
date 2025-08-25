import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import user from "../models/user.js";
import preference from "../models/preferences.js";
import SalesController from "./salesController.js";

const SECRET = process.env.SECRET_KEY;

class AuthController {
  static async login(req, res) {
    const { password } = req.body;
    const email = req.body.email.trim().toLowerCase();

    const userData = await user.findOne({ email });
    if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

    const valid = bcrypt.compareSync(password, userData.password);
    if (!valid) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign({ id: userData._id, email: email }, SECRET, { expiresIn: "24h" });
      
    const userPreferences = await preference.find({ idUser: userData._id });
    return res.json({token: token, preference: userPreferences, username: userData.name});
  }

  static async register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }

    const userExists = await user.findOne({ name: username });
    if (userExists) {
      return res.status(409).json({ message: "Usuário já existe" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new user({
      name: username,
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    const defaultPreferences = new preference({
      idUser: savedUser._id,
      commission: 0,
      language: "pt-BR"
    });
    await defaultPreferences.save();

    const token = jwt.sign(
      { id: savedUser._id, username: savedUser.name },
      SECRET,
      { expiresIn: "24h" }
    );
    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      token: token,
      preference: [defaultPreferences]
    });
  }

  static async checkAuth(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET);
      const userData = await user.findById(decoded.id);
      if (!userData) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const userPreferences = await preference.find({ idUser: userData._id });

      return res.status(200).json({
        valid: true,
        username: userData.username,
        preference: userPreferences
      });
    } catch (err) {
      return res.status(401).json({ message: "Token expirado ou inválido" });
    }
  }

  static async changePassword(req, res) {
    const { password, newPassword } = req.body;

    const email = req.body.email.trim().toLowerCase();
    const userData = await user.findOne({ email });

    console.log(userData)

    try {
      if ( password === newPassword ){
        const hashedPassword = bcrypt.hashSync(password, 8);
        userData.password = hashedPassword;
        userData.save();
      }  
      return res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      return res.status(401).json({ message: "Erro ao tentar atualizar senha." });
    }
  }
}

export default AuthController;