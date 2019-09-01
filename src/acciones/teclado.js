import * as tipoReductor from '../unidades/reductorTipos';
console.info(`\u2713 Acciones->teclado.js Cargando funciones teclado...`);
function soltar(datos) {
    return { type: tipoReductor.KEY_SOLTAR, datos };
};
function bajar(datos) {
    return { type: tipoReductor.KEY_BAJAR, datos };
};
function izq(datos) {
    return { type: tipoReductor.KEY_IZQ, datos };
};
function der(datos) {
    return { type: tipoReductor.KEY_DER, datos };
};
function rotar(datos) {
    return { type: tipoReductor.KEY_ROTAR, datos };
};
function resetear(datos) {
    return { type: tipoReductor.KEY_RESETEAR, datos };
};
function musica(datos) {
    return { type: tipoReductor.KEY_MUSICA, datos };
};
function pausar(datos) {
    return { type: tipoReductor.KEY_PAUSAR, datos };
};
export default { soltar, bajar, izq, der, rotar, resetear, musica, pausar };