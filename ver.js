$(document).ready(function(){

    $('.botons').on('click',function(){

    let btn=$('.botons').index(this);
    let doc=$('.tipo').eq(btn);
   
    let d=doc.val();



    $.ajax({
        type:"POST",
        url:'/ver',
        data:{
            dd:d
        }
    });

    });
});