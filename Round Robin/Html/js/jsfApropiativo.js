var jsf = function (procesador){
	this.hiloOrdenarColaListo = null;
	this.hiloActualInterval = null;
	this.hiloTimeOut = null;
	this.procesador = procesador;		
}

//---------------------------------------------------------------------------------------------------------------------------------
jsf.prototype.procesar = function (){
	if(this.hiloOrdenarColaListo == null){
		this.ordenarColaListoProcesador();
	}
	
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
				this.hiloActualInterval = setInterval(function (obj){
					obj.procesador.colaCritico.raiz.tiempo = obj.procesador.colaCritico.raiz.tiempo - 1;
				}, 1000, this);
				this.hiloActualTimeOut = setTimeout(function (obj){
					var finalizado = obj.procesador.colaCritico.extraerNodo();
					
					finalizado.estado = 'finalizado';
					obj.procesador.colaFinalizado.insertarNodo(finalizado);
					maquina.liberarRecurso(finalizado.recurso);
					clearInterval(obj.hiloActualInterval);
				}, this.procesador.colaCritico.raiz.tiempo * 1000, this);
			}
			else{
				var auxiliarListo = this.procesador.colaListo.extraerNodo();
				auxiliarListo.estado = 'bloqueado';
				this.procesador.colaBloqueo.insertarNodo(auxiliarListo);				
			}
		}
		
		if(this.procesador.colaSuspendido.longitud > 0){
			setTimeout(function(){
				var raiz = this.procesador.colaSuspendido.extraerNodo();
				raiz.estado = "listo";
				this.procesador.colaListo.insertarNodo(raiz);	
			}, 1000);
		}
		
		if(this.procesador.colaBloqueo.longitud > 0){
			if(maquina.validarRecurso(this.procesador.colaBloqueo.raiz.recurso)){
				var raiz = this.procesador.colaBloqueo.extraerNodo();
				raiz.estado = "listo";
				this.procesador.colaListo.insertarNodo(raiz);	
			}
		}
	}
}
//---------------------------------------------------------------------------------------------------------------------------------
jsf.prototype.initProcesar = function (procesador){
	this.procesador = procesador;
	var obj = this;
	obj.hiloProceso = procesador.hiloProceso = setInterval(function (){
		obj.procesar();
	}, 2000);
}
//---------------------------------------------------------------------------------------------------------------------------------
jsf.prototype.ordenarColaListoProcesador = function (){
	this.hiloOrdenarColaListo = setInterval(function (obj){
		obj.procesador.colaListo.ordenarBurbujaSergio();
	}, 5000, this);
}