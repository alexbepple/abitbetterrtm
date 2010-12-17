ABBRTM = window.ABBRTM || {};

ABBRTM.ListAutocompleteStore = function(listTabs)
{
	this.listTabs = listTabs;	
}

ABBRTM.ListAutocompleteStore.prototype.getCompletions = function(text)
{
	if (this.listTabs)
	{
		var completions = [];
		var entries = this.listTabs.getEntries();
		var data = this.listTabs.getData();

		if (entries && data)
		{
			for (var i = 0; i < entries.length; ++i)
			{
				if (entries[i].toLowerCase().indexOf(text.toLowerCase()) === 0 && !ABBRTM.configuration.isListHidden(data[i][1]))
				{
					completions.push(entries[i]);
				}
			}
		}

		return completions;
	}

	return null;
};
