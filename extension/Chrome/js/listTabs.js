ABBRTM = window.ABBRTM || {};

ABBRTM.ListTabs = function(parent) {
    noteMgr.prepareIndex();
	this.listAdder;
	this.parent = parent;
	this.blitted = false;
	this.tasksCountCache = {};
	this.itemClickHandler = $("#listtabs li").attr("onclick");

	if (ABBRTM.configuration.displayTabsToTheLeft()) {
		this.$div = $('<div/>')
		.addClass("taskcloudcontent")
		.css({border: "1px solid #CACACA", borderRadius: "7px", padding: "5px 4px", cssFloat: "left", marginRight: "5px"})
		.prependTo("#appview");

		var $listTabsDiv = $(listTabs.div)
		.attr("class", "")
		.css({width: "100%"})
		.appendTo(this.$div);

		if (ABBRTM.configuration.quickAddList()) {
			this.listAdder = new ABBRTM.ListAdder();
			this.$div.prepend(this.listAdder.$div);
		}

		if (view.getSelected() != "Tasks") {
			this.$div.hide();
		}
	}

	this.setSortParameters();
	this.applySortOrder(ABBRTM.configuration.listsSortOrder());
	listTabs.sort();

	this.overrideSelectLeft();
	this.overrideSelectRight();

	var that = this;
    var handleViewChanged = function(d, e) {
		if (e[0][1] === "Tasks") {
			that.$div && that.$div.hide();
			$("#content").width(980);
		}
		else if (e[1][1] === "Tasks") {
			that.$div && that.$div.show();
			that.blitDiv();
		}
    };

	var handleTabChanged = function(d, e) {
		var update = function() {
			that.backgroundTasksCountUpdate($("#listtabs li.xtab_selected"));
		};

		if (ABBRTM.configuration.showTasksCount() === true) {
			setTimeout(update, 1000);
		}
	};

	messageBus.subscribe(listTabs.blitDiv, window.listList.mbn + "setFilterSuccess");
	messageBus.subscribe(handleTabChanged, window.listTabs.mbn + "tabChanged");
	messageBus.subscribe(handleViewChanged, window.view.getUniqueMessageBusName() + "viewChanged");

	this.appendCodeToExistingMethods();

	$("#tools_spacer").css({paddingTop: "1px", borderTop: "1px solid #CACACA"});
	$("#sorting").css({marginTop: "0px"});
	$("#tools").css({paddingTop: "5px"});

	var handleTaskStartDrag = function() {
		that.makeDroppable();
	}

	var handleTaskStopDrag = function() {
		that.destroyDroppable();
	}

	$(document).bind("taskStartDrag", handleTaskStartDrag);
	$(document).bind("taskStopDrag", handleTaskStopDrag);
}

ABBRTM.ListTabs.prototype.applySortOrder = function(sortOrder) {
	sortOrder && $.each(sortOrder, function (listID, position) {
		if (listID && listTabs.hashMap[listID]) {
			listTabs.hashMap[listID].abbrtm_sort_order = position;
		}
	});
}
 
ABBRTM.ListTabs.prototype.appendCodeToExistingMethods = function() {
	ABBRTM.Utility.appendToMethod(listTabs, "blitDiv", this, this.blitDiv);
	ABBRTM.Utility.appendToMethod(taskCloud, "update", listTabs, listTabs.blitDiv);
	ABBRTM.Utility.appendToMethod(listTabs, "setSortParameters", this, this.setSortParameters);

	if (ABBRTM.configuration.showTasksCount() === true) {
		ABBRTM.Utility.appendToMethod(window.taskCloud, "update", this, this.backgroundTasksCountUpdate);
	}

};

ABBRTM.ListTabs.prototype.getEntries = function() {
	if (window.listTabs) {
		return window.listTabs.entries;
	}

	return null;
};

ABBRTM.ListTabs.prototype.getData = function() {
	if (window.listTabs) {
		return window.listTabs.data;
	}

	return null;
};

