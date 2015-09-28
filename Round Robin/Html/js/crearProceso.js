function crearProceso(){
	var nombre = $("#nombreP").val();
	var tiempo = $("#tiempo").val();
	var procesador = $("#procesador").val();
	var quantum;
	
	if(tiempo < 5){
		quantum = 2;
	}
	else{
		if(tiempo >= 5 && tiempo <= 10){
			quantum = 4;
		}
		else{
			if(tiempo > 10 && tiempo <= 15 ){
				quantum = 6;
			}
			else{
				if(tiempo > 15 ){
					quantum = 8;
				}
			}
		}
	}
	
	maquina.agregarProcesador(nombre, procesador, tiempo, quantum);
	maquina.listar(nombre, '#listaProcesos');
}