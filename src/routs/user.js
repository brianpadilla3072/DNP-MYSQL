import { Router } from "express";
import { methods as userControler} from "./../controlers/userControler";
const cors = require('cors');//Cómo permitir solicitudes entre sitios



const router = Router();
router.get("/iniciar",cors(),userControler.getUser);//iniciamos un usuario
router.post("/registrar",cors(),userControler.addUser);//registramos un usuario
router.get("/getUsers",cors(),userControler.getUsers);//obtenemos users

export default router;