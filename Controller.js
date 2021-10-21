const Connection=require('../Conexion/Conexion');  //ACA REQUERIMOS LA CONEXION DE BASE DE DATOS PARA LAS CONSULTAS
const  cnn=Connection();  //ACA POR MEDIO DE LA CONSTANTE CNN VAMOS A CONTENER LA CONEXION A LA BD
const {render}=require('ejs'); //ACA RENDERISAMOS LOS EJS PARA LA HORA DE HACER RENDERS LOS TOME CORRECTAMENTE
const bcryptjs=require('bcryptjs'); //LLAMAMOS EL MODULO DE INCRIPTACION DE CLAVES ANTERIORMENTE INSTALADO

const Controller={}; //HACEMOS INICIALIZAMOS EL CONTROLADOR 


 Controller.index=(req,res,next)=>{
res.render('BANCTUD')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
res.send("ERROR DE CONTROLADOR");

}

Controller.Logou=(req,res,next)=>{
    res.render('Login')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
    
    }
Controller.Admi=(req,res,next)=>{
    res.render('Admi')               //aca creamas nuestro controlador index o raiz, es la primera vista que tendremos al iniciar
    res.send("ERROR DE CONTROLADOR");
    
    }

//Bloque insertar Usuarios
Controller.consultageneral=(req,res,next)=>{    //creamos una consulta de usuarios por medio de la funcion flecha
    if(req.session.Login){


   
    
    cnn.query('SELECT * FROM usuarios',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
        if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }   
        else{
            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('TbUsu',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })
}else{
    res.redirect('/');
}
}

