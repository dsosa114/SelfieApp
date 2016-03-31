var fn = {

	deviceready: function(){
		//Esto es necesario para PhoneGap para que pueda ejecutar la aplicación
		document.addEventListener("deviceready", fn.init, false);
	},

	init: function(){

		//alert("Iniciando aplicación");

		$(document).on("pagecreate", "#color", function(){
			fn.highlightColor($("#theSlider1"),"#FF0000");
			$("#theSlider1").on("change", function(){
        		fn.highlightColor($(this),"#FF0000");
    		});
    		fn.highlightColor($("#theSlider2"),"#00FF00");
			$("#theSlider2").on("change", function(){
        		fn.highlightColor($(this),"#00FF00");
    		});
    		fn.highlightColor($("#theSlider3"),"#0000FF");
			$("#theSlider3").on("change", function(){
        		fn.highlightColor($(this),"#0000FF");
    		});
    		$(".ui-slider-input").each(function(index){
        		var className = $(this).data("glowclass");
        		$(this).closest(".ui-slider").addClass(className);
    		});
    				
		});

		fn.isConnected();

		//bluetooth conectado?
		if($("#home").attr("connected") == undefined){
			//alert("moving to devices");
			window.location.href = "#devices"; //window: pantalla del navegador
		}

		$("#foto").tap(fn.tomarFoto);
		$("#devices div[data-role=header] a").tap(fn.buscarDispositivos);
		fn.ponerFecha();
		
	},

	highlightColor: function(slider, bgcolor){
		var color = bgcolor;
		//var glowClass = "glowRed";

  		slider.closest(".ui-slider").find(".ui-slider-bg").css("background-color", color);
  		//slider.parents(".glow").removeClass("glowBlue glowYellow glowRed glowGreen").addClass(glowClass);      
	},

	ponerFecha: function(){
		var fecha = new Date();
		var dia = fecha.getDate();
		var mes = fecha.getMonth()+1; // Los meses empiezan desde 0
		var year = fecha.getFullYear();

		var hoy = dia + "/" + mes + "/" +year;

		$(".fecha").html(hoy);

	},

	isConnected: function(){
		try{
			nb.btIsConnected();
		}catch(error){
			alert(error);
			return false;
		}
	},

	doThisOnTap: function(event, ui){
		var address = $(this).attr("id");
       	alert(address);
       	nb.btConnect(address);
	},

	buscarDispositivos: function(){
		$("#paired").empty();
		$("#paired").append("<li data-role='list-divider'>Paired</li>").listview('refresh');
		$("#unpaired").empty();
		$("#unpaired").append("<li data-role='list-divider'>Unpaired</li>").listview('refresh');
		nb.btIsEnabled();
	},

	tomarFoto: function(){
		//alert("Abriendo camara");
		mc.abrirCamara();
	}

};

//EJECUTAR EN PHONEGAP
//
$(fn.deviceready);

//EJECUTAR EN NAVEGADOR
//fn.init(); Ejecución por JS
//$(fn.init); //Ejecución por jQuery