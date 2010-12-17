ABBRTM = window.ABBRTM || {};

ABBRTM.init = function() {
	ABBRTM.configuration = new ABBRTM.Configuration();
	ABBRTM.utility = new ABBRTM.Utility();
	ABBRTM.aBitBetterRTM = new ABBRTM.ABitBetterRTM();
	ABBRTM.location = new ABBRTM.Location();
}

if (searchMgr) {
	ABBRTM.init();
}
else {
	messageBus.subscribe(ABBRTM.init, "rtm.initFinished");
}

