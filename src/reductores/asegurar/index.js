import * as tipoReductor from '../../unidades/reductorTipos';
var constantes = require('../../unidades/constantes');
const { ultimoRegistro } = constantes;

const estadoInicial = ultimoRegistro && ultimoRegistro.asegurar !== undefined ? !!ultimoRegistro.asegurar : false;

const asegurar = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.ASEGURAR:
            return action.datos;
        default:
            return state;
    };
};
export default asegurar;