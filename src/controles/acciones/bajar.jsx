import evento from '../../unidades/evento';
import acciones from '../../acciones';
import estados from '../estados';
import unidad from '../../unidades';
import { musica } from '../../unidades/musica';
const { quiero } = unidad;

const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.bajar(true));
    if(almacen.getState().get('actual') !== null) { // Se presiona la tecla bajar con un bloque en juego...
        evento.presionar({
            key: 'bajar',
            inicia: 40,
            intervalo: 40,
            callback: (detenerMovimiento) => {
                const estado = almacen.getState();
                if(estado.get('asegurar')) return;
                if(musica.mover) musica.mover();
                const actual = estado.get('actual');
                if(actual === null) return;
                if(estado.get('pausar')) { estados.pausar(false); return; };
                const siguiente = actual.caer();
                if(quiero(siguiente, estado.get('matriz'))) {
                    almacen.dispatch(acciones.moverBloque(siguiente));
                    estados.auto();
                } else {
                    let matriz = estado.get('matriz');
                    const figura = actual.figura;
                    const xy = actual.xy;
                    figura.forEach((m, t1) => (
                        m.forEach((n, t2) => {
                            if(n && xy.get(0) + t1 >= 0) { // Las coordenadas verticales pueden ser negativas.
                                let linea = matriz.get(xy.get(0) + t1);
                                linea = linea.set(xy.get(1) + t2, 1);
                                matriz = matriz.set(xy.get(0) + t1, linea);
                            };
                        })
                    ));
                    estados.elSiguiente(matriz, detenerMovimiento);
                };
            },
        });
    } else {
        evento.presionar({
            key: 'bajar',
            inicia: 200,
            intervalo: 100,
            callback: () => {
                if(almacen.getState().get('asegurar')) return;
                const estado = almacen.getState();
                const actual = estado.get('actual');
                if(actual) return;
                if(musica.mover) musica.mover();
                let lineasIniciales = estado.get('lineasIniciales');
                lineasIniciales = lineasIniciales -1 < 0 ? 10 : lineasIniciales -1;
                almacen.dispatch(acciones.lineasInicio(lineasIniciales));
            },
        });
    };
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.bajar(false));
    evento.soltar({ key: 'bajar', })
};
export default { presionar, soltar };