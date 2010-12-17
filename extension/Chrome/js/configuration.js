ABBRTM = window.ABBRTM || {};

ABBRTM.Configuration = function() {
	this._hiddenLists = JSON.parse(localStorage["abr_hiddenLists"] || "[]");
}

ABBRTM.Configuration.prototype.listsSortOrder = function(value) {
	if (value !== undefined) {
		localStorage["abr_listsSortOrder"] = JSON.stringify(value);
	}
	else {
		return JSON.parse(localStorage["abr_listsSortOrder"] || "{}");
	}
};

ABBRTM.Configuration.prototype.makeListHidden = function(listID) {
	this._hiddenLists.push(listID);
	localStorage["abr_hiddenLists"] = JSON.stringify(this._hiddenLists);
};

ABBRTM.Configuration.prototype.makeListVisible = function(listID) {
	this._hiddenLists = $.grep(this._hiddenLists, function(value) { return value != listID; });
	localStorage["abr_hiddenLists"] = JSON.stringify(this._hiddenLists);
};

ABBRTM.Configuration.prototype.isListHidden = function(listID) {
	if (listID) {
		return $.inArray(listID.toString(), this._hiddenLists) >= 0;
	}

	return false;
};

ABBRTM.Configuration.prototype.displayTabsToTheLeft = function(value) {
	if (value !== undefined) {
		localStorage["abr_displayTabsToTheLeft"] = value;
	}
	else {
		return localStorage["abr_displayTabsToTheLeft"] !== "false";
	}
};

ABBRTM.Configuration.prototype.showTasksCount = function(value) {
	if (value !== undefined) {
		localStorage["abr_showTasksCount"] = value;
	}
	else {
		return localStorage["abr_showTasksCount"] !== "false";
	}
};

ABBRTM.Configuration.prototype.quickAddList = function(value) {
	if (value !== undefined) {
		localStorage["abr_quickAddList"] = value;
	}
	else {
		return localStorage["abr_quickAddList"] !== "false";
	}
};

ABBRTM.Configuration.prototype.uniqueURLForListAndTask = function(value) {
	if (value !== undefined) {
		localStorage["abr_uniqueURLForListAndTask"] = value;
	}
	else {
		return localStorage["abr_uniqueURLForListAndTask"] !== "false";
	}
};

ABBRTM.Configuration.prototype.taskListWidth = function(value) {
	if (value !== undefined) {
		localStorage["abr_taskListWidth"] = value;
	}
	else {
		return localStorage["abr_taskListWidth"] - 0;
	}
};

