var jsf = function (procesador){
	this.hiloOrdenarColaListo2 = null;
	this.hiloActualInterval = null;
	this.hiloTimeOut = null;
	this.procesador = procesador;		
}

//---------------------------------------------------------------------------------------------------------------------------------
jsf.prototype.procesar = function (){
	if(this.procesador.estadoProcesador == "pausado"){
		clearInterval(this.hiloOrdenarColaListo2);
		clearInterval(this.hiloActualInterval);
		clearTimeout(this.hiloTimeOut);
		this.hiloOrdenarColaListo2 = null;
		this.hiloActualInterval = null;
		this.hiloTimeOut = null;
		return;
	}
	if(this.hiloOrdenarColaListo2 == null){
		this.ordenarColaListoProcesador();
	}
	
	if(this.procesador.colaCritico.longitud > 0){
		if(this.hiloActualInterval == null && this.hiloTimeOut == null){
			this.hiloActualInterval = setInterval(function (obj){
				if(obj.procesador.estadoProcesador == "pausado"){
					clearInterval(obj.hiloOrdenarColaListo2);
					clearInterval(obj.hiloActualInterval);
					clearTimeout(obj.hiloTimeOut);
					obj.hiloOrdenarColaListo2 = null;
					obj.hiloActualInterval = null;
					obj.hiloTimeOut = null;
					return;
				}
				obj.procesador.colaCritico.raiz.tiempo = obj.procesador.colaCritico.raiz.tiempo - 1;
			}, 1000, this);
			this.hiloTimeOut = setTimeout(function (obj){
				if(obj.procesador.estado == "pausado"){
					return;
				}
				var finalizado = obj.procesador.colaCritico.extraerNodo();
				finalizado.estado = 'finalizado';
				obj.procesador.colaFinalizado.insertarNodo(finalizado);
				maquina.liberarRecurso(finalizado.recurso);
				clearInterval(obj.hiloActualInterval);
			}, this.procesador.colaCritico.raiz.tiempo * 1000, this);	
		}
	}
	else{
		if(this.procesador.colaListo2.longitud > 0){
			var proceso = this.procesador.colaListo2.raiz;
			if(maquina.validarRecurso(proceso.recurso)){
				clearInterval(this.hiloActualInterval);
				clearTimeout(this.hiloTimeOut); 
				
				proceso = this.procesador.colaListo2.extraerNodo();
				proceso.estado = "critico";
				this.procesador.colaCritico.insertarNodo(proceso);
				maquina.recursos[proceso.recurso].disponible  = 0;
				this.hiloActualInterval = setInterval(function (obj){
					if(obj.procesador.estadoProcesador == "pausado"){
						clearInterval(obj.hiloOrdenarColaListo2);
						clearInterval(obj.hiloActualInterval);
						clearTimeout(obj.hiloTimeOut);
						obj.hiloOrdenarColaListo2 = null;
						obj.hiloActualInterval = null;
						obj.hiloTimeOut = null;
						return;
					}
					obj.procesador.colaCritico.raiz.tiempo = obj.procesador.colaCritico.raiz.tiempo - 1;
				}, 1000, this);
				this.hiloTimeOut = setTimeout(function (obj){
					if(obj.procesador.estado == "pausado"){
						return;
					}
					var finalizado = obj.procesador.colaCritico.extraerNodo();
					finalizado.estado = 'finalizado';
					obj.procesador.colaFinalizado.insertarNodo(finalizado);
					maquina.liberarRecurso(finalizado.recurso);
					clearInterval(obj.hiloActualInterval);
				}, this.procesador.colaCritico.raiz.tiempo * 1000, this);
			}
			else{
				var auxiliarListo = this.procesador.colaListo2.extraerNodo();
				auxiliarListo.estado = 'bloqueado';
				this.procesador.colaBloqueo.insertarNodo(auxiliarListo);				
			}
		}
	}
	
	if(this.procesador.colaSuspendido.longitud > 0){
		setTimeout(function(obj){
			if(obj.procesador.colaSuspendido.longitud == 0){
				return;
			}
			var raiz = obj.procesador.colaSuspendido.extraerNodo();
			raiz.estado = "listo";
			obj.procesador.colaListo2.insertarNodo(raiz);	
		}, 3000, this);
	}
	
	if(this.procesador.colaBloqueo.longitud > 0){
		if(maquina.validarRecurso(this.procesador.colaBloqueo.raiz.recurso)){
			var raiz = this.procesador.colaBloqueo.extraerNodo();
			raiz.estado = "listo";
			this.procesador.colaListo2.insertarNodo(raiz);	
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
	this.hiloOrdenarColaListo2 = setInterval(function (obj){
		obj.procesador.colaListo2.ordenarBurbujaSergio();
	}, 500, this);
}