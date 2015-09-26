//constructor
function lista(){
	this.raiz = null;
	this.cola= null;
	this.insertar = insertarNodo;
	this.atender = extraerNodo;
	this.vacia = vacia;
	this.longitud;
}

//inserta un nodo en la lista
function insertarNodo(procesoE, tiempoEjecucionE, quantumE, recursoE, estadoE){
	var nuevo = new nodo();
	var auxiliar = new nodo();
	nuevo.proceso = procesoE;
	nuevo.tiempo = tiempoEjecucionE;
	nuevo.quantum = quantumE;
	nuevo.recurso = recursoE;
	nuevo.estado = estadoE;
	nuevo.siguiente = null;

	if(!this.longitud){
		this.raiz = nuevo;
		this.raiz.anterior = null;
		this.longitud = 1;
	}
	else{		
		if(this.longitud == 1){
			this.cola =	nuevo;
			this.cola.anterior = this.raiz;
			this.raiz.siguiente = this.cola;					
			this.longitud = this.longitud + 1;
		}
		else{
			auxiliar = this.cola;
			auxiliar.anterior = this.cola.anterior;
			this.cola.anterior = null;			
			this.cola = nuevo;
			auxiliar.siguiente = this.cola;
			this.cola.anterior = auxiliar;
			this.longitud = this.longitud + 1;			
		}
	}
}

// Extraer el primer nodo de la lista
function extraerNodo(){
	if(!this.longitud){
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