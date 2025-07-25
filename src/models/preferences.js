import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema({
    idUser: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users" },
    commission: { type: Number },
    language: { type: String }
},
    {
        versionKey: false
    }
)

const preference = mongoose.model("preference", preferencesSchema);
export default preference;