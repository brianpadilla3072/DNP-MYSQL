import { Router } from "express";
import { token } from "morgan";
import { methods as devocionalesControler} from "./../controlers/devocionalesControler";
const cors = require('cors');//Cómo permitir solicitudes entre sitios



const router = Router();
router.get("/",cors(),devocionalesControler.validateToken,devocionalesControler.getRoutes);
router.post("/",cors(),devocionalesControler.addRoutes);//decimos que obtenemos un parametro
router.put("/:id",cors(),devocionalesControler.updateRoute);//actualizamos la fila con el id
router.get("/:id",cors(),devocionalesControler.getRoute);//decimos que obtenemos un parametro
router.delete("/:id",cors(),devocionalesControler.deleteRoute);//decimos que eliminamos un parametro
export default router;