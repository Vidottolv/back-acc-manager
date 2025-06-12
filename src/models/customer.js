import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    dtCreation: { type: Date },
    name: { type: String },
    purchasesQty: { type: Number }
},
    {
        versionKey: false
    }
)

const customer = mongoose.model("customers", customerSchema);
export default customer;