var Recurso = function (nombre, unidad, cantidad){
	this.nombre = nombre,
	this.unidad = unidad,
	this.cantidad = cantidad;
}
//--------------------------------------------------------------------------------------------------------------------
var Maquina = function (){
	this.procesadores = new Array();
	this.recursos = new Array();
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.agregarRecurso = function (nombre, unidad, cantidad){
	this.recursos.push(new Recurso(nombre, unidad, cantidad));
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.agregarProcesador = function (AlgoritmoPlanificacion){
	this.procesadores.push(new Procesador(AlgoritmoPlanificacion));
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.crearProceso = function (nombre, procesador, tiempo, metrica){
	var nodo = new Nodo (nombre, tiempo, metrica);
	this.procesadores[procesador].ingresarProceso(nodo);
}