function crearProceso(){
	var nombre = $("#nombreP").val();
	var tiempo = $("#tiempo").val();
	var procesador = $("#procesador").val();
	var metrica;
	var recurso = $("#recursos").val();
	var prioridadColaListo = $("#prioridadColaListo").val();
	var tiempoEnvejecimiento;
	
	if(prioridadColaListo == 1)
		metrica = Math.floor((tiempo * 30)/100);
	else
		metrica = "-"	
	
	tiempoEnvejecimiento = Math.floor((tiempo * 40)/100);
	
	maquina.crearProceso(new Nodo(nombre, tiempo, metrica, recurso, procesador, "listo", prioridadColaListo, tiempoEnvejecimiento));
}