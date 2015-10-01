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
	this.procesadores.push(new Procesador(nombre, AlgoritmoPlanificacion, divId));
}
//--------------------------------------------------------------------------------------------------------------------
Maquina.prototype.crearProceso = function (nodo){
	if(this.validarRecurso(nodo.recurso)){		
		this.procesadores[nodo.procesador].insertarProceso(nodo);
	}
	else{
		this.procesadores[nodo.procesador].bloquearProceso(nodo);
	}
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
Maquina.prototype.metrica = function (){
	this.tiempos[0] = 0; // Tiempo en listo Total
	this.tiempos[1] = 0; // Tiempo en estado critico total
	this.tiempos[2] = 0; // Tiempo total de ejecucion
	this.tiempos[3] = 0; // Tiempo de espera total - sin critico
	
	var tiempoEspera = (this.tiempos[0]*100)/this.tiempos[2];
	var tiempoProporcionRespuesta = (this.tiempos[1]*100)/this.tiempos[2];
	var tiempoProporcionPenalizacion = (this.tiempos[3]*100)/this.tiempos[2];
	
	$('#metrica').append('<div class="col-md-4"></div>' +
						 '<h4>Métrica</h4>' +
						 '<div class="row"></div>' +
						 '<div class="form-group">' +
                         	'<label class="text col-lg-4 control-label">Tiempo en espera:</label>' +
                         	'<div class="col-lg-3 texto">' +
                            	'<label class="text col-lg-4 control-label" id="espera">' + tiempoEspera + ' % ' + '</label>' +
                        	'</div>' +
                    	 '</div>' +
						 '<div class="row"></div>' +
						 '<div class="form-group">' +
                         	'<label class="text col-lg-4 control-label">Tiempo de respuesta:</label>' +
                         	'<div class="col-lg-3 texto">' +
                            	'<label class="text col-lg-4 control-label" id="respuesta">'+ this.tiempos[2] + ' seg' + '</label>' +
                        	'</div>' +
                    	 '</div>' +
						 '<div class="row"></div>' +
						 '<div class="form-group">' +
                         	'<label class="text col-lg-4 control-label">Proporcion de penalizacion:</label>' +
                         	'<div class="col-lg-3 texto">' +
                            	'<label class="text col-lg-4 control-label" id="penalizacion">' + tiempoProporcionPenalizacion + ' % ' + '</label>' +
                        	'</div>' +
                    	 '</div>' +
						 '<div class="row"></div>' +
						 '<div class="form-group">' +
                         	'<label class="text col-lg-4 control-label">Proporcion de respuesta:</label>' +
                         	'<div class="col-lg-3 texto">' +
                            	'<label class="text col-lg-4 control-label" id="proporcion">' + tiempoProporcionRespuesta + ' % ' + '</label>' +
                        	'</div>' +
                    	 '</div>'		
	);
}