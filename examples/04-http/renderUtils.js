// Vamos a encapsular todo el código relacionado con el render de páginas html

// Funcion que recibe título y contenido
// Devuelve el HTML con pequeño menú de navegación, el título y el contenido
export function renderPage({ title, content }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
    </head>
    <body style="font-family: sans-serif; max-width: 48rem; margin: 0 auto; padding: 1rem;">
      <nav style="display: flex; gap: 1rem;">
        <a href="/">Home</a>
        <a href="/tasks">Tasks</a>
        <a href="/health">Health</a>
      </nav>
      <h1>${title}</h1>
      ${content}
    </body>
    </html>
  `;
}

// Importamos sin llaves
// Si quien va a consumir el modulo va a usar una unica variable,
// que luego puede acceder a diferentes métodos, exportaremos como default
// export default renderPage;
