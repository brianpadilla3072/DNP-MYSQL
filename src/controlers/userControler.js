import {getConnection} from "./../database/database";
import config from "./../config"
const bcryptjs = require("bcryptjs");
// pedir info
const addUser = async (req,res)=>{//registrar usuario nuevo
    try{
        let passRegistrar = await bcryptjs.hash(req.body.passRegistrar,8);
        const {nombreRegistrar, correoRegistrar, fechaRegistrar} = req.body;
        let rol = "user";
        const userObj= {nombreRegistrar, correoRegistrar, fechaRegistrar, passRegistrar, rol}// objeto quecontiene los parametros del body
        const connection = await getConnection();//esperamos a que responda la base
        const result = await connection.query("INSERT INTO users SET ?", userObj);//decimos que pedimos a la bas
            if(result.affectedRows === 1){
                res.redirect("http://127.0.0.1:5500");
            }
           
    /* {
    "nombreRegistrar": "",
    "correoRegistrar": "",
    "fechaRegistra": "",
    "passRegistrar" : ""

    } 
    */ 
    }catch(error){//si todo sale mal
        res.status(500 , ' - Error del servidor.');
        res.send(error.message);

    }
    
}


const getUser = async (req,res)=>{//iniciamos un  usuario nuevo
    const {correoIniciar} = req.query;
    //const {passIniciar} = await bcryptjs.compare(req.query.passIniciar,8);
    const connection = await getConnection();//esperamos a que responda la base
   
   // const passIniciar = "$2a$08$fLcVaPwz9SJVMCDx253unOrTEIcc.OwHykHhHrnJxd/4Gsbc7kRoW"
   const result = await connection.query('SELECT * FROM users WHERE correoRegistrar = ? ', [correoIniciar]);//decimos que pedimos a la bas
   const passIniciar = result[0].passRegistrar;
    try{
        if(correoIniciar !== " " && passIniciar !== " ") {
             // If the account exists
            if (result.length > 0) {
                    // Authenticate the user
                    bcryptjs.compare(req.query.passIniciar, passIniciar, function(err,resul){
                        if(resul){ 
                            let g =result[0];
                            delete g.passRegistrar;
                            const data = g;
                            res.json(data);
                        }else{
                            res.json(err);
                        }
                    });
                    
            } else {
                res.json({message : 'Usuario y/o Contraseña Incorrecta'});
            }			
        }else {
            res.json({message : 'Por favor ingresa Usuario y Contraseña!'});
            
        }

    }catch(error){
        res.status(500 , ' - Error del servidor.');
        res.send(error.message);

    } 
    
}

const getUsers = async (req,res)=>{//obtenemos toda la tabla usuarios
    try{
        const connection = await getConnection();//esperamos a que responda la base
        const result = await connection.query("SELECT id, name, email, fecha, password  FROM users");//decimos que pedimos a la base
        res.json(result);
    }catch(error){
        res.status(500 , ' - Error del servidor.');
        res.send(error.message);

    }
    
}

export const methods = {//eportamos los metodos para esta ruta
   
    //verbos HTTP
    addUser,
    getUsers,
    getUser
   
};