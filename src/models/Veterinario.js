import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt"

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require:true,
        trim:true
    },
    password:{
        type: String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require: true,
        unique: true,
        trim: true
    },
    telefono:{
        type: String,
        default: null,
        trim: true
    },
    web:{
        type: String,
        default: null
    },
    token:{
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
        default: false
    }
})



veterinarioSchema.method.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario,this.password)
};
veterinarioSchema.pre('save', async function(next){
    
    if(!this.isModified('password')){
            next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});



const veterinario = mongoose.model('Veterinario',veterinarioSchema);

export default veterinario;