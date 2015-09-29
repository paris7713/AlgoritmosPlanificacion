function crearProceso(){
	var nombre = $("#nombreP").val();
	var tiempo = $("#tiempo").val();
	var procesador = $("#procesador").val();
	var quantum;
	var recurso = $("#recursos").val();
	
	quantum = Math.floor((tiempo * 30)/100);

	maquina.crearProceso(nombre, tiempo, quantum, recurso, procesador);
	maquina.listar(nombre, '#listaProcesos');
}