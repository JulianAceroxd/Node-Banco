   //NUESTRO ARCHIVO PRINCIPAL QUE CONTIENE LAS LIBRERIAS QUE ESTAMOS
   
   const express=require('express');
const app=express();
const path=require('path')  
const morgan=require('morgan');
const session= require('express-session');
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'Public')));
app.set('view engie','ejs');
app.set('views',path.join(__dirname,'Vista'));
app.use(session({
    secret:'123',
    resave:true,
    saveUninitialized:true
}));
app.use(express.urlencoded({extended:true}));
app.use(require('./Rutas/Rutas'));
app.use((err,req,res,next)=>{
    res.send({err:err.message});
});



//SERVIDOR
 app.set('port',process.env.PORT || 3000);
 app.listen(app.get('port'),()=>{
console.log(`Actualmente estamos en el puerto ${app.get('port')}`);

 });
 

