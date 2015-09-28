//constructor
var Nodo = function(nombre, tiempo, metrica){
	this.proceso = nombre;
	this.tiempoEjecucion = tiempo;
	this.metrica = metrica;	
	this.siguiente = null;
	this.anterior = null;
	this.recurso = null;
	this.estado = null;
} 