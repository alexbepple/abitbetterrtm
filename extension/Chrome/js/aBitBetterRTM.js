ABBRTM = window.ABBRTM || {};

ABBRTM.ABitBetterRTM = function() {
	this.settings = new ABBRTM.Settings();
	this.settings.init();
	this.taskList = new ABBRTM.TaskList(this);
	this.listList = new ABBRTM.ListList();
	this.listTabs = new ABBRTM.ListTabs(this);
	this.listTabs.blitDiv();

	this.autocompletes = {};
	this.shortcuts = [];

	this.initAutocompletes();
	this.initShortcuts();
	this.overrideBodyKeyDownHandler();

    settingsTabs.addEntry("A Bit Better RTM");
    settingsView.addState("A Bit Better RTM", [this.settings], settingsTabs);
	settingsTabs.blitDiv();
}

ABBRTM.ABitBetterRTM.prototype.initShortcuts = function() {
	this.shortcuts.push(new ABBRTM.Shortcut(71, this.autocompletes.goTo, this.autocompletes.goTo.show, true, false, false));
	this.shortcuts.push(new ABBRTM.Shortcut(77, this.autocompletes.moveTo, this.autocompletes.moveTo.show, true, false, false));
	this.shortcuts.push(new ABBRTM.Shortcut(191, null, function(){$("#listFilter").focus().effect('highlight', '', 'slow');}, false, false, false));

	if (ABBRTM.configuration.displayTabsToTheLeft()) {
		this.shortcuts.push(new ABBRTM.Shortcut(74, this.listTabs, this.listTabs.selectNextList, false, true, false));
		this.shortcuts.push(new ABBRTM.Shortcut(75, this.listTabs, this.listTabs.selectPreviousList, false, true, false));
		this.shortcuts.push(new ABBRTM.Shortcut(79, this.listTabs, this.listTabs.openSelectedList, false, true, false));
		
		if (ABBRTM.configuration.quickAddList()) {
			this.shortcuts.push(new ABBRTM.Shortcut(81, this.listTabs.listAdder, this.listTabs.listAdder.showListEntryBox, false, false, false));
		}
	}
};

ABBRTM.ABitBetterRTM.prototype.initAutocompletes = function() {
	this.autocompletes.goTo = new ABBRTM.Autocomplete("GO TO: ", new ABBRTM.ListAutocompleteStore(this.listTabs), this.listTabs, this.listTabs.selectListByName);
	this.autocompletes.moveTo = new ABBRTM.Autocomplete("MOVE TO: ", new ABBRTM.ListAutocompleteStore(this.listTabs), this.listTabs, this.listTabs.moveSelectedTasksToListByName);
}

ABBRTM.ABitBetterRTM.prototype.overrideBodyKeyDownHandler = function() {
	var that = this;
	var handleKeyDownEvent = function(ev) {
		ev || (ev = window.event);
		var target = utility.getEventTarget(ev);

		if (target == null) {
			return true;
		}

		var pressed = (ev.charCode) ? ev.charCode : ((ev.which) ? ev.which : ev.keyCode);

		if (target && (/^(textarea|input|text|password|select|button|submit)/i.test(target.type) || target.id == "map")) {
			return true;
		}

		for (var i = 0; i < that.shortcuts.length; ++i) {
			if ((that.shortcuts[i].key === pressed) && (that.shortcuts[i].ctrlKey === ev.ctrlKey) && (that.shortcuts[i].shiftKey === ev.shiftKey) && (that.shortcuts[i].altKey === ev.altKey) && (ev.metaKey === false)) {
				that.shortcuts[i].run();
				utility.stopEvent(ev);
				return false;
			}
		}

		return true;
	}

	if (eventMgr) {
		var oldBodyKeyDownHandler = eventMgr.bodyKeyDownHandler;

		eventMgr.bodyKeyDownHandler = function(ev) {
			if (handleKeyDownEvent(ev) === true) {
				return oldBodyKeyDownHandler.call(eventMgr, ev);
			}

			return true;
		};	
	}
}
