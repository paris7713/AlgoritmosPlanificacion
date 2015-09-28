var contadorRecursos = 1;

function crearRecurso(){
	var nombre = $("#nombreR").val();
	var unidad = $("#unidad").val();
	var cantidad = $("#cantidad").val();
	
	maquina.agregarRecurso(nombre, unidad, cantidad);
	maquina.listar(maquina.recursos[contadorRecursos - 1].nombre, '#listaRecursos');
	contadorRecursos = contadorRecursos + 1;
}