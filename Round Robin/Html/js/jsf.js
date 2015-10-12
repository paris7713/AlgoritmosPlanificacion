var jsf = function (){
	this.hiloOrdenarColaListo;
	this.procesador;		
}

//---------------------------------------------------------------------------------------------------------------------------------
jsf.prototype.procesar = function (procesador){
	this.procesador = procesador;
	this.initProcear();
	
	if(this.procesador.colaCritico.longitud > 0){
		
	}
	else{
		if(this.procesador.colaListo.longitud > 0){
			var proceso = this.procesador.colaListo.raiz;
			if(maquina.validarRecurso(proceso.recurso)){
				proceso = this.procesador.colaListo.extraerNodo();
				proceso.estado = "critico";
				this.procesador.colaCritico.insertarNodo(proceso);
				maquina.recursos[proceso.recurso].disponible  = 0;
				var tmp = setInterval(function (){
					this.procesador.colaCritico.raiz.tiempo = this.procesador.colaCritico.raiz.tiempo - 1;
					if(this.procesador.colaListo.raiz.tiempo < this.procesador.colaCritico.raiz.tiempo){
						if(maquina.validarRecurso(this.procesador.colaListo.raiz.recurso)){
							var auxiliarCritico = this.procesador.colaCritico.extraerNodo();
							var auxiliarListo = this.procesador.colaListo.extraerNodo();
							
							maquina.liberarRecurso(auxiliarCritico.recurso);
							this.procesador.colaSuspendido.insertarNodo(auxiliarCritico);	
						}
						else{
							var auxiliarListo = this.procesador.colaListo.extraerNodo();
							this.procesador.colaBloqeuado.insertarNodo(auxiliarListo);
						}
					}
				}, 1000);
			}
			else{
				
			}
		}
		
		if(this.procesador.colaSuspendido.longitud > 0){
			
		}
		
		if(this.procesador.colaBloqueado.longitud > 0){
			
		}
		
		if(this.procesador.colaFinalizado.longitud > 0){
			
		}	
	}
}
//---------------------------------------------------------------------------------------------------------------------------------
jsf.prototype.initProcesar = function (procesador){
	this.hiloOrdenarCola = setInterval(function (){
		procesador.colaListo.ordenarLista();
	}, 500);
}