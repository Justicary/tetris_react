import * as tipoReductor from '../unidades/reductorTipos';
import Bloque from '../unidades/bloque';
import teclado from './teclado';
import unidad from '../unidades';
const { obtenerSigTipo } = unidad;

function sigBloque(siguiente = obtenerSigTipo()) {
    return { type: tipoReductor.SIG_BLOQUE, datos: siguiente };
};
function moverBloque(opcion) {
    return { type: tipoReductor.MOVER_BLOQUE, datos: opcion.resetear === true ? null : new Bloque(opcion) };
};
function velInicial(n) {
    return { type: tipoReductor.VEL_INICIAL, datos: n };
};
function velPartida(n) {
    return { type: tipoReductor.VEL_PARTIDA, datos: n };
};
function lineasInicio(n) {
    return { type: tipoReductor.LINEAS_INICIO, datos: n };
};
function matriz(datos) {
    return { type: tipoReductor.MATRIZ, datos };
};
function asegurar(datos) {
    return { type: tipoReductor.ASEGURAR, datos };
};
function lineasDespejadas(datos) {
    return { type: tipoReductor.LINEAS_DESPEJADAS, datos };
};
function puntos(datos) {
    return { type: tipoReductor.PUNTOS, datos };
};
function max(datos) {
    return { type: tipoReductor.MAX, datos };
};
function resetear(datos) {
    return { type: tipoReductor.RESETEAR, datos };
};
function soltar(datos) {
    return { type: tipoReductor.SOLTAR, datos };
};
function pausar(datos) {
    return { type: tipoReductor.PAUSAR, datos };
};
function musica(datos) {
    return { type: tipoReductor.MUSICA, datos };
};
function enfocar(datos) {
    return { type: tipoReductor.ENFOCAR, datos };
};
export default {sigBloque, moverBloque, velInicial, velPartida, lineasInicio, matriz, asegurar, lineasDespejadas, puntos, resetear, max, soltar, pausar, teclado, musica, enfocar};