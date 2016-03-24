var nb = {
	exito: function(){
		alert("Exito: Bluetooth esta activado");
	}, 
	error: function(){
		alert("Error: Bluetooth esta desactivado");
	},
	btIsEnabled: function(){
		bluetoothSerial.isEnabled(nb.exito, nb.error);
	}
}