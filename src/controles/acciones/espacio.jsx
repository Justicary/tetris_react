import evento from '../../unidades/evento';
import acciones from '../../acciones';
import estados from '../estados';
import unidad from '../../unidades';
import { musica } from '../../unidades/musica';
const { quiero } = unidad;

const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.soltar(true));
    evento.presionar({
        key: 'espacio',
        unaVez: true,
        callback: () => {
            const estado = almacen.getState();
            if(estado.get('asegurar')) return;
            const actual = estado.get('actual');
            if(actual !== null) { // Parte inferior.
                if(estado.get('pausar')) { estados.pausar(false); return; };
                if(musica.soltar) musica.soltar();
                let indice = 0;
                let fondo = actual.caer(indice);
                while (quiero(fondo, estado.get('matriz'))) { // Iteración que manda el bloque al fondo.
                    fondo = actual.caer(indice);
                    indice++;
                };
                let matriz = estado.get('matriz');
                fondo = actual.caer(indice - 2);
                almacen.dispatch(acciones.moverBloque(fondo));
                const figura = fondo.figura;
                const xy = fondo.xy;
                figura.forEach((m, k1) => (
                    m.forEach((n, k2) => {
                      if (n && xy[0] + k1 >= 0) {
                        let linea = matriz.get(xy[0] + k1);
                        linea = linea.set(xy[1] + k2, 1);
                        matriz = matriz.set(xy[0] + k1, linea);
                      }
                    })
                ));
                almacen.dispatch(acciones.soltar(true));
                setTimeout(() => {
                    almacen.dispatch(acciones.soltar(false));
                }, 100);
                estados.elSiguiente(matriz);
            } else {
                estados.iniciar();
            };
        },
    });
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.soltar(false));
    evento.soltar({ key: 'espacio', })
};
export default { presionar, soltar };