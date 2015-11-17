var MultiplesColas = function (procesador){
	this.procesador  = procesador;
	
	this.procesador.setAlgoritmo1(RoundRobin);
	this.procesador.setAlgoritmo2(jsf);
	this.procesador.setAlgoritmo3(fifo);
	
	this.procesador.setPrioridadAlgoritmo(this.procesador.algoritmoPlanificacion1, 1);
	this.procesador.setPrioridadAlgoritmo(this.procesador.algoritmoPlanificacion2, 2);
	this.procesador.setPrioridadAlgoritmo(this.procesador.algoritmoPlanificacion3, 3);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------
MultiplesColas.prototype.procesar = function (){
	if(this.procesador.colaCritico.longitud == 0){
		if(this.procesador.colaListo.longitud > 0 && 
		this.procesador.algoritmoPlanificacion1.prioridad < this.procesador.algoritmoPlanificacion2.prioridad && 
		this.procesador.algoritmoPlanificacion1.prioridad < this.procesador.algoritmoPlanificacion3.prioridad){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion1);
		}
		
		if(this.procesador.colaListo2.longitud > 0 && 
		this.procesador.algoritmoPlanificacion2.prioridad < this.procesador.algoritmoPlanificacion1.prioridad && 
		this.procesador.algoritmoPlanificacion2.prioridad < this.procesador.algoritmoPlanificacion3.prioridad){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion2);
		}
		else if(this.procesador.colaListo2.longitud > 0 &&
		this.procesador.colaListo.longitud == 0 &&
		this.validarsuspendidoAlgoritmo(1) &&
		this.validarBloqeuadoAlgoritmo(1)){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion2);
		}
		
		if(this.procesador.colaListo3.longitud > 0 && 
		this.procesador.algoritmoPlanificacion3.prioridad < this.procesador.algoritmoPlanificacion1.prioridad && 
		this.procesador.algoritmoPlanificacion3.prioridad < this.procesador.algoritmoPlanificacion2.prioridad){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion3);
		}
		else if(this.procesador.colaListo3.longitud > 0 &&
		this.procesador.colaListo.longitud == 0 &&
		this.procesador.colaListo2.longitud == 0 &&
		this.validarsuspendidoAlgoritmo(2) &&
		this.validarBloqeuadoAlgoritmo(2)){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion3);
		}
	}
	else{
		if(this.procesador.banderaAlgoritmoProcesando == "Algoritmo3" && this.procesador.colaListo2.longitud > 0){
			var procesoExtraidoCola3 = this.procesador.colaCritico.extraerNodo();
			maquina.liberarRecurso(procesoExtraidoCola3.recurso);
			this.procesador.colaSuspendido.insertarNodo(procesoExtraidoCola3);
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion2);
		}
		else if(this.procesador.banderaAlgoritmoProcesando == "Algoritmo3" && this.procesador.colaListo.longitud > 0){
			var procesoExtraidoCola33 = this.procesador.colaCritico.extraerNodo();
			maquina.liberarRecurso(procesoExtraidoCola33.recurso);
			this.procesador.colaSuspendido.insertarNodo(procesoExtraidoCola33);
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion1);
		}
		else if(this.procesador.banderaAlgoritmoProcesando == "Algoritmo2" && this.procesador.colaListo.longitud > 0){
			var procesoExtraidoCola2 = this.procesador.colaCritico.extraerNodo();
			maquina.liberarRecurso(procesoExtraidoCola2.recurso);
			this.procesador.colaSuspendido.insertarNodo(procesoExtraidoCola2);
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion1);
		}
	}
	
	if(this.procesador.colaListo3.longitud > 0){
		var proceso = this.procesador.colaListo3.raiz;
		
		while(proceso){		
			if(proceso.descontarTiempoEnvejecimiento()){
				proceso = proceso.siguiente;
			}
			else{
				proceso = proceso.siguiente;
				var procesoExtraido = this.procesador.colaListo3.extraerNodo();
				procesoExtraido.tiempoEnvejecimiento = (Math.floor((procesoExtraido.tiempo * 40)/100));
				procesoExtraido.prioridadColaListo = 2;
				this.procesador.colaListo2.insertarNodo(procesoExtraido);
			}
		}
	} 
	
	if(this.procesador.colaListo2.longitud > 0){
		var proceso2 = this.procesador.colaListo2.raiz;
		
		while(proceso2){		
			if(proceso2.descontarTiempoEnvejecimiento()){
				proceso2 = proceso2.siguiente;
			}
			else{
				proceso2 = proceso2.siguiente;
				var procesoExtraido2 = this.procesador.colaListo2.extraerNodo();
				procesoExtraido2.tiempoEnvejecimiento = (Math.floor((procesoExtraido2.tiempo * 40)/100));
				procesoExtraido2.metrica = Math.floor((procesoExtraido2.tiempo * 30)/100);
				procesoExtraido2.prioridadColaListo = 1;
				this.procesador.colaListo.insertarNodo(procesoExtraido2);
			}
		}
	} 
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
MultiplesColas.prototype.validarsuspendidoAlgoritmo = function (algoritmo){
	if(this.procesador.colaSuspendido.longitud == 0){
		return true;
	}
	else{
		var proceso = this.procesador.colaSuspendido.raiz;
		while(proceso){
			if(proceso.prioridadCola == algoritmo){
				return false;	
			}
			
			proceso = proceso.siguiente;
			
			if(proceso == null || proceso == undefined){
				return true;
			}
		}
	}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
MultiplesColas.prototype.validarBloqeuadoAlgoritmo = function (algoritmo){
	if(this.procesador.colaSuspendido.longitud == 0){
		return true;
	}
	else{
		var proceso = this.procesador.colaBloqueado.raiz;
		while(proceso){
			if(proceso.prioridadCola == algoritmo){
				return false;	
			}
			
			proceso = proceso.siguiente;
			
			if(proceso == null || proceso == undefined){
				return true;
			}
		}
	}
}

/*function haberQueResultadeEsto (prioridad){
	if(prioridad == 1){
		if(colaCritico == 0){
			if(colaListo > 0){
				procesar();
			}	
		}	
	}
	else if (prioridad == 2){
		if(colaCritico == 0){
			if(colaListoPrioridad1 == 0){
				if(colaListoActual > 0){
					
				}
			}
		}
	}
}*/