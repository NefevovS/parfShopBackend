import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class ProductNotesController {
  async create(req, res) {
    const { noteId, productId } = req.body;
    const productNote = await models.ProductNotes.create({ noteId, productId });
    return res.json(productNote);
  }
  async getAll(req, res) {
    const productNote = await models.ProductNotes.findAll();
    return productNote.json(types);
  }
  async delete(req,res){}
  async update(req,res){}
}

export default new ProductNotesController();
