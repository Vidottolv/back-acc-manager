import sales from "../models/sales.js";

export default class SalesController {
     
    static getSales = async (req, res) => {
        try {
            const salesData = await sales.find();
            res.status(200).send(salesData);
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

    static postSales = async (req, res) => {
        try {
            let newSales = new sales(req.body);
            const salesResponse = await newSales.save();
            res.status(201).send(salesResponse.toJSON());            
        } catch (error) {
            res.status(400).send({ message: `Ocurred an error: ${error.message}` });
        }
    }

    static updateSales = async (req, res, next) => {
        try {
          const id = req.params.id;
          await sales.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({message: "Updated successfully"});
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

}