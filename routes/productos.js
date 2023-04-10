
//INDICAMOS QUE VAMOS A MANEJAR LAS RUTAS POR EXPRESS

const express = require('express');
const joi = require('joi');
const ruta  = express.Router() //Encargado de manejar las rutas


const productos = [
    {id:1 ,nombre:'Monitor 24 pulgadas'},
    {id:2,nombre:'Cable HDMI 6ft'},
    {id:3,nombre:'Ratón inalambrico'},
    {id:4,nombre:'xbox 720'}
];

ruta.get('/',(req,res)=>{
    res.send(productos);
});

ruta.get('/:id',(req,res)=>{
    //En el  cuerpo del objeto  req  está la propiedad
    //params, que nos guarda los parámetros enviados.
    //Los parametros en req,params se reciben como string
    const id = req.params.id;
  let  producto = existeProducto(id);
   if(!producto){
      res.status(400).send(`El producto ${id} no se encuentra !`)
      //Devuelve el estado HTTP 404
      return;
   }
    res.send(usuario);
    return;  
});

function existeProducto(id){
    return  productos.find(u => u.id === parseInt(id));    
 }
 
 function validarProducto(nom){
     const schema = joi.object({
         nombre: joi.string()
             .min(3)
             .required()
     })
   return  schema.validate({nombre:nom}) ; //devolvemos el resultado de la validación
 }

 ruta.post('/',(req,res)=>{
    //El objeto  request tiene la propiedad body
    //que va ha venir en formato JSON
    //Creación del  schema con Joi

    //const schema = joi.object({
    //    nombre:joi.string() //Decimos que va ingresar una string
   //                .min(3)  // Con un longitud minima de 3 caracteres
  //                 .required() //Decimos que es obligatorio lo anterior
//
   // });
//Validamos los datos propocinados por el usuario
    const {error,value} = validarProducto(req.body.nombre); 
//Estamos  haciendo una destructuración de los objetos de schema
if(!error) {
    const  producto = {
        id: productos.length + 1,
        nombre : req.body.nombre   
      };
      productos.push(producto);
      res.send(producto);
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
    let producto = existeProducto(req.params.id)
   if(!producto){
    res.status(404).send('El producto no se encuentra');//Devuelve el estado a HTTP
    return;
   }else
   {
    //validar si el dato recibo es correcto

    const {error, value} = validarProducto(req.body.nombre);
    if(!error){
        //Asignamos el valor que contenga value al nombre de nuestro objeto const usuario
        producto.nombre = value.nombre;
        //Respuesta ante la petición
        res.send(producto);
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
    const producto = existeProducto(req.params.id);
    if(!usuario)
    {
        res.status(400).send('El producto no se encuentra')//Devuelve el estado HTTP
        return;
    }
    //Encontrar el índice del usuario dentro del arreglo
   const index = productos.indexOf(producto);
   productos.splice(index,1); //elimina el usuario en el índice
   res.send(producto); //se responde con el usuario eliminado
   return ;
});

module.exports = ruta;