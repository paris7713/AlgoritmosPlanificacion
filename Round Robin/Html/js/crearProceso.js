function crearProceso(){
	var nombre = $("#nombreP").val();
	var tiempo = $("#tiempo").val();
	var procesador = $("#procesador").val();
	var metrica;
	var recurso = $("#recursos").val();
	
	if(flag == 'Round Robin')
		metrica = Math.floor((tiempo * 30)/100);
	else
		metrica = $("#prioridadT").val();
		
	maquina.crearProceso(new Nodo(nombre, tiempo, metrica, recurso, procesador, "listo"));
	//maquina.listar(nombre, '#listaProcesos');
}