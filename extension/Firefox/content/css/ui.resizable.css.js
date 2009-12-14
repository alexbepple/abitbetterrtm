(function() {
	var css = "";	
	css += ".ui-resizable { position: relative;}";
	css += ".ui-resizable-handle { position: absolute;font-size: 0.1px;z-index: 99999; display: block;}";
	css += ".ui-resizable-disabled .ui-resizable-handle, .ui-resizable-autohide .ui-resizable-handle { display: none; }";
	css += ".ui-resizable-n { cursor: n-resize; height: 7px; width: 100%; top: -5px; left: 0px; }";
	css += ".ui-resizable-s { cursor: s-resize; height: 7px; width: 100%; bottom: -5px; left: 0px; }";
	css += ".ui-resizable-e { cursor: e-resize; width: 7px; right: -5px; top: 0px; height: 100%; }";
	css += ".ui-resizable-w { cursor: w-resize; width: 7px; left: -5px; top: 0px; height: 100%; }";
	css += ".ui-resizable-se { cursor: se-resize; width: 12px; height: 12px; right: 1px; bottom: 1px; }";
	css += ".ui-resizable-sw { cursor: sw-resize; width: 9px; height: 9px; left: -5px; bottom: -5px; }";
	css += ".ui-resizable-nw { cursor: nw-resize; width: 9px; height: 9px; left: -5px; top: -5px; }";
	css += ".ui-resizable-ne { cursor: ne-resize; width: 9px; height: 9px; right: -5px; top: -5px;}                               ";
	$('head').append('<style type="text/css">' + css + '</style>');
})();
