import * as tipoReductor from '../../unidades/reductorTipos';
import { marcadorMax, ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && !isNaN(parseInt(ultimoRegistro.puntos, 10)) ?
    parseInt(ultimoRegistro.puntos, 10) : 0;
if(estadoInicial <= 0) {estadoInicial = 0;} else if(estadoInicial > marcadorMax) { estadoInicial = marcadorMax };

const puntos = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.PUNTOS:
            return action.datos > marcadorMax ? marcadorMax : action.datos; // No permito que los puntos sean mayores al máximo.
        default:
            return state;
    };
};
export default puntos;