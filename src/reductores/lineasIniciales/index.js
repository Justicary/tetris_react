import * as tipoReductor from '../../unidades/reductorTipos';
import { ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && !isNaN(parseInt(ultimoRegistro.lineasIniciales, 10)) ?
    parseInt(ultimoRegistro.lineasIniciales, 10) : 0;
if(estadoInicial < 0 || estadoInicial > 10) estadoInicial = 0;

const lineasIniciales = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.LINEAS_INICIO:
            return action.datos;
        default:
            return state;
    };
};
export default lineasIniciales;