var MultiplesColas = function (procesador){
	this.procesador  = procesador;
	
	this.procesador.setAlgoritmo1(jsf);
	this.procesador.setAlgoritmo2(RoundRobin);
	this.procesador.setAlgoritmo3(fifo);
	
	this.procesador.setPrioridadAlgoritmo(this.procesador.algoritmoPlanificacion1, 1);
	this.procesador.setPrioridadAlgoritmo(this.procesador.algoritmoPlanificacion2, 2);
	this.procesador.setPrioridadAlgoritmo(this.procesador.algoritmoPlanificacion3, 3);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------
MultiplesColas.prototype.procesar = function (){
	
}