Controller.consultageneral2=(req,res,next)=>{    //creamos una consulta de usuarios por medio de la funcion flecha
    cnn.query('SELECT c.doccli,c.nomcli, c.aplicli, c.correocli, c.celular, c.sexo, c.fechanaccli FROM usuarios u, clientes c WHERE u.doccli=c.doccli AND u.rol="Cliente"',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
        if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }   
        else{
            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('TbCliente',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })

}



    Controller.insertar=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const d=req.body.doccli;
        const u=req.body.nomusu;
        const c=req.body.clave;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
        const r=req.body.rol;
        const e=req.body.estado;
        const i=req.body.imagen;
        const password=await bcryptjs.hash(c,8)  // INCRPTACION DE CONTRASEÑA POR MEDIO DEL HASH Y SU MODULO BCRYPT.JS
        console.log(d,u)
        cnn.query('INSERT INTO usuarios SET?',{doccli:d,nomusu:u,clave:password,rol:r,estado:e,imagen:i},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
        }
        else{
            console.log(resbd);
        res.redirect('Tbusu')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
        });
        }

    Controller.insertar2=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const d=req.body.doccli;
        const n=req.body.nomcli;
        const a=req.body.apecli;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
        const c=req.body.correocli;
        const cel=req.body.cel;
        const s=req.body.sexo;
        const f=req.body.fecha;


        
        cnn.query('INSERT INTO clientes SET?',{doccli:d,nomcli:n,aplicli:a,correocli:c,celular:cel,sexo:s,fechanaccli:f},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){    
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
        }
        else{
            console.log(resbd);
        res.redirect('/')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
        });
        }

    Controller.Login=async(req,res,next)=>{  //LOGINN 
        const usu = await req.body.Usuario;  // TRAEMOS LOS NAME DE EL LOGIN PARA VALIDAR LOS CAMPOS
        const cla = await req.body.Password;

        console.log(usu+cla);
        
        cnn.query('SELECT * FROM usuarios WHERE nomusu=?',[usu],async(err,results)=>{  //CONSULTAMOS LOS DATOS EN LA BASE DE DATOS Y REEMPLAZAMOS VALORES CON LOS QUE DILIGENCIA EL USUARIO
            if(err){
                next(new Error("ERROR AL REALIZAR LA CONSULTA",err)); //VALIDAMOS SI EXITEN ERRORES
        
            }else if(results!=0 && await(bcryptjs.compare(cla,results[0].clave))){ // SI EL RESULTADO ES DIFERENTE DE 0 ES QUE ENCONTRO EL USUARIO,POR MEDIO DE UN ARREGLO Y COMPARE, COMPARAMOS LO DILIGENCIADO POR EL USUARIO Y LO REGISTRADO EN LA BD                           console.log("Datos Correctossssssss");




                
           Doc=results[0].doccli;
           nomusu=results[0].nomusu;

           Rol=results[0].rol;
           uss=results[0].nomusu;  //CREAMOS SESIONES POR MEDIO DE UN ARREGLO, QUE NOS RETORNA LOS DATOS DE EL USUARIO LOGEADO
           req.session.Login=true; //GENERAMOS LA SESION AL DARLE COMO TRUE EN VERDADERA.
           switch(Rol){
               case 'Administrador':
                                                          //PASAMOS A VALIDAR POR MEDIO DE UN SWITCH LOS DIFERENTES CASOS POR MEDIO DE LA VARIABLE ROL, QUE CONTIENE EL ARREGLO
                                                          res.render('Admi', {
                                                            alert: true,
                                                            alertTitle: "Conexión exitosa",
                                                            alertMessage: "¡BIENVENID@ ADMINISTRADOR@ !",
                                                            alertIcon:'success',
                                                            showConfirmButton: false,
                                                            timer: 1500,
                                                            ruta: 'Admi'  
                                                        });//N  //REDIRIGIMOS
            
                    break; //DESCANSA
                
            
      
                    case 'Cliente':  //VALIDAMOS IGUAL QUE ARRIBA 

         
                cnn.query('SELECT * FROM clientes WHERE doccli="'+Doc+'"',(err,results)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                    if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                        next(new Error(err));
                        console.log("ERROR EN LA CONSULTA");
                    }   
                    else{
                        nomcli=results[0].nomcli;
                        Doc=results[0].doccli;

                        console.log(nomcli);
                    
            
                    res.render('Cliente')
                
                    }
                })
             
               break;

               case 'Empleado':

                cnn.query('SELECT * FROM clientes WHERE doccli="'+Doc+'"',(err,results)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                    if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                        next(new Error(err));
                        console.log("ERROR EN LA CONSULTA");
                    }   
                    else{
                        nomem=results[0].nomcli;
                      
    
                        console.log(nomem);
                       
              
                       res.redirect('Empleado')
                   
                    }
                })
                 
                break;
           }


            }else if(results!=0 && await(bcryptjs.compare(cla,results[0].estado='Inactivo'))){
                res.render('Login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "SEÑOR USUARIO SU USUARIO SE ENCUENTRA INACTIVO",
                    alertIcon:'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: '/'    
                });

            }
         else {
                console.log("DATOS INCORRECTOS"); //SALIMOS DEL IF DE ENTRADA Y SWITCH A UN VALIDADOR SI LOS DATOS SON INCORRECTOS 
                res.render('Login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "VERIFIQUE SU USUARIO O CONTRASEÑA.",
                    alertIcon:'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: '/'    
                });//NOS REDIRIGE AL MISMO ARCHIVO
            }
        })
        
        
            }
            Controller.Clientes=(req,res,next)=>{ 
               //creamos una consulta de usuarios por medio de la funcion flecha
  
                cnn.query('SELECT * FROM clientes WHERE  doccli="'+Doc+'"',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                    if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                        next(new Error(err));
                        console.log("ERROR EN LA CONSULTA");
                    }   
                    else{
                       
                        console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
                        res.render('ActuCliente',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
                    }
                })
            
            }  



            Controller.ClientesActu=(req,res,next)=>{ 
                //creamos una consulta de usuarios por medio de la funcion flecha
   
                 cnn.query('SELECT * FROM usuarios   WHERE  doccli="'+Doc+'"',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                     if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                         next(new Error(err));
                         console.log("ERROR EN LA CONSULTA");
                     }   
                     else{
                        
                         console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
                         res.render('Usu',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
                     }
                 })
             
             }
             Controller.actualizarcla=async(req,res,next)=>{  
                const d=req.body.dd;
                const n=req.body.nn;
                const c=req.body.cc;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
            
                const password=await bcryptjs.hash(c,8);

                console.log(d+n+c)
                  
                cnn.query('UPDATE usuarios SET nomusu="'+n+'",clave="'+password+'" WHERE doccli="'+d+'"',async(err,resbd)=>{
                   
                    if(err){
                        next(new Error(err));
            
                    }else{
                    console.log(resbd)
                        res.redirect('/');
                    }
            
                     })
                
            
            }

            Controller.Ahorro=(req,res,next)=>{ 
                //creamos una consulta de usuarios por medio de la funcion flecha
   
                 cnn.query('SELECT * FROM cuentas WHERE  doccli="'+Doc+'" AND Cuenta="Ahorros"',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                     if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                         next(new Error(err));
                         console.log("ERROR EN LA CONSULTA");
                     }   
                     else{
                        
                         console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
                         res.render('Ahorro',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
                     }
                 })
             
             }

            

            Controller.Cliente3=(req,res,next)=>{
                cnn.query('SELECT * FROM creditos   WHERE  doccli="'+Doc+'"',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                    if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                        next(new Error(err));
                        console.log("ERROR EN LA CONSULTA");
                    }   
                    else{
                       
                        console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
                        res.render('Tblineas',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
                        cod=resbd[0].codlinea;
                        console.log(cod)
                    }
                })
            

            }

            Controller.Empleado4=(req,res,next)=>{
                cnn.query('SELECT l.codlinea, l.nomlinea, l.montomaxicredito, l.plazomaxcred FROM creditos cr, lineas l WHERE cr.doccli="'+Doc+'" AND l.codlinea=cr.codlinea;',(err,resbd)=>{  //cnn que contiene la conexion a base de datos nos genera la consulta con un err que seria error o un resbd que seria una respuesta 
                    if(err){ //VALIDAMOS EL VALOR RECIBIDO SEA ERROR O NO
                        next(new Error(err));
                        console.log("ERROR EN LA CONSULTA");
                    }   
                    else{
                       
                        console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
                        res.render('Creditos',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS

                    }
                })
            

            }

            
Controller.Generarli=(req,res,next) => {
                  //ACA SOMOS REDIRIGIDOS A LA VISTA QUE LE CORRECPONDE AL USUARIO LOGEADO POR LAS VARIABLES
                res.render('GenerarCre');
 }

 Controller.insertarli=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
    const d=req.body.linea;
    const n=req.body.nom;
    const a=req.body.monto;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
    const c=req.body.Plazo;
  
cnn.query('INSERT INTO lineas SET?',{codlinea:d,nomlinea:n,montomaxicredito:a,plazomaxcred:c},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
    if(err){    
        next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
    }
    else{
        console.log(resbd);
    res.render('GenerarCre')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
    }
    });
     }



     Controller.insertarEnviar=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const d=req.body.doccli;
        const a=req.body.Monto;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
        const c=req.body.Cuenta;
        console.log(a);
        cnn.query('UPDATE cuentas SET saldo= saldo -"'+a+'" WHERE doccli="'+Doc+'" AND Cuenta="Ahorros"',async(err,respbb)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){    
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
        }
        else{
            console.log(respbb);
            res.render('enviar',{Datos:respbb}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
        });
        cnn.query('UPDATE cuentas SET saldo= saldo +"'+a+'" WHERE doccli="'+d+'" AND Cuenta="'+c+'"',async(err,respbb)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
            if(err){    
                next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
            }
            else{
                console.log(respbb);
                res.render('enviar',{Datos:respbb}); //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
            }
            });
         }


     Controller.insertarA=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const d=req.body.Codigo;
        const n=req.body.Doc;
        const a=req.body.Cuenta;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
        const c=req.body.Saldo;
      
    cnn.query('INSERT INTO cuentas  SET?',{codcuenta:d,doccli:n,Cuenta:a,saldo:c},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){    
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
        }
        else{
            console.log(resbd);
        res.render('CuentaA')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
        });
         }

         Controller.Reti=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
            const a=req.body.Monto;
            const c=req.body.Cuenta;

            
          
            cnn.query('UPDATE cuentas SET saldo= saldo -"'+a+'" WHERE doccli="'+Doc+'" AND Cuenta="'+c+'"',async(err,resbd)=>{// CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
            if(err){    
                next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
            }
            else{
                console.log(resbd);
            res.render('Retirar')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
            }
            });
             }

             Controller.Consig=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
                const a=req.body.Monto;
                const c=req.body.Cuenta;
    
                
              
                cnn.query('UPDATE cuentas SET saldo= saldo + "'+a+'" WHERE doccli="'+Doc+'" AND Cuenta="'+c+'"',async(err,resbd)=>{// CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
                if(err){    
                    next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
                }
                else{
                    console.log(resbd);
                res.render('Consignar')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
                }
                });
                 }

     Controller.insertarCre=async(req,res,next)=>{  // CREACION PARA INSERTAR USUARIOS FUNCION FLECHA
        const d=req.body.credito;
        const n=req.body.doc;
        const a=req.body.monto;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
        const h=req.body.codi;
        const c=req.body.Fecha;
        const o=req.body.Plazo;
      
    cnn.query('INSERT INTO Creditos SET?',{codcredito:d,doccli:n,montoprestado:a,codlinea:h,fechaabroba:c,plazo:o},(err,resbd)=>{ // CNN CNEXION A BD Y SU RESPECTIVO CODIGO DE INSERT CON LOS VALORES DE CONST
        if(err){    
            next(new Error(err));  //NOS MUESTRA EL ERROR POR MEDIO DEL IF
        }
        else{
            console.log(resbd);
        res.render('GenerarCredi')   //SI TODO SALE BIEN, NOS RETORNA A LA MISMA VISTA QUE ESTAMOS
        }
        });
         }

     Controller.Generarcre=(req,res,next) => {
         //ACA SOMOS REDIRIGIDOS A LA VISTA QUE LE CORRECPONDE AL USUARIO LOGEADO POR LAS VARIABLES
        res.render('GenerarCredi');
    }


