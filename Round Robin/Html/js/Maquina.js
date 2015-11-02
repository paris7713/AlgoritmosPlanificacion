var Recurso = function (nombre, unidad, cantidad){
	this.nombre = nombre,
	this.unidad = unidad,
	this.cantidad = cantidad;
	this.disponible = 1;
}
//--------------------------------------------------------------------------------------------------------------------
var Maquina = function (){
	this.procesadores = new Array();
	this.recursos = new Array();
	this.tiempos = new Array();
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.agregarRecurso = function (nombre, unidad, cantidad){
	this.recursos.push(new Recurso(nombre, unidad, cantidad));
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.agregarProcesador = function (nombre, AlgoritmoPlanificacion, divId){
	this.procesadores.push(new Procesador(nombre, AlgoritmoPlanificacion, AlgoritmoPlanificacion, AlgoritmoPlanificacion, divId));
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.crearProceso = function (nodo){
	//if(this.validarRecurso(nodo.recurso)){		
		this.procesadores[nodo.procesador].insertarProceso(nodo);
	//}
	/*else{
		this.procesadores[nodo.procesador].bloquearProceso(nodo);
	}*/
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.validarRecurso = function (recurso){
	if(this.recursos[recurso].disponible == 1){
		return true;
	}
	else{
		return false;
	}
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.listar = function (nombre, divId){
	$(divId).append('<li>' + nombre + '</div>');
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.liberarRecurso = function (recurso){
	this.recursos[recurso].disponible = 1;
}
//--------------------------------------------------------------------------------------------------------------------

Maquina.prototype.initProceso = function(){
	for (var index in this.procesadores){
		this.procesadores[index].procesar();
	}
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.pararProceso = function(){
	for (var index in this.procesadores){
		this.procesadores[index].pausarProcesador();
	}
}