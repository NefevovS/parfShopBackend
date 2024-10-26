import ApiError from "../error/ApiError.js";

class UserController {
  async registation(req, res) {}
  async login(req, res) {}
  async checkAuth(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("asads"));
    }
    res.json(id);
  }
}

export default new UserController();
