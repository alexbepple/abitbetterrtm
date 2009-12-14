var ABBRTM = window.ABBRTM || {};

$(document).ready(function() {
	$(document).bind("configurationLoaded", function() {
		ABBRTM.aBitBetterRTM = new ABBRTM.ABitBetterRTM();
		ABBRTM.location = new ABBRTM.Location();
	});

	ABBRTM.communicator = new ABBRTM.Communicator();
	ABBRTM.configuration = new ABBRTM.Configuration();
	ABBRTM.configuration.init();
	ABBRTM.utility = new ABBRTM.Utility();
});
