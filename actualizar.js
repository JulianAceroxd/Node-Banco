$(document).ready(function(){

    $('.action_btn').on('click',function(){

    let btn=$('.action_btn').index(this);
    let doc=$('.doc').eq(btn);
    let usu=$('.usu').eq(btn);
    let cla=$('.cla').eq(btn);
    let rol=$('.rol').eq(btn);
    let estado=$('.estado').eq(btn);
    let img=$('.img').eq(btn);

    let d=doc.val();
    let u=usu.val();
    let c=cla.val();
    let r=rol.val();
    let e=estado.val();
    let i=img.val();

    alert("RECIBIENDO DATOS CORRECTAMENTE");
    $.ajax({
        type:"POST",
        url:'/actualizar',
        data:{
            dd:d,uu:u,cc:c,rr:r,ee:e,ii:i 
        }
    });

    });
});