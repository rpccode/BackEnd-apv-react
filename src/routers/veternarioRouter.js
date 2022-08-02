import { Router } from "express";
import {
    registrar,
     perfil, 
     confirmar, 
     autenticar
} from '../controllers/veterinarioController.js'
const router = Router();


router.post('/', registrar)
router.get('/perfil', perfil)
router.get('/confirmar/:token', confirmar)
router.post('/login',autenticar)



export default router;