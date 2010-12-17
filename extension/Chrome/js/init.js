ABBRTM = window.ABBRTM || {};

ABBRTM.init = function() {
	ABBRTM.configuration = new ABBRTM.Configuration();
	ABBRTM.utility = new ABBRTM.Utility();
	ABBRTM.aBitBetterRTM = new ABBRTM.ABitBetterRTM();
	ABBRTM.location = new ABBRTM.Location();
}

function initializeABBRTM() {
    if (searchMgr) {
        ABBRTM.init();
    }
    else if (messageBus && messageBus.subscribe){
        messageBus.subscribe(ABBRTM.init, "rtm.initFinished");
    }
    else {
        setTimeout(initializeABBRTM, 500);
    }
}

initializeABBRTM();

