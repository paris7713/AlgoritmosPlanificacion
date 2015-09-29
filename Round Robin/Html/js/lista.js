//constructor
var lista = function (){
	this.raiz = null;
	this.cola = null;
	this.longitud = 0;
	this.divId;
}
//inserta un nodo en la lista
lista.prototype.insertarNodo = function (procesoE, tiempoEjecucionE, metricaE, recursoE, procesadorE, estado){
	var nodoEntreante = new Nodo();
	var auxiliar = new Nodo();
	nodoEntreante.proceso = procesoE;
	nodoEntreante.tiempo = tiempoEjecucionE;
	nodoEntreante.metrica = metricaE;
	nodoEntreante.recurso = recursoE;
	nodoEntreante.procesador = procesadorE;
	nodoEntreante.siguiente = null;
	nodoEntreante.estado = estado;

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
		if(this.longitud == 1){
			var auxiliar = this.raiz;
			this.raiz = null;
			this.longitud = 0;
			return auxiliar;
		}
		else{
			var auxiliar2 = this.raiz;
			this.raiz = this.raiz.siguiente;
			this.raiz.anterior = null;	
			this.longitud = this.longitud - 1;	
			return auxiliar2;
		}
	}	
}
//---------------------------------------------------------------------------------------------------------------------------------
lista.prototype.pintarProceso = function (){
	var cola = this;
	setInterval(function(){
		$("#" + cola.divId).empty(); 
		if(cola.longitud){	
			if(cola.longitud == 1){	
				$("#"+ cola.divId).append('<span>' + cola.raiz.proceso + "    " + cola.raiz.tiempo + " seg " + '</span><br>');
			}
			else{
				var auxiliar = cola.raiz;
				while(auxiliar.siguiente){
					$("#"+ cola.divId).append('<span>' + auxiliar.proceso + "    " + auxiliar.tiempo + " seg " +'</span><br>');
					auxiliar = auxiliar.siguiente;
					if(auxiliar == cola.cola){
						$("#"+ cola.divId).append('<span>' + auxiliar.proceso + "    " + auxiliar.tiempo + " seg " +'</span><br>');
						break;	
					}
				}
			}
		}
	}, 1000);
}
//---------------------------------------------------------------------------------------------------------------------------------
lista.prototype.setDivId = function (divId){
	this.divId = divId;
}