var Procesador = function (nombre, AlgoritmoPlanificacion){
	this.nombre = nombre;
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
}*/
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.insertarProceso = function (nombre, procesador, tiempo, metrica, recurso){
	this.colaListo.insertarNodo(nombre, procesador, tiempo, metrica, recurso);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.bloquearProceso = function (proceso){
	this.colaListo.insertarNodo(proceso);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.suspenderProceso = function (proceso){
	this.colaListo.insertarNodo(proceso);
}
//---------------------------------------------------------------------------------------------------------------------------------
