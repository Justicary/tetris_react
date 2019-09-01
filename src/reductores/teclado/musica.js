import * as tipoReductor from '../../unidades/reductorTipos';

const estadoInicial = false;

const reductor = (state=estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.KEY_MUSICA:
            return action.datos;
        default:
            return state;
    };
};
export default reductor;