// Event Loop -> Call Stack -> Task Queue
// El Event Loop es un proceso que maneja la ejecución de código, eventos y tareas asíncronas en JavaScript. El Call Stack es una estructura de datos que almacena las funciones que se están ejecutando actualmente. El Task Queue es una cola de tareas que espera a ser ejecutada después de que el Call Stack esté vacío.

// La funcion se añade al Call stack, lista para ser ejecutada cuando sea llamada
function second() {
  console.log('2. Entramos en second()');
  console.log('3. Fin de second()');
}

function first() {
  console.log('1. Entramos en first()');
  second();
  console.log('4. Fin de first()');
}

console.log('Inicio del script');

first();

console.log('Fin del script');
