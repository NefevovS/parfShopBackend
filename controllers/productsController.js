import {v4 as uuidv4} from "uuid";
import path from "node:path";
import models from "../models/models.js";
import ApiError from "../error/ApiError.js";
import fs from "fs"

class ProductsController {
    async create(req, res, next) {
        try {
            const {name, price, typeId, brandId, info} = req.body;

            const {img} = req.files;
            let fileName = uuidv4() + ".jpg";
            img.mv(path.resolve(import.meta.dirname, "..", "static", fileName));

            const product = await models.Products.create({
                name,
                price,
                img: fileName,
                typeId,
                brandId,
            });

            if (info) {
                const info = JSON.parse(info);
                info.forEach((i) => {
                    models.ProductsInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id,
                    });
                });
            }

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.body;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;

        let products;
        if (!brandId && !typeId) {
            products = await models.Products.findAndCountAll({limit, offset});
        }
        if (!brandId && typeId) {
            products = await models.Products.findAndCountAll({
                where: {typeId},
                limit,
                offset,
            });
        }
        if (brandId && !typeId) {
            products = await models.Products.findAndCountAll({
                where: {brandId},
                limit,
                offset,
            });
        }
        if (brandId && typeId) {
            products = await models.Products.findAndCountAll({
                where: {brandId, typeId},
                limit,
                offset,
            });
        }
        return res.json(products);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const product = await models.Products.findOne({
            where: {id},
            include: [
                {model: models.ProductsInfo, as: "productsInfo"},
                {model: models.Notes, as: "notes", through: {attributes: []}},
            ],
        });
        return res.json(product);
    }

    async delete(req, res, next) {
        const {id} = req.params;
        const product = await models.Products.findOne({
            where: {id},
        });
        if (product) {
            await models.Products.destroy({
                where: {id}
            })
            const fileName = product.img
            fs.unlink(path.resolve(import.meta.dirname, "..", "static", fileName), (err) => {
                if (err) {
                    ApiError.badRequest(err.message)
                }
            })
            return res.json(product)
        }
        res.json({message: "Товара с таким ID не существует"})

    }


    async update(req, res, next) {
        //     const {id} = req.params;
        //     const {name, price, typeId, brandId, info} = req.body;
        //     const {newImg}=req.files;
        //     const product = await models.Products.findOne({
        //         where: {id},
        //     });
        //
        //
        //     if (product) {
        //        product.update({name,price,typeId,brandId})
        //         if(info){
        //             const info=JSON.parse(info)
        //             info.forEach(i=>{
        //                 models.ProductsInfo.findOne()
        //
        //             })
        //         }
        //
        //         })
        //         const fileName = product.img
        //         fs.unlink(path.resolve(import.meta.dirname, "..", "static", fileName), (err) => {
        //             if (err) {
        //                 ApiError.badRequest(err.message)
        //             }
        //         })
        //         return res.json(product)
        //     }
        //     res.json({message:"Товара с таким ID не существует"})
        // }
    }

    export
    default
    new

    ProductsController();
