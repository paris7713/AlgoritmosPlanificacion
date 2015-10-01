var contadorRecursos = 0;

function crearRecurso(){
	var nombre = $("#nombreR").val();
	var unidad = $("#unidad").val();
	var cantidad = $("#cantidad").val();
	var cantidadNum = parseInt(cantidad);
	
	for (var i = 1; i <= cantidadNum; i++){
		maquina.agregarRecurso(nombre + i, unidad, cantidad);
		maquina.listar(maquina.recursos[contadorRecursos].nombre, '#listaRecursos');
		$("#recursos").append('<option value="' + contadorRecursos + '">' + maquina.recursos[contadorRecursos].nombre + '</option>');
		contadorRecursos = contadorRecursos + 1;
	}
}