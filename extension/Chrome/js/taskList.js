ABBRTM = window.ABBRTM || {};

ABBRTM.TaskList = function() {
	this.minWidth = 460;
	this.$divListBox = $("#listbox");
	this.$divListWrap = $("#listwrap");
	this.$divListTabs = ABBRTM.configuration.displayTabsToTheLeft() ? null : $("#listtabs");

	if (window.view.getSelected() === "Tasks") {
		this.makeResizable();
	}

	var that = this;
    var handleViewChanged = function(d, e) {
		if (e[0][1] === "Tasks") {
			that.destroyResizable();
		}
		else if (e[1][1] === "Tasks") {
			that.makeResizable();
		}
    };

	var that = this;
	var handleLoadFinished = function() {
		that.makeTasksDraggable();
	}

	$("#sort-list").prependTo("#appview");

	messageBus.subscribe(handleViewChanged, window.view.getUniqueMessageBusName() + "viewChanged");
    messageBus.subscribe(handleLoadFinished, taskList.getUniqueMessageBusName() + "loadFinished");
}

ABBRTM.TaskList.prototype.makeTasksDraggable = function() {
	var $xtr = $("#.xtr:visible");
	var $helper = $("<div class='abr-taskdrag-helper'></div>");
	var mouseOverHandler = $xtr.attr("onmouseover");
	var currentPos;
	var selectedMap = null;

	var that = this;
	$(".xtr:visible .xtd_arr").draggable({
			cursorAt: { left: 3, top: 3 },
			zIndex: 2700,
			revert: "invalid",
			revertDuration: 200,
			start: function(event, ui) {
				$(document).trigger("taskStartDrag");
				currentPos = $(this).parent().prevAll().length;
				if (!taskList.list.selectedMap[currentPos]) {
					selectedMap = {};
					$.each(taskList.list.selected, function(i, value){
							selectedMap[value] = true;
						});
					taskList.list.selectOne(taskList.list.reverseMap[currentPos]);
				}

				var tasksCount = taskList.list.selected.length;
				$helper.text("Move " + tasksCount + (tasksCount > 1 ? " tasks" : " task"));

				$xtr.removeAttr("onmouseover").unbind("mouseover");
			},
			stop: function() {
				$(document).trigger("taskStopDrag");
				$xtr.mouseover(mouseOverHandler);

				if (selectedMap) {
					taskList.list.selectOne(taskList.list.reverseMap[currentPos]);
					taskList.list.selectSome(selectedMap);
					selectedMap = null;
				}
			},
			helper: function() {
				return $helper;
			},
		});
};

ABBRTM.TaskList.prototype.makeResizable = function() {
	var width = ABBRTM.configuration.taskListWidth();
	if (width >= this.minWidth) {
		this.$divListBox.width(width);
		this.$divListWrap.width(width);
		this.$divListTabs && this.$divListTabs.width(width);
	}

	var alsoResize = "#content, #listwrap";
	this.$divListTabs && (alsoResize += ", #listtabs");

	var that = this;
	this.$divListBox.resizable(
			{
				alsoResize: alsoResize,
				handle: "e",
				minWidth: that.minWidth,
				stop: function() {
					$("#content").height("");
					that.$divListWrap.height("");
					that.$divListTabs && that.$divListTabs.height("");
					ABBRTM.configuration.taskListWidth(that.$divListWrap.width());
				}
			});
};

ABBRTM.TaskList.prototype.destroyResizable = function() {
	this.$divListBox.resizable("destroy").css({width: "", height: ""});
	this.$divListWrap.css({width: "", height: ""});
	this.$divListTabs && this.$divListTabs.css({width: "", height: ""});
};

ABBRTM.TaskList.prototype.getSelectedTaskID = function() {
	if (taskList) {
		var selectedTasks = taskList.getViewList().getSelected();

		if (selectedTasks && selectedTasks.length > 0) {
			return selectedTasks[selectedTasks.length - 1];
		}
	}

	return null;
};

ABBRTM.TaskList.prototype.selectTaskByID = function(taskID) {
	if (control && taskID) {
		control.showTaskById(taskID);
	}
};
