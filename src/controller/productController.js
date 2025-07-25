import product from "../models/product.js";

export default class ProductController {
     
    static getProducts = async (req, res, next) => {
        try {
            const products = await product.find();
            if(products != null ){
                res.status(200).send(products);
            } else {
                res.status(404).send({ message: "Ocurred an error: ", status: error.status });
            }
        } catch (error) {
            next(error);
        }
    }

    static getProductsByUser = async (req, res, next) => {
        try {
            const products = await product.find({ idUser: req.user.id });
            res.status(201).send(products);
        } catch (error) {
            next(error);
        }
    }

    static postProduct = async (req, res, next) => {
        console.log(req.body)
        try {
            let newProduct = new product({
                ...req.body, 
                idUser: req.user.id});

            const productResponse = await newProduct.save();
            res.status(201).send(productResponse.toJSON());            
        } catch (error) {
            next(error);
        }
    }

    static updateProduct = async (req, res, next) => {
        try {
          const id = req.params.id;
          await product.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({message: "Updated successfully"});
        } catch (error) {
            next(error);
        }
    }

}