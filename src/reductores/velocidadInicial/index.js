import * as tipoReductor from '../../unidades/reductorTipos';
import { ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && !isNaN(parseInt(ultimoRegistro.velocidadInicial, 10)) ?
    parseInt(ultimoRegistro.velocidadInicial, 10) : 1;

if(estadoInicial < 1 || estadoInicial > 6) estadoInicial = 1;

const velocidadInicial = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.VEL_INICIAL:
            return action.datos;
        default:
            return state;
    };
};
export default velocidadInicial;