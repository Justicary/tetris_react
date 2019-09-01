import * as tipoReductor from '../../unidades/reductorTipos';
import { tenemosWebAudioAPI } from '../../unidades/musica';
import { ultimoRegistro } from '../../unidades/constantes';

let estadoInicial = ultimoRegistro && ultimoRegistro.musica !== undefined ? !!ultimoRegistro.musica : true;
if(!tenemosWebAudioAPI.datos) estadoInicial = false;

const musica = (state = estadoInicial, action) => {
    switch(action.type) {
        case tipoReductor.MUSICA:
            if(!tenemosWebAudioAPI.datos) { // Si el navegador no admite WebAudioApi, el sonido no se reproducirá.
                return false;
            };
            return action.datos;
        default:
            return state;
    };
};
export default musica;