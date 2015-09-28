function crearRecurso(){
	var nombre = $("#nombreR").val();
	var unidad = $("#unidad").val();
	var cantidad = $("#cantidad").val();
	
	maquina.agregarRecurso(nombre, unidad, cantidad);
}