Controller.Cliente=(req,res,next) => {
    console.log("en la vista del usuario");  //ACA SOMOS REDIRIGIDOS A LA VISTA QUE LE CORRECPONDE AL USUARIO LOGEADO POR LAS VARIABLES
    res.render('Admi');
}


Controller.Actualizar=async(req,res,next)=>{  
    const d=req.body.dd;
    const u=req.body.uu;
    const c=req.body.cc;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
    const r=req.body.rr;
    const e=req.body.ee;
    const i=req.body.ii;
    const password=await bcryptjs.hash(c,8);
      
    cnn.query('UPDATE usuarios SET nomusu="'+u+'",clave="'+password+'",rol="'+r+'",estado="'+e+'",imagen="'+i+'" WHERE doccli="'+d+'"',async(err,respbb)=>{
       
        if(err){
            next(new Error(err));

        }else{
            console.log("Actualizado")
            res.redirect('TbUsu');
        }

         })
    

}
Controller.Borrar=async(req,res,next)=>{  
    const d=req.body.dd;

      
    cnn.query('DELETE  FROM usuarios WHERE doccli="'+d+'"',async(err,results)=>{
       
        if(err){
            next(new Error(err));

        }else{
            console.log("Borrado")
            res.redirect('TbUsu');
        }

         });
    

}

