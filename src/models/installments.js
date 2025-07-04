import mongoose from "mongoose";

const installmentsSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    customerId: { type: String },
    productId: { type: String },
    installmentNumber: { type: Number },
    expirationDate: { type: Date },
    value: { type: Number },
    flgEnable: { type: Number },
  },
  {
    versionKey: false,
  }
);

const installments = mongoose.model("installments", installmentsSchema);
export default installments;
