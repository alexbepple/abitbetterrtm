var ABBRTM = window.ABBRTM || {};

ABBRTM.appendScript = function(src) {
	var scriptElement = window.top.document.createElement("script");
	scriptElement.src = chrome.extension.getURL(src);
	window.top.document.body.appendChild(scriptElement);
}

ABBRTM.appendABitBetterRTMCode = function() {
	if (!arguments.callee.done) {
		arguments.callee.done = true;
		ABBRTM.appendScript("js/json.js");
		ABBRTM.appendScript("frameworks/jquery-1.3.2.min.js");
		ABBRTM.appendScript("frameworks/jquery-ui-1.7.2.custom.min.js");
		ABBRTM.appendScript("frameworks/jquery.corner.js");
		ABBRTM.appendScript("css/abitbetterrtm.css.js");
		ABBRTM.appendScript("css/ui.resizable.css.js");
		ABBRTM.appendScript("js/communicator.js");
		ABBRTM.appendScript("js/utility.js");
		ABBRTM.appendScript("js/location.js");
		ABBRTM.appendScript("js/configuration.js");
		ABBRTM.appendScript("js/listAutocompleteStore.js");
		ABBRTM.appendScript("js/autocompleteList.js");
		ABBRTM.appendScript("js/autocomplete.js");
		ABBRTM.appendScript("js/listAdder.js");
		ABBRTM.appendScript("js/listTabs.js");
		ABBRTM.appendScript("js/shortcut.js");
		ABBRTM.appendScript("js/taskList.js");
		ABBRTM.appendScript("js/listList.js");
		ABBRTM.appendScript("js/settings.js");
		ABBRTM.appendScript("js/aBitBetterRTM.js");
		ABBRTM.appendScript("js/init.js");
	}
}

ABBRTM.appendABitBetterRTMCode();
