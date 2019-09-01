import * as tipoReductor from '../../unidades/reductorTipos';
import { marcadorMax, ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && !isNaN(parseInt(ultimoRegistro.max, 10)) ?
    parseInt(ultimoRegistro.max, 10) : 0;
if(estadoInicial < 0) {estadoInicial = 0;} else {estadoInicial=marcadorMax};

const puntajeMaximo = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.MAX:
            return action.datos > 999999 ? 999999 : action.datos; // Defino el puntaje máximo del juego.
        default:
            return state;
    };
};
export default puntajeMaximo;