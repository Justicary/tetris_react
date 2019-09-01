import * as tipoReductor from '../../unidades/reductorTipos';
import { ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && !isNaN(parseInt(ultimoRegistro.lineasDespejadas, 10)) ?
    parseInt(ultimoRegistro.lineasDespejadas, 10) : 0;

if(estadoInicial < 0) estadoInicial = 0;

const lineasDespejadas = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.LINEAS_DESPEJADAS:
            return action.datos;
        default:
            return state;
    };
};
export default lineasDespejadas;