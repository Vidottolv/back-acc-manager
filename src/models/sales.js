import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    dtCreation: { type: Date },
    dtTimestamp: { type: Date, required: [true] },
    // customer: { type: String}
    installmentNumber: { 
        type: Number,
        required: [true, "O número de parcelas é obrigatório."] },
    expirationInstallmentDate: { 
        type: Date,
        required: [true, "A data de pagamento é obrigatória."] }
},
    {
        versionKey: false
    }
)

const sales = mongoose.model("sales", salesSchema);
export default sales;