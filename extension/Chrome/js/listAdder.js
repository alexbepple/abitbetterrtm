ABBRTM = window.ABBRTM || {};

ABBRTM.ListAdder = function()
{
	this.$div = $('<div>')
	.width(90)
	.attr({id: "listAdder"})
	.addClass("addEntryTask")
	.css({padding: "3px"})
	.html('<div><img class="taskaddicon" src="http://static.rememberthemilk.com/img/ico/ico_add.gif" alt="Add task"><a title="Add list" href="#" class="taskadd" style="text-decoration: underline;">Add List</a></div>');

	this.$progressBar = $('<img/>')
	.attr({src: "data:image/gif;base64,R0lGODlhCgAKALMIAP7%2B%2FuDg4MzMzL29vbCwsJycnI2NjXx8fP4BAgAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFBwAIACwAAAAACgAKAAAELxChUM4pQaJh%2BxnTYRwAwB2UAYxGwFUBEFiqt1rxXA0Bu2KWQUmE2niCGooFI4kAACH5BAUHAAgALAEAAQAIAAgAAAQaEElkJiKhCklQsMiBDCBIitbXIZsRrFIFSBEAIfkEBQcACAAsAQABAAgACAAABB8QIUOOlAKMMtHJFSJIgWGQ6GQEmEeI1lkMwHgdxIlEACH5BAUHAAgALAIAAQAGAAgAAAQZEI2JkAlgGBkCEhUCVMCIHCHoDdYABJtERQAh%2BQQFBwAIACwCAAEABgAIAAAEFxAdhIwUCIiJCDEEII1k9nnUIYhblSIRACH5BAUHAAgALAIAAQAGAAgAAAQZEKFDihwSEIGMGIYkDpjYDUIoEMAlFcQhRQAh%2BQQFBwAIACwBAAEACAAIAAAEGhBJdIyZKOSBUQHApSHWIVVXRoJFN2ijVGIRACH5BAUHAAgALAEAAQAIAAgAAAQgEEl5jjQCBVEMGleAdJUkAMMAZEhlFJr3Ia8gCnI5IREAIfkEBQcACAAsAQACAAgABgAABBkQHQTAOMeYgrpAA8BNiPBJSGGVXaphIYBGADs%3D"})
	.css({display: "none"})
	.appendTo(this.$div.children().eq(0));

	this.$listEntryBox = $('<input/>')
	.attr({type: "text"})	   
	.css({display: "none", marginTop: "5px"})
	.appendTo(this.$div);

	var that = this;
	var handleLostFocus = function(e) {
		that.$listEntryBox.hide();
	};

	var handleAddListClick = function(e) {
		that.showListEntryBox();
		e.stopPropagation();
	};

	var handleKeyDownEvent = function(e) {
		if (e.which === 13) { //Enter
			that.$progressBar.show();
			if (!that.addList(that.$listEntryBox.val())) {
				that.$progressBar.hide();
			}
		}
		else if (e.which === 0 || e.which === 27) { // Esc
			that.$listEntryBox.blur();
			that.$listEntryBox.val("");
			that.$listEntryBox.hide();
		}

		return true;
	};

	var handleAddingListSuccess = function() {
		that.$listEntryBox.blur();
		that.$listEntryBox.val("");
		that.$listEntryBox.hide();
		that.$progressBar.hide();
	}

	this.$listEntryBox.keydown(handleKeyDownEvent);
	this.$listEntryBox.blur(handleLostFocus);
	this.$div.click(handleAddListClick);

	ABBRTM.Utility.appendToMethod(control, "addingListAddSuccess", null, handleAddingListSuccess);
}

ABBRTM.ListAdder.prototype.showListEntryBox = function()
{
	this.$listEntryBox.css({width: ($("#listtabs").width() - 8) + "px"});
	this.$listEntryBox.show();
	this.$listEntryBox.focus();
}

ABBRTM.ListAdder.prototype.addList = function(listName)
{
	if (!listName || listName === "" || listName.toLowerCase() == "inbox" || listName.toLowerCase() == "sent" || listName.toLowerCase() == _T("INTERFACE_TASKS_INBOX").toLowerCase() || listName.toLowerCase() == _T("INTERFACE_TASKS_SENT").toLowerCase()) {
		statusBox.setText(_T("INTERFACE_STATUS_CANT_CALL_LIST", {"LIST_NAME" : listName}), false, true);
		return false
	}

	transMgr.request("lists.add", utility.encodeJavaScript( { "name" : listName, "id" : ""}));

	return true;
}
