$(document).ready(function(){

    $('.action_btn').on('click',function(){

    let btn=$('.action_btn').index(this);
    let doc=$('.doc').eq(btn);
    let nom=$('.usu').eq(btn);
    let cla=$('.cla').eq(btn);
 


    let d=doc.val();
    let n=nom.val();
    let c=cla.val();


alert("DATOS RECIBIDOS CORRECTAMENTE")

    $.ajax({
        type:"POST",
        url:'/actualizarcla',
        data:{
            dd:d,cc:c,nn:n
        }
    });

    });
});