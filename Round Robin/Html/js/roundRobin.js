var RoundRobin = function (procesador){		
	this.procesador = procesador;	
}
var banderaSupendidoRR = 0;
var banderaBloqueadoRR = 0;
//---------------------------------------------------------------------------------------------------------------------------------
RoundRobin.prototype.procesar = function (){
	if(this.procesador.colaCritico.longitud > 0){
		var obj = this.procesador;
		/*var hilo = setInterval(function(){
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
				if(obj.colaCritico.raiz.tiempo > 0){		
					//Analizar suspendido
					raiz = obj.colaCritico.raiz;
					raiz.estado = "suspendido";
					obj.suspenderProceso(raiz);
					raiz.metrica = Math.floor((raiz.tiempo * 30)/100) + 1;
					raiz.metricaTmp = raiz.metrica;
					maquina.liberarRecurso(raiz.recurso);
					obj.colaCritico.extraerNodo();					
				}
				else{
					//Analizar terminado
					raiz = obj.colaCritico.raiz;
					raiz.estado = "finalizado";
					raiz = obj.colaCritico.raiz;
					obj.colaFinalizado.insertarNodo(raiz);
					maquina.liberarRecurso(raiz.recurso);
					obj.colaCritico.extraerNodo();
				}
			}
							
		}, this.procesador.colaCritico.raiz.metrica * 1000);*/
	}
	else{
		if(this.procesador.colaListo.longitud > 0){
			var raiz = this.procesador.colaListo.extraerNodo();
			if(maquina.validarRecurso(raiz.recurso)){			
				//this.procesador.pararProcesar();
	
				this.procesador.colaCritico.insertarNodo(raiz);
				raiz.estado = "critico";	
				maquina.recursos[raiz.recurso].disponible = 0;
				var tiempo = this.procesador.colaCritico.raiz.tiempo - raiz.metrica;
				var obj = this;
				var hilo = setInterval(function(){
					if(obj.procesador.estadoProcesador == "pausado"){
						return;
					}
					obj.procesador.colaCritico.raiz.tiempo = obj.procesador.colaCritico.raiz.tiempo - 1;
					obj.procesador.colaCritico.raiz.metrica = obj.procesador.colaCritico.raiz.metrica - 1;
				}, 1000);
				
				setTimeout(function (){
					clearInterval(hilo);
					if(obj.procesador.estadoProcesador == "pausado"){
						return;
					}
					else{
						if(obj.procesador.colaCritico.raiz.tiempo > 0){		
							//Analizar suspendido
							raiz = obj.procesador.colaCritico.raiz;
							banderaSupendidoRR = 1;
							raiz.estado = "suspendido";
							obj.procesador.suspenderProceso(raiz);
							raiz.metrica = Math.floor((raiz.tiempo * 30)/100);
							if(raiz.metrica == 0){
								raiz.metrica = 1;
							}
							raiz.metricaTmp = raiz.metrica;
							maquina.liberarRecurso(raiz.recurso);
							obj.procesador.colaCritico.extraerNodo();
						}
						else{
							//Analizar terminado
							raiz.estado = "finalizado";
							raiz = obj.procesador.colaCritico.raiz;
							obj.procesador.colaFinalizado.insertarNodo(raiz);
							maquina.liberarRecurso(raiz.recurso);
							obj.procesador.colaCritico.extraerNodo();
							banderaSupendidoRR = 0;
							obj.procesador.pararAlgoritmo();
						}
						
						//this.procesador.procesar();	
					}
								
				}, raiz.metrica * 1000);	
			}
			else{
				raiz.estado = "bloqueado";
				banderaBloqueadoRR = 1;
				this.procesador.colaBloqueo.insertarNodo(raiz);
			}
		}
		
		if(this.procesador.colaSuspendido.longitud > 0){
			var obj = this;
			setTimeout(function(){
				var raiz = obj.procesador.colaSuspendido.extraerNodo();
				raiz.estado = "listo";
				obj.procesador.colaListo.insertarNodo(raiz);	
			}, 3000);
		}
		
		if(this.procesador.colaBloqueo.longitud > 0){
			if(maquina.validarRecurso(this.procesador.colaBloqueo.raiz.recurso)){
				var raiz = this.procesador.colaBloqueo.extraerNodo();
				raiz.estado = "listo";
				banderaBloqueadoRR = 0;
				this.procesador.colaListo.insertarNodo(raiz);	
			}
		}
	}
			
}
//---------------------------------------------------------------------------------------------------------------------------------
RoundRobin.prototype.setPrioridad = function (prioridad){
	this.prioridad = prioridad;
}