$(document).ready(function () {
    $("a.desplegar").click(function (e) {
        e.preventDefault();
        $(this).find("i").toggle();
        $(this).find("i").toggleClass("active");
        $(".contenido-menu").removeClass('left');
        $(".segundo-menu").removeClass('left');
        $(".contenido-menu").removeClass('right');
        $(".segundo-menu").removeClass('right');
        
        if ($(".contenido-menu").hasClass('on') || $(".contenido-menu").hasClass('off')) {
            $(".contenido-menu").toggleClass('on');
            $(".contenido-menu").toggleClass('off');
            $(".bloque-opacity").toggleClass('on-opacity');
            
        }
        else {
            $(".contenido-menu").addClass('on');
            $(".bloque-opacity").addClass('on-opacity');
        }
    });

    $(".ir-izquierda").click(function(e){
        $(".contenido-menu").addClass('left');
        $(".segundo-menu."+$(this).attr("menu")).addClass('left');
        $(".contenido-menu").removeClass('right');
        $(".segundo-menu").removeClass('right');
    });
    
    $(".regresar-derecha").click(function(e){
        $(".contenido-menu").removeClass('left');
        $(".segundo-menu").removeClass('left');
        $(".contenido-menu").addClass('right');
        $(this).parent().addClass('right');
    });


})