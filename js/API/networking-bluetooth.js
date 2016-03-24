var nb = {
	exito: function(){
		alert("Exito")
    	return true;
	}, 
	error: function(){
		alert("Error");
		return false;
	},
	btIsEnabled: function(){
		bluetoothSerial.isEnabled(nb.exito, nb.error);
	}
}