//Función principal redirijir la  RUTAS PARA USUARIOS , Y OTROS

//INDICAMOS QUE VAMOS A MANEJAR LAS RUTAS POR EXPRESS

const express = require('express');
const joi = require('joi');
const ruta  = express.Router() //Encargado de manejar las rutas




const usuarios = [
    {id:1 ,nombre:'Jorge'},
    {id:2,nombre:'Ana'},
    {id:3,nombre:'karen'},
    {id:4,nombre:'Luis'}
];

ruta.get('/',(req,res)=>{
    res.send(usuarios);
});

//Con los : delante del id
//Express sabe que es un parámetro a recibir en la ruta
ruta.get('/:id',(req,res)=>{
    //En el  cuerpo del objeto  req  está la propiedad
    //params, que nos guarda los parámetros enviados.
    //Los parametros en req,params se reciben como string
    const id = req.params.id;
  let  usuario = validarUsuario(id);
   if(!usuario){
      res.status(400).send(`El usuario ${id} no se encuentra !`)
      //Devuelve el estado HTTP 404
      return ;
   }
    else{
    res.send(usuario);
   return;  
  }
});

//La ruta tiene el mismo nombre que la petición GET
//Express hace la diferencia dependiendo del tipo de 
//Petición
//La petición POST la vamos a utilizar para insertar
//un nuevo usuario en el arreglo
ruta.post('/',(req,res)=>{
    //El objeto  request tiene la propiedad body
    //que va ha venir en formato JSON
    //Creación del  schema con Joi

    const schema = joi.object({
        nombre:joi.string() //Decimos que va ingresar una string
                   .min(3)  // Con un longitud minima de 3 caracteres
                   .required() //Decimos que es obligatorio lo anterior

    });
//Validamos los datos propocinados por el usuario
    const {error,value} = schema.validate({nombre:req.body.nombre}); 
//Estamos  haciendo una destructuración de los objetos de schema
if(!error) {
    const  usuario = {
        id: usuarios.length + 1,
        nombre : req.body.nombre   
      };
      usuarios.push(usuario);
      res.send(usuario);
}else{
    const mensaje = error.details[0].message //como extraimos  el objeto error podemos recorrerlo
    res.status(400).send(mensaje); 
}  
    return;
    /*
    if(!req.body.nombre || req.body.nombre.length <=2){
         //Código 400 : Bad request
        res.status(400).send('Debe Ingresar un nombre que tenga almenps 3 letras');
        return;//Es necesario para que no continúe con el método
    }
    
   const  usuario = {
          id: usuarios.length + 1,
          nombre : req.body.nombre   
        };
        usuarios.push(usuario);
        res.send(usuario);
        */
});

//petición para modificar los datos existentes
//este método debe recibir un parámetro 
//id para saber qué usuario modificar
ruta.put('/:id',(req,res)=>{ 
   //encontrar si existe el usuario a modificar
   //parseInt , hace el casteo a valores enteros directamente
    let usuario = existeUsuario(req.params.id)
   if(!usuario){
    res.status(404).send('El usuario no se encuentra');//Devuelve el estado a HTTP
    return;
   }else
   {
    //validar si el dato recibo es correcto

    const {error, value} = validarUsuario(req.body.nombre);
    if(!error){
        //Asignamos el valor que contenga value al nombre de nuestro objeto const usuario
        usuario.nombre = value.nombre;
        //Respuesta ante la petición
        res.send(usuario);
    }else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
   }
   return
});
//Recibe como parámetros el id del usuario
//que se va ha eliminar

ruta.delete('/:id',(req,res)=>{
    const usuario = existeUsuario(req.params.id);
    if(!usuario)
    {
        res.status(400).send('El usuario no se encuentra')//Devuelve el estado HTTP
        return;
    }
    //Encontrar el índice del usuario dentro del arreglo
   const index = usuarios.indexOf(usuario);
   usuarios.splice(index,1); //elimina el usuario en el índice
   res.send(usuario); //se responde con el usuario eliminado
   return ;
});

function existeUsuario(id){
    return  usuarios.find(u => u.id === parseInt(id));    
 }
 
 function validarUsuario(nom){
     const schema = joi.object({
         nombre: joi.string()
             .min(3)
             .required()
     })
   return  schema.validate({nombre:nom}) ; //devolvemos el resultado de la validación
 }

 // Como declaramos un middleware en la cual especificamos la ruta raiz en el 
 // Archivo app.js podemos quitar la especificación de toda la ruta

 module.exports = ruta; //Se exporta el objeto ruta