import almacen from '../almacen';
import acciones from './acciones';

console.info(`\u2713 Controles->index.js - Activados...`);
const teclasPermitidas = { // JSEventKeyCode: 'decripción tecla'
    37: 'izquierda',
    38: 'rotar',
    39: 'derecha',
    40: 'bajar',
    32: 'espacio',
    73: 'i',
    82: 'r',
    80: 'p',
};
let teclaPresionadaActiva;
const teclasTablero = Object.keys(teclasPermitidas).map(e => parseInt(e, 10)); // Arreglo con los códigos de teclas permitidas.
const alPresionarTecla = (e) => { // Método dinámico que atrapa los eventos de las acciones(teclas) presionadas...
    if(e.metaKey === true || teclasTablero.indexOf(e.keyCode) === -1) return; // Ignora las teclas que no están permitidas.
    const tipo = teclasPermitidas[e.keyCode]; // 'izquierda', 'derecha', Etc.
    if(tipo === teclaPresionadaActiva) return; // ¿Se está presionando la misma tecla? ignorala.
    teclaPresionadaActiva = tipo;
    acciones[tipo].presionar(almacen); // Ejecuta método dinamico  en base al tipo de tecla presionada.
};
const alSoltarTecla = (e) => { // Método dinámico que atrapa los eventos de las acciones(teclas) soltadas...
    if(e.metaKey === true || teclasTablero.indexOf(e.keyCode)===-1) return; // Si la tecla presionada no corresponde a los designadas en teclado.
    const tipo = teclasPermitidas[e.keyCode];
    if(tipo === teclaPresionadaActiva) teclaPresionadaActiva = ''; // Asigno vacío para prevenir multiples repeticiones.
    acciones[tipo].soltar(almacen);
};
document.addEventListener('keydown', alPresionarTecla, true);
document.addEventListener('keyup', alSoltarTecla, true);