import { combineReducers } from 'redux-immutable';
import actual from './actual';
import asegurar from './asegurar';
import lineasDespejadas from './lineasDespejadas';
import enfocar from './enfocar';
import lineasIniciales from './lineasIniciales';
import matriz from './matriz';
import max from './max';
import musica from './musica';
import pausar from './pausar';
import puntos from './puntos';
import resetear from './resetear';
import siguiente from './siguiente';
import teclado from './teclado';
import soltar from './soltar';
import velocidadInicial from './velocidadInicial';
import velocidadPartida from './velocidadPartida';

export default () => combineReducers({
    actual,
    asegurar,
    lineasDespejadas,
    enfocar,
    lineasIniciales,
    matriz,
    max,
    musica,
    pausar,
    puntos,
    resetear,
    siguiente,
    teclado,
    soltar,
    velocidadInicial,
    velocidadPartida,
});