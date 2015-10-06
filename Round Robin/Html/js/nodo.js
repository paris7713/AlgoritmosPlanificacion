//constructor
var Nodo = function(nombre, tiempo, metrica, recurso, procesador, estado){
	this.proceso = nombre;
	this.tiempo = tiempo;
	this.metrica = metrica;
	this.metricaTmp = metrica;
	this.procesador = procesador;
	this.siguiente = null;
	this.anterior = null;
	this.recurso = recurso;
	this.estado = estado;
	this.contador = 0;
	this.contadorListo = 0;
	this.contadorBloqueado = 0;
	this.contadorSuspendido = 0;
	this.contadorCritico = 0;
	this.contadorFinalizado = 0;
	this.flagBloqueado = false;
	this.divId;
} 
//--------------------------------------------------------------------------------------------------------------------------------------------
Nodo.prototype.setEstado = function (estado){
	this.estado = estado;
}
//--------------------------------------------------------------------------------------------------------------------------------------------
Nodo.prototype.setDivId = function (divId){
	this.divId = divId;
}
//--------------------------------------------------------------------------------------------------------------------------------------------
Nodo.prototype.dibujarGanttNodo = function (){
	var nodo = this;	
	var cant = 1;
	cant = cant + 1;
	var tiempoEspera;
	var tiempoProporcionRespuesta;
	var tiempoProporcionRespuestaTotal;
	var tiempoProporcionPenalizacion;
	var tiempoRespuesta;
	var proporcionRespuesta = new Array();	
	var respuesta;
	
	nodo.contador = 1;
	$(nodo.divId).append('<label class="text col-lg-2 control-label">Proceso ' + nodo.proceso + ':</label>'
		+'<div class="progress progress-striped" id ="progreso' + nodo.proceso + '"></div>');

	setInterval(function (){		
		nodo.contador = nodo.contador + 1;
		if(nodo.estado == "listo"){
			var contadorL = 0;
			contadorL = contadorL + 1;
			nodo.contadorListo = nodo.contadorListo + 1;
		
			//Limpieza de divs
			$('#espera'+ nodo.proceso).remove();
			$('#penalizacion'+ nodo.proceso).remove();
			$('#tiempoN'+ nodo.proceso).remove();
			$('#respuesta'+ nodo.proceso).remove();
			
			//Calculo de metrica Waiting time			
			if($('#espera'+ nodo.proceso).length == 0){
				$('#espera').append('<li id = "espera' + nodo.proceso + '"></li>');	
			}			
			tiempoEspera = (nodo.contadorListo*100)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido);
			$('#espera'+ nodo.proceso).append(nodo.proceso + ' ' + tiempoEspera.toFixed(3)  + ' %');
			
			//Calculo metrica tiempo de retorno
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;
			$('#respuesta'+ nodo.proceso).append(nodo.proceso + ' ' + respuesta  + ' mSeg');
			
			//Calculo de metrica proporcion de penalizacion
			if($('#penalizacion'+ nodo.proceso).length == 0){
				$('#penalizacion').append('<li id = "penalizacion' + nodo.proceso + '"></li>');	
			}	
			tiempoProporcionPenalizacion = (((nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorSuspendido)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido))*100)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + 
			nodo.contadorSuspendido);
			$('#penalizacion' + nodo.proceso).append(nodo.proceso + ' ' + tiempoProporcionPenalizacion.toFixed(3) + ' %');
			
			//Calculo metrica tiempo de respuesta
			if(this.flagBloqueado == true){
				tiempoRespuesta = tiempoRespuesta + nodo.contadorListo;
				this.flagBloqueado = false
				
				if($('#tiempoN' + nodo.proceso).length == 0){
					$('#tiempoN').append('<li id = "tiempoN' + nodo.proceso + '"></li>');	
				}
				$('#tiempoN'+ nodo.proceso).append(nodo.proceso + ' ' + tiempoRespuesta  + ' mSeg');
			}
			
			//Dibujo de Progreso en el Gantt
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-success" style="width:'+ (contadorL)*0.5 + '%'+'"></div>');
		}
		else if (nodo.estado == "bloqueado"){
			var contadorB = 0;
			contadorB = contadorB + 1;
			nodo.contadorBloqueado = nodo.contadorBloqueado + 1;
			tiempoRespuesta = 0;
			
			//Limpieza de divs
			$('#penalizacion'+ nodo.proceso).remove();
			$('#respuesta'+ nodo.proceso).remove();			
			
			//Calculo metrica tiempo de retorno
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;			
			$('#respuesta'+ nodo.proceso).append(nodo.proceso + ' ' + respuesta  + ' mSeg');
			
			//Calculo metrica proporcion de penalizacion
			if($('#penalizacion'+ nodo.proceso).length == 0){
				$('#penalizacion').append('<li id = "penalizacion' + nodo.proceso + '"></li>');	
			}	
			tiempoProporcionPenalizacion = (((nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorSuspendido)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido))*100)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + 
			nodo.contadorSuspendido);
			$('#penalizacion' + nodo.proceso).append(nodo.proceso + ' ' + tiempoProporcionPenalizacion.toFixed(3) + ' %');
		
			this.flagBloqueado = true;
			tiempoRespuesta = nodo.contadorBloqueado;
			
			//Dibujo de Progreso en el Gantt
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-danger" style="width:'+ (contadorB)*0.2 + '%'+'"></div>');
		}
		else if (nodo.estado == "suspendido"){
			var contadorS = 0;
			contadorS = contadorS + 1;
			nodo.contadorSuspendido = nodo.contadorSuspendido + 1;
			
			//Limpieza de divs
			$('#penalizacion'+ nodo.proceso).remove();
			$('#respuesta'+ nodo.proceso).remove();
			
			//Calculo metrica tiempo de retorno
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;
			$('#respuesta'+ nodo.proceso).append(nodo.proceso + ' ' + respuesta + ' mSeg');
			
			//Calculo metrica proporcion de penalizacion
			if($('#penalizacion'+ nodo.proceso).length == 0){
				$('#penalizacion').append('<li id = "penalizacion' + nodo.proceso + '"></li>');	
			}	
			tiempoProporcionPenalizacion = (((nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorSuspendido)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido))*100)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + 
			nodo.contadorSuspendido);
			$('#penalizacion' + nodo.proceso).append(nodo.proceso + ' ' + tiempoProporcionPenalizacion.toFixed(3) + ' %');
			
			//Dibujo de Progreso en el Gantt
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-warning" style="width:'+ (contadorS)*0.5 + '%'+'"></div>');
		}
		else if(nodo.estado == "critico"){
			var contadorC = 0;
			contadorC = contadorC + 1;
			nodo.contadorCritico = nodo.contadorCritico + 1;
			
			//Limpieza de divs
			$('#proporcion'+ nodo.proceso).remove();
			$('#respuesta'+ nodo.proceso).remove();
			$('#analisisP'+ nodo.proceso).remove();
					
			//Calculo metrica tiempo de retorno
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;
			$('#respuesta'+ nodo.proceso).append(nodo.proceso + ' ' + respuesta  + ' mSeg');
			
			//Calculo metrica proporcion de respuesta
			if($('#proporcion' + nodo.proceso).length == 0){
				$('#proporcion').append('<li id = "proporcion' + nodo.proceso + '"></li>');	
			}
			tiempoProporcionRespuesta = (nodo.contadorCritico*100)/(nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido);
			$('#proporcion'+ nodo.proceso).append(nodo.proceso + ' ' + tiempoProporcionRespuesta.toFixed(3)  + ' %');
						
			//Dibujo de Progreso en el Gantt
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-primary" style="width:'+ (contadorC)*0.5 + '%'+'"></div>');
		}
		else if(nodo.estado == "finalizado"){
			var contadorF = 0;			
			contadorF = contadorF + 1;
			nodo.contadorFinalizado = nodo.contadorFinalizado + 1;
			tiempoProporcionRespuestaTotal = 0;
			
			//Calculo metrica uso del procesador
			proporcionRespuesta.push(tiempoProporcionRespuesta);
			for(var i = 0; i < proporcionRespuesta.length; i ++){
				tiempoProporcionRespuestaTotal = tiempoProporcionRespuestaTotal + proporcionRespuesta[i];
			}
			
			if(tiempoProporcionRespuestaTotal > 40){
				$('#analisisP').empty();
				$('#analisisP').append(" bueno");
			}
			else{	
				$('#analisisP').empty();			
				$('#analisisP').append(" malo");
			}
			//Dibujo de Progreso en el Gantt
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-info" style="width:'+ (contadorF)*0.5 + '%'+'"></div>');
		}
	}, 1000);
}
//--------------------------------------------------------------------------------------------------------------------------------------------