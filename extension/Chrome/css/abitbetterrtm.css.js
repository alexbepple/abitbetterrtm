(function() {
	var css = "";	
	css += 'html { overflow: scroll; overflow-x: auto; }';

	css += '.abr-draggable{ opacity: 0.8; background-color: #CACACA}';
	css += '.abr-draggable-placeholder{border: 1px dashed black; height: 18px;}';

	css += '.abr-droppable-hover.abr-list {background-color: #6694E3;}';
	css += '.abr-droppable-hover.abr-list a{color: white; text-decoration: none;}';

	css += '.abr-listtabs{list-style: none; padding: 5px; white-space: nowrap;}';

	css += '.abr-listtabs a{ color: black; }';
	css += '.abr-listtabs li.xtab_smartlist a{ color: #0060BF; }';
	css += '.abr-listtabs li.xtab_selected[smartlist="true"] a{ color: #0060BF; }';
	css += '.abr-listtabs li.xtab_selected:not([id]) a{ color: #0060BF; }';

	css += '.abr-listtabs li{padding: 0px 2px; border-radius: 3px;}';
	css += '.abr-listtabs li.xtab_selected{font-weight: normal; background-color: #C2CFF1;}';
	css += '.abr-listtabs li.abr-list-marked{background-color: #FFFF99;}';
	css += '.abr-listtabs li.abr-list-marked.xtab_selected{background-color: #C2CFF1;}';

	css += '.xtd_arr{ background: transparent no-repeat 3px center url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAWCAMAAAA7BnbfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFurq6v7%2B%2F%2F%2F%2F%2Fob4%2F%2BQAAAAN0Uk5T%2F%2F8A18oNQQAAAB9JREFUeNpiYGRkYmJiZGSA0UwQAKepJc9AHf0AAQYAWcIBA%2BnSfP4AAAAASUVORK5CYII%3D);}';
	css += '.xtr_keyboard .xtd_arr { background-image: url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAWCAMAAAAlz0ZsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRFurq6v7%2B%2FV1dX%2F%2F%2F%2FDCp1dwAAAAR0Uk5T%2F%2F%2F%2FAEAqqfQAAABCSURBVHjajM5JDgAgCANAsP%2F%2Fs7aA4E0OZhLLYu4A%2BFgLVUP9u05lToxckrmgOkRNodbVzJkT77zC3Pt7n5W2AAMAypkB1kMoeooAAAAASUVORK5CYII%3D) !important;}';

	css += '.abr-taskdrag-helper{ padding: 3px 8px; -webkit-box-shadow: 5px 5px 5px #888; color:black; background-color: lightblue;}';
	css += '.abr-taskdrag-helper.active { color:white; background-color: #6694E3;}';

	$('head').append('<style type="text/css">' + css + '</style>');
})();
