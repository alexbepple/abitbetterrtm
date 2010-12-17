ABBRTM = window.ABBRTM || {};

ABBRTM.Shortcut = function(key, owner, method, ctrlKey, shiftKey, altKey)
{
	this.key = key;
	this.owner = owner;
	this.method = method;
	this.ctrlKey = ctrlKey;
	this.shiftKey = shiftKey;
	this.altKey = altKey;
}

ABBRTM.Shortcut.prototype.run = function()
{
	if (this.method) {
		if (this.owner) {
			this.method.call(this.owner);	
		}
		else {
			this.method();
		}
	}
};
