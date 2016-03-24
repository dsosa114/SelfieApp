var nb = {
	btIsEnabled: function(){
		networking.bluetooth.getAdapterState(function (adapterInfo) {
    		if(adapterInfo.enabled !== enabled){
    			return false;
    		}else{
    			return true;
    		}
    	});
	}
}