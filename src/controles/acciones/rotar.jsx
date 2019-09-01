import evento from '../../unidades/evento';
import acciones from '../../acciones';
import estados from '../estados';
import unidad from '../../unidades';
import { musica } from '../../unidades/musica';
const { quiero } = unidad;

const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.rotar(true));
    if(almacen.getState().get('actual') !== null) {
        evento.presionar({
            key: 'rotar',
            unaVez: true,
            callback: () => {
                const estado = almacen.getState();
                if(estado.get('asegurar')) return;
                if(estado.get('pausar')) { estados.pausar(false); };
                const actual = estado.get('actual');
                if(actual === null) return;
                if(musica.rotar) musica.rotar();
                const siguiente = actual.rotar();
                if(quiero(siguiente, estado.get('matriz'))) {
                    almacen.dispatch(acciones.moverBloque(siguiente));
                };
            },
        });
    } else {
        // Si la partida es nueva, al presionar esta tecla se aumenta su dificultad al aumentar las lineas iniciales en pantalla.
        evento.presionar({
            key: 'rotar',
            inicia: 200,
            intervalo: 100,
            callback: () => {
                if(almacen.getState().get('asegurar')) return;
                if(musica.mover) musica.mover();
                const estado = almacen.getState();
                const actual = estado.get('actual');
                if(actual) return;
                let lineasIniciales = estado.get('lineasIniciales');
                lineasIniciales = lineasIniciales + 1 > 10 ? 0 : lineasIniciales + 1;
                almacen.dispatch(acciones.lineasInicio(lineasIniciales));
            },
        });
    };
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.rotar(false));
    evento.soltar({ key: 'rotar', })
};
export default { presionar, soltar };