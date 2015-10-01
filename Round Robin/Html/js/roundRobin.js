var RoundRobin = function (){
		
}

//---------------------------------------------------------------------------------------------------------------------------------
RoundRobin.prototype.procesar = function (procesador){
	if(procesador.colaListo.longitud > 0){
		var raiz = procesador.colaListo.extraerNodo();
		if(maquina.validarRecurso(raiz.recurso)){
			
			procesador.pararProcesar();		
	
			procesador.colaCritico.insertarNodo(raiz);
			raiz.estado = "critico";	
			maquina.recursos[raiz.recurso].disponible = 0;
			var tiempo = procesador.colaCritico.raiz.tiempo - raiz.metrica;
			var hilo = setInterval(function(){
				procesador.colaCritico.raiz.tiempo = procesador.colaCritico.raiz.tiempo - 1;	
			}, 1000);
			setTimeout(function (){
				clearInterval(hilo);
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
				procesador.procesar();		
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
		if(maquina.validarRecurso(procesador.colaBloqueo.raiz.recurso)){
			var raiz = procesador.colaBloqueo.extraerNodo();
			raiz.estado = "listo";
			procesador.colaListo.insertarNodo(raiz);	
		}
	}		
}