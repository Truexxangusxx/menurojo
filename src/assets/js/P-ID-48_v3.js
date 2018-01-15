var claroBarIsOpen = false;
var claroBarIsIni = true; // FRANZ PORTOCARRERO / IBM-PERU / 08.03.2017 
var claroBarLastMode = claroBarCurrentMode();
var MOBILE_WIDTH = 1200;

var CURRENT_WINDOW = {
    width: null,
    height: null
};

function claroBarSelectItemDesktop(ruta) {

}

function claroBarIsMobile() {
    return window.innerWidth <= MOBILE_WIDTH;
}

function claroBarCurrentMode() {
    return claroBarIsMobile() ? "mobile" : "desktop";
}

function claroBarBindCollapse(id) {
    var collapseComponent = $('.claro-header #collapse' + id);

    collapseComponent.on('shown.bs.collapse', function() {
        $(".claro-header .fa" + id).removeClass("fa-plus-circle").addClass("fa-minus-circle");
    });
    $('.claro-header #collapse' + id).on('hidden.bs.collapse', function() {
        $(".claro-header .fa" + id).removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
}

function claroBarVerifyAvailability() {

    if (claroBarIsMobile()) {
        // FRANZ PORTOCARRERO / IBM-PERU / 08.03.2017 
        if (claroBarIsIni) {
            $('.claro-header #bs-menu-navbar-collapse').removeClass('in');
        } else {
            if (!claroBarIsOpen) {
                $('.claro-header #bs-menu-navbar-collapse').removeClass('in');
            } else {
                $('.claro-header #bs-menu-navbar-collapse').addClass('in');
                $('#bs-menu-navbar-collapse > .nav > .dropdown').removeClass('open');

            }
        }
        // FRANZ PORTOCARRERO / IBM-PERU / 08.03.2017 

    } else {

        if (!claroBarIsOpen) {
            $('.claro-header #bs-menu-navbar-collapse').addClass('in');
        }
    }
    return false;
}

function changeNavIcon() {
    var navIcon = document.getElementsByClassName("nav-toggle")[0];
    navIcon.classList.toggle("active");
    if ($(".nav-toggle").hasClass("active")) {
        $("#claro-bar-logo").addClass("disabled");
        $(".search-icon").addClass("disabled");
    } else {
        $("#claro-bar-logo").removeClass("disabled");
        $(".search-icon").removeClass("disabled");
    }
}


function changeSearchIcon() {
    var searchIcon = document.getElementsByClassName("search-icon")[0];
    searchIcon.classList.toggle("activesearch");
    if ($(".search-icon").hasClass("activesearch")) {
        $("#claro-bar-logo").addClass("disabled");
        $(".nav-toggle").addClass("disabled");
    } else {
        $("#claro-bar-logo").removeClass("disabled");
        $(".nav-toggle").removeClass("disabled");
    }
}

$(document).ready(function() {

	/* JS DESCARGA */
	/*
	var b_cerro_descarga = localStorage.getItem("b_cerro_descarga");
	if(!b_cerro_descarga){
		localStorage.setItem("b_cerro_descarga", 1);
	}

	b_cerro_descarga = localStorage.getItem("b_cerro_descarga");
	console.log('b_cerro_descarga value: ' + b_cerro_descarga);
	
	if(b_cerro_descarga == 0){
		$("#claro_app_id").hide();
	}else{
		$("#claro_app_id").show();
	}
	
	$("#claro_app_id > .descarga-close > i").click(function(){
		localStorage.setItem("b_cerro_descarga", 0);
		$("#claro_app_id").slideUp();
	});
	*/
	/* end JS DESCARGA */

    CURRENT_WINDOW.width = $(window).width();
    CURRENT_WINDOW.height = $(window).height();
    CURRENT_WINDOW.initialBarTopPosition = $('#claro-bar-navbar').position().top;
    /**
     * Box shadow handler
     **/
    if (window.CURRENT_BREADCRUMB != null || $("#claro-breadcrumb").length == 1) {
        $(".claro-menu .rojo_principal").css("box-shadow", "none")
    }
    /**
     * Main Window Scrolling Handler
     **/
    $(window).bind('scroll', function() {
        if (claroBarIsMobile() || window.CURRENT_BREADCRUMB) return;
        if ($(window).scrollTop() >= CURRENT_WINDOW.initialBarTopPosition) {
            if ($("#claro-bar-navbar").hasClass("navbar-fixed-top")) return;
            // Navbar setting
            $('#claro-bar-navbar ').addClass('navbar-fixed-top')
            $('body').css({
                'margin-top': $('#claro-bar-navbar').height() + 'px'
            });
            if ($('#claro-bar-navbar ').parent('div').hasClass('container')) {
                $('#claro-bar-navbar ').children('div').addClass('container').removeClass('container-fluid');
            } else if ($('#claro-bar-navbar ').parent('div').hasClass('container-fluid')) {
                $('#claro-bar-navbar ').children('div').addClass('container-fluid').removeClass('container');
            }
            // Breadcrumb setting
            if (window.CURRENT_BREADCRUMB) {
                $("." + window.CURRENT_BREADCRUMB.class).addClass(window.CURRENT_BREADCRUMB.styles.onActive.join(" "));
                $(".id44").parents("." + window.CURRENT_BREADCRUMB.parentClass).next().css("marginTop", window.CURRENT_BREADCRUMB.marginToApplyOnSibling.onActive);
            }
        } else {
            $('#claro-bar-navbar').removeClass('navbar-fixed-top');
            $('#claro-bar-navbar').children('div').addClass('container-fluid').removeClass('');
            $('body').css({
                'margin-top': ''
            });
            if (window.CURRENT_BREADCRUMB) {
                $("." + window.CURRENT_BREADCRUMB.class).removeClass(window.CURRENT_BREADCRUMB.styles.onActive.join(" "));
                $(".id44").parents("." + window.CURRENT_BREADCRUMB.parentClass).next().css("marginTop", window.CURRENT_BREADCRUMB.marginToApplyOnSibling.onNormal);
            }
        }
    });
    // dropdown menu responsive
    if (!claroBarIsMobile()) {
        // display secondary navbar elements
        $('.claro-header #bs-menu-navbar-collapse').addClass('in');
    }
    $('.claro-header #bs-menu-navbar-collapse').on('show.bs.collapse', function(e) {
        $('#bs-search-navbar-collapse').collapse("hide");
    });
    $('.claro-header #bs-search-navbar-collapse').on('show.bs.collapse', function(e) {
        $('#bs-menu-navbar-collapse').collapse("hide");
    });
    $(window).resize(function(e) {
        if ($(window).width() != CURRENT_WINDOW.width) {
            CURRENT_WINDOW.width = $(window).width();
            claroBarVerifyAvailability();
        }
    });
    $('div[id^="collapse"]').on('show.bs.collapse', function(e) {
        $(".fa" + e.target.id.split("collapse")[1]).removeClass("fa-plus-circle").addClass("fa-minus-circle");
        // "uncollapse" every collapsed element on the menu
        $("#" + e.target.id).parents("#bs-menu-navbar-collapse").find(".collapse.in").each(function() {
            if ($(this).attr("id") == e.target.id) return;
            $(this).collapse("hide");
        });
    });
    $('div[id^="collapse"]').on('hide.bs.collapse', function(e) {
        $(".fa" + e.target.id.split("collapse")[1]).removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
    $('#bs-menu-navbar-collapse').on('show.bs.collapse', function(e) {
        if (e.target.id == "bs-menu-navbar-collapse") {
            claroBarIsOpen = true;
            claroBarIsIni = false; // FRANZ PORTOCARRERO / IBM-PERU / 08.03.2017
            $('#bs-search-navbar-collapse').collapse("hide");
            changeNavIcon();
        }
    });
    $('#bs-menu-navbar-collapse').on('hide.bs.collapse', function(e) {
        if (e.target.id == "bs-menu-navbar-collapse") {
            claroBarIsOpen = false;
            claroBarIsIni = false; // FRANZ PORTOCARRERO / IBM-PERU / 08.03.2017
            changeNavIcon();
        }
    });
    $('#bs-search-navbar-collapse').on('show.bs.collapse', function(e) {
        $('#bs-menu-navbar-collapse').collapse("hide");
        claroBarIsOpen = true;
        claroBarIsIni = false; // FRANZ PORTOCARRERO / IBM-PERU / 08.03.2017
        changeSearchIcon();
    });
    $('#bs-search-navbar-collapse').on('hide.bs.collapse', function(e) {
        claroBarIsOpen = false;
        claroBarIsIni = false; // FRANZ PORTOCARRERO / IBM-PERU / 08.03.2017
        changeSearchIcon();
    });
});

/*
 ** IMPORTANT: DO NOT REMOVE THIS
 ** OID: ab5a8260-d55b-4c92-9f88-7e86d7bb5647
 ** Publish date: Aug 9, 2016, 5:45:32 PM EDT
 ** Last modified: Jan 4, 2018, 10:37:23 AM EST
 */
