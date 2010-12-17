ABBRTM = window.ABBRTM || {};

ABBRTM.AutocompleteList = function(inputField, autocompleteStore, parent)
{
	this.inputField = inputField;
	this.autocompleteStore = autocompleteStore;
	this.parent = parent;
	this.output = null;
	this.completions = null;
	this.position = -1;
	this.isVisible = false;
}

ABBRTM.AutocompleteList.prototype.createOutput = function()
{
	if (!this.inputField)
	{
		return;
	}

	this.output = document.createElement('div');
	this.output.setAttribute('id','autoCompleteList_' + this.inputField.id);
	this.output.style.border = "solid 1px black";
	this.output.style.background = "white";
	this.output.style.position = "absolute";
	this.output.style.width = "150px";
	this.output.style.visibility = "hidden";

	this.inputField.parentNode.insertBefore(this.output, this.inputField.nextSibling);
};

ABBRTM.AutocompleteList.prototype.showOutput = function()
{
	if (this.output)
	{
	   this.output.style.visibility = "visible";
	}

	this.isVisible = true;
};

ABBRTM.AutocompleteList.prototype.hideOutput = function()
{
	if (this.output)
	{
		this.output.style.visibility = "hidden";
	}

	this.isVisible = false;
};

ABBRTM.AutocompleteList.prototype.clearOutput = function()
{
	while(this.output && this.output.childNodes.length)
	{
		this.output.removeChild(this.output.firstChild);
	}

	this.position = -1;
	this.hideOutput();
};

ABBRTM.AutocompleteList.prototype.addCompletion = function(completion)
{
	var autocompleteList = this;

	var mouseOverHandler = function(event)
	{
		autocompleteList.position = this.position;
		autocompleteList.highlightCompletion();
	};

	var mouseClickHandler = function(event)
	{
		autocompleteList.parent.doCallback();
	};

	var completionBox = document.createElement("div");
	completionBox.style.textAlign = "left";
	completionBox.style.paddingLeft = "2px";
	completionBox.appendChild(document.createTextNode(completion));
	completionBox.position = this.output.childNodes.length;
 	completionBox.addEventListener("mouseover", mouseOverHandler, false);
 	completionBox.addEventListener("click", mouseClickHandler, false);
	this.output.appendChild(completionBox);
};

ABBRTM.AutocompleteList.prototype.highlightCompletion = function()
{
	if (this.output && this.output.childNodes)
	{
		for (var i = 0; i < this.output.childNodes.length; ++i)
		{
			if (i == this.position)
			{
				this.output.childNodes[i].style.color = "white";
				this.output.childNodes[i].style.background = "#316ac5";
			}
			else
			{
				this.output.childNodes[i].style.color = "black";
				this.output.childNodes[i].style.background = "white";
			}
		}
	}
};

ABBRTM.AutocompleteList.prototype.highlightNextCompletion = function()
{
	if (this.completions && this.completions.length > 0 && this.position < this.completions.length - 1)
	{
		++this.position;
		this.highlightCompletion();
	}
};

ABBRTM.AutocompleteList.prototype.highlightPreviousCompletion = function()
{
	if (this.completions && this.completions.length > 1 && this.position > 0)
	{
		--this.position;
		this.highlightCompletion();
	}
};

ABBRTM.AutocompleteList.prototype.getCurrentCompletion = function()
{
	if (this.completions && this.completions.length > 0)
	{
		return this.completions[this.position];
	}

	return null;
};

ABBRTM.AutocompleteList.prototype.update = function()
{
	if (this.inputField.value.length > 0)
	{
		this.completions = this.autocompleteStore.getCompletions(this.inputField.value);
		if (this.completions && this.completions.length > 0)
		{
			this.clearOutput();
			for (var i = 0; i < this.completions.length; ++i)
			{
				this.addCompletion(this.completions[i]);
			}

			this.showOutput();
			this.highlightNextCompletion();
		}
		else
		{
			this.hideOutput();
			this.position = -1;
		}
	}
	else
	{
		this.hideOutput();
		this.position = -1;
	}
};
