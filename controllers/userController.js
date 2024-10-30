import bcrypt from "bcrypt";
import models from "../models/models.js";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

const generateJwt = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

class UserController {
  async registation(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Не корректный email или пароль"));
    }
    const candidate = await models.User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await models.User.create({
      email,
      role,
      password: hashPassword,
    });
    const basket = await models.Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Такого пользователя не существует"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Указан не верный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async checkAuth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

export default new UserController();
