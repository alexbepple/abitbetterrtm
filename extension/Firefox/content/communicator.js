var ABBRTM = window.ABBRTM || {};

ABBRTM.Communicator = function() {
	this.eventName = "ELWMSDataTransferEvent";
	this.callbackEventName = "ELWMSDataBackchannelEvent";
	this.elementID = "elwmsdataelement";
	this.elementName = "ELWMSDataElement";
	this.element = document.createElement(this.elementName);
	$(this.element).attr(
		{
			id: this.elementID,
			data: "",
			returnvalue: ""
		}
	);

	document.documentElement.appendChild(this.element);
} 

ABBRTM.Communicator.prototype.call = function(data, callback) {
	if (callback) {
		$(this.element).bind(this.callbackEventName, callback);
	}

	$(this.element).attr("data", escape(JSON.stringify(data)));

	var ev = document.createEvent("Event");
	ev.initEvent(this.eventName, true, false);
	this.element.dispatchEvent(ev);
};
