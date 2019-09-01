import {List} from 'immutable';
import i18n from '../i18n.json';
console.info(`\u2713 Cargando constantes...`);
export const formaFigura = {
  I: [ [1, 1, 1, 1], ], // ■ ■ ■ ■

  L: [ [0, 0, 1], [1, 1, 1], ], //     ■
                                // ■ ■ ■

  J: [ [1, 0, 0], [1, 1, 1], ], // ■
                                // ■ ■ ■

  Z: [ [1, 1, 0], [0, 1, 1], ], // ■ ■
                                //   ■ ■

  S: [ [0, 1, 1], [1, 1, 0], ], //   ■ ■
                                // ■ ■

  O: [ [1, 1], [1, 1], ], // ■ ■
                          // ■ ■
                          
  T: [ [0, 1, 0], [1, 1, 1], ], //   ■
                                // ■ ■ ■
};
export const origen = {
  I: [[-1, 1], [1, -1]],
  L: [[0, 0]],
  J: [[0, 0]],
  Z: [[0, 0]],
  S: [[0, 0]],
  O: [[0, 0]],
  T: [[0, 0], [1, 0], [-1, 1], [0, -1]],
};
export const tipoFigura = Object.keys(formaFigura);
export const velocidades = [800, 650, 500, 370, 250, 160];
export const retrasos = [50, 60, 70, 80, 90, 100];
export const llenarLinea = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const lineaEnBlanco = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
export const matrizVacia = (() => {
  const matriz = [];
  for (let i = 0; i < 20; i++) {
    matriz.push(List(lineaEnBlanco));
  }
  return List(matriz); // Matriz immutable.
})();
export const puntosPorDespeje = [100, 300, 700, 1500];
export const llaveAlmacenamiento = 'REACT_TETRIS';
export const marcadorMax = 100000;
export const lineasTotales = 20;
export const ultimoRegistro = (() => {
  let datos = localStorage.getItem(llaveAlmacenamiento);
  if (!datos) { 
    console.info('\u274c No existe un último registro...', datos);
    return false; 
  };
  try { // Existe información, aplico decodificación inversa.
    if (window.btoa) datos = atob(datos); // 1.- Decodifico base 64.
    datos = decodeURIComponent(datos); // 2.- Decodifico secuencias de escape.
    datos = JSON.parse(datos); // 3.- convierto JSON a objeto javascript.
    console.info('\u2713 Último Registro existente, datos: ', datos);
    return datos;
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('\u274c constantes->ultimoRegistro - ERROR:', e);
    };
    return false;
  }
})();
export const transformar = (() => {
  const trans = ['transform', 'webkitTransform', 'msTransform', 'mozTransform', 'oTransform'];
  const body = document.body;
  return trans.filter((e) => body.style[e] !== undefined)[0];
})();
const obtenerParametro = (parametro) => {
  const r = new RegExp(`\\?(?:.+&)?${parametro}=(.*?)(?:&.*)?$`);
  const m = window.location.toString().match(r);
  return m ? decodeURI(m[1]) : '';
};
export const idioma = (() => {
  let i = obtenerParametro('idioma').toLowerCase();
  i = i18n.idiomas.indexOf(i) === -1 ? i18n.default : i;
  return i;
})();
document.title = i18n.datos.titulo[idioma];
export default i18n;