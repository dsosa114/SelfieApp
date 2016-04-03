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
                $("#home").attr("connected","true");
                $("#home div[data-role=footer]").empty();
                $("#home div[data-role=footer]").append('<a data-role="button" class="ui-btn-active" data-icon="delete">Desconectar</a>');
                $('#home div[data-role=footer] [data-role="button"]').button(); 
                $("#home div[data-role=footer] a").on("tap", fn.conectarDispositivo);
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
                $("#home").attr("connected","false");
                $("#home div[data-role=footer]").empty();
                $("#home div[data-role=footer]").append('<a data-role="button" class="ui-btn-active" data-icon="check">Conectar</a>');
                $('#home div[data-role=footer] [data-role="button"]').button(); 
                $("#home div[data-role=footer] a").on("tap", fn.conectarDispositivo);
            },
            function() {
                alert("Problemas con el dispositivo");
            }
        );
    }
}