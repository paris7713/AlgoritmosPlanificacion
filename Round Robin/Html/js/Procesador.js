var Procesador = function (AlgoritmoPlanificacion){
	this.nombre = "Procesador " + contadorProcesadores;
	this.colaListo = new lista();
	this.colaBloqueo = new lista();
	this.colaSuspendido = new lista();
	this.colaCritico = new lista();
	//this.algoritmoPlanificacion = new AlgoritmoPlanificacion();
}
/*
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.procesar = function (Proceso){
	this.algoritmoPlanificacion.procesar(this);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.insertarProceso = function (proceso){
	this.colaListo.insertarNodo(proceso);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.bloquearProceso = function (proceso){
	this.colaListo.insertarNodo(proceso);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.suspenderProceso = function (proceso){
	this.colaListo.insertarNodo(proceso);
}*/
//---------------------------------------------------------------------------------------------------------------------------------