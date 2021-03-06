var fifo = function (procesador){
	this.hiloActualInterval = null;
	this.hiloTimeOut = null;
	this.hiloTiempoEnvejecimiento = null;
	this.procesador = procesador;
	this.prioridad;
}

//---------------------------------------------------------------------------------------------------------------------------------
fifo.prototype.procesar = function (){
	if(this.procesador.estadoProcesador == "pausado"){
		clearInterval(this.hiloActualInterval);
		clearTimeout(this.hiloTimeOut);
		this.hiloActualInterval = null;
		this.hiloTimeOut = null;
		return;
	}
	
	if(this.procesador.colaCritico.longitud > 0){
		if(this.hiloActualInterval == null && this.hiloTimeOut == null){
			this.hiloActualInterval = setInterval(function (obj){
				if(obj.procesador.estadoProcesador == "pausado"){
					clearInterval(obj.hiloActualInterval);
					clearTimeout(obj.hiloTimeOut);
					obj.hiloActualInterval = null;
					obj.hiloTimeOut = null;
					return;
				}
				obj.procesador.colaCritico.raiz.tiempo = obj.procesador.colaCritico.raiz.tiempo - 1;
				if(obj.procesador.colaListo3.longitud > 0){
					var proceso = obj.procesador.colaListo3.raiz;
					proceso.tiempoEnvejecimiento = proceso.tiempoEnvejecimiento - 1;
				}				
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
				obj.procesador.pararAlgoritmo();
			}, this.procesador.colaCritico.raiz.tiempo * 1000, this);	
		}
	}
	else{
		if(this.procesador.colaListo3.longitud > 0){
			var proceso = this.procesador.colaListo3.raiz;			
			
			if(maquina.validarRecurso(proceso.recurso)){
				clearInterval(this.hiloActualInterval);
				clearTimeout(this.hiloTimeOut); 
				
				proceso = this.procesador.colaListo3.extraerNodo();
				proceso.estado = "critico";
				this.procesador.colaCritico.insertarNodo(proceso);
								
				maquina.recursos[proceso.recurso].disponible  = 0;
				this.hiloActualInterval = setInterval(function (obj){
					if(obj.procesador.estadoProcesador == "pausado"){
						clearInterval(obj.hiloActualInterval);
						clearTimeout(obj.hiloTimeOut);
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
					obj.procesador.pararAlgoritmo();
				}, this.procesador.colaCritico.raiz.tiempo * 1000, this);
			}
			else{
				var auxiliarListo = this.procesador.colaListo3.extraerNodo();
				auxiliarListo.estado = 'bloqueado';
				this.procesador.colaBloqueo.insertarNodo(auxiliarListo);				
			}
		}
	}
	
	/*if(this.procesador.colaSuspendido.longitud > 0){
		setTimeout(function(obj){
			if(obj.procesador.colaSuspendido.longitud == 0){
				return;
			}
			var raiz = obj.procesador.colaSuspendido.extraerNodo();
			raiz.estado = "listo";
			obj.procesador.colaListo3.insertarNodo(raiz);	
		}, 3000, this);
	}
	
	if(this.procesador.colaBloqueo.longitud > 0){
		if(maquina.validarRecurso(this.procesador.colaBloqueo.raiz.recurso)){
			var raiz = this.procesador.colaBloqueo.extraerNodo();
			raiz.estado = "listo";
			this.procesador.colaListo3.insertarNodo(raiz);	
		}
	}*/
}
//---------------------------------------------------------------------------------------------------------------------------------
fifo.prototype.initProcesar = function (procesador){
	this.procesador = procesador;
	var obj = this;
	obj.hiloProceso = procesador.hiloProceso = setInterval(function (){
		obj.procesar();
	}, 2000);
}
//---------------------------------------------------------------------------------------------------------------------------------
fifo.prototype.setPrioridad = function (prioridad){
	this.prioridad = prioridad;
}
