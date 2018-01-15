function gtm_push(o) {
	var obj = $(o);
	var dataPush = obj.attr('data-push');
	var gtm_arrayPush;
	if (dataPush != '' && dataPush != undefined) {
		gtm_arrayPush = dataPush.split("|");
		if (gtm_arrayPush.length == 4 && gtm_arrayPush[0] != '' && gtm_arrayPush[0] != undefined && gtm_arrayPush[1] != '' && gtm_arrayPush[1] != undefined && gtm_arrayPush[2] != '' && gtm_arrayPush[2] != undefined && gtm_arrayPush[3] != '' && gtm_arrayPush[3] != undefined) {
			if (gtm_arrayPush[1] == '--') {
				gtm_arrayPush[1] = gtm_getBreadcrumb();
				if ($("div[name='claro-layout-tabs']").has(o).length) {
					$(".tab-pane.active").each(function (index) {
						if ($(this).has(o).length) {
							gtm_arrayPush[1] += ' - Tab ' + $("div[name='claro-layout-tabs'] > ul.nav-tabs > li > a[href='#" + $(this).attr('id') + "']:first-child").text();
						}
					});
				}
			}
			if (typeof dataLayer !== 'undefined' && $.isFunction(dataLayer.push)) {
				//console.log("gtm_push ::: dataLayer.push({'event':'"+gtm_arrayPush[0]+"','category':'"+gtm_arrayPush[1]+"','action':'"+gtm_arrayPush[2]+"','label':'"+$.trim(gtm_arrayPush[3].replace(/^-BB-[0-9]{1,2}-/,""))+"'})");
				dataLayer.push({
					'event': "'" + gtm_arrayPush[0] + "'",
					'category': "'" + gtm_arrayPush[1] + "'",
					'action': "'" + gtm_arrayPush[2] + "'",
					'label': "'" + $.trim(gtm_arrayPush[3].replace(/^-BB-[0-9]{1,2}-/, "")) + "'"
				});
			} else {
				//console.log('gtm_push ::: dataLayer object is undefined');
			}
		} else {
			//console.log('gtm_push ::: Data invalid to push');
		}
	} else {
		//console.log('gtm_push ::: No data provided to push');
	}
	return false;
}

function gtm_getBreadcrumb() {
	var breadcrumb = "",
		crumbTrailItems = [],
		crumbTrailIndexItemsMax = 3,
		crumbTrailIndexItems = 0;
	crumbTrailSeparator = "";
	$(".wpthemeCrumbTrail").children().each(function (index) {
		if ($(this).is("a") || $(this).is("strong")) {
			crumbTrailItems[crumbTrailIndexItems] = $.trim($(this).text());
			crumbTrailIndexItems++;
		}
	});
	crumbTrailIndexItems = 0;
	if (crumbTrailItems.length > 0) {
		for (var i = (crumbTrailItems.length - 1); i >= 0; i--) {
			crumbTrailSeparator = (crumbTrailIndexItems == 0) ? "" : "/";
			breadcrumb = (crumbTrailItems[i] + crumbTrailSeparator) + breadcrumb;
			crumbTrailIndexItems++;
			if (crumbTrailIndexItems == crumbTrailIndexItemsMax) {
				break;
			}
		}
		breadcrumb = "/" + breadcrumb;
	} else {
		//console.log('gtm_getBreadcrumb ::: wpthemeCrumbTrail not found in page! ... set default value');
		breadcrumb = "/" + document.title;
	}
	return breadcrumb;
}

