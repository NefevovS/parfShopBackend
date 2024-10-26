import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const type = await models.Brand.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await models.Brand.findAll();
    return res.json(types);
  }
}

export default new BrandController();
