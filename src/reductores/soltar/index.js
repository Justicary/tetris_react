import * as tipoReductor from '../../unidades/reductorTipos';
import { ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && ultimoRegistro.soltar !== undefined ? !!ultimoRegistro.soltar : false;

const soltar = (state = estadoInicial, action) => {
    switch (action.type) {
        case tipoReductor.SOLTAR:
          return action.datos;
    default:
        return state;
    };
};
export default soltar;