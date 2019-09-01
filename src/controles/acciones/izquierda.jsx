import evento from '../../unidades/evento';
import acciones from '../../acciones';
import estados from '../estados';
import { musica } from '../../unidades/musica';
import {velocidades, retrasos} from '../../unidades/constantes';
import unidad from '../../unidades';
const { quiero } = unidad;

const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.izq(true));
    evento.presionar({
        key: 'izquierda',
        inicia: 200,
        intervalo: 100,
        callback: () => {
            const estado = almacen.getState();
            if(estado.get('asegurar')) return;
            if(musica.mover) musica.mover();
            const actual = estado.get('actual');
            if(actual !== null) {
                if(estado.get('pausar')) { estados.pausar(false); return; };
                const siguiente = actual.izquierda();
                const retraso = retrasos[estado.get('velocidadPartida') - 1];
                let marcaTiempo;
                if(quiero(siguiente, estado.get('matriz'))) {
                    siguiente.marcaTiempo += parseInt(retraso, 10);
                    almacen.dispatch(acciones.moverBloque(siguiente));
                    marcaTiempo = siguiente.marcaTiempo;
                } else {
                    // "Muevo el retraso un poco más, golpeo el muro un poco menos"
                    actual.marcaTiempo += parseInt(parseInt(retraso, 10) / 1.5, 10);
                    almacen.dispatch(acciones.moverBloque(actual));
                    marcaTiempo = actual.marcaTiempo;
                };
                const restante = velocidades[estado.get('velocidadPartida') - 1] - (Date.now() - marcaTiempo);
                estados.auto(restante);
            } else {
                let velocidad = estado.get('velocidadInicial');
                console.log('velocidad inicial: ', velocidad);
                velocidad = velocidad - 1 < 1 ? 6 : velocidad - 1;
                almacen.dispatch(acciones.velInicial(velocidad));
            };
        },
    });
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.izq(false));
    evento.soltar({ key: 'izquierda', })
};
export default { presionar, soltar };