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
	var cantidad = 1;	
	var tiempoEspera;
	var tiempoProporcionRespuesta;
	var tiempoProporcionPenalizacion;
	maquina.tiempos[0] = 0; // Tiempo en listo Total
	maquina.tiempos[1] = 0; // Tiempo en estado critico total
	maquina.tiempos[2] = 0; // Tiempo total de ejecucion
	maquina.tiempos[3] = 0; // Tiempo de espera total - sin critico	
	
	nodo.contador = 1;
	$(nodo.divId).append('<label class="text col-lg-2 control-label">Proceso ' + nodo.proceso + ':</label>'
		+'<div class="progress progress-striped" id ="progreso' + nodo.proceso + '"></div>');

	setInterval(function (){
		nodo.contador = nodo.contador + 1;
		if(nodo.estado == "listo"){
			$('#espera').empty();
			$('#penalizacion').empty();
			$('#respuesta').empty();
			nodo.contadorListo = nodo.contadorListo + 1;
			maquina.tiempos[0] = maquina.tiempos[0] + nodo.contadorListo;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorListo;
			maquina.tiempos[3] = maquina.tiempos[3] + nodo.contadorListo;
			tiempoEspera = (maquina.tiempos[0]*100)/maquina.tiempos[2];
			tiempoProporcionPenalizacion = (maquina.tiempos[3]*100)/maquina.tiempos[2];
			$('#respuesta').append(maquina.tiempos[2] + ' mSeg');
			$('#espera').append(tiempoEspera.toFixed(3) + ' %');
			$('#penalizacion').append(tiempoProporcionPenalizacion.toFixed(3) + '%');
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-success" style="width:'+ (nodo.contadorListo)*0.02 + '%'+'"></div>');
		}
		else if (nodo.estado == "bloqueado"){
			$('#penalizacion').empty();
			$('#respuesta').empty();
			nodo.contadorBloqueado = nodo.contadorBloqueado + 1;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorBloqueado;
			maquina.tiempos[3] = maquina.tiempos[3] + nodo.contadorBloqueado;
			tiempoProporcionPenalizacion = (maquina.tiempos[3]*100)/maquina.tiempos[2];
			$('#penalizacion').append(tiempoProporcionPenalizacion.toFixed(3) + ' %');
			$('#respuesta').append(maquina.tiempos[2] + ' mSeg');
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-danger" style="width:'+ (nodo.contadorBloqueado)*0.01 + '%'+'"></div>');
		}
		else if (nodo.estado == "suspendido"){
			$('#penalizacion').empty();
			$('#respuesta').empty();
			nodo.contadorSuspendido = nodo.contadorSuspendido + 1;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorSuspendido;
			maquina.tiempos[3] = maquina.tiempos[3] + nodo.contadorSuspendido;
			tiempoProporcionPenalizacion = (maquina.tiempos[3]*100)/maquina.tiempos[2];
			$('#penalizacion').append(tiempoProporcionPenalizacion.toFixed(3) + ' %');
			$('#respuesta').append(maquina.tiempos[2] + ' mSeg');
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-warning" style="width:'+ (nodo.contadorSuspendido)*0.02 + '%'+'"></div>');
		}
		else if(nodo.estado == "critico"){
			$('#proporcion').empty();
			$('#respuesta').empty();
			nodo.contadorCritico = nodo.contadorCritico + 1;
			maquina.tiempos[1] = maquina.tiempos[1] + nodo.contadorCritico;
			maquina.tiempos[2] = maquina.tiempos[2] + nodo.contadorCritico
			tiempoProporcionRespuesta = (maquina.tiempos[1]*100)/maquina.tiempos[2];
			$('#proporcion').append(tiempoProporcionRespuesta.toFixed(3) + ' %');
			$('#respuesta').append(maquina.tiempos[2] + ' mSeg');
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-primary" style="width:'+ (nodo.contadorCritico)*0.02 + '%'+'"></div>');
		}
		else if(nodo.estado == "finalizado"){
			nodo.contadorFinalizado = nodo.contadorFinalizado + 1;
			$('#progreso' + nodo.proceso).append('<div class="progress-bar progress-bar-info" style="width:'+ (nodo.contadorFinalizado)*0.1 + '%'+'"></div>');
		}
		cantidad = cantidad + 1;
	}, 1000);

}
//--------------------------------------------------------------------------------------------------------------------------------------------