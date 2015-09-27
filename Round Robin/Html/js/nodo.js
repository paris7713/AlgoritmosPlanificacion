//constructor
var Nodo = function(nombre, tiempo, metrica){
	this.proceso;
	this.tiempoEjecucion;
	this.metrica = metrica;	
	this.siguiente;
	this.anterior;
	this.recurso;
	this.estado;
} 