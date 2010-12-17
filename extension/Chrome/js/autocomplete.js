ABBRTM = window.ABBRTM || {};

ABBRTM.Autocomplete = function(name, autocompleteStore, owner, callback)
{
	var autocompleteBox = document.createElement('div');
	autocompleteBox.setAttribute("id", "autocompleteBox_" + name);
	autocompleteBox.style.width = "240px";
	autocompleteBox.style.position = "absolute";
	autocompleteBox.style.zIndex = "999";
	autocompleteBox.innerHTML = '<div class="white_rbroundbox"> <div class="white_rbtop"> <div> <div></div> </div> </div> <div class="white_rbcontentwrap"> <div class="white_rbcontent"> <div class="taskcloudcontent" style="padding: 0px 5px 0px 5px; height: 17px;" id="listtabscontainer"><div style="width: 70px; font-weight: bold; float: left; height: 17px; padding-top: 1px;">' + name + '</div><div style="text-align: right; float: right; width: 155px; padding-right: 2px;"><input type="text" id="autocompleteInputField_' + name + '" name="text" style="width: 151px;  ";/></div> </div> </div> </div> <div class="white_rbbot"> <div><div></div> </div> </div> </div> ';

	document.body.appendChild(autocompleteBox);

	this.inputField = document.getElementById("autocompleteInputField_" + name);
	this.box = document.getElementById("autocompleteBox_" + name);
	this.autocompleteList = new ABBRTM.AutocompleteList(this.inputField, autocompleteStore, this);
	this.owner = owner;
	this.callback = callback;
	this.hide();
	this.bind();
	
	function centerAutoCompleteBox()
	{
		var left = window.innerWidth / 2 - 120 + window.scrollX;
		var top = window.innerHeight / 2 - 10 + window.scrollY;

		autocompleteBox.style.left = left + "px";
		autocompleteBox.style.top = top + "px";
	}

	centerAutoCompleteBox();
	window.addEventListener("scroll", centerAutoCompleteBox, false);
	window.addEventListener("resize", centerAutoCompleteBox, false);

	return this;
}

ABBRTM.Autocomplete.prototype.show = function()
{
	this.box.style.display = "block";
	if (this.inputField)
	{
		this.inputField.focus();
	}
};

ABBRTM.Autocomplete.prototype.hide = function()
{
	this.box.style.display = "none";
	if (this.inputField)
	{
		this.inputField.value = "";
	}
	
	this.autocompleteList.clearOutput();
};

ABBRTM.Autocomplete.prototype.doCallback = function()
{
	var completion = this.autocompleteList.getCurrentCompletion();
	this.hide();

	if (this.owner)
	{
		this.callback.call(this.owner, completion);
	}
	else
	{
		this.callback(completion);
	}
};

ABBRTM.Autocomplete.prototype.bind = function()
{
	var autocompleteList = this.autocompleteList;
	var inputField = this.inputField;
	var currentText = "";

	var handleKeyDownEvent = function(event)
	{
		currentText = inputField.value;
		if (event.keyCode == 9) // Tab
		{
			utility.stopEvent(event);
			return false;
		}
		else if (autocompleteList.isVisible)
		{
			if (event.keyCode == 13)// Enter
			{
				inputField.blur();
				autocompleteList.parent.doCallback();
			}
			if (event.keyCode == 40)// Key down
			{
				autocompleteList.highlightNextCompletion();
			}
			else if (event.keyCode == 38)  // Key up
			{
				autocompleteList.highlightPreviousCompletion();
			}
			else if (event.keyCode == 27) // Esc
			{
				autocompleteList.clearOutput();
			}
		}
		else if (event.keyCode == 27)
		{
			inputField.blur();
			autocompleteList.parent.hide();
			utility.stopEvent(event);
			return false;
		}
	
		return true;
	};
	var handleKeyUpEvent = function(event)
	{
		if (currentText === null || currentText != inputField.value)
		{
			autocompleteList.update();
		}
	};
	var handleClickEvent = function(event)
	{
		if (autocompleteList.isVisible)
		{
			autocompleteList.hideOutput();
		}

		if (utility)
		{
			utility.stopEvent(event);
		}
	};

	this.inputField.setAttribute("autocomplete", "off");
	this.inputField.addEventListener("keydown", handleKeyDownEvent, false);
	this.inputField.addEventListener("keyup", handleKeyUpEvent, false);
	this.box.addEventListener("click", handleClickEvent, false);
	this.autocompleteList.createOutput();
};
