const express=require('express');
const Controller = require('../Controlador/Controller');
const Rutas=express.Router();

//EN LOS CONST UTILIZAMOS Y LLAMAMOS LAS LIBRERIAS NECESARIAS


Rutas.get('/',Controller.index); //HACEMOS LLAMADO DE EL CONTROLADOR INDEX QUE ES NUESTR ARCHIVO O RAIZ PRINCIPAL
Rutas.get('/Login',Controller.Logou); 
Rutas.get('/Admi',Controller.Admi); 
Rutas.post('/login',Controller.Login); // POR MEDIO DE EL ACTION QUE TENEMOS EN EL LOGIN, SE LLEVA ESA INFORMACION A NUESTRO CONTROLER Y GENERA LA RUTA
Rutas.get('/TbUsu',Controller.consultageneral);
Rutas.get('/ActuCliente',Controller.Clientes); // ESTO AL IGUAL QUE ARRIBA
Rutas.get('/Ahorro',Controller.Ahorro);
Rutas.post('/actualizar3',Controller.Actualizar3);
Rutas.post('/frminsertar',Controller.insertar);
Rutas.get('/TbCliente',Controller.consultageneral2); // ESTO AL IGUAL QUE ARRIBA
Rutas.post('/frminsertar2',Controller.insertar2);
Rutas.post('/actualizar',Controller.Actualizar);
Rutas.post('/actualizar2',Controller.ActualizarCli);
Rutas.post('/borrar',Controller.Borrar);
Rutas.post('/borrar2',Controller.BorrarCli);
Rutas.get('/lineascli/:doccli',Controller.Lineas);
Rutas.get('/creditocli/:doccli',Controller.credito);
Rutas.get('/cerrar',Controller.Cerrar);
Rutas.get('/Usu',Controller.ClientesActu);
Rutas.post('/actualizarcla',Controller.actualizarcla);
Rutas.get('/TbLineas',Controller.Cliente3)
Rutas.get('/Creditos', Controller.Empleado4)
Rutas.get('/GenerarLi', Controller.Generarli)
Rutas.get('/GenerarAhorro', Controller.GenerarA)
Rutas.get('/Enviar', Controller.Enviar)
Rutas.get('/Retirar', Controller.Retirar)
Rutas.get('/Consignar', Controller.Consignar)
Rutas.post('/frminsertarli',Controller.insertarli);
Rutas.post('/frminsertarEnviar',Controller.insertarEnviar);
Rutas.post('/frminsertarReti',Controller.Reti);
Rutas.post('/frminsertarCon',Controller.Consig);
Rutas.post('/frminsertarA',Controller.insertarA);
Rutas.get('/GenerarCre', Controller.Generarcre)
Rutas.post('/frminsertarCre',Controller.insertarCre);


//rutas de empleado
Rutas.get('/TbCliente',Controller.Empleado)
Rutas.get('/Empleado',Controller.Empleado2)




//Rutas Cliente





Rutas.get('/Cliente',Controller.Cliente5)
module.exports=Rutas;