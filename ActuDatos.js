$(document).ready(function(){

    $('.action_btn').on('click',function(){

    let btn=$('.action_btn').index(this);
    let doc=$('.doc').eq(btn);
    let nom=$('.nom').eq(btn);
    let ape=$('.ape').eq(btn);
    let correo=$('.co').eq(btn);
    let celular=$('.ce').eq(btn);
    let sexo=$('.se').eq(btn);


    let d=doc.val();
    let c=nom.val();
    let a=ape.val();
    let co=correo.val();
    let ce=celular.val();
    let s=sexo.val();
alert("DATOS RECIBIDOS CORRECTAMENTE")

    $.ajax({
        type:"POST",
        url:'/actualizar3',
        data:{
            dd:d,cc:c,aa:a,co:co,ce:ce,se:s
        }
    });

    });
});