import customer from "../models/customer.js";

export default class CustomerController {
     
    static getCustomers = async (req, res, next) => {
        try {
            const customers = await customer.find({ idUser: req.user.id });
            res.status(200).send(customers);
        } catch (error) {
            next(error);
        }
    }

    static postCustomer = async (req, res, next) => {
        try {
            console.log(req.body)
            let newCustomer = new customer({
                ...req.body, 
                dtCreation: new Date(),
                purchasesQty: 0,
                idUser: req.user.id});

            const customerResponse = await newCustomer.save();
            res.status(201).send(customerResponse.toJSON());            
        } catch (error) {
            next(error);
        }
    }

    static updateCustomer = async (req, res, next) => {
        try {
          const id = req.params.id;
          await customer.findByIdAndUpdate(id, {$set: req.body});
          res.status(200).send({message: "Updated successfully"});
        } catch (error) {
            next(error);
        }
    }

}