/*
** IMPORTANT: DO NOT REMOVE THIS.
** SUMMARY: This Javascript code by WCM Content, will be used to load custom functions to all Portal pages.
*/

////////////////////////////////////////////////////////////////////////////
///////////////////////////// pure Javascript //////////////////////////////
////////////////////////////////////////////////////////////////////////////

/* Labels */
var window_title_default = document.title; //- Title by default
var window_title_onblur = '¡Aquí estaremos!'; //- Title for Browser's window, on 'onblur' Event.
var window_title_onfocus = 'Claro'; //- Title for Browser's window, on 'onfocus' Event (when window is active).
var ubicacion2 = '';
/* Controls */
var enable_title_change = true; //- Flag for On/Off title change function.
var use_title_default = false; //- Flag to determine title on 'onfocus' Event; always must use the "window_title_default" var if value is TRUE.

/**************************************************************************************************************
** Temporally: Override normalize function -> Remove when theme is ready
**************************************************************************************************************/
var normalize = (function() {
	  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
	      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
	      mapping = {};
	 
	  for(var i = 0, j = from.length; i < j; i++ )
	      mapping[ from.charAt( i ) ] = to.charAt( i );
	 
	  return function( str ) {
	      var ret = [];
	      for( var i = 0, j = str.length; i < j; i++ ) {
	          var c = str.charAt( i );
	          if( mapping.hasOwnProperty( str.charAt( i ) ) )
	              ret.push( mapping[ c ] );
	          else
	              ret.push( c );
	      }      
	      return ret.join( '' );
	  }
})();
/*************************************************************************************************************/

///////////////////////////////////////////////////////////////////////
////////////////////////////// by jQuery //////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
** executes during parsing
*/
$(function(){
});

/*
** document.ready (jQuery Event): executes when HTML-Document is loaded and DOM is ready
*/
$(document).ready(function() {
// $(".dropdown > ul > div > div > div > div > .borde-derecho > a > p > i").hide();
$("#claro-bar-navbar .dropdown-iconos i").hide();
	ubicacion2  = window.location.pathname.replace("/", "").replace("/", "").replace("/", "");
});

/*
** window.onload: executes when complete page is fully loaded, including all frames, objects and images
*/
$(window).load(function() {

	if (enable_title_change) {
		window.onblur = function() {
			if(ubicacion2 == "personas" || ubicacion2  == "negocios"  || ubicacion2 == "corporaciones"  ){
				document.title = window_title_onblur;
			  //    document.title = window_title_default
			}
			
		}
		window.onfocus = function() {
			if(ubicacion2 == "personas" || ubicacion2 == "negocios"  || ubicacion2 == "corporaciones"  ){
				if (use_title_default) {
					//document.title = window_title_default;
					 document.title = window_title_default
				} else {
				   document.title = window_title_default;
				}
			}
			
		}
	}
});

/*
** IMPORTANT: DO NOT REMOVE THIS.
** OID: b932a359-950d-410f-a235-950837faeab3
** Publish date: Feb 10, 2017, 5:32:30 PM EST
** Last modified: May 12, 2017, 7:46:28 PM EDT
*/