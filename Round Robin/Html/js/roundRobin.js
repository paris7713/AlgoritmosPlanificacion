var RoundRobin = function (procesador){		
	this.procesador = procesador;	
}

//---------------------------------------------------------------------------------------------------------------------------------
RoundRobin.prototype.procesar = function (){
	if(this.procesador.colaCritico.longitud > 0){
		var obj = this.procesador;
		var hilo = setInterval(function(){
			if(obj.estadoProcesador == "pausado"){
				return;
			}			
			obj.colaCritico.raiz.tiempo = obj.colaCritico.raiz.tiempo - 1;
			obj.colaCritico.raiz.metrica = obj.colaCritico.raiz.metrica - 1;
		}, 1000);
		
		var raiz = this.procesador.raiz
		
		setTimeout(function (){
			clearInterval(hilo);
			if(obj.estadoProcesador == "pausado"){
				return;
			}
			else{
				raiz.metrica = Math.floor((raiz.tiempo * 30)/100);
				raiz.metricaTmp = raiz.metrica;
				if(obj.colaCritico.raiz.tiempo > 0){		
					//Analizar suspendido
					raiz = obj.colaCritico.raiz;
					raiz.estado = "suspendido";
					obj.suspenderProceso(raiz);
					maquina.liberarRecurso(raiz.recurso);
					obj.colaCritico.extraerNodo();
				}
				else{
					//Analizar terminado
					raiz.estado = "finalizado";
					raiz = obj.colaCritico.raiz;
					obj.colaFinalizado.insertarNodo(raiz);
					maquina.liberarRecurso(raiz.recurso);
					obj.colaCritico.extraerNodo();
				}
			}
							
		}, this.procesador.colaCritico.raiz.metricaTmp * 1000);
	}
	else{
		if(this.procesador.colaListo.longitud > 0){
			var raiz = this.procesador.colaListo.extraerNodo();
			if(maquina.validarRecurso(raiz.recurso)){			
				this.procesador.pararProcesar();
	
				this.procesador.colaCritico.insertarNodo(raiz);
				raiz.estado = "critico";	
				raiz.metrica = Math.floor((raiz.tiempo * 30)/100);
				raiz.metricaTmp = raiz.metrica;
				maquina.recursos[raiz.recurso].disponible = 0;
				var tiempo = this.procesador.colaCritico.raiz.tiempo - raiz.metrica;
				var hilo = setInterval(function(){
					if(this.procesador.estadoProcesador == "pausado"){
						return;
					}
					this.procesador.colaCritico.raiz.tiempo = this.procesador.colaCritico.raiz.tiempo - 1;
					this.procesador.colaCritico.raiz.metrica = this.procesador.colaCritico.raiz.metrica - 1;
				}, 1000);
				setTimeout(function (){
					clearInterval(hilo);
					if(this.procesador.estadoProcesador == "pausado"){
						return;
					}
					else{
						if(this.procesador.colaCritico.raiz.tiempo > 0){		
							//Analizar suspendido
							raiz = this.procesador.colaCritico.raiz;
							raiz.estado = "suspendido";
							this.procesador.suspenderProceso(raiz);
							maquina.liberarRecurso(raiz.recurso);
							this.procesador.colaCritico.extraerNodo();
						}
						else{
							//Analizar terminado
							raiz.estado = "finalizado";
							raiz = this.procesador.colaCritico.raiz;
							this.procesador.colaFinalizado.insertarNodo(raiz);
							maquina.liberarRecurso(raiz.recurso);
							this.procesador.colaCritico.extraerNodo();
						}
						
						this.procesador.procesar();	
					}
								
				}, raiz.metrica * 1000);	
			}
			else{
				raiz.estado = "bloqueado";
				this.procesador.colaBloqueo.insertarNodo(raiz);
			}
		}
		
		if(this.procesador.colaSuspendido.longitud > 0){
			setTimeout(function(){
				var raiz = this.procesador.colaSuspendido.extraerNodo();
				raiz.estado = "listo";
				this.procesador.colaListo.insertarNodo(raiz);	
			}, 3000);
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