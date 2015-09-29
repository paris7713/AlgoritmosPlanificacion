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
Maquina.prototype.crearProceso = function (nombre, tiempo, metrica, recurso, procesador){
	if(this.recursos[recurso].disponible == 1){	
		this.recursos[recurso].disponible = 0;	
		this.procesadores[procesador].insertarProceso(nombre, tiempo, metrica, recurso, procesador);
	}
	else{
		this.procesadores[procesador].bloquearProceso(nombre, tiempo, metrica, recurso, procesador);
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
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.liberarRecurso = function (recurso){
	this.recursos[recurso].disponible = 1;
}