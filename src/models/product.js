import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    dtCreation: { type: Date },
    productName: {
        type: String,
        required: [true, "O nome do produto é obrigatório."]
    },
    unitPrice: { type: Number },
    purchasesQty: { type: Number },
    salesperson: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: false
    }
    },
    {
        versionKey: false
    }
)

const product = mongoose.model("products", productSchema);
export default product;