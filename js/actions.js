var fn() = {

	deviceready: function(){
		//Esto es necesario para PhoneGap para que pueda ejecutar la aplicación
		document.addEventListener("deviceready", fn.init, false);
	},

	init: function(){

		alert("Iniciando aplicación");

		$("#camara").tap(fn.tomarFoto);
		fn.ponerFecha();
		//bluetooth activado?
		//nb.btIsEnabled();
	},

	ponerFecha: function(){
		var fecha = new Date();
		var dia = fecha.getDate();
		var mes = fecha.getMonth()+1; // Los meses empiezan desde 0
		var year = fecha.getFullYear();

		var hoy = dia + "/" + mes + "/" +year;

		$(".fecha").html(hoy);
	},

	tomarFoto: function(){
		mc.abrirCamara();
	}

};

//EJECUTAR EN PHONEGAP
$(fn.deviceready);

//EJECUTAR EN NAVEGADOR
//fn.init(); Ejecución por JS
//$(fn.init); //Ejecución por jQuery