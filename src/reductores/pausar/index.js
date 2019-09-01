import * as tipoReductor from '../../unidades/reductorTipos';
import { ultimoRegistro } from '../../unidades/constantes';

const estadoInicial = ultimoRegistro && ultimoRegistro.pausar !== undefined ? !!ultimoRegistro.pausar : false;

const pausar = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.PAUSAR:
            return action.datos;
        default:
            return state;
    };
};
export default pausar;