var nb = {
	exito: function(){
		alert("Exito")
    	return true;
	}, 
	error: function(){
		alert("Error");
		return false;
	},
	abrirCamara: function(){
		bluetoothSerial.isEnabled(nb.exito, nb.error);
	}
}