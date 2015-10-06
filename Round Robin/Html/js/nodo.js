//constructor
var Nodo = function(nombre, tiempo, metrica, recurso, procesador, estado){
	this.proceso = nombre;
	this.tiempo = tiempo;
	this.metrica = metrica;	
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
	var tiempoProporcionPenalizacion;
	var tiempoPn;
	maquina.tiempos[0] = 0; // Tiempo en listo 
	maquina.tiempos[1] = 0; // Tiempo en estado critico 
	maquina.tiempos[2] = 0; // Tiempo de ejecucion
	maquina.tiempos[3] = 0; // Tiempo de espera - sin critico	
	
	var respuesta;
	
	nodo.contador = 1;
	$(nodo.divId).append('<label class="text col-lg-2 control-label">Proceso ' + nodo.proceso + ':</label>'
		+'<div class="progress progress-striped" id ="progreso' + nodo.proceso + '"></div>');

	setInterval(function (){		
		nodo.contador = nodo.contador + 1;
		if(nodo.estado == "listo"){
			$('#espera').empty();
			$('#penalizacion').empty();
			$('#waitingTime').empty();
			$('#respuesta'+ nodo.proceso).remove();
			var contadorL = 0;
			contadorL = contadorL + 1;
			nodo.contadorListo = nodo.contadorListo + 1;
			maquina.tiempos[0] = maquina.tiempos[0] + nodo.contadorListo;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorListo;
			maquina.tiempos[3] = maquina.tiempos[3] + nodo.contadorListo;
			tiempoEspera = (maquina.tiempos[0]*100)/maquina.tiempos[2];
			tiempoProporcionPenalizacion = (maquina.tiempos[3]*100)/maquina.tiempos[2];
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;
			$('#respuesta'+ nodo.proceso).append(respuesta  + ' mSeg');
			$('#espera').append(tiempoEspera.toFixed(3) + ' %');
			$('#waitingTime').append(maquina.tiempos[0] + ' mSeg');
			$('#penalizacion').append(tiempoProporcionPenalizacion.toFixed(3) + '%');
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-success" style="width:'+ (contadorL)*0.5 + '%'+'"></div>');
		}
		else if (nodo.estado == "bloqueado"){
			$('#penalizacion').empty();
			$('#respuesta'+ nodo.proceso).remove();
			var contadorB = 0;
			contadorB = contadorB + 1;
			nodo.contadorBloqueado = nodo.contadorBloqueado + 1;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorBloqueado;
			maquina.tiempos[3] = maquina.tiempos[3] + nodo.contadorBloqueado;
			tiempoProporcionPenalizacion = (maquina.tiempos[3]*100)/maquina.tiempos[2];
			$('#penalizacion').append(tiempoProporcionPenalizacion.toFixed(3) + ' %');
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;
			$('#respuesta'+ nodo.proceso).append(respuesta  + ' mSeg');
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-danger" style="width:'+ (contadorB)*0.2 + '%'+'"></div>');
		}
		else if (nodo.estado == "suspendido"){
			$('#penalizacion').empty();
			$('#respuesta'+ nodo.proceso).remove();
			var contadorS = 0;
			contadorS = contadorS + 1;
			nodo.contadorSuspendido = nodo.contadorSuspendido + 1;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorSuspendido;
			maquina.tiempos[3] = maquina.tiempos[3] + nodo.contadorSuspendido;
			tiempoProporcionPenalizacion = (maquina.tiempos[3]*100)/maquina.tiempos[2];
			$('#penalizacion').append(tiempoProporcionPenalizacion.toFixed(3) + ' %');
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;
			$('#respuesta'+ nodo.proceso).append(respuesta + ' mSeg');
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-warning" style="width:'+ (contadorS)*0.5 + '%'+'"></div>');
		}
		else if(nodo.estado == "critico"){
			$('#proporcion').empty();
			$('#respuesta'+ nodo.proceso).remove();
			var contadorC = 0;
			contadorC = contadorC + 1;
			nodo.contadorCritico = nodo.contadorCritico + 1;
			maquina.tiempos[1] = maquina.tiempos[1] + nodo.contadorCritico;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorCritico
			tiempoProporcionRespuesta = (maquina.tiempos[1]*100)/maquina.tiempos[2];
			if(tiempoProporcionRespuesta > 40){
				$('#analisisP').empty();
				$('#analisisP').append(" bueno");
			}
			else{
				$('#analisisP').empty();
				$('#analisisP').append(" malo");
			}
			$('#proporcion').append(tiempoProporcionRespuesta.toFixed(3) + ' %');
			if($('#respuesta' + nodo.proceso).length == 0){
				$('#respuesta').append('<li id = "respuesta' + nodo.proceso + '"></li>');	
			}
			respuesta = nodo.contadorListo + nodo.contadorBloqueado + nodo.contadorCritico + nodo.contadorSuspendido;
			$('#respuesta'+ nodo.proceso).append(respuesta  + ' mSeg');		
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-primary" style="width:'+ (contadorC)*0.5 + '%'+'"></div>');
		}
		else if(nodo.estado == "finalizado"){
			var contadorF = 0;			
			contadorF = contadorF + 1;
			nodo.contadorFinalizado = nodo.contadorFinalizado + 1;
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-info" style="width:'+ (contadorF)*0.5 + '%'+'"></div>');
		}
	}, 1000);
}
//--------------------------------------------------------------------------------------------------------------------------------------------