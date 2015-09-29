//constructor
var Nodo = function(nombre, tiempo, metrica, procesador, estado){
	this.proceso = nombre;
	this.tiempo = tiempo;
	this.metrica = metrica;	
	this.procesador = procesador;
	this.siguiente = null;
	this.anterior = null;
	this.recurso = null;
	this.estado = estado;
	this.contador = 0;
	this.contadorListo = 0;
	this.contadorBloqueado = 0;
	this.contadorSuspendido = 0;
	this.contadorCritico = 0;
	this.dibujarGanttNodo();
} 

Nodo.prototype.setEstado = function (estado){
	this.estado = estado;
}

Nodo.dibujarGanttNodo = function (){
	var nodo = this;	
	setInterval(function (){
		nodo.contador = nodo.contador + 1;
		if(nodo.estado == "listo"){
			nodo.contadorListo = nodo.contadorListo + 1;
		}
		else if (nodo.estado == "bloqueado"){
			nodo.contadorBloqueado = nodo.contadorBloqueado + 1;
		}
		else if (nodo.estado == "suspendido"){
			nodo.contadorSuspendido = nodo.contadorSuspendido + 1;
		}
		else{
			nodo.contadorCritico = nodo.contadorCritico + 1;
		}
	}, 1000)
}