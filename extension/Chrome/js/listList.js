ABBRTM = window.ABBRTM || {};

ABBRTM.ListList = function()
{
	this.overrideListListUpdateEntry();
}

ABBRTM.ListList.prototype.overrideListListUpdateEntry = function()
{
	if (window.listList)
	{
		var oldListListUpdateEntry = window.listList.list.updateEntry;
		var that = this;

		window.listList.list.updateEntry = function(entry, D)
		{
			oldListListUpdateEntry.call(window.listList.list, entry, D);

			var index = window.listList.list.map[entry[0]];
			var row = window.listList.list.table.rows[index];

			row.entry = entry;
			row.rowText.innerHTML = "<div id='listName_" + entry[0] + "' style='float: left;'>" + entry[1] + "</div><div style='align: right; float: right;'><a href=\"# \" id='displayListLink_" + entry[0] + "'></a></div>";

			var displayListLink = document.getElementById('displayListLink_' + entry[0]);
			var listName = document.getElementById('listName_' + entry[0]);

			var listClickHandler = function(event)
			{
				if (ABBRTM.configuration.isListHidden(entry[0]))
				{
					that.makeListVisible(entry);
				}
				else
				{
					that.makeListHidden(entry);
				}

				if (utility) {
					utility.stopEvent(event);
				}
			};

			displayListLink.addEventListener('click', listClickHandler, false);

			if (!that.isListArchived(entry[0]))
			{
				if (ABBRTM.configuration.isListHidden(entry[0]))
				{
					displayListLink.innerHTML = "show";
					listName.style.color = "#cacaca";
				}
				else
				{
					displayListLink.innerHTML = "hide";
					listName.style.color = "";
				}
			}
		};

		window.listList.doStyles();
	}
};

ABBRTM.ListList.prototype.isListArchived = function(listID)
{
	if (window.stateMgr.lists[listID] && window.stateMgr.lists[listID].archived)
	{
		return true;
	}

	return false;
};

ABBRTM.ListList.prototype.makeListHidden = function(listEntry)
{
	ABBRTM.configuration.makeListHidden(listEntry[0]);
	window.listList.list.updateEntry(listEntry);
};

ABBRTM.ListList.prototype.makeListVisible = function(listEntry)
{
	ABBRTM.configuration.makeListVisible(listEntry[0]);
	window.listList.list.updateEntry(listEntry);
};
