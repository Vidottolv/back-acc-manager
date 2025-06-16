import user from "../models/user.js";

export default class UsersController {
  static async getCurrentUser(req, res) {
    try {
      const userData = await user.findById(req.user.id).select("-password");
      if (!userData) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.json(userData);
    } catch (err) {
      return res.status(500).json({ message: "Erro ao buscar usuário logado" });
    }
  }
}
