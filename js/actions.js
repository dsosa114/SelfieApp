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
		if($("#home").attr("connected") == undefined || $("#home").attr("connected") == "false"){
			//alert("moving to devices");
			//$("#home div[data-role=footer]").html('<a href="#" data-role="button" class="ui-btn-active" data-icon="check">Conectado</a>');
			window.location.href = "#devices"; //window: pantalla del navegador
		}

		$(document).on('pagebeforeshow', '#home', function(){
			fn.isConnected();   
    		if($("#home").attr("connected") == undefined || $("#home").attr("connected") == "false"){
				$("#home div[data-role=footer]").empty();
				$("#home div[data-role=footer]").append('<a data-role="button" class="ui-btn-active" data-icon="check">Conectar</a>');
				$('#home div[data-role=footer] [data-role="button"]').button(); 
				$("#home div[data-role=footer] a").on("tap", fn.conectarDispositivo);
			}else if($("#home").attr("connected") == "true"){
				$("#home div[data-role=footer]").empty();
				$("#home div[data-role=footer]").append('<a data-role="button" class="ui-btn-active" data-icon="delete">Desconectar</a>');
				$('#home div[data-role=footer] [data-role="button"]').button(); 
				$("#home div[data-role=footer] a").on("tap", fn.conectarDispositivo);
			}
		});

		$("#foto").tap(fn.tomarFoto);
		$("#devices div[data-role=header] a").tap(fn.buscarDispositivos);
		$("#disConBtn").tap(fn.conectarDesconectar);
		$("#home div[data-role=footer] a").on("tap", fn.conectarDispositivo);
		$(".slider-rgb").on("slidestop", fn.cambioColor);
		$("#displayBox").on("tap", function(){alert("Color = " + $(this).css("background-color"));});

		fn.ponerFecha();
		
	},

	cambioColor: function(event,ui){
		var red = parseInt($("#theSlider1").val()).toString(16);
		var green = parseInt($("#theSlider2").val()).toString(16);
		var blue = parseInt($("#theSlider3").val()).toString(16);

		var color = "#" + red + green + blue;

		$('#displayBox').css("background-color", color);
	},

	conectarDispositivo: function(){
		if($("#home").attr("addr") == undefined){
			//alert("moving to devices");
			//$("#home div[data-role=footer]").html('<a href="#" data-role="button" class="ui-btn-active" data-icon="check">Conectado</a>');
			window.location.href = "#devices"; //window: pantalla del navegador
		}else{
			$("#connectDialog").popup("open");
		}

	},

	conectarDesconectar: function(){
		var address = $("#home").attr("addr");
		$("#connectDialog").popup("close");

		if($("#home").attr("connected") == "false"){
			alert("Conectando..." + address);
			nb.btConnect(address);
		}else if($("#home").attr("connected") == "true"){
			alert("Desconectando...");
			nb.btDisconnect();
		}
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
		if($("#home").attr("connected") == "true"){
			nb.btWrite("Color = " + $("#displayBox").css("background-color"));
		}else if($("#home").attr("connected") == "false"){
			alert("No hay dispositivos conectados")
		}
		mc.abrirCamara();
	}

};

//EJECUTAR EN PHONEGAP
//
$(fn.deviceready);

//EJECUTAR EN NAVEGADOR
//fn.init(); Ejecución por JS
//$(fn.init); //Ejecución por jQuery