ABBRTM.ListTabs.prototype.showTasksCount = function() {
	var that = this;
	$("#listtabs li:visible").each(function(i, domElement) {
		that.updateTasksCount($(domElement).attr("listid"), false);
	});
};

ABBRTM.ListTabs.prototype.backgroundTasksCountUpdate = function($listItems) {
	var timeout = 300;

	if ($listItems === undefined) {
		$listItems = $("#listtabs li:visible");
	}

	var that = this;
	var update = function($listItem) {
		that.updateTasksCount($listItem.attr("listid"), true);
	};
	
	$listItems.each(function(i, domElement) {
			setTimeout(update, timeout, $(domElement));
			timeout += 300;
	});
};

ABBRTM.ListTabs.prototype.updateTasksCount = function(listID, reloadCache) {
	var that = this;
	var updateCallback = function(listID, tasksCount) {
		var $listItem;
		if (listID) {
			that.tasksCountCache[listID] = tasksCount;
			$listItem = $("#abbrtm_" + listID);
		}
		else {
			$listItem = $("#listtabs li:has(img)");
		}
		var $anchor = $listItem.children();
		var listName = $anchor.html();
		$anchor.html(that.getListNameWithTasksCount(listName, tasksCount));
	}

	this.getTasksCountByListID(listID, reloadCache, updateCallback);
};

ABBRTM.ListTabs.prototype.getTasksCountByListID = function(listID, reloadCache, updateCallback) {
	var tasksCount = this.tasksCountCache[listID];

	if (tasksCount === undefined || reloadCache === true) {
		var filter = "";

		if (listID === undefined) {
			if (listTabs.data[listTabs.reverseMap[null]] === undefined || listTabs.data[listTabs.reverseMap[null]][2] === undefined) {
				return;
			}
			filter = listTabs.data[listTabs.reverseMap[null]][2];
		}
		else {
			filter = listTabs.hashMap[listID].filter;
		}

		if (filter) {
			if (filter.indexOf("status:") < 0) {
				filter = "(" + filter + ") and (status:incomplete)";
			}

            if (!noteMgr.index) {
                noteMgr.prepareIndex();
            }

			if (tasksCount === undefined) {
				tasksCount = overviewList.getFilteredList(filter).length;
			}
			else {
				this.getSmartListTasksCount(listID, filter, updateCallback);
				return;
			}
		}
		else {
			tasksCount = format.getListStatistics(listID)[5];
			this.tasksCountCache[listID] = tasksCount;
		}
	}

	if (updateCallback){
		updateCallback(listID, tasksCount);
	}
};

ABBRTM.ListTabs.prototype.getSmartListTasksCount = function(listID, filter, callback) {
	var tasksCount = 0;
	var totalTasksCount = 0;
	for (var taskID in stateMgr.tasks){
		++totalTasksCount;
	}

	var update = function(count, batchSize) {
		tasksCount += count;
		totalTasksCount -= batchSize;

		if (callback && totalTasksCount <= 0) {
			callback(listID, tasksCount);
		}
	}

	var tasks = {};
	var batchSize = 0;
	var timeout = 100;
	for (var taskID in stateMgr.tasks){
		tasks[taskID] = stateMgr.tasks[taskID];
		if (++batchSize === 50) {
			setTimeout(function(tasks, size){
					if (callback) {
						var includeArchived = function(D, B, A){
							return A.list_id in stateMgr.lists && stateMgr.lists[A.list_id].archived == D
						}

						var filterObj = new Filter(tasks, filterMap, new Sexp(filter).sexpr, "name");
						filterObj.setImplicitFilter(includeArchived);
						update(filterObj.reduce().length, size);
					}
			}, timeout, tasks, 50);
			timeout += 100;
			tasks = {};
			batchSize = 0;
		}
	}

	if (batchSize > 0) {
		setTimeout(function(tasks, size){
				if (callback) {
					var includeArchived = function(D, B, A){
						return A.list_id in stateMgr.lists && stateMgr.lists[A.list_id].archived == D
					}

					var filterObj = new Filter(tasks, filterMap, new Sexp(filter).sexpr, "name");
					filterObj.setImplicitFilter(includeArchived);
					update(filterObj.reduce().length, size);
				}
		}, 1, tasks, 50);
	}
};

