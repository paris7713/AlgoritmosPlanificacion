//constructor
var lista = function (){
	this.raiz = null;
	this.cola = null;
	this.longitud = 0;
	this.divId;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//inserta un nodo en la lista
lista.prototype.insertarNodo = function (nodo){
	var nodoEntreante = nodo;
	var auxiliar;
	nodoEntreante.proceso = nodo.proceso;
	nodoEntreante.tiempo = nodo.tiempo;
	nodoEntreante.metrica = nodo.metrica;
	nodoEntreante.recurso = nodo.recurso;
	nodoEntreante.procesador = nodo.procesador;
	nodoEntreante.siguiente = null;
	nodoEntreante.estado = nodo.estado;
	nodoEntreante.divId = nodo.divId;
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
			this.cola = nodoEntreante;
			auxiliar.siguiente = this.cola;
			this.cola.anterior = auxiliar;
			this.longitud = this.longitud + 1;			
		}
	}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Extraer el primer nodo de la lista
lista.prototype.extraerNodo = function extraerNodo(){
	if(this.longitud == 0){
		//alert("Cola vacia");
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
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
lista.prototype.pintarProceso = function (){
	var cola = this;
	var nombreRecurso;
	setInterval(function(){
		$("#" + cola.divId).empty(); 	
		
		if(cola.longitud){	
			if(cola.longitud == 1){	
				nombreRecurso = maquina.recursos[cola.raiz.recurso].nombre;
				$("#"+ cola.divId).append('<span>' + cola.raiz.proceso + "    |" + cola.raiz.tiempo + " seg |" + cola.raiz.metrica + " " + nombreRecurso +'</span><br>');
			} 
			else{
				var auxiliar = cola.raiz;
				nombreRecurso = maquina.recursos[auxiliar.recurso].nombre;
				while(auxiliar.siguiente){
					$("#"+ cola.divId).append('<span>' + auxiliar.proceso + "   | " + auxiliar.tiempo + " seg |" + auxiliar.metrica + " " + nombreRecurso +'</span><br>');
					auxiliar = auxiliar.siguiente;
					if(auxiliar == cola.cola){
						$("#"+ cola.divId).append('<span>' + auxiliar.proceso + "   | " + auxiliar.tiempo + " seg |" + auxiliar.metrica + " " + nombreRecurso +'</span><br>');
						break;	
					}
				}
			}
		}
	}, 500);
}
//---------------------------------------------------------------------------------------------------------------------------------
lista.prototype.setDivId = function (divId){
	this.divId = divId;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ordenarLista
lista.prototype.ordenarLista = function (){	// Ordena por burbuja
	var colaAuxiliar;
	var prim;
	var seg;
	
	if(this.longitud == 0){
		alert("Nada que ordenar");
	}
	else{
		if(this.longitud == 1){
			prim = this.extraerNodo();
			colaAuxiliar.insertarNodo(prim);			
		}
		else{
			prim = this.extraerNodo();			
			seg = this.extraerNodo();
			prim.anterior = null;
			prim.siguiente = null;
			seg.anterior = null;
			seg.siguiente = null;
			
			if(prim.tiempo <= seg.tiempo){ //Primero menor que segundo
				colaAuxiliar.insertarNodo(prim);
				colaAuxiliar.insertarNodo(seg);
			}
			else{ //Segundo menor que primero
				colaAuxiliar.insertarNodo(seg);
				colaAuxiliar.insertarNodo(prim);
			}
			if (this.longitud > 0){
				this.ordenarLista();
			}				
		}
		return colaAuxiliar;
	}
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ordenarColaTotal
lista.prototype.ordenarCola = function (){ //Ejecuta el maximo de combinaciones posibles segun el rendimiento de burbuja 
	for(var i = 1; i < (this.longitud * this.longitud); i ++){
		lista = lista.ordenarLista();
	}
	return lista;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
lista.prototype.ordenarBurbujaSergio = function (){
	if(this.longitud == 0 || this.longitud == 1){
		return;
	}
	
	for(var j = 0; j < this.longitud; j++){
		var nodo = this.raiz;
		var nodoSiguiente = nodo.siguiente;
		for(var i = 0; i < this.longitud; i++){
			
			if(nodoSiguiente == null){
				break;
			}
			
			if(parseInt(nodo.tiempo) > parseInt(nodoSiguiente.tiempo)){
				var nodoAux = nodoSiguiente.siguiente;
				var nodoAuxAnterior = nodo.anterior;
				//.... x , y , z ....  --->  ..... x, z, y
				nodoSiguiente.anterior = nodo.anterior;
				nodoSiguiente.siguiente = nodo;
				
				nodo.siguiente = nodoAux;
				nodo.anterior = nodoSiguiente;
				
				if(nodo == this.raiz){
					this.raiz= nodoSiguiente;	
				}
				else{
					nodoAuxAnterior.siguiente = nodoSiguiente;
				}
				if(nodoSiguiente == this.cola){
					this.cola = nodo;
				}
				else{
					nodoAux.anterior = nodo;
				}
					
				nodoSiguiente = nodo.siguiente;
			}
			else{
				nodo = nodo.siguiente;
				nodoSiguiente = nodo.siguiente;
			}
			
		}//end for i		
	}//end for j

}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ordenarPorPrioridad
lista.prototype.ordenarListaPrioridad = function (){
	if(this.longitud == 0 || this.longitud == 1){
		return;
	}
	
	for(var j = 0; j < this.longitud; j++){
		var nodo = this.raiz;
		var nodoSiguiente = nodo.siguiente;
		for(var i = 0; i < this.longitud; i++){
			
			if(nodoSiguiente == null){
				break;
			}
			
			if(parseInt(nodo.metrica) > parseInt(nodoSiguiente.metrica)){
				var nodoAux = nodoSiguiente.siguiente;
				var nodoAuxAnterior = nodo.anterior;
				//.... x , y , z ....  --->  ..... x, z, y
				nodoSiguiente.anterior = nodo.anterior;
				nodoSiguiente.siguiente = nodo;
				
				nodo.siguiente = nodoAux;
				nodo.anterior = nodoSiguiente;
				
				if(nodo == this.raiz){
					this.raiz= nodoSiguiente;	
				}
				else{
					nodoAuxAnterior.siguiente = nodoSiguiente;
				}
				if(nodoSiguiente == this.cola){
					this.cola = nodo;
				}
				else{
					nodoAux.anterior = nodo;
				}
					
				nodoSiguiente = nodo.siguiente;
			}
			else{
				nodo = nodo.siguiente;
				nodoSiguiente = nodo.siguiente;
			}
			
		}//end for i		
	}//end for j
}