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
Procesador.prototype.dibujarProcesador = function (divId){
	$(divId).append(+'<div class = "row">'
            +'<hr>'
            +'<div class="col-md-3"></div> '
            +'<div class="col-md-6">'
                +'<div class="panel panel-primary">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Procesador 1</h3>'
                    +'</div>'
                    +'<div class="panel-body">'
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
                    +'<div class="panel-body" id = "colaListo">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-3">'
                +'<div class="panel panel-warning">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Suspendido</h3>'
                    +'</div>'
                    +'<div class="panel-body">'
                        +'<span class="label label-primary">Proceso 1</span>'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-3">'
                +'<div class="panel panel-danger">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Bloqueado</h3>'
                    +'</div>'
                    +'<div class="panel-body">'
                        +'<span class="label label-primary">Proceso 1</span>'
                        +'<span class="label label-primary">Proceso 2</span>'
                        +'<span class="label label-primary">Proceso 3</span>'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-3">'
                +'<div class="panel panel-info">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola terminado</h3>'
                    +'</div>'
                    +'<div class="panel-body">'
                        
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>'
        )
}
//---------------------------------------------------------------------------------------------------------------------------------