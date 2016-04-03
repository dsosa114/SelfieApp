var nb = {
	exito: function(){
		//alert("Exito: Bluetooth esta activado");
		nb.btSearching();
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

    btSearching: function(){
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
                $("#popSearch").popup("open");
                devices.forEach(function(device) {
                    var listItem = "<li><a href='#' id='" + device.address + "'>" + device.name + "</a></li>";
                    $("#unpaired").append(listItem).listview('refresh');
                })
                $("#unpaired a").on("tap", fn.doThisOnTap);
                $("#popSearch").popup("close");
                alert("Enlistados todos los dispositivos encontrados");
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
                $("#home").attr("connected","false");
    		}
		);
	},

    btConnect: function(address){
        bluetoothSerial.connect(address, 
            function() {
                alert("Conexión exitosa");
                $("#home").attr("addr", address);
            },
            function() {
                alert("Problemas de conexión");
            }
        );
    },

    btDisconnect: function(){
        bluetoothSerial.disconnect(
            function() {
                alert("Desconectado exitosamente");
            },
            function() {
                alert("Problemas con el dispositivo");
            }
        );
    }
}