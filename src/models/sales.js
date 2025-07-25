import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    customerId: { type: String },
    productId: { type: String },
    customerName: {
      type: String,
      required: [true, "O nome do cliente/empresa é obrigatório."],
    },
    productName: {
      type: String,
      required: [true, "Informe o produto vendido."],
    },
    salesValue: {
      type: Number,
      required: [true, "Informe quantas unidades foram vendidas."],
    },
    commissionRate: {
      type: Number,
      required: [true, "Informe o percentual de comissão."],
    },
    commissionValue: {
      type: Number
    },
    expirationInstallmentDate: {
      type: Date,
      required: [true, "A data do primeiro vencimento é obrigatória."],
    },
    dtCreation: { type: Date },
    dtTimestamp: { type: Date, required: [true] },
  },
  { versionKey: false }
);

const sales = mongoose.model("sales", salesSchema);
export default sales;
