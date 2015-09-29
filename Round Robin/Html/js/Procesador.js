var Procesador = function (nombre, AlgoritmoPlanificacion, divId){
	this.nombre = nombre;
	this.colaListo = new lista();
	this.colaBloqueo = new lista();
	this.colaSuspendido = new lista();
	this.colaCritico = new lista();
    this.colaFinalizado = new lista();
    this.dibujarProcesador(divId);
    this.hiloProceso;
	this.algoritmoPlanificacion = AlgoritmoPlanificacion;
    this.procesar();
}

//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.procesar = function (Proceso){
	this.hiloProceso = setInterval(this.algoritmoPlanificacion.prototype.procesar, 5000, this);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.insertarProceso = function (nombre, tiempo, metrica, recurso, procesador){
 	this.colaListo.insertarNodo(nombre, tiempo, metrica, recurso, procesador, "listo");
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.bloquearProceso = function (nombre, tiempo, metrica, recurso, procesador){
	this.colaBloqueo.insertarNodo(nombre, tiempo, metrica, recurso, procesador, "bloqueado");
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.suspenderProceso = function (nombre, tiempo, metrica, recurso, procesador){
	this.colaSuspendido.insertarNodo(nombre, tiempo, metrica, recurso, procesador, "suspendido");
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.dibujarProcesador = function (divId){
	var procesador = this;
    var divCritico = "critico" + this.nombre;
    var divIdListo = "listo" + this.nombre;
    var divIdSuspendido = "suspendido" + this.nombre;
    var divIdBloqueado = "bloqueado" + this.nombre;
    var divIdFinalizado = "finalizado" + this.nombre;;
    
    $(window).load(function (){
        $(''+divId).append(
        '<div class = "row">'
            +'<hr>'
            +'<div class="col-md-3"></div> '
            +'<div class="col-md-6">'
                +'<div class="panel panel-primary">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">'+ procesador.nombre +'</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divCritico +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
        
       +'<div class = "row">'
            +'<div class="col-md-3">'
                +'<div class="panel panel-success">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Listo</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdListo +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-3">'
                +'<div class="panel panel-warning">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Suspendido</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdSuspendido +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-3">'
                +'<div class="panel panel-danger">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Bloqueado</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdBloqueado +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-3">'
                +'<div class="panel panel-info">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola terminado</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdFinalizado +'">'    
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
        +'<div class="row">'
            +'<label class="text col-lg-2 control-label">Proceso:</label>'
            +'<div class="progress progress-striped" id ="progreso' + this.nombre + '"></div>'
        +'</div>'
        )
    });
    
   this.colaListo.setDivId(divIdListo);
   this.colaSuspendido.setDivId(divIdSuspendido);
   this.colaBloqueo.setDivId(divIdBloqueado);
   this.colaFinalizado.setDivId(divIdFinalizado);
   this.colaCritico.setDivId(divCritico);
   this.pintarGantt();
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.pintarGantt = function (){
    $(window).load(function (){
    var tiempos = new Array();
    tiempos["listo"] = 4;
    tiempos["ocupado"] = 4;
        $('#progreso' + this.nombre).append('<div class="progress-bar progress-bar-info" style="width:'+ tiempos["listo"] + '%'+'"></div>');
        $('#progreso' + this.nombre).append('<div class="progress-bar progress-bar-danger" style="width:'+ tiempos["listo"] + '%'+'"></div>');
    });
}