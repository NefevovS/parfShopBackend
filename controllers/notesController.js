import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class NotesController {
  async create(req, res) {
    const { name } = req.body;
    const type = await models.Notes.create({ name });
    return res.json(type);
  }
  async getAll(req, res) {
    const types = await models.Notes.findAll();
    return res.json(types);
  }
  async delete(req,res){}
  async update(req,res){}
}

export default new NotesController();
