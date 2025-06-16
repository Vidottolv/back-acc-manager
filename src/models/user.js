import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "O nome é obrigatório."] },
    email: { 
        type: String,
        required: [true, "O email é obrigatório."] },  
    password: { 
        type: String,
        required: [true, "A senha é obrigatória."],
        minlength: [6, "A senha deve ter pelo menos 6 caracteres."] },
},
    {
        versionKey: false
    }
)

const user = mongoose.model("user", userSchema);
export default user;