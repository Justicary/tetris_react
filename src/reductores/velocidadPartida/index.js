import * as tipoReductor from '../../unidades/reductorTipos';
import { ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && !isNaN(parseInt(ultimoRegistro.velocidadPartida, 10)) ?
    parseInt(ultimoRegistro.velocidadPartida, 10) : 1;

if(estadoInicial < 1 || estadoInicial > 6) estadoInicial = 1;

const velocidadPartida = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.VEL_PARTIDA:
            return action.datos;
        default:
            return state;
    };
};
export default velocidadPartida;