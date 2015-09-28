var Procesador = function (nombre, AlgoritmoPlanificacion, divId){
	this.nombre = nombre;
	this.colaListo = new lista();
	this.colaBloqueo = new lista();
	this.colaSuspendido = new lista();
	this.colaCritico = new lista();
    this.colaFinalizado = new lista();
    this.dibujarProcesador(divId);
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
Procesador.prototype.dibujarProcesador = function (divId){
	var procesador = this;
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
                    +'<div class="panel-body" id = "'+ procesador.nombre +'">'
                        +'Informacion del procesador'
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
                    +'<div class="panel-body" id = "'+ divIdFinalizado +'>'    
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
        )
    });
    
   this.colaListo.setDivId(divIdListo);
   this.colaSuspendido.setDivId(divIdSuspendido);
   this.colaBloqueo.setDivId(divIdBloqueado);
   this.colaFinalizado.setDivId(divIdFinalizado);
}
//---------------------------------------------------------------------------------------------------------------------------------