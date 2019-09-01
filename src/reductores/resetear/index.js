import * as tipoReductor from '../../unidades/reductorTipos';
import { ultimoRegistro } from '../../unidades/constantes';

const estadoInicial = ultimoRegistro && ultimoRegistro.resetear ? !!ultimoRegistro.resetear : false;

const resetear = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.RESETEAR:
            return action.datos;
        default:
            return state;
    };
};
export default resetear;