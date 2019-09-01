import * as tipoReductor from '../../unidades/reductorTipos';
import { tipoFigura, ultimoRegistro } from '../../unidades/constantes';
import unidad from '../../unidades';
const { obtenerSigTipo } = unidad;

const estadoInicial = ultimoRegistro && tipoFigura.indexOf(ultimoRegistro.siguiente) !== -1 ?
    ultimoRegistro.siguiente : obtenerSigTipo();
    
const siguiente = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.SIG_BLOQUE:
            return action.datos;
        default:
            return state;
    };
};
export default siguiente;