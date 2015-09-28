function crearProceso(){
	var nombre = $("#nombreP").val();
	var tiempo = $("#tiempo").val();
	var procesador = $("#procesador").val();
	var quantum;
	
	maquina.agregarProcesador(nombre, procesador, tiempo, quantum);
}