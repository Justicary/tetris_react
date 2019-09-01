import evento from '../../unidades/evento';
import acciones from '../../acciones';
import estados from '../estados';

const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.pausar(true));
    evento.presionar({
        key: 'p',
        unaVez: true,
        callback: () => {
            const estado = almacen.getState();
            if(estado.get('asegurar')) return;
            const actual = estado.get('actual');
            const estaPausado = estado.get('pausar');
            if(actual !== null) { // Pausar.
                estados.pausar(!estaPausado);
            } else { // Nueva partida.
                estados.iniciar();
            };
        },
    });
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.pausar(false));
    evento.soltar({ key: 'p', })
};
export default { presionar, soltar };