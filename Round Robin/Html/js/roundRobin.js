var RoundRobin = function (){
		
}

//---------------------------------------------------------------------------------------------------------------------------------
RoundRobin.prototype.procesar = function (procesador){
	if(procesador.colaListo.longitud > 0){
		var raiz = procesador.colaListo.extraerNodo();
		if(maquina.validarRecurso(raiz.recurso)){
			procesador.colaCritico.insertarNodo(raiz);
			raiz.estado = "critico";	
			maquina.recursos[raiz.recurso].disponible = 0;
			procesador.colaCritico.raiz.tiempo = procesador.colaCritico.raiz.tiempo - raiz.metrica;
			setTimeout(function (){
				if(procesador.colaCritico.raiz.tiempo > 0){		
					//Analizar suspendido
					raiz = procesador.colaCritico.raiz;
					raiz.estado = "suspendido";
					procesador.suspenderProceso(raiz);
					maquina.liberarRecurso(raiz.recurso);
					procesador.colaCritico.extraerNodo();
				}
				else{
					//Analizar terminado
					raiz.estado = "finalizado";
					raiz = procesador.colaCritico.raiz;
					procesador.colaFinalizado.insertarNodo(raiz);
					maquina.liberarRecurso(raiz.recurso);
					procesador.colaCritico.extraerNodo();
				}		
			}, raiz.metrica * 1000);	
		}
		else{
			raiz.estado = "bloqueado";
			procesador.colaBloqueo.insertarNodo(raiz);
		}
	}
	
	if(procesador.colaSuspendido.longitud > 0){
		setTimeout(function(){
			var raiz = procesador.colaSuspendido.extraerNodo();
			raiz.estado = "listo";
			procesador.colaListo.insertarNodo(raiz);	
		}, 1000);
	}
	
	if(procesador.colaBloqueo.longitud > 0){
		var raiz = procesador.colaBloqueo.extraerNodo();
		if(maquina.validarRecurso(raiz.recurso)){
			raiz.estado = "listo";
			procesador.colaListo.insertarNodo(raiz);	
		}
	}		
}