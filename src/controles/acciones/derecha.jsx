import evento from '../../unidades/evento';
import acciones from '../../acciones';
import estados from '../estados';
import {velocidades, retrasos} from '../../unidades/constantes';
import unidad from '../../unidades';
import { musica } from '../../unidades/musica';
const { quiero } = unidad;


const presionar = (almacen) => {
    almacen.dispatch(acciones.teclado.der(true));
    evento.presionar({
        key: 'derecha',
        inicia: 200,
        intervalo: 100,
        callback: () => {
            const estado = almacen.getState();
            if(estado.get('asegurar')) return;
            if(musica.mover) musica.mover();
            const actual = estado.get('actual');
            if (actual !== null) {
                if(estado.get('pausar')) { estados.pausar(false); return; };
                const siguiente = actual.derecha();
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
                velocidad = velocidad + 1 > 6 ? 1 : velocidad + 1;
                almacen.dispatch(acciones.velInicial(velocidad));
            };
        },
    });
};
const soltar = (almacen) => {
    almacen.dispatch(acciones.teclado.der(false));
    evento.soltar({ key: 'derecha', })
};
export default { presionar, soltar };