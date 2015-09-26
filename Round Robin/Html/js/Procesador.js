var Procesador = function (algoritmoPlanificacion){
	this.colaListo = new lista();
	this.colaBloqueo = new lista();
	this.colaSuspendido = new lista();
	this.colaCritico = new lista();
	this.algoritmoPlanificacion = algoritmoPlanificacion;
}

Procesador.prototype.procesar = function (Proceso){
	this.algoritmoPlanificacion.liberarCritico();
}