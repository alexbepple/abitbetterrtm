var ABBRTM = window.ABBRTM || {};

ABBRTM.appendScript = function(src, callback) {
	var scriptElement = window.top.document.createElement("script");
	scriptElement.src = chrome.extension.getURL(src);
	window.top.document.body.appendChild(scriptElement);

	if (callback) {
		scriptElement.onload = callback;
	}
}

ABBRTM.appendABitBetterRTMCode = function() {
	if (!arguments.callee.done) {
		arguments.callee.done = true;

		ABBRTM.appendScript("frameworks/jquery-1.3.2.min.js", jqueryui);
		function jqueryui() { ABBRTM.appendScript("frameworks/jquery-ui-1.7.2.custom.min.js", abitbetterrtmCss); }
		function abitbetterrtmCss() { ABBRTM.appendScript("css/abitbetterrtm.css.js", uiResizableCss); }
		function uiResizableCss() { ABBRTM.appendScript("css/ui.resizable.css.js", utility); }
		function utility() { ABBRTM.appendScript("js/utility.js", abrLocation); }
		function abrLocation() { ABBRTM.appendScript("js/location.js", configuration); }
		function configuration() { ABBRTM.appendScript("js/configuration.js", listAutocompleteStore); }
		function listAutocompleteStore() { ABBRTM.appendScript("js/listAutocompleteStore.js", autocompleteList); }
		function autocompleteList() { ABBRTM.appendScript("js/autocompleteList.js", autocomplete); }
		function autocomplete() { ABBRTM.appendScript("js/autocomplete.js", listAdder); }
		function listAdder() { ABBRTM.appendScript("js/listAdder.js", listTabs); }
		function listTabs() { ABBRTM.appendScript("js/listTabs.js", shortcut); }
		function shortcut() { ABBRTM.appendScript("js/shortcut.js", taskList); }
		function taskList() { ABBRTM.appendScript("js/taskList.js", listList); }
		function listList() { ABBRTM.appendScript("js/listList.js", settings); }
		function settings() { ABBRTM.appendScript("js/settings.js", aBitBetterRTM); }
		function aBitBetterRTM() { ABBRTM.appendScript("js/aBitBetterRTM.js", init); }
		function init(){ ABBRTM.appendScript("js/init.js"); }
	}
}

ABBRTM.appendABitBetterRTMCode();
