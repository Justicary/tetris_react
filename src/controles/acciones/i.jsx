import evento from '../../unidades/evento';
import acciones from '../../acciones';

const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.musica(true));
    if(almacen.getState().get('asegurar')) return;
    evento.presionar({
        key: 'i',
        unaVez: true,
        callback: () => {
            if(almacen.getState().get('asegurar')) return;
            almacen.dispatch(acciones.musica(!almacen.getState().get('musica')));
        },
    });
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.musica(false));
    evento.soltar({ key: 'i', })
};
export default { presionar, soltar };