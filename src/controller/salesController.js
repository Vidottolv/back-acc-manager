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

    static getMonthlySales =  async(req,res) => {
        try {
            const now = new Date();
            const userId = req.user.id;
            const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
            const startOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));

            const salesThisMonth = await sales.find({
              expirationInstallmentDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth,
              }, idUser: userId
            });

            console.log(salesThisMonth);

            const qtySales = salesThisMonth.length;
            const salesValue = salesThisMonth.reduce((acc, item) => acc + (item.salesValue ?? 0), 0);
            const commissionValue = salesThisMonth.reduce((acc, item) => acc + (item.commissionValue ?? 0), 0);
            const productCounts = {};
            
            for (const sale of salesThisMonth) {
              const name = sale.productName;
              productCounts[name] = (productCounts[name] || 0) + 1;
            }        
            const sorted = Object.entries(productCounts).sort((a, b) => b[1] - a[1]);
            let topProducts = [];
            if (sorted.length > 0) {
              const maxCount = sorted[0][1];
              topProducts = sorted.filter(([_, count]) => count === maxCount).slice(0, 2);
            }
            const response = {
                salesQuantity: qtySales,
                salesVal: salesValue,
                commissionVal: commissionValue,
                topProducts: topProducts.map(([productName, count]) => ({ productName, count })),
            }

            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ message: "Ocurred an error: ", status: error.status });
        }
    }

    static postSales = async (req, res) => {
        try {
            const { 
                customerID, 
                productID, 
                // installmentNumber, 
                commissionRate,
                salesValue,
                expirationInstallmentDate,
                ...saleData } = req.body; 

            const salesV = Number(salesValue);
            const rate = Number(commissionRate); 
            const client = customerID;
            const prod = productID;

            let customerRecord = await customer.findOne({ _id: client });

            let productRecord = await product.findOne({ _id: prod });

            var valuePerMonth = (Number(salesV  * (rate / 100)));
            // console.log('qty: '+qty+' - unitPrice: '+unit+' - rate: '+rate);

            // if (installmentNumber > 1) {
            //     var date = expirationInstallmentDate;
            //     for (var i = 1; i <= installmentNumber; i++) {
            //         const instRecord = new installments({
            //             customerId: customerRecord._id,
            //             productId: productRecord._id,
            //             flgEnable: 1,
            //             expirationDate: addMonth(date, i - 1),
            //             installmentNumber: i,
            //             value: valuePerMonth
            //         });
            //         await instRecord.save(); 
            //     }
            // }
            let dtCreation = saleData.dtCreation;

            if (typeof dtCreation === 'string') {
                const [date, time] = dtCreation.split(', ');
                const [day, month, year] = date.split('/');
                dtCreation = new Date(`${year}-${month}-${day}T${time}`);
            }

            let newSale = new sales({
                ...saleData,
                idUser: req.user.id,
                customerId: customerRecord._id,
                productId: productRecord._id,
                customerName: customerRecord.name, 
                productName: productRecord.productName,
                salesValue: salesV,
                commissionRate: rate,
                commissionValue: valuePerMonth,
                expirationInstallmentDate: expirationInstallmentDate,
                dtCreation: dtCreation || new Date(),
                dtTimestamp: saleData.dtTimestamp ? new Date(saleData.dtTimestamp) : new Date(),
            });
            console.log(newSale)
            const salesResponse = {};
            try {
                salesResponse = await newSale.save();
            } catch (error) {
                console.log(error)
            }
            customerRecord.purchasesQty = customerRecord.purchasesQty + 1;
            
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