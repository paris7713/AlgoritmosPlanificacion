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
		if(this.procesador.colaListo.longitud > 0){
			if(this.procesador.colaListo.raiz.tiempo < this.procesador.colaCritico.raiz.tiempo){
				if(maquina.validarRecurso(this.procesador.colaListo.raiz.recurso)){
					clearInterval(this.hiloActualInterval);
					clearTimeout(this.hiloTimeOut);
					
					var auxiliarCritico = this.procesador.colaCritico.extraerNodo();
					var auxiliarListo = this.procesador.colaListo.extraerNodo();
					
					maquina.liberarRecurso(auxiliarCritico.recurso);
					auxiliarCritico.estado = 'suspendido';
					this.procesador.colaSuspendido.insertarNodo(auxiliarCritico);
					
					auxiliarListo.estado = 'critico';
					this.procesador.colaCritico.insertarNodo(auxiliarListo);	
					maquina.recursos[auxiliarListo.recurso].disponible  = 0;
					
					this.hiloActualInterval = setInterval(function (obj){
						obj.procesador.colaCritico.raiz.tiempo = obj.procesador.colaCritico.raiz.tiempo - 1;
					}, 1000, this);
					this.hiloTimeOut = setTimeout(function (obj){
						var finalizado = obj.procesador.colaCritico.extraerNodo();
						finalizado.estado = 'finalizado';
						obj.procesador.colaFinalizado.insertarNodo(finalizado);
						maquina.liberarRecurso(finalizado.recurso);
						clearInterval(obj.hiloActualInterval);
					}, this.procesador.colaCritico.raiz.tiempo * 1000, this);
				}
				else{
					/*var auxiliarListo = this.procesador.colaListo.extraerNodo();
					auxiliarListo.estado = 'bloqueado';
					this.procesador.colaBloqueo.insertarNodo(auxiliarListo);*/							
				}
			}//end if(this.procesador.colaListo.raiz.tiempo < this.procesador.colaCritico.raiz.tiempo)	
		}// end if(this.procesador.colaListo.longitud > 0)	
	}
	else{
		if(this.procesador.colaListo.longitud > 0){
			var proceso = this.procesador.colaListo.raiz;
			if(maquina.validarRecurso(proceso.recurso)){
				clearInterval(this.hiloActualInterval);
				clearTimeout(this.hiloTimeOut); 
				
				proceso = this.procesador.colaListo.extraerNodo();
				proceso.estado = "critico";
				this.procesador.colaCritico.insertarNodo(proceso);
				maquina.recursos[proceso.recurso].disponible  = 0;
				this.hiloActualInterval = setInterval(function (obj){
					obj.procesador.colaCritico.raiz.tiempo = obj.procesador.colaCritico.raiz.tiempo - 1;
				}, 1000, this);
				this.hiloTimeOut = setTimeout(function (obj){
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
	}
	
	if(this.procesador.colaSuspendido.longitud > 0){
		setTimeout(function(obj){
			if(obj.procesador.colaSuspendido.longitud == 0){
				return;
			}
			var raiz = obj.procesador.colaSuspendido.extraerNodo();
			raiz.estado = "listo";
			obj.procesador.colaListo.insertarNodo(raiz);	
		}, 3000, this);
	}
	
	if(this.procesador.colaBloqueo.longitud > 0){
		if(maquina.validarRecurso(this.procesador.colaBloqueo.raiz.recurso)){
			var raiz = this.procesador.colaBloqueo.extraerNodo();
			raiz.estado = "listo";
			this.procesador.colaListo.insertarNodo(raiz);	
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
	}, 500, this);
}
//---------------------------------------------------------------------------------------------------------------------------------
jsf.prototype.enviarNodoACritico = function (){
	
}