Controller.Cerrar=(req,res,next)=>{
req.session.destroy(()=>{
 
    res.redirect('/');

})

}


Controller.ActualizarCli=async(req,res,next)=>{  
    const d=req.body.dd;
    const c=req.body.cc;
    const a=req.body.aa;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
    const co=req.body.co;
    const ce=req.body.ce;
    const s=req.body.se;
    const f=req.body.ff;
      
    cnn.query('UPDATE clientes SET nomcli="'+c+'",aplicli="'+a+'",correocli="'+co+'",celular="'+ce+'",sexo="'+s+'",fechanaccli="'+f+'" WHERE doccli="'+d+'"',async(err,respbb)=>{
       
        if(err){
            next(new Error(err));

        }else{
            console.log("Actualizado")
            res.redirect('TbCliente');
        }

         })
    

}


Controller.Actualizar3=async(req,res,next)=>{  
    const d=req.body.dd;
    const c=req.body.cc;
    const a=req.body.aa;     //POR MEDIO DEL CONST ALMACENAMOS EN LETRAS LOS VALORES DE LA PAGINA A INSERTAR,GRACIAS ESTO A LA RUTAS
    const co=req.body.co;
    const ce=req.body.ce;
    const s=req.body.se;

      console.log(c);
    cnn.query('UPDATE clientes SET nomcli="'+c+'",aplicli="'+a+'",correocli="'+co+'",celular="'+ce+'",sexo="'+s+'" WHERE doccli="'+d+'"',async(err,respbb)=>{
       
        if(err){
            next(new Error(err));

        }else{
            console.log("Actualizado")
            res.redirect('ActuCliente');
        }

         })
    

}

