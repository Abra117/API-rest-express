function log (req,res,next){
    console.log('Logging....');
    next(); //Le indica a express que llame a  la siguiente función middleware
           // o la petición correspondiente
           // Si no lo indicamos, Express se queda dentro de esta función
   };


   module.exports = log;