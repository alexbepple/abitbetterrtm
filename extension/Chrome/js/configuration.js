var ABBRTM = window.ABBRTM || {};

ABBRTM.Configuration = function() {
	this._listsSortOrder = {};
	this._displayTabsToTheLeft = true;	
	this._hiddenLists = [];
	this._showTasksCount = true;
	this._quickAddList = true;
	this._uniqueURLForListAndTask = true;
	this._entryPage = "";
	this._taskListWidth = 0;
}

ABBRTM.Configuration.prototype.init = function() {
	var that = this;
	function callback(aEvent) {
		var configuration = JSON.parse(unescape(aEvent.target.getAttribute("returnvalue")));

		that._listsSortOrder = configuration.listsSortOrder;
		that._displayTabsToTheLeft = configuration.displayTabsToTheLeft;
		that._hiddenLists = configuration.hiddenLists;
		that._showTasksCount = configuration.showTasksCount;
		that._quickAddList =  configuration.quickAddList;
		that._uniqueURLForListAndTask = configuration.uniqueURLForListAndTask;
		that._entryPage = configuration.entryPage;
		that._taskListWidth = configuration.taskListWidth;

		$(document).trigger("configurationLoaded");
	};

	ABBRTM.communicator.call({id: "configuration", direction: "get" }, callback);
};

ABBRTM.Configuration.prototype.listsSortOrder = function(value) {
	if (value !== undefined) {
		this._listsSortOrder = value;
		ABBRTM.communicator.call({id: "listsSortOrder", direction: "set", data: value });
	}
	else {
		return this._listsSortOrder;
	}
};

ABBRTM.Configuration.prototype.makeListHidden = function(listID) {
	this._hiddenLists.push(listID);
	ABBRTM.communicator.call({id: "hiddenLists", direction: "set", data: this._hiddenLists });
};

ABBRTM.Configuration.prototype.makeListVisible = function(listID) {
	this._hiddenLists = $.grep(this._hiddenLists, function(value) { return value != listID; });
	ABBRTM.communicator.call({id: "hiddenLists", direction: "set", data: this._hiddenLists });
};

ABBRTM.Configuration.prototype.isListHidden = function(listID) {
	if (listID) {
		return $.inArray(listID.toString(), this._hiddenLists) >= 0;
	}

	return false;
};

ABBRTM.Configuration.prototype.displayTabsToTheLeft = function(value) {
	if (value !== undefined) {
		this._displayTabsToTheLeft = value;
		ABBRTM.communicator.call({id: "displayTabsToTheLeft", direction: "set", data: value });
	}
	else {
		return this._displayTabsToTheLeft;
	}
};

ABBRTM.Configuration.prototype.showTasksCount = function(value) {
	if (value !== undefined) {
		this._showTasksCount = value;
		ABBRTM.communicator.call({id: "showTasksCount", direction: "set", data: value });
	}
	else {
		return this._showTasksCount;
	}
};

ABBRTM.Configuration.prototype.quickAddList = function(value) {
	if (value !== undefined) {
		this._quickAddList = value;
		ABBRTM.communicator.call({id: "quickAddList", direction: "set", data: value });
	}
	else {
		return this._quickAddList;
	}
};

ABBRTM.Configuration.prototype.uniqueURLForListAndTask = function(value) {
	if (value !== undefined) {
		this._uniqueURLForListAndTask = value;
		ABBRTM.communicator.call({id: "uniqueURLForListAndTask", direction: "set", data: value });
	}
	else {
		return this._uniqueURLForListAndTask;
	}
};

ABBRTM.Configuration.prototype.entryPage = function() {
	return this._entryPage;
};

ABBRTM.Configuration.prototype.taskListWidth = function(value) {
	if (value !== undefined) {
		this._taskListWidth = value;
		ABBRTM.communicator.call({id: "taskListWidth", direction: "set", data: value });
	}
	else {
		return this._taskListWidth;
	}
};

