import sales from "../models/sales.js";
import customer from "../models/customer.js";
import product from "../models/product.js";
import installments from "../models/installments.js";

function addMonth(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

export default class SalesController {
     
    static getSales = async (req, res) => {
        try {
            const salesData = await sales.find();
            res.status(200).send(salesData);
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

    static getSalesByUser = async (req, res) => {
        try {
            const userId = req.user.id;
            const salesData = await sales.find({ idUser: userId });
            if (salesData.length === 0) {
                return res.status(404).send({ message: "No sales found for this user." });
            }
            res.status(200).send(salesData);
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

    static postSales = async (req, res) => {
        try {
            const { 
                customerName, 
                productName, 
                installmentNumber, 
                commissionRate,
                productQty,
                expirationInstallmentDate,
                ...saleData } = req.body; 

            const qty = Number(productQty);
            const rate = Number(commissionRate); 
            const client = customerName;
            const prod = productName;

            let customerRecord = await customer.findOne({ name: customerName });
            let productRecord = await product.findOne({ productName: productName });
            const unit = Number(productRecord?.unitPrice);

            var valuePerMonth = (Number(qty * unit) * (rate / 100)) / installmentNumber;
            console.log('qty: '+qty+' - unitPrice: '+unit+' - rate: '+rate);
            console.log(valuePerMonth);

            if (installmentNumber > 1) {
                var date = expirationInstallmentDate;
                for (var i = 1; i <= installmentNumber; i++) {
                    const instRecord = new installments({
                        customerId: customerRecord._id,
                        productId: productRecord._id,
                        flgEnable: 1,
                        expirationDate: addMonth(date, i - 1),
                        installmentNumber: i,
                        value: valuePerMonth
                    });
                    await instRecord.save(); 
                }
            }
            
            let newSale = new sales({
                ...saleData,
                idUser: req.user.id,
                customerId: customerRecord._id,
                productId: productRecord._id,
                customerName: client, 
                productName: prod,
                productQty: productQty,
                installmentNumber: installmentNumber, 
                commissionRate: rate,
                expirationInstallmentDate: expirationInstallmentDate,
                dtCreation: new Date(),
                dtTimestamp: saleData.dtTimestamp || new Date(),
            });


            const salesResponse = await newSale.save();
            await customerRecord.save();
            await productRecord.save();

            res.status(201).send(salesResponse);
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