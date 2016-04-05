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
        $.mobile.loading( 'show', {text: "Buscando dispositivos. Espere...", textVisible: true, textonly: false});
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
                })
                $("#unpaired a").on("tap", fn.doThisOnTap);
                $.mobile.loading( 'hide');
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
        $.mobile.loading( 'show', {theme: 'd', text: "Espere, conectando...", textVisible: true, textonly: true});
        bluetoothSerial.connect(address, 
            function() {
                $.mobile.loading( 'hide');
                alert("Conexión exitosa");
                $("#home").attr("addr", address);
                $("#home").attr("connected","true");
                $("#home div[data-role=footer]").empty();
                $("#home div[data-role=footer]").append('<a href="#connectDialog" data-rel="dialog" data-role="button" class="ui-btn-active" data-icon="delete">Desconectar</a>');
                $('#home div[data-role=footer] [data-role="button"]').button(); 
                window.location.href = "#home"; 
            },
            function() {
                $.mobile.loading( 'hide');
                alert("Problemas de conexión");
                window.location.href = "#home"; 
            }
        );
    },

    btWrite: function(data){
        bluetoothSerial.write(data, 
            function() {
                alert("Datos enviados con exito");
            },
            function() {
                alert("Error al enviar los datos");
            }
        );
    },

    btDisconnect: function(){
        bluetoothSerial.disconnect(
            function() {
                alert("Desconectado exitosamente");
                $("#home").attr("connected","false");
                $("#home div[data-role=footer]").empty();
                $("#home div[data-role=footer]").append('<a href="#connectDialog" data-rel="dialog" data-role="button" class="ui-btn-active" data-icon="check">Conectar</a>');
                $('#home div[data-role=footer] [data-role="button"]').button(); 
                window.location.href = "#home"; 
            },
            function() {
                alert("Problemas con el dispositivo");
                window.location.href = "#home"; 
            }
        );
    }
}