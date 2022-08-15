import generarJWT from "../helpers/generarJWT.js";
import veterinario from "../models/veterinario.js"


const registrar = async (req,res) =>{
    const {email,password,nombre} = req.body

    //prevenir usuariios duplicados
    const existeUsuario = await veterinario.findOne({email})

    if(existeUsuario){
        const error = new Error('Este usuario ya Esta Registrado');
        return res.status(400).json({msg: error.message});
    }

    //guardando veterinario
    try {
        const Veterinario  = new veterinario(req.body)
    
        const veterinarioGuardado = await   Veterinario.save();
    res.json(veterinarioGuardado)
        
    } catch (error) {
        console.log(error)
    }
}


const perfil = (req,res) =>{
    res.send('Desde api/veterinarios/perfil')
}


const confirmar =async (req,res) =>{
    const{ token } = req.params;
    
    const usuarioConfirmar = await veterinario.findOne({token})
    if(!usuarioConfirmar){
        const error = new Error('EL usuario no existe');
        return res.status(400).json({msg: error.message})
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

       await usuarioConfirmar.save();
    res.json({msg: 'Usuario Confirmado Correctamente'})
        
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async (req,res) =>{
    const {email,password} = req.body;

    //comprobando si el usuario existe
    const usuarioExiste = await veterinario.findOne({email})
    if(!usuarioExiste){
        res.status(403).json({msg:'El Usuario no Existe'})
    }
    //verificar si el usuario esta verificado
    if(!usuarioExiste.confirmado){
        const error = new Error('Tu cuenta no ha sido Confirmada')
        return res.status(403).json({msg:error.message})
    }

    //verifiicar el Password
    if( await usuarioExiste.comprobarPassword(password)){
        //autenticar
        // res.json({token: generarJWT()})
    }else{
        const error = new Error('Password Incorrecto')
        return res.status(403).json({msg:error.message})
    }
    
}
export {
        registrar,
        perfil,
        confirmar,
        autenticar
}