ABBRTM.ListTabs.prototype.getListNameWithTasksCount = function(listName, tasksCount) {
	if (listName) {
		var regExp = /\(\d+\)$/;
		
		if (regExp.test(listName)) {
			listName = listName.replace(regExp, "(" + tasksCount + ")");
		}
		else {
			listName = listName + " (" + tasksCount + ")";
		}

		if (!tasksCount || tasksCount == 0) {
			listName = listName.replace(regExp, "");
		}
	}

	return listName;
};

ABBRTM.ListTabs.prototype.hideDisabledLists = function(listItems) {
	var listItems = window.listTabs.div.getElementsByTagName("li");
	for (var i = 0; i < window.listTabs.data.length; ++i) {
		if (listItems[i] && window.listTabs.data[i] && ABBRTM.configuration.isListHidden(window.listTabs.data[i][1])) {
			listItems[i].style.display = "none";
		}
	}
};

ABBRTM.ListTabs.prototype.blitDiv = function() {
	if (view.getSelected() === "Tasks") {
		var $list = $("#listtabs ul");
		var $listItems = $("#listtabs li").each(function (i, domElement) {
				var listID = listTabs.data[i][1];
				if (listID) {
					$(this).attr({id: "abbrtm_" + listID, listid: listID, smartlist: $(this).hasClass("xtab_smartlist")});
				}
		});

		this.hideDisabledLists();

		if (ABBRTM.configuration.showTasksCount() === true) {
			this.showTasksCount();
		}

		var contentWidth = $("#listbox").width() + $("#detailsbox").width() + 10;
		if (ABBRTM.configuration.displayTabsToTheLeft() === true) {

			$list.addClass("abr-listtabs");

			contentWidth += this.$div.width() + 10;
		}

		$("#content").width(contentWidth);

		var that = this;
		$list.sortable(
				{
					items: 'li[listid]',
					forcePlaceholderSize: true,
					placeholder: 'abr-draggable-placeholder',
					cancel: 'li:not([listid])',
					axis : ABBRTM.configuration.displayTabsToTheLeft() === true ? "y" : undefined,
					start: function(event, ui) {
						ui.item.addClass("abr-draggable");
						$("#listtabs li").removeAttr("onclick").unbind("click");
					},
					stop: function(event, ui) {
						ui.item.removeClass("abr-draggable");

						var elements = $("#listtabs ul").sortable("toArray");
						$.each(elements, function(i, elementID) {
							var $element = $("#" + elementID);

							if ($element.attr("id") !== $(ui.item).attr("id")) {
								$element.click(that.itemClickHandler);
							}
						});

						$(ui.item).one("click", function(event) { 
							event.stopImmediatePropagation();
							event.preventDefault();
							$(this).click(that.itemClickHandler);
							return false;
						});
					},
					update: function(event, ui) { 
						var newSortOrder = {};
						var elements = $("#listtabs ul").sortable("toArray");
						$.each(elements, function(i, elementID) {
								var $element = $("#" + elementID);
								$element.attr("pos", i);

								if (elementID !== "abbrtm_null") {
									newSortOrder[$element.attr("listid")] = i;
								}
						});

						ABBRTM.configuration.listsSortOrder(newSortOrder);
						that.applySortOrder(newSortOrder);
					} 
				});
		$list.disableSelection();
	}
};

