//constructor
var lista = function (){
	this.raiz = null;
	this.cola = null;
	this.longitud = 0;
}
//inserta un nodo en la lista
lista.prototype.insertarNodo = function (procesoE, tiempoEjecucionE, quantumE, recursoE, estadoE){
	var nodoEntreante = new Nodo();
	var auxiliar = new Nodo();
	nodoEntreante.proceso = procesoE;
	nodoEntreante.tiempo = tiempoEjecucionE;
	nodoEntreante.quantum = quantumE;
	nodoEntreante.recurso = recursoE;
	nodoEntreante.estado = estadoE;
	nodoEntreante.siguiente = null;

	if(this.longitud == 0){
		this.raiz = nodoEntreante;
		this.raiz.anterior = null;
		this.longitud = 1;
		this.pintarProceso();
	}
	else{		
		if(this.longitud == 1){
			this.cola =	nodoEntreante;
			this.cola.anterior = this.raiz;
			this.raiz.siguiente = this.cola;					
			this.longitud = this.longitud + 1;
		}
		else{
			auxiliar = this.cola;
			auxiliar.anterior = this.cola.anterior;
			this.cola.anterior = null;			
			this.cola = nodoEntreante;
			auxiliar.siguiente = this.cola;
			this.cola.anterior = auxiliar;
			this.longitud = this.longitud + 1;			
		}
	}
}

// Extraer el primer nodo de la lista
lista.prototype.extraerNodo = function extraerNodo(){
	if(this.longitud == 0){
		alert("Cola vacia");
	}
	else{
		var auxiliar = this.raiz;
		this.raiz = this.raiz.sig;
		this.raiz.anterior = null;	
		this.longitud = this.longitud - 1;	
		return auxiliar;
	}	
}

//---------------------------------------------------------------------------------------------------------------------------------
lista.prototype.pintarProceso = function (divId){
	var cola = this;
	setInterval(function(){ 
		if(cola.longitud){	
			if(cola.longitud == 1){	
				$("#colaListo").append('<span>' + cola.raiz.nombre + '</span>');
			}
			else{
				var auxiliar = cola.raiz;
				while(auxiliar.siguiente){
					auxiliar = auxiliar.siguiente;
					$("#colaListo").append('<span>' + auxiliar.nombre + '</span>');				
				}
			}
		}
	}, 10000);
}
//---------------------------------------------------------------------------------------------------------------------------------