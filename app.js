/**
 * API Es una interfaz que permite  a diferentes aplicaciones comunicarse entre sí
 * La cual permite compartir datos.
 * Funcion con el módelo cliente servidor, mandamos la solicitud  al servidor y el servidor nos responde
 */
//Creamos un entorno de depuración
const inicioDebug = require('debug')('app:inicio') //Importamos el paquete debug
                                    //El parámetro indica el archivo y el entorno de depuración
                                    //
const dbDebug = require('debug')('app:db');
const usuarios = require('./routes/usuarios') //Estamos  indicado una ruta
const productos = require('./routes/productos') //Estamos indicado una ruta
const express = require('express');//importa el paquete express
const app = express(); //Crea una instancia de express
const config = require('config'); //Importamos el modulo o paquete config
//Utiliza una variabla de entorno definida como development
//por lo podemos cambiar para que lea la que nosotros deseamos
const logger = require('./logger')
const morgan = require('morgan')
const joi = require('joi'); //importamos el paquete  joi
//Cuáles son los métodos a implementar
//con su ruta
/*
app.get();//consulta
app.post();//Envio de datos al servidor (insertar datos en la base)
app.put(); //Actulización
app.delete()// Eliminiación

Cada petición qué hagamos tiene que estar asociado a una ruta en especial
*/
app.use(express.json()) ; // Le decimos a Express que use este 
                         //middleware entre la petición del cliente y la del servidor
//lo cual indica que l aparte del body lo  ponga en formato json
app.use(express.urlencoded({extended:true}));//nuevo middleware
                                          //Define el uso de la libreria  qs para
                                          //serparar la información codificada en url
app.use(express.static('public')); //Nombre de la carpeta que tendrá los archivos (recursos estaticos)

app.use('/api/usuarios',usuarios); //Middleware que importamos
//El primer parámetro es la ruta raiz asociada  con las peticiones a los datos del usuarios
//Con  las peticiones a los datos del usuario , la ruta raíz se va a concatenar  como prefijo al inicio
//de todas las  rutas definidas  en el archivo usuarios.

app.use('/api/productos',productos); //Indicamos que utlice la ruta

console.log(`Aplicación: ${config.get('nombre')}`)
console.log(`DB server: ${config.get('configDB.host')}`)

//Hacemos que no se muestre en la consola  
//EL trafico de las peticiones tiny cuando estemos 
//En un entorno de desarrollo diferente a producción

if(app.get('env')=== 'development'){
app.use(morgan('tiny'))
//console.log('Morgan Habilitado....')
//Muestra el mensaje de depuración
inicioDebug('Morgan está habilitado')
}
dbDebug('Conectando con la base de datos ....')
/*
app.use(logger); //logger ya hace referencia a la función log de logger.js
                //debido al export

app.use(function(req,res,next){
    console.log('Autentificando....')
    next();
    });
 */
//los tres app.use() son middlewares y se llaman antes de las funciones
//de ruta GET,POST,DELETE. Para que éstas puedan trabajar


//Consulta en la ruta Raiz del sitio 

//Toda petición siempre va a recibir dos parámetros
//req: lo que recibe el servidor de  parte del cliente
//res:La información que el servidor va ha respoder
// Vamos a utilizar el método send del objeto res
//app.get('/',(req,res)=>{
//      res.send('Hola mundo desde Express!!!')
//});



//Recibiendo varios parámetros
//Se pasan dos parámetros year  y month
//Query string
//localhost:5000/api/usuarios/1990/2/?nombre=xxxx&single=y
//app.get('/api/usuarios/:year/:month',(req,res)=>{
       //En el cuerpo de req está la propiedad Query
       //Query, guarda los  prámetros query string
  //     res.send(req.query)
//});



//El modulo proces, contiene información del sistema
//el objeto env contiene información de las variables de entorno
//Si la variable no existe , que tome un valor
//fijo definido por nosotros (3000)
const port =  process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log(`Escuchandolo en el puerto ${port}`);
})



//---------- Funciones middleware ------------
//El middleware es un bloque de código que se ejecuta entre 
//las peticiones del usuario (request) y la péticion 
//que llega al servidor. es un enlace entre la petición del 
//usuario y el servidor, antes de que éste pueda
//dar una respuesta.

//Las funciones middleware son funciones  que tienen acceso
//al objeto de solicitud(requets), al objeto de respuesta (res)
// y a la  siguiente función de middleware en el ciclo de 
// solicitud/respuesta de la aplicación.

//La siguente función de middleware se denota normalmente con una 
// variable denominada next.

//Las funciones de middleware pueden realizar las siguentes tareas:

// -Ejecutar cualquier codigo
// -Realizar cambios en la solicitud y los objetos de respuesta
// -Finalizar el ciclo de solicitud/respuestas
// -Invoca  la siguiente función middleware en  la pila  

//Express es un framework de direccionamiento y uso de middleware 
//Que permite que la aplición tenga una funcionalidad mímina propia.

//Ya hemos utilizado alguno middleware como son express.json()
// que transformado el body del req a formato JSON

//           ---------------------------
// request --|--> json() --> route()---|--> response     
//           ---------------------------

// route()--> Funciones GET, POST, PUT, DELETE

//Una aplicación Express puede utilizar los siguentes tipos de middleware
//   -Middleware de nivel de aplición
//   -Middleware de direccionador
//   -Middleware de manejo de errores
//   -Middleware Incorporado
//   -Middleware de terceros 




// ------- Recursos Estáticos ------
//Los recursos estáticos hacen referencia a  archivos,
//imágenes, documentos que se ubican en el servidor.
//vamos a usar un middleware para poder acceder a esos recursos


//----------gitignore--------
//Nos sirve para poder decir que vamos a subir a git y que cosa no vamos a subir a git

//-----------Github
/*
  Tenemos tres  lugares en git 
        -Nuestra área de trabajo
        -Olimpo ->   
        -La final -> Ya subimos los archivos y cambios a git

        git add .  -> mandamos todo al olimpo donde le daremos seguimiento
        git status -> Nos sirve para ver los elementos que se modificaron
        git commit -> Los archivos ya estan en el repositorio local luego del commit
        git remote add origin  rutadeconexion API-rest-express.git -> conectamos con nuestro repositorio remoto
        git push -> lo subimos a nuestro repositorio

*/
