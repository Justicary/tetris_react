import evento from '../../unidades/evento';
import acciones from '../../acciones';
import estados from '../estados';

const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.resetear(true));
    if(almacen.getState().get('asegurar')) return;
    if(almacen.getState().get('actual') !== null) {
        evento.presionar({
            key: 'r',
            unaVez: true,
            callback: () => { estados.reiniciar(); },
        });
    } else {
        evento.presionar({
            key: 'r',
            unaVez: true,
            callback: () => {
                if(almacen.getState().get('asegurar')) return;
                estados.iniciar(); // Nueva partida.
            },
        });
    };
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.resetear(false));
    evento.soltar({ key: 'r', })
};
export default { presionar, soltar };