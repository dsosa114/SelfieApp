var nb = {
	exito: function(){
		alert("Exito: Bluetooth esta activado");
		bluetoothSerial.list(
			function(devices) {
    			devices.forEach(function(device) {
        			var listItem = "<li><a href='#' id='" + device.address + "'>" + device.name + "</a></li>";
					$("#paired").append(listItem).listview('refresh');
    			})
                $("#paired a").on("tap", fn.doThisOnTap);
            }
    	);
    	bluetoothSerial.discoverUnpaired(
    		function(devices) {
    			devices.forEach(function(device) {
        			var listItem = "<li><a href='#' id='" + device.address + "'>" + device.name + "</a></li>";
					$("#unpaired").append(listItem).listview('refresh');
                    alert(listItem);
    			})
                $("#paired a").on("tap", fn.doThisOnTap);
                alert("Enlistados todos los dispositivos encontrados");
            }
		);
	}, 

	error: function(){
		alert("El bluetooth esta desactivado, activando bluetooth");
		bluetoothSerial.enable(
    		function() {
        		nb.exito();
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
        		$("#home").attr("connected","true");
    		},
    		function() {
        		alert("No hay dispositivos conectados");
    		}
		);
	},

    btConnect: function(address){
        bluetoothSerial.connect(address, 
            function() {
                alert("Conexión exitosa");
            },
            function() {
                alert("Problemas de conexión");
            }
        );
    }
}