ABBRTM.ListTabs.prototype.makeDroppable = function() {
	var currentList;
	var that = this;
	$("#listtabs li:visible:not(.xtab_smartlist):not(.xtab_selected)").droppable({
				accept: ".xtd_arr",
				hoverClass: "abr-droppable-hover",
				tolerance: "pointer",
				drop: function(event, ui) {
					that.moveSelectedTasksToListByID($(this).attr("listid"));
				},
				over: function(event, ui) {
					currentList = this;
					ui.helper.addClass("active");
				},
				out: function(event, ui) {
					if (currentList === this) {
						ui.helper.removeClass("active");
					}
				}
			});
};

ABBRTM.ListTabs.prototype.destroyDroppable = function() {
	$("#listtabs li").droppable("destroy");
};

ABBRTM.ListTabs.prototype.openSelectedList = function()
{
	var position = $("#listtabs li.abr-list-marked").attr("pos");

	if (position >= 0) {
		listTabs.selectTabByPosition(position);
	}
};

ABBRTM.ListTabs.prototype.selectPreviousList = function()
{
	$("#listtabs li.abr-list-marked")
		.add("#listtabs li.xtab_selected")
		.eq(0)
		.removeClass("abr-list-marked")
		.prevAll(":visible:first")
		.add("#listtabs li:visible:first")
		.eq(0)
		.addClass("abr-list-marked");
};

ABBRTM.ListTabs.prototype.selectNextList = function()
{
	$("#listtabs li.abr-list-marked")
		.add("#listtabs li.xtab_selected")
		.eq(0)
		.removeClass("abr-list-marked")
		.nextAll(":visible:first")
		.add("#listtabs li:visible:last")
		.eq(0)
		.addClass("abr-list-marked");
};

ABBRTM.ListTabs.prototype.selectListByName = function(text)
{
	if (!window.listTabs || !window.listTabs.entries)
	{
		return;
	}

	for (var i = 0; i < window.listTabs.entries.length; ++i)
	{
		if (window.listTabs.entries[i].toLowerCase() == text.toLowerCase())
		{
			window.listTabs.selectTabByPosition(i);
		}
	}
};

ABBRTM.ListTabs.prototype.selectListByID = function(listID)
{
	if (listTabs && listID) {
		listTabs.selectTabByData(listID);
	}
};
ABBRTM.ListTabs.prototype.moveSelectedTasksToListByID = function(listID)
{
	if (control && listID) {
		control.tasksSelectionChanged("", ["", "tasks.moveTo." + listID]);
	}
};

ABBRTM.ListTabs.prototype.moveSelectedTasksToListByName = function(text)
{
	if (!window.listTabs || !window.listTabs.entries || !window.control) {
		return;
	}

	for (var i = 0; i < window.listTabs.entries.length; ++i) {
		if (window.listTabs.entries[i].toLowerCase() == text.toLowerCase()) {
			window.control.tasksSelectionChanged("", ["", "tasks.moveTo." + window.listTabs.data[i][1]]);
		}
	}
};

ABBRTM.ListTabs.prototype.setSortParameters = function()
{
	listTabs.sortFields.splice(0, 1, "abbrtm_sort_order");
};

ABBRTM.ListTabs.prototype.overrideSelectLeft = function()
{
	var that = this;
	listTabs.selectLeft = function() {
		var position = this.selected - 1; 

		while (true) {
			if (position >= 0) {
				if (!ABBRTM.configuration.isListHidden(this.data[position][1])) {
					break;
				}

				--position;
			}
			else {
				position = this.entries.length - 1;
			}
		}

		this.selectTabByPosition(position);
	};	
};

ABBRTM.ListTabs.prototype.overrideSelectRight = function()
{
	var that = this;
	listTabs.selectRight = function() {
		var position = this.selected + 1; 

		while (true) {
			if (position < this.entries.length) {
				if (!ABBRTM.configuration.isListHidden(this.data[position][1])) {
					break;
				}

				++position;
			}
			else {
				position = 0;
			}
		}

		this.selectTabByPosition(position);
	};	
};

ABBRTM.ListTabs.prototype.getSelectedListID = function() {
	return listTabs.data[listTabs.selected][1];
};
