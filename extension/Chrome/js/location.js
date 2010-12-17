ABBRTM = window.ABBRTM || {};

ABBRTM.Location = function() {
    this.mbn = this.getUniqueMessageBusName();

	if (ABBRTM.configuration.uniqueURLForListAndTask()) {
		this.locationHash = "";

		if (location.hash.indexOf("section.tasks/") >= 0) {
			this.hashParams(location.hash.substring(location.hash.indexOf("section.tasks/") + 14));

			if (view.getSelected() !== "Tasks") {
        		view.selectView("Tasks");
			}
			ABBRTM.aBitBetterRTM.taskList.selectTaskByID(this.getTaskID());
			ABBRTM.aBitBetterRTM.listTabs.selectListByID(this.getListID());
		}

		var that = this;
		var checkIfLocationHashChanged = function() {
			if (that.locationHash != location.hash && view.getSelected() === "Tasks") {
				that.locationHash = location.hash;
				var taskID = that.getTaskID();
				if (taskID) {
					ABBRTM.aBitBetterRTM.taskList.selectTaskByID(taskID);
				}
				else {
					var selectedTaskID = ABBRTM.aBitBetterRTM.taskList.getSelectedTaskID();
					if (selectedTaskID) {
						that.setTaskID(selectedTaskID);
					}
					else {
						var listID = that.getListID();
						if (listID) {
							ABBRTM.aBitBetterRTM.listTabs.selectListByID(that.getListID());
						}
						else {
							that.setListID(ABBRTM.aBitBetterRTM.listTabs.getSelectedListID());
						}
					}
				}
			}
		};

		setInterval(checkIfLocationHashChanged, 200);

		var handleSelectFinished = function() {
			if (view.getSelected() === "Tasks") {
				if (ABBRTM.aBitBetterRTM.taskList.getSelectedTaskID()) {
					that.setTaskID(ABBRTM.aBitBetterRTM.taskList.getSelectedTaskID());
				}
				else {
					that.setListID(ABBRTM.aBitBetterRTM.listTabs.getSelectedListID());
				}
			}
		};

		var handleTabChanged = function(d, e) {
			ABBRTM.location.setListID(e[2][1]);
		};

		if (view.getSelected() === "Tasks" && location.hash === "") {
			location.hash = "section.tasks";
		}

   		messageBus.subscribe(handleSelectFinished, taskList.list.getUniqueMessageBusName() + "selectFinished");
		messageBus.subscribe(handleTabChanged, listTabs.mbn + "tabChanged");
	}
}

ABBRTM.Location.prototype.getUniqueMessageBusName = function() {
	return "abitbetterrtm.utility.location.";
};

ABBRTM.Location.prototype.getListID = function() {
	return this.getHashParameter("list");
};

ABBRTM.Location.prototype.getTaskID = function() {
	return this.getHashParameter("task");
};

ABBRTM.Location.prototype.getHashParameter = function(key) {
	var params = ABBRTM.Utility.decodeBase64(this.hashParams());

	if (params && key) {
		if (params.indexOf(key + "=") > -1) {
			var start = params.indexOf(key + "=") + 1 + key.length;
			var end = params.indexOf("/", start);
			return params.substring(start, end);
		}
	}

	return null;
}

ABBRTM.Location.prototype.setHashParameter = function(key, value) {
	var params = "/" + key + "=" + value + "/";
	this.hashParams(ABBRTM.Utility.encodeBase64(params));
}

ABBRTM.Location.prototype.setTaskID = function(taskID) {
	this.setHashParameter("task", taskID);
};

ABBRTM.Location.prototype.setListID = function(listID) {
	this.setHashParameter("list", listID);
};

ABBRTM.Location.prototype.hashParams = function(value) {
	if (value === undefined) {
		var hashParts = location.hash.split('/');
		if (hashParts[1]) {
			return hashParts[1];
		}

		return "";
	}
	else {
		var hash = (location.hash.split('/')[0] || "section.tasks");
		hash += "/" + value;
		location.hash = this.locationHash = hash;
	}
}
