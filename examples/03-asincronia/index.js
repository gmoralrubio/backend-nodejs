// Por defecto en js, tenemos dos formas de trabajar:
// - commonjs -> mas legacy, el import se hace con require(...)
// - module -> más moderno, import {...}. Es lo recomendable
// Esto lo definimos en package.json

// import { readFileSync } from 'node:fs'; // importamos para leer archivos
import { readFile } from 'node:fs/promises'; // importamos para leer archivos con promesas
// importamos un setTimeout de node
import { setTimeout as wait } from 'node:timers/promises';

// Siempre que interactuamos con el entorno, leemos ficheros etc, tenemos que usar asincronía
async function loadTask() {
  //  Leer el archivo tasks.json
  // import.meta.url nos da la url donde estamos
  // en commonjs sería con la variable global __dir
  const fileUrl = new URL('./tasks.json', import.meta.url); // creamos una url
  // readFileSync se comporta de manera síncrona, por lo tanto, cuando llega aquí, se para la ejecución hasta que se termina la ejecución. NO HACERLO NUNCA
  // const fileContents = readFileSync(fileUrl, 'utf-8');
  // readFile devuelve una promesa, por lo que tenemos que usar async/await
  const fileContents = await readFile(fileUrl, 'utf-8');
  console.log(fileContents);

  // Devolver ese archivo como Objeto
  return JSON.parse(fileContents);
}

// Función que enriquezca las tareas (añadir propiedades)
async function enrichTask(task) {
  // Envolvemos todo en una promesa
  // return new Promise(resolve => {
  //   // La promesa se resuelve en 200ms
  //   setTimeout(() => {
  //     resolve({
  //       ...task,
  //       summary: `${task.title} - ${task.done ? 'hecha' : 'pendiente'}`,
  //     });
  //   }, 200);
  // });

  // Ambas aproximaciones haceln lo mismo:
  // Esperamos 200ms y devolvemos la tarea con el summary
  await wait(200);

  return {
    ...task,
    summary: `${task.title} - ${task.done ? 'hecha' : 'pendiente'}`,
  };
}

// Ejecutar en serie
async function enrichInSerie(tasks) {
  const result = [];
  for (const task of tasks) {
    result.push(await enrichTask(task));
  }
  return result;
}

// Ejecutar en paralelo
async function enrichInParallel(tasks) {
  return Promise.all(tasks.map(enrichTask));
}

console.log('Orden de ejecución síncrona y asíncrona:');
console.log('A');

// setTimeout, al ser una microtarea asíncrona, se mete en el Task Queue y espera a la siguiente vuelta del Event Loop
setTimeout(() => {
  console.log('D -> Microtask de setTimeout');
}, 0);

// Promise se llama antes que setTimeout, se resuelve en la primera vuelta del Event Loop
Promise.resolve().then(() => console.log('C -> Microtask de Promise'));

// loadTask() es una funcion asíncrona, no bloquea la ejecución
const tasks = await loadTask();
const enrichedTasks = await enrichInSerie(tasks);
const parallelTask = await enrichInParallel(tasks);
console.log(enrichedTasks);
console.log(parallelTask);

console.log(tasks);

console.log('B');
