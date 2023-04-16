import {getConnection} from "./../database/database";
const jwt = require('jsonwebtoken');
import config from "./../config"


const validateToken =(req, res, next)=>{
   
    const accessToken = req.query.token; //req.headers['Token'] || 
    if(accessToken){
        res.send("access denied");
    }
    const secretPublic = config.secretPublic;
    jwt.verify(accessToken,secretPublic, (error, res) =>{
        if(!error){ 
            res.send({message: "token deied, pleace change "});
        }else{
            
        next();
        }

    })
}

// pedir info
const getRoutes = async (req,res)=>{//obtenemos toda la tabla
    try{
        const connection = await getConnection();//esperamos a que responda la base
        const result = await connection.query("SELECT id, name, texto, autor  FROM devocionales");//decimos que pedimos a la base
        res.json(result);
    }catch(error){
        res.status(500 , ' - Error del servidor.');
        res.send(error.message);

    }
    
}
const addRoutes = async (req,res)=>{//agregamos a la tabla
    try{
        const {name, texto, autor } = req.body;
        if(name === undefined || texto === undefined || autor === undefined ){
            res.status(400).json({message : "bad request"});//error en la carga de datos
        }
            const lenguaje= { name, texto, autor}// objeto quecontiene los parametros del body
            const connection = await getConnection();//esperamos a que responda la base
            await connection.query("INSERT INTO devocionales SET ?", lenguaje);//decimos que pedimos a la base
            res.json({message : " devocional added"});//respuesta satisfactoria
        
    }catch(error){//si todo sale mal
        res.status(500 , ' - Error del servidor.');
        res.send(error.message);

    }
    
}
const getRoute = async (req,res)=>{ // obtenemos un solo lenguaje por parametro de la tabla
    try{
        const {id} = req.params;
        const connection = await getConnection();//esperamos a que responda la base
        const result = await connection.query("SELECT id, name, texto, autor FROM devocionales WHERE id = ?", id);//decimos que pedimos a la base
        res.json(result);//respuesta satisfactoria
        
    }catch(error){
        res.status(500 , ' - Error del servidor.');
        res.send(error.message);

    }
    
}
const updateRoute = async (req,res)=>{ // eliminar un solo lenguaje por parametro de la tabla
    try{
        const {id} = req.params;
        const {name, texto, autor} = req.body;
        if(name === undefined || texto === undefined || autor === undefined ){
            res.status(400).json({message : "bad request"});//error en la carga de datos
        }
        const lenguaje= { id, name, texto, autor}// objeto quecontiene los parametros del body
        const connection = await getConnection();//esperamos a que responda la base
        const result = await connection.query("UPDATE devocionales SET ? WHERE id = ?", [lenguaje, id]);//decimos que pedimos a la base
        if(result.affectedRows == 0){// si no se encontro fila
            res.json({message : " don't row"});//respuesta satisfactoria

        }else{
            res.json({message : " lenguaje update"});//respuesta satisfactoria
        }
    }catch(error){
        res.status(500 , ' - Error del servidor.');
        res.send(error.message);

    }
    
}
const deleteRoute = async (req,res)=>{ // eliminar un solo lenguaje por parametro de la tabla
    try{
        const {id} = req.params;
        const connection = await getConnection();//esperamos a que responda la base
        const result = await connection.query("DELETE FROM devocionales WHERE id = ?", id);//decimos que pedimos a la base
        if(result.affectedRows == 0){// si no se encontro fila
            res.json({message : " don't row"});//respuesta satisfactoria

        }else{
            res.json({message : " devocional delete"});//respuesta satisfactoria
        }
    }catch(error){
        res.status(500 , ' - Error server.');
        res.send(error.message);

    }
    
}
export const methods = {//eportamos losmetodos para esta ruta
    //validar tokens
    validateToken,
    //verbos HTTP
    getRoutes,
    addRoutes,
    getRoute,
    updateRoute,
    deleteRoute
};