Controller.BorrarCli=async(req,res,next)=>{  
    const d=req.body.dd;

      
    cnn.query('DELETE  FROM clientes WHERE doccli="'+d+'"',async(err,results)=>{
       
        if(err){
            next(new Error(err));
            res.send("No se puede procesar la solicitud ya que el cliente cuenta con un credito, eliminelo y seguido a esto elimine el cliente")

        }else{
            console.log("Borrado")
            res.redirect('TbCliente');
        }

         });
    

}

Controller.Lineas=(req,res,next)=>{ 
  const {doccli} = req.params;
  

    cnn.query('SELECT l.codlinea, l.nomlinea, l.montomaxicredito, l.plazomaxcred FROM creditos cr, lineas l WHERE  l.codlinea=cr.codlinea AND cr.doccli= ?',[doccli],(err,resbd)=>{  
        if(err){ 
            next(new Error(err));
            console.log("ERROR EN LA CONSULTA");
        }   
        else{
            console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
            res.render('lineascli',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
        }
    })


}

Controller.credito=(req,res,next)=>{ 
    const {doccli} = req.params;
  
      cnn.query('SELECT * FROM creditos where doccli= ?',[doccli],(err,resbd)=>{  
          if(err){ 
              next(new Error(err));
              console.log("ERROR EN LA CONSULTA");
          }   
          else{
              console.log(resbd) // EN CASO QUE RETORNE RESPUESTA LA VARIABLE DATOS, CONTENDRA LO QUE NOS TRAE DE DESPUESTA
              res.render('creditocli',{Datos:resbd});  //NOS RENDERISA A LA VISTA DONDE LLEVAREMOS LOS DATOS
          }
      })
  
  
  }

Controller.GenerarA=(req,res,next) => {
    //ACA SOMOS REDIRIGIDOS A LA VISTA QUE LE CORRECPONDE AL USUARIO LOGEADO POR LAS VARIABLES
  res.render('CuentaA');
}



Controller.Enviar=(req,res,next)=>{
    if(req.session.Login){
        res.render('Enviar');
    }else{
        res.redirect('/');  
    }
 }
 Controller.Retirar=(req,res,next)=>{
    if(req.session.Login){
        res.render('Retirar');
    }else{
        res.redirect('/');  
    }
 }

 Controller.Consignar=(req,res,next)=>{
    if(req.session.Login){
        res.render('Consignar');
    }else{
        res.redirect('/');  
    }
 }

Controller.Empleado=(req,res,next)=>{
    if(req.session.Login){
        res.render('TbCliente');
    }else{
        res.redirect('/');  
    }

}
Controller.Empleado2=(req,res,next)=>{
    if(req.session.Login){
        res.render('Empleado');
    }else{
        res.redirect('/');  
    }

}


Controller.Empleadoo=(req,res,next)=>{
    if(req.session.Login){
        res.render('lineascli');
    }else{
        res.redirect('/');  
    }

}





Controller.Cliente2=(req,res,next)=>{
    if(req.session.Login){
        res.render('Usu');
    }else{
        res.redirect('/');  
    }

}


Controller.Cliente5=(req,res,next)=>{
    if(req.session.Login){
        res.render('Cliente');
    }else{
        res.redirect('/');  
    }

}
module.exports=Controller;