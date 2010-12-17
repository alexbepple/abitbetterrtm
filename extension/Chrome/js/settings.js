ABBRTM = window.ABBRTM || {};

ABBRTM.Settings = function()
{
	this.mbn = null;
	this.div = document.createElement("div");

	var generalSettings = document.getElementById("general");
	if (generalSettings)
	{
		generalSettings.parentNode.appendChild(this.div);
	}

	this.div.style.display = "none";
	this.div.innerHTML = '<div style="padding: 12px 25px 21px;" class="contentboxwrap"><form id="abitbetterrtmform" autocomplete="off"><table style="width: 100%;"><tr><td class="label"><label>Tasks count</label></td><td class="field" colspan="2"><span><input id="abbrtm_taskscount_on" name="showtaskscount" type="radio" /><label for="abbrtm_taskscount_on" style="font-weight: normal;">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_taskscount_off" name="showtaskscount" type="radio" /><label for="abbrtm_taskscount_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="label"><label>Tabs on the left</label></td><td class="field" colspan="2"><span><input id="abbrtm_tabsontheleft_on" name="abbrtm_tabsontheleft" type="radio" /><label for="abbrtm_tabsontheleft_on" style="font-weight: normal;">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_tabsontheleft_off" name="abbrtm_tabsontheleft" type="radio" /><label for="abbrtm_tabstotheleft_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="label"><label>Quick add list</label></td><td class="field" colspan="2"><span><input id="abbrtm_quickaddlist_on" name="abbrtm_quickaddlist" style="font-weight: normal;" type="radio">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_quickaddlist_off" name="abbrtm_quickaddlist" type="radio" /><label for="abbrtm_quickaddlist_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="label"><label>Unique URL for list/task</label></td><td class="field" colspan="2"><span><input id="abbrtm_uniqueurl_on" name="abbrtm_uniqueurl" style="font-weight: normal;" type="radio">On</label></span><span style="padding-left: 9px;"><input id="abbrtm_uniqueurl_off" name="abbrtm_uniqueurl" type="radio" /><label for="abbrtm_uniqueurl_off" style="font-weight: normal;">Off</label></span></td></tr><tr><td class="hiddenlabel"><label for="settingssubmit">Save Changes</label></td><td class="field" colspan="2"><input id="abbrtm_settingssubmit" name="settingssave" type="button" value="Save Changes" /><label for="settingscancel" style="display: none;">Cancel</label><input id="abbrtm_settingscancel" name="settingscancel" type="button" value="Cancel" /></td></tr></table></form></div>';

	this.tasksCount_on = document.getElementById("abbrtm_taskscount_on");
	this.tasksCount_off = document.getElementById("abbrtm_taskscount_off");
	this.tabsOnTheLeft_on = document.getElementById("abbrtm_tabsontheleft_on");
	this.tabsOnTheLeft_off = document.getElementById("abbrtm_tabsontheleft_off");
	this.quickAddList_on = document.getElementById("abbrtm_quickaddlist_on");
	this.quickAddList_off = document.getElementById("abbrtm_quickaddlist_off");
	this.uniqueURL_on = document.getElementById("abbrtm_uniqueurl_on");
	this.uniqueURL_off = document.getElementById("abbrtm_uniqueurl_off");
	this.settingsSave = document.getElementById("abbrtm_settingssubmit");
	this.settingsCancel = document.getElementById("abbrtm_settingscancel");
	this.settingsSave.disabled = true;
	this.settingsCancel.disabled = true;
}

ABBRTM.Settings.prototype.init = function()
{
	this.mbn = this.getUniqueMessageBusName();
	this.loadSettings();

	var that = this;
	var optionClickHandler = function()
	{
		that.settingsSave.disabled = false;
		that.settingsCancel.disabled = false;
	}

	var cancelClickHandler = function(event)
	{
		that.loadSettings();
		that.settingsSave.disabled = true;
		that.settingsCancel.disabled = true;
		return false;
	}

	var saveClickHandler = function()
	{
		that.saveSettings();
		that.settingsSave.disabled = true;
		that.settingsCancel.disabled = true;
		
		location.reload(true);
	}

	this.tasksCount_on.addEventListener("click", optionClickHandler, false);
	this.tasksCount_off.addEventListener("click", optionClickHandler, false);
	this.tabsOnTheLeft_on.addEventListener("click", optionClickHandler, false);
	this.tabsOnTheLeft_off.addEventListener("click", optionClickHandler, false);
	this.quickAddList_on.addEventListener("click", optionClickHandler, false);
	this.quickAddList_off.addEventListener("click", optionClickHandler, false);
	this.uniqueURL_on.addEventListener("click", optionClickHandler, false);
	this.uniqueURL_off.addEventListener("click", optionClickHandler, false);
	this.settingsCancel.addEventListener("click", cancelClickHandler, false);;
	this.settingsSave.addEventListener("click", saveClickHandler, false);;
}

ABBRTM.Settings.prototype.getUniqueMessageBusName = function()
{
	return "abitbetterrtm.settings.";
};

ABBRTM.Settings.prototype.loadSettings = function()
{
	if (ABBRTM.configuration.showTasksCount() === true)
	{
		this.tasksCount_on.checked = 'true';
	}
	else
	{
		this.tasksCount_off.checked = 'true';
	}

	if (ABBRTM.configuration.displayTabsToTheLeft() === true)
	{
		this.tabsOnTheLeft_on.checked = 'true';
	}
	else
	{
		this.tabsOnTheLeft_off.checked = 'true';
	}

	if (ABBRTM.configuration.quickAddList() === true)
	{
		this.quickAddList_on.checked = 'true';
	}
	else
	{
		this.quickAddList_off.checked = 'true';
	}

	if (ABBRTM.configuration.uniqueURLForListAndTask() === true)
	{
		this.uniqueURL_on.checked = 'true';
	}
	else
	{
		this.uniqueURL_off.checked = 'true';
	}
};

ABBRTM.Settings.prototype.saveSettings = function()
{
	ABBRTM.configuration.showTasksCount(this.tasksCount_on.checked);
	ABBRTM.configuration.displayTabsToTheLeft(this.tabsOnTheLeft_on.checked);
	ABBRTM.configuration.quickAddList(this.quickAddList_on.checked && this.tabsOnTheLeft_on.checked);
	ABBRTM.configuration.uniqueURLForListAndTask(this.uniqueURL_on.checked);
};

ABBRTM.Settings.prototype.hide = function()
{
	this.div.style.display = "none";
};

ABBRTM.Settings.prototype.show = function()
{
	this.div.style.display = "";
};
