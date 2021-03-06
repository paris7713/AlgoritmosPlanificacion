var Procesador = function (nombre, AlgoritmoPlanificacion, divId){
	this.nombre = nombre;
	this.colaListo = new lista();
    this.colaListo2 = new lista();
    this.colaListo3 = new lista();
	this.colaBloqueo = new lista();
	this.colaSuspendido = new lista();
	this.colaCritico = new lista();
    this.colaFinalizado = new lista();
    this.dibujarProcesador(divId);
    this.hiloProceso;
    this.hiloProcesoAlgoritmo;
    this.hiloProceso2;
    this.hiloProceso3;
    this.estadoProcesador;
	this.algoritmoPlanificacion = new AlgoritmoPlanificacion(this);
    this.algoritmoPlanificacion1;
    this.algoritmoPlanificacion2; 
    this.algoritmoPlanificacion3;
    this.procesar();
    this.banderaAlgoritmoProcesando;
}

//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.procesar = function (Proceso){
    var obj = this;
    this.hiloProceso = setInterval(function (){
        obj.algoritmoPlanificacion.procesar();
        obj.verificarColaSuspendido();
        obj.verificarColaBloqueado();
    }, 1100);
    this.estadoPocesador = "procesando";
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.procesarAlgoritmo = function (algoritmo){       
    if(algoritmo.prioridad == 1){
        this.banderaAlgoritmoProcesando = "Algoritmo1";
    }
    else if(algoritmo.prioridad == 2){
        this.banderaAlgoritmoProcesando = "Algoritmo2";    
    }
    else if (algoritmo.prioridad == 3){
        this.banderaAlgoritmoProcesando = "Algoritmo3";         
    }
    
    if(this.hiloProcesoAlgoritmo){
        clearInterval(this.hiloProcesoAlgoritmo);
        this.limpiarHilosAlgoritmos();
    }
    
    this.hiloProcesoAlgoritmo = setInterval(function (Algoritmo){
        Algoritmo.procesar();
    }, 1000, algoritmo);
    this.estadoProcesador = "procesando";    
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.limpiarHilosAlgoritmos = function (){
    clearInterval(this.algoritmoPlanificacion1.hiloActualInterval);
    clearInterval(this.algoritmoPlanificacion2.hiloActualInterval);
    clearInterval(this.algoritmoPlanificacion3.hiloActualInterval); 
    
    clearTimeout(this.algoritmoPlanificacion1.hiloTimeOut);
    clearTimeout(this.algoritmoPlanificacion2.hiloTimeOut);
    clearTimeout(this.algoritmoPlanificacion3.hiloTimeOut);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.insertarProceso = function (nodo){
    nodo.setDivId("#gantt" + this.nombre);
    nodo.dibujarGanttNodo();
    var numCola = parseInt(nodo.prioridadColaListo);
    
    if(numCola == 1){
        this.colaListo.insertarNodo(nodo);               
    }
    else{
        if(numCola == 2){
            this.colaListo2.insertarNodo(nodo);
        }
        else{
            this.colaListo3.insertarNodo(nodo);
        }
    }
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.verificarColaSuspendido = function (nodo){
    if(this.colaSuspendido.longitud > 0){
        setTimeout(function(obj){
			if(obj.colaSuspendido.longitud == 0){
				return;
			}
			var raiz = obj.colaSuspendido.extraerNodo();
			raiz.estado = "listo";
			obj.insertarProceso(raiz);	
		}, 3000, this);
	}
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.verificarColaBloqueado = function (nodo){
    if(this.procesador.colaBloqueo.longitud > 0){
		if(maquina.validarRecurso(this.colaBloqueo.raiz.recurso)){
			var raiz = this.colaBloqueo.extraerNodo();
			raiz.estado = "listo";
			this.procesador.insertarProceso(raiz);	
		}
	}
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
    var divIdListo2 = "listo" + this.nombre + "2";
    var divIdListo3 = "listo" + this.nombre + "3";
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
            +'<div class="col-md-4">'
                +'<div class="panel panel-success">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Listo 1 Round Robin</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdListo +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-4">'
                +'<div class="panel panel-success">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Listo 2 SRTF</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdListo2 +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-4">'
                +'<div class="panel panel-success">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Listo 3 FIFO</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdListo3 +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
       +'</div>'
       
       +'<div class = "row">'     
            +'<div class="col-md-4">'
                +'<div class="panel panel-warning">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Suspendido</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdSuspendido +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-4">'
                +'<div class="panel panel-danger">'
                    +'<div class="panel-heading">'
                        +'<h3 class="panel-title">Cola Bloqueado</h3>'
                    +'</div>'
                    +'<div class="panel-body" id = "'+ divIdBloqueado +'">'
                    +'</div>'
                +'</div>'
            +'</div>'
            
            +'<div class="col-md-4">'
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
   this.colaListo2.setDivId(divIdListo2);
   this.colaListo3.setDivId(divIdListo3);
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
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.calcularMetrica = function (){
    var nodoActual = this.colaFinalizado.raiz;
    
    while (nodoActual){      
        var tiempoProceso = nodoActual.contadorListo + nodoActual.contadorCritico + nodoActual.contadorBloqueado + nodoActual.contadorSuspendido;
        var tasaCritico = nodoActual.contadorCritico / tiempoProceso;
        var tasaSuspendido = nodoActual.contadorSuspendido / tiempoProceso;
        var tasaListo = nodoActual.contadorListo / tiempoProceso;
        var tasaBloqueado = nodoActual.contadorBloqueado / tiempoProceso;
        
        switch(nodoActual.metrica){
            case 1:
                if(tasaSuspendido > tasaCritico || tasaListo > tasaCritico || tasaBloqueado > tasaCritico){
                    console.log("malo")
                }
                else{
                    console.log("bueno")
                }
                break;
            case 2:
                if(tasaSuspendido > tasaCritico || tasaListo > tasaCritico || tasaBloqueado > tasaCritico){
                    console.log("malo")
                }
                else{
                    console.log("bueno")
                }
                break;
            case 3:
                if(tasaSuspendido > tasaCritico || tasaBloqueado > tasaCritico){
                    console.log("malo")
                }
                else{
                    console.log("bueno")
                }
                break;
            case 4:
                if(tasaListo > tasaCritico || tasaBloqueado > tasaCritico){
                    console.log("malo")
                }
                else{
                    console.log("bueno")
                }
                break;
            case 5:
                if(tasaBloqueado > tasaCritico){
                    console.log("malo")
                }
                else{
                    console.log("bueno")
                }
                break;
        }
        nodoActual = nodoActual.siguiente;
    }
}
//El metodo funciona bajo la premisa de que las prioridades van de 1 a 5
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.setAlgoritmo1 = function (Algoritmo){
    this.algoritmoPlanificacion1 = new Algoritmo(this);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.setAlgoritmo2 = function (Algoritmo){
    this.algoritmoPlanificacion2 = new Algoritmo(this);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.setAlgoritmo3 = function (Algoritmo){
    this.algoritmoPlanificacion3 = new Algoritmo(this);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.setPrioridadAlgoritmo = function (algoritmo, prioridad){
    algoritmo.setPrioridad(prioridad);
}
//---------------------------------------------------------------------------------------------------------------------------------
Procesador.prototype.pararAlgoritmo = function (){
    clearTimeout(this.hiloProcesoAlgoritmo);   
}
