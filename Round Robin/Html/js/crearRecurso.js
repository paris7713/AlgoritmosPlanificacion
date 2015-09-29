var contadorRecursos = 0;

function crearRecurso(){
	var nombre = $("#nombreR").val();
	var unidad = $("#unidad").val();
	var cantidad = $("#cantidad").val();
	
	maquina.agregarRecurso(nombre, unidad, cantidad);
	maquina.listar(maquina.recursos[contadorRecursos].nombre, '#listaRecursos');
	$("#recursos").append('<option value="' + contadorRecursos + '">' + maquina.recursos[contadorRecursos].nombre + '</option>');
	contadorRecursos = contadorRecursos + 1;
}