import { List } from 'immutable';
import * as tipoReductor from '../../unidades/reductorTipos';
import { matrizVacia, ultimoRegistro } from '../../unidades/constantes';

// ¿Existe un último registro? SI y es un arreglo, lo convierto a un List immutable, si no regreso matriz en blanco.
const estadoInicial = ultimoRegistro && Array.isArray(ultimoRegistro.matriz) ?
    List(ultimoRegistro.matriz.map(e => List(e))) : matrizVacia;

const matriz = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.MATRIZ:
            return action.datos;
        default:
            return state;
    };
};
export default matriz;