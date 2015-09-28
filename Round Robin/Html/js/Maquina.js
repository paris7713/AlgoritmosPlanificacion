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
Maquina.prototype.agregarProcesador = function (nombre, AlgoritmoPlanificacion, divId){
	this.procesadores.push(new Procesador(nombre, AlgoritmoPlanificacion, divId));
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.crearProceso = function (nombre, procesador, tiempo, metrica, recurso){
	if(this.validarRecurso(recurso)){		
		this.procesadores[procesador].insertarProceso(nombre, procesador, tiempo, metrica, recurso);
	}
	else{
		this.procesadores[procesador].bloquearProceso(nodo);
	}
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.validarRecurso = function (recurso){
	if(this.recursos[recurso] == 1){
		return false;
	}
	else{
		return true;
	}
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.listar = function (nombre, divId){
	$(divId).append('<li>' + nombre + '</div>');
}