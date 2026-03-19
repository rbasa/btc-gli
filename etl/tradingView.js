/*
* Script para extraer datos de TradingView
*
* 1. Presentar los datos en tabla en lugar de gráfico
* 2. Abrir las devs tools y entrar a la consola
* 3. Copiar y pegar el script en la consola
* 4. Copiar y pegar en un excel
*/


// Devuelve el primer contenedor scrolleable grande (probable body de la tabla)
(function() {
  const candidates = [...document.querySelectorAll('div')]
    .filter(d => d.scrollHeight > d.clientHeight && d.clientHeight > 200)
    .sort((a,b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight));
  console.log("Candidates:", candidates.slice(0, 5));
  return candidates[0];
})();

/* 
* Esta funcion se encarga de scrollear por el viewport para ir encontrando mas filas en la tabla
*/

const scroller = (function() {
  const candidates = [...document.querySelectorAll('div')]
    .filter(d => d.scrollHeight > d.clientHeight && d.clientHeight > 200)
    .sort((a,b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight));
  return candidates[0];
})();


/*
* Extrae los datos de la tabla
* 1. Busca la tabla
* 2. Extrae el header y las filas
* 3. Construye un CSV
* 4. Imprime el CSV en la consola (puede ser copiado y pegado en un excel)
*/

(async function() {
  const table = document.querySelector("table");
  if (!table) {
    console.error("No encuentro <table>. Asegurate de estar en Table view.");
    return;
  }
  /*
  * Esto es necesario porque al ser una tabla dinámica, el body se va actualizando constantemente.
  * Por lo tanto, tenemos que ir scrollenado hacia abajo y capturando las filas que se van renderizando.
  */

  // Elegí el contenedor scrolleable más probable
  const scroller = (function() {
    const candidates = [...document.querySelectorAll('div')]
      .filter(d => d.scrollHeight > d.clientHeight && d.clientHeight > 200)
      .sort((a,b) => (b.scrollHeight - b.clientHeight) - (a.scrollHeight - a.clientHeight));
    return candidates[0];
  })();

  if (!scroller) {
    console.error("No pude encontrar un contenedor scrolleable. Probá scrollear manual y reintentar.");
    return;
  }

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Header
  const header = [...table.querySelectorAll("tr")][0]
    .querySelectorAll("th,td");
  const headerRow = [...header].map(c => c.innerText.trim());

  // Acumulador por fecha (col 0)
  const rowsByDate = new Map();

  // Config
  const maxSteps = 3000;     // por seguridad
  const pauseMs = 120;       // tiempo para que renderice filas nuevas
  const jump = Math.floor(scroller.clientHeight * 0.85); // salto de scroll

  let lastCount = 0;
  let stagnant = 0;

  // Ir al inicio (arriba)
  scroller.scrollTop = 0;
  await sleep(300);

  for (let step = 0; step < maxSteps; step++) {
    // Capturar filas actualmente renderizadas
    const trs = [...table.querySelectorAll("tr")].slice(1);
    for (const tr of trs) {
      const cols = [...tr.querySelectorAll("td,th")].map(td => td.innerText.trim());
      if (!cols.length) continue;
      const date = cols[0];
      if (date && date !== "Date") {
        rowsByDate.set(date, cols);
      }
    }

    // Chequear progreso
    const count = rowsByDate.size;
    if (count === lastCount) {
      stagnant += 1;
    } else {
      stagnant = 0;
      lastCount = count;
    }

    // Condición de salida: si no crece en varios steps, probablemente llegaste al final
    if (stagnant >= 25) break;

    // Scroll hacia abajo
    scroller.scrollTop = scroller.scrollTop + jump;
    await sleep(pauseMs);
  }

  // Construir CSV (ordenado por fecha tal como aparece: no garantizado; usamos el orden de inserción)
  const allRows = [...rowsByDate.values()];

  // CSV escapado
  const escapeCsv = (s) => {
    if (s == null) return "";
    const needs = /[",\n]/.test(s);
    const t = String(s).replace(/"/g, '""');
    return needs ? `"${t}"` : t;
  };

  const csv = [];
  csv.push(headerRow.map(escapeCsv).join(","));
  for (const r of allRows) {
    csv.push(r.map(escapeCsv).join(","));
  }

  console.log("Rows captured:", allRows.length);
  console.log(csv.join("\n"));
})();