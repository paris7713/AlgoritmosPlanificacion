var maquina = new Maquina();

maquina.agregarProcesador("Procesador1", roundRobin, jsf, fifo, "#maquina");
maquina.agregarProcesador("Procesador2", roundRobin, jsf, fifo, "#maquina");
maquina.agregarProcesador("Procesador3", roundRobin, jsf, fifo, "#maquina");
var flag = 'Colas Multiples';