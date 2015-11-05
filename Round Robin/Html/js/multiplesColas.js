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
		banderaSupendidoRR == 0){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion2);
		}
		
		if(this.procesador.colaListo3.longitud > 0 && 
		this.procesador.algoritmoPlanificacion3.prioridad < this.procesador.algoritmoPlanificacion1.prioridad && 
		this.procesador.algoritmoPlanificacion3.prioridad < this.procesador.algoritmoPlanificacion2.prioridad){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion3);
		}
		else if(this.procesador.colaListo3.longitud > 0 &&
		this.procesador.colaListo.longitud == 0 &&
		this.procesador.colaListo2.longitud == 0){
			this.procesador.procesarAlgoritmo(this.procesador.algoritmoPlanificacion3);
		}
	}	
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------
MultiplesColas.prototype.validarPrioridadAlgoritmo = function (algoritmo){
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