var normalize = (function () {
	var from = "����������������������������������������������",
		to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
		mapping = {};

	for (var i = 0, j = from.length; i < j; i++)
		mapping[from.charAt(i)] = to.charAt(i);

	return function (str) {
		var ret = [];
		for (var i = 0, j = str.length; i < j; i++) {
			var c = str.charAt(i);
			if (mapping.hasOwnProperty(str.charAt(i)))
				ret.push(mapping[c]);
			else
				ret.push(c);
		}
		return ret.join('');
	}
})();

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function setTabsNames() {
	if ($("div.claro-layout ul.nav-tabs").length > 0) {
		$("div.claro-layout #contenedorTAB ul.nav-tabs li a").each(function (index) {
			$(this).empty().html(tabsDefaultNames[index]);
			var ancho = $(this).parent().width();
			if (ancho < 189) {
				$(this).parent().width(189);
			}
		});
		$("#myTabDrop1").html('<div class="texto">' + $("div.claro-layout ul.nav-tabs li a:first-child").html() + '</div><div class="icono"><i class="fa fa-chevron-down fa-caret-down"></i></div>');
		if ($('[name="claro-layout-tabs"]').length) {
			$("#myTabDrop1 .icono").after('<br style="clear: left;" />');
		}
		$(".idtab .dropdown-menu li a").each(function (index) {
			$(this).empty().html(tabsDefaultNames[index]);
		});
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			e.preventDefault();
			e.target; // newly activated tab
			e.relatedTarget; // previous active tab
			$('a#myTabDrop1 > div.texto').empty().html($(this).html());
			var urlBrowser = window.location.href,
				urlSeparator = "?tab=";
			urlBrowser = urlBrowser.split(urlSeparator);
			if (typeof window.history.pushState === "function") { //- Supported by IE10 and later
				window.history.pushState(window.location.href, "Title", urlBrowser[0] + urlSeparator + normalize($(this).html().toLowerCase().trim().replace(/\s+/g, ''))); //- based on HTML5
			}
		});
	}
	return false;
}

function verifyTabSelectorByURL() {
	// verify if tabs exists in page
	if ($("div.claro-layout ul.nav-tabs").length > 0) {
		var tabSelected = parseInt(getUrlVars()["tab"]);
		// verify if url is valid to control
		if (tabSelected != '' && tabSelected != undefined && (1 < tabSelected && tabSelected <= 10)) {
			$("a[href='#claro-layout-tab" + tabSelected + "']").click();
			$("a[href='#claro-layout-tab" + tabSelected + "']").parent().addClass('active');
		} else {
			var nameTabSelected = decodeURI(String($.trim(getUrlVars()["tab"])));
			if (nameTabSelected != '' && nameTabSelected != undefined) {
				for (i = 0; i < tabsDefaultNames.length; i++) {
					if (nameTabSelected == normalize(tabsDefaultNames[i].toLowerCase().trim().replace(/\s+/g, ''))) {
						$("a[href='#claro-layout-tab" + (i + 1) + "']").click();
						$("a[href='#claro-layout-tab" + (i + 1) + "']").parent().addClass('active');
						break;
					}
				}
			}
		}
	}
	return false;
}

function verifyOptionSelectorByURL() {
	var optionSelected = String($.trim(getUrlVars()["option"]));
	// verify if url is valid to control
	if (optionSelected != '' && optionSelected != undefined) {
		// verify if option exists
		if ($("div.select-id2 > select option[value='" + decodeURI(optionSelected) + "']").length > 0) {
			$("div.select-id2 > select").val(decodeURI(optionSelected)).change();
		}
	}
	return false;
}

var widthOfList = function () {
	var itemsWidth = 0;
	$('#tabs>li').each(function () {
		var itemWidth = $(this).outerWidth();
		itemsWidth += itemWidth;
	});
	return itemsWidth;
}

var autocollapse = function () {
	var tabs = $('#tabs');
	var windowsize = $(window).width();
	var tabSize = widthOfList();
	if (windowsize >= 768) {
		$('#leftArr').hide();
		if ((tabs.outerWidth()) >= tabSize) {
			$('#rightArr').hide();
			$("#contenedorTAB").removeClass("contenedorInitial");
			$("#contenedorTAB").addClass("contenedorRezise");
			$("#tabs").addClass("tabsResize");
		} else {
			if (Math.abs(workingSize) <= contenedorTAB) {
				$('#rightArr').show();
			}
		}
	}
};

var autosize = function () {
	resizeDropDown();
	setSizeContainer();
	autocollapse();
	manageResizeTabs();
};

var manageResizeTabs = function () {
	var newLeft = 0;
	for (i = 0; i < tabsMoved.length; i++) {
		tabsMoved[i] = elementsTabs[i];
		workingSize -= elementsTabs[i];
		newLeft += elementsTabs[i];
	}
	if (tabsMoved.length > 0) {
		if ((contenedorTAB - workingSize) > 189) {
			var indice = tabsMoved.length - 1;
			newLeft -= tabsMoved[indice];
			workingSize -= tabsMoved[indice];
			tabsMoved.splice(indice);
		}
		$("#tabs").css("left", (newLeft * -1));
		$('#leftArr').show();
	}
	var diferencia = 0;
	if (Math.abs(workingSize) <= contenedorTAB) {
		$('#rightArr').hide();
	}
};

var resizeDropDown = function () {
	var intlen = 0;
	$("#myTabDrop1-contents").css("position", "absolute");
	$("#myTabDrop1-contents").css("left", "-1000px");
	$("#myTabDrop1-contents").css("display", "block");
	$("#myTabDrop1-contents>li").each(function () {
		$(this).addClass("mostrarInline");
		var ltmp = $(this).width();
		if (ltmp > intlen) {
			intlen = ltmp;
		}
		$(this).removeClass("mostrarInline");
	});
	$(".tab-mobile").css("width", (intlen + 10) + "px");
	$("#myTabDrop1-contents").css("display", "");
	$("#myTabDrop1-contents").css("position", "");
	$("#myTabDrop1-contents").css("left", "");
	return intlen;
};

var contenedorTAB = 0;
var elementsTabs = [];
var positionTab = -1;
var workingSize = 0;
var tabsMoved = [];

function setSizeContainer() {
	contenedorTAB = $("#contenedorTAB").width() + 50;
	elementsTabs.length = 0;
	workingSize = 0;
	var sizeView = $(window).width();
	$('#tabs>li').each(function (index, item) {
		var width = $(this).width();
		workingSize += width;
		elementsTabs[index] = width;
	});
}

$(function () {
	setTabsNames();
	verifyTabSelectorByURL();
	setSizeContainer();
	resizeDropDown();
	autocollapse(); // when document first loads

	// Adicionando gestión del autoresize when ends.
	var resizeTimer;
	$(window).on('resize', function (e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			autosize();
		}, 250);
	});

	var eventRight = false;
	$('#rightArr').click(function (e) {
		if (eventRight == false) {
			eventRight = true;
			if (positionTab == -1) positionTab = 0;
			for (i = positionTab; i < elementsTabs.length; i++) {
				var width = elementsTabs[i];
				tabsMoved[tabsMoved.length] = width;
				positionTab += 1;
				workingSize -= width;
				$('#tabs').css('position', 'absolute');
				$('#tabs').animate({
					left: "-=" + width + "px"
				}, 'slow', function () {
					$('#leftArr').show();
					if (Math.abs(workingSize) <= contenedorTAB) {
						$('#rightArr').hide();
					}
					eventRight = false;
				});
				break;
			}
		}
		e.preventDefault();
	});

	var eventLeft = false;
	$('#leftArr').click(function (e) {
		if (eventLeft == false) {
			var position = positionTab - 1;
			for (i = position; i < tabsMoved.length; i++) {
				eventLeft = true;
				workingSize += tabsMoved[i];
				$('#tabs').animate({
					left: "+=" + tabsMoved[i] + "px"
				}, 'slow', function () {
					$('#rightArr').show();
					if (positionTab == 0) {
						$('#leftArr').hide();
					}
					eventLeft = false;
				});
				break;
			}
			tabsMoved.splice(position);
			positionTab = position;
		}
		e.preventDefault();
	});

	$('#myTabDrop1').click(function () {
		$(this).find('i').toggleClass('fa-caret-down fa-caret-up');
	});

	$('.dropdown-menu').on('click', 'a', function () {
		var text = $(this).html();
		var htmlText = "<div><div class='texto'>" + text + "</div><div class='icono'><i class='fa  fa-caret-down fa-lg'></i></div><br style='clear: left;' /></div>";
		$(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText);

	});
});

/*
 ** IMPORTANT: DO NOT REMOVE THIS
 ** OID: ZJ_KAH814O0M8EKD0ALNQ69U03KL5
 *** Last modified: Jul 7, 2017, 3:42 PM
 */