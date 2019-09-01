import { combineReducers } from 'redux-immutable';
import bajar from './bajar';
import derecha from './derecha';
import izquierda from './izquierda';
import musica from './musica';
import pausar from './pausar';
import resetear from './resetear';
import rotar from './rotar';
import soltar from './soltar';

const reductorTeclado = combineReducers({
    bajar,
    derecha,
    izquierda,
    musica,
    pausar,
    resetear,
    rotar,
    soltar,
});
export default reductorTeclado;