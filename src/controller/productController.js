import product from "../models/product.js";

export default class ProductController {
     
    static getProducts = async (req, res) => {
        try {
            const products = await product.find();
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

    static getProductsByUser = async (req, res) => {
        try {
            const products = await product.find({ idUser: req.user.id });
            res.status(200).send(products);
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

    static postProduct = async (req, res) => {
        try {
            let newProduct = new product({
                ...req.body, 
                idUser: req.user.id});

            const productResponse = await newProduct.save();
            res.status(201).send(productResponse.toJSON());            
        } catch (error) {
            res.status(400).send({ message: `Ocurred an error: ${error.message}` });
        }
    }

    static updateProduct = async (req, res, next) => {
        try {
          const id = req.params.id;
          await product.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({message: "Updated successfully"});
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

}