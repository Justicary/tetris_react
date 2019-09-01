import * as tipoReductor from '../../unidades/reductorTipos';
import unidad from '../../unidades';
const { estaEnfocado } = unidad;

const estadoInicial = estaEnfocado();

const enfocar = (state=estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.ENFOCAR:
            return action.datos;
        default:
            return state;
    };
};
export default enfocar;