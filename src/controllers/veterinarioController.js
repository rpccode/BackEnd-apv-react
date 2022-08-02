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
    if(usuarioExiste){
        res.json({msg:'autenticando'})

    }else{
        res.status(403).json({msg:'El Usuario no Existe'})
    }
}
export {
        registrar,
        perfil,
        confirmar,
        autenticar
}