$(document).ready(function () {
    $("a.desplegar").click(function (e) {
        e.preventDefault();
        $(this).find("i").toggle();
        $(this).find("i").toggleClass("active");
        $(".contenido-menu").removeClass('left');
        $(".segundo-menu").removeClass('left');
        $(".segundo-menu").removeClass('outleft');
        $(".contenido-menu").removeClass('right');
        $(".segundo-menu").removeClass('right');
        $(".tercer-menu").removeClass('right');
        $(".tercer-menu").removeClass('left');
        $(".segundo-menu").removeClass('inright');

        if ($(".contenido-menu").hasClass('on') || $(".contenido-menu").hasClass('off')) {
            $(".contenido-menu").toggleClass('on');
            $(".contenido-menu").toggleClass('off');
            $(".bloque-opacity").toggleClass('on-opacity');
            if ($(".id135.slick-initialized").length > 0) {
                if ($(".bloque-opacity").hasClass('on-opacity')) {
                    $(".id135.slick-initialized").slick('pause');
                }
                else {
                    $(".id135.slick-initialized").slick('play');
                }
            }
        }
        else {
            $(".contenido-menu").addClass('on');
            $(".bloque-opacity").addClass('on-opacity');
            if ($(".id135.slick-initialized").length > 0) {
                $(".id135.slick-initialized").slick('pause');
            }
        }
    });

    $(".ir-izquierda").click(function (e) {
        e.preventDefault();
        $(".contenido-menu").addClass('left');
        $(".segundo-menu." + $(this).attr("menu")).addClass('left');
        $(".contenido-menu").removeClass('right');
        $(".segundo-menu").removeClass('right');
    });

    $(".regresar-derecha").click(function (e) {
        e.preventDefault();
        $(".segundo-menu").removeClass('inright');
        $(".contenido-menu").removeClass('left');
        $(".segundo-menu").removeClass('left');
        $(".contenido-menu").addClass('right');
        $(this).parent().addClass('right');
    });

    $(".ir-tercero").click(function (e) {
        e.preventDefault();
        $(".segundo-menu").removeClass('inright');
        $(".segundo-menu").addClass('outleft');
        $(".tercer-menu." + $(this).attr("menu")).removeClass('right');
        $(".tercer-menu." + $(this).attr("menu")).addClass('left');
    });

    $(".regresar-tercero").click(function (e) {
        e.preventDefault();
        $(".segundo-menu").removeClass('outleft');
        $(this).parent().removeClass('left');
        $(".segundo-menu." + $(this).attr("menu")).addClass('inright');
        $(this).parent().addClass('right');
    });

})