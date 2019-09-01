import { List } from 'immutable';
import * as tipoReductor from '../../unidades/reductorTipos';
import Bloque from '../../unidades/bloque';
import  { ultimoRegistro } from '../../unidades/constantes';

const estadoInicial = (() => {
    // Si no hay registro(localStorage) ó actual está vacío, devuelve nulo.
    if(!ultimoRegistro || !ultimoRegistro.actual) { return null; };
    const actual = ultimoRegistro.actual;
    const opciones = {
        tipo: actual.tipo,
        rotarIndice: actual.rotarIndice,
        figura: List(actual.figura.map(e => List(e))),
        xy: actual.xy,
    };
    return new Bloque(opciones);
})();

const actual = (state = estadoInicial, action) => {
    switch (action.type) {
        case tipoReductor.MOVER_BLOQUE:
            return action.datos;
        default:
            return state;
    };
};
export default actual;