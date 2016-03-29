var nb = {
	exito: function(){
		alert("Exito: Bluetooth esta activado");
		bluetoothSerial.list(
			function(devices) {
    			devices.forEach(function(device) {
        			var listItem = "<li>" + device.name + "( " + device.address + " )</li>";
					$("#paired").append(listItem);
    			})}
    	);
    	bluetoothSerial.discoverUnpaired(
    		function(devices) {
    			devices.forEach(function(device) {
        			var listItem = "<li>" + device.name + "( " + device.address + " )</li>";
					$("#unpaired").append(listItem);
    		})}
		);
		alert("Enlistados todos los dispositivos encontrados");
	}, 
	error: function(){
		alert("El bluetooth esta desactivado, activando bluetooth");
		bluetoothSerial.enable(
    		function() {
        		alert("Bluetooth esta activado");
    		},
    		function() {
        		alert("The user did *not* enable Bluetooth");
    		}
		);
	},
	btIsEnabled: function(){
		bluetoothSerial.isEnabled(nb.exito, nb.error);
	},

	btIsConnected: function(){
		bluetoothSerial.isConnected(
    		function() {
        		return true;
    		},
    		function() {
        		return false;
    		}
		);
	}
}