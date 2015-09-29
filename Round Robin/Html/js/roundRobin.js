var RoundRobin = function (){
		
}

//---------------------------------------------------------------------------------------------------------------------------------
RoundRobin.prototype.procesar = function (procesador){
	if(procesador.colaListo.longitud > 0){
		var raiz = procesador.colaListo.extraerNodo();	
		procesador.colaCritico.insertarNodo(raiz.proceso, raiz.tiempo, raiz.metrica, raiz.recurso, procesador);
		procesador.colaCritico.raiz.tiempo = procesador.colaCritico.raiz.tiempo - raiz.metrica;
		setTimeout(function (){
			if(procesador.colaCritico.raiz.tiempo > 0){		
				//Analizar suspendido
				raiz = procesador.colaCritico.raiz;
				procesador.suspenderProceso(raiz.proceso, raiz.tiempo, raiz.metrica, raiz.recurso, procesador);
				maquina.liberarRecurso(raiz.recurso);
				procesador.colaCritico.extraerNodo();
			}
			else{
				//Analizar terminado
				raiz = procesador.colaCritico.raiz;
				procesador.colaFinalizado.insertarNodo(raiz.proceso, 0, raiz.metrica, raiz.recurso, raiz.procesador);
				maquina.liberarRecurso(raiz.recurso);
				procesador.colaCritico.extraerNodo();
			}		
		}, raiz.metrica * 1000);
	}
	
	if(procesador.colaSuspendido.longitud > 0){
		var raiz = procesador.colaSuspendido.extraerNodo();
		setTimeout(function(){
			procesador.colaListo.insertarNodo(raiz.proceso, raiz.tiempo, raiz.metrica, raiz.recurso, raiz.procesador);	
		}, 1000);
	}
	
	if(procesador.colaBloqueo.longitud > 0){
		var raiz = procesador.colaBloqueo.extraerNodo();
		maquina.crearProceso(raiz.proceso, raiz.tiempo, raiz.metrica, raiz.recurso, raiz.procesador);
	}	
}