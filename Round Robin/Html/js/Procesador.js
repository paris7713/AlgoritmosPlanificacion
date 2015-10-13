var Procesador = function (nombre, AlgoritmoPlanificacion, divId){
	this.nombre = nombre;
	this.colaListo = new lista();
	this.colaBloqueo = new lista();
	this.colaSuspendido = new lista();
	this.colaCritico = new lista();
    this.colaFinalizado = new lista();
    this.dibujarProcesador(divId);
    this.hiloProceso;
    this.estadoProcesador;
	this.algoritmoPlanificacion = new AlgoritmoPlanificacion(this);
    this.procesar();
}

//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.procesar = function (Proceso){
    var obj = this;
    this.hiloProceso = setInterval(function (){
        obj.algoritmoPlanificacion.procesar();
    }, 1000);
    this.estadoProcesador = "procesando";
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.insertarProceso = function (nodo){
    nodo.setDivId("#gantt" + this.nombre);
    nodo.dibujarGanttNodo();
    this.colaListo.insertarNodo(nodo);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.bloquearProceso = function (nodo){
    nodo.setDivId("#gantt" + this.nombre);
    nodo.dibujarGanttNodo();
    nodo.estado = "bloqueado";
	this.colaBloqueo.insertarNodo(nodo);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.suspenderProceso = function (nodo){
	this.colaSuspendido.insertarNodo(nodo);
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
        +'<div class="row" id = gantt' + procesador.nombre +'></div>'
        )
    });
    
   this.colaListo.setDivId(divIdListo);
   this.colaSuspendido.setDivId(divIdSuspendido);
   this.colaBloqueo.setDivId(divIdBloqueado);
   this.colaFinalizado.setDivId(divIdFinalizado);
   this.colaCritico.setDivId(divCritico);  
   
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.pararProcesar = function (){
    clearTimeout(this.hiloProceso);   
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.pausarProcesador = function (){
    clearTimeout(this.hiloProceso);
    this.estadoProcesador = "pausado";
    if(this.colaSuspendido.longitud > 0){
        this.pausarDibujador(this.colaSuspendido);    
    }
    if(this.colaListo.longitud > 0){
        this.pausarDibujador(this.colaListo);    
    }
    
    if(this.colaBloqueado.longitud > 0){
        this.pausarDibujador(this.colaBloqueado);    
    }
    
    if(this.colaCritico.longitud > 0){
        this.pausarDibujador(this.colaCritico);    
    }        
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.pausarDibujador = function (cola){
    var actual = cola.raiz();
     
    while(cola.siguiente){
        actual.pararDibujar();    
    } 
}
