function crearProceso(){
	var nombre = $("#nombreP").val();
	var tiempo = $("#tiempo").val();
	var procesador = $("#procesador").val();
	var metrica;
	var recurso = $("#recursos").val();
	var prioridadColaListo = $("#prioridadColaListo").val();
	
	/*if(flag == 'Round Robin')
		metrica = Math.floor((tiempo * 30)/100);
	else{
		metrica = $("#prioridadT").val();
		if (metrica == undefined)
			metrica = "-"
	}*/
	
	if(prioridadColaListo == 1)
		metrica = Math.floor((tiempo * 30)/100);
	else
		metrica = "-"	
		
	maquina.crearProceso(new Nodo(nombre, tiempo, metrica, recurso, procesador, "listo", prioridadColaListo));
}