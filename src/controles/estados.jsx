import { List } from 'immutable';
import almacen from '../almacen';
import unidad from '../unidades';
import acciones from '../acciones';
import  { velocidades, lineaEnBlanco, matrizVacia, puntosPorDespeje, lineasTotales } from '../unidades/constantes';
import { musica } from '../unidades/musica';
const { quiero, seDespeja, perdiste } = unidad;

const getMatrizInicial = async (lineasIniciales) => { // Método que generara la matríz inicial del juego.
    const getLinea = (min, max) => { // Método que devuelve una línea con un número entre min ~ max, (incluido el límite)
        const contador = parseInt((((max - min) + 1) * Math.random()) + min, 10);
        const linea = [];
        for(let i=0; i < contador; i++) { linea.push(1); }; // Resalto la linea insertada.
        for(let i=0, largo = 10 - contador; i < largo; i++) { // Inserto grises en posiciónes aleatorias.
            const indice = parseInt(((linea.length + 1) * Math.random()), 10);
            linea.splice(indice, 0, 0); // En la posicion de indice reemplazo el valor con un cero(0) el cual representa el color gris.
        };
        return List(linea); // Retorno un arreglo tipo List-Immutable.
    };
    let matrizInicial = List([]); // Inicializo arreglo List-Immutable en blanco.
    for(let i=0; i < lineasIniciales; i++) {
        if(i <=2) { // 0-3
            matrizInicial = matrizInicial.push(getLinea(5, 8));
        } else if (i<=6) { // 4-6
            matrizInicial = matrizInicial.push(getLinea(4, 9));
        } else { // 7-9
            matrizInicial = matrizInicial.push(getLinea(3, 9));
        };
    };
    for(let i=0, largo = 20 - lineasIniciales; i < largo; i++) { // Inserto la parte gris superior.
        matrizInicial = matrizInicial.unshift(List(lineaEnBlanco));
    };
    return matrizInicial;
};
const estados = {
    intervaloCaida: null, // Variable que controla el ajuste automático de caída.
    auto: (tiempofuera) => { // Método que controla la caída automática del bloque.
        const salida = (tiempofuera < 0 ? 0 : tiempofuera);
        let estado = almacen.getState();
        let actual = estado.get('actual');
        const caer = () => {
            estado = almacen.getState();
            actual = estado.get('actual');
            const siguiente = actual.caer();
            if(quiero(siguiente, estado.get('matriz'))) {
                almacen.dispatch(acciones.moverBloque(siguiente));
                estados.intervaloCaida = setTimeout(caer, velocidades[estado.get('velocidadPartida') - 1]);
            } else {
                let matriz = estado.get('matriz');
                const figura = actual && actual.figura;
                const xy = actual && actual.xy;
                figura.forEach((m, t1) => (
                    m.forEach((n, t2) => {
                        if(n && xy.get(0) + t1 >= 0) { // Las coordenadas verticales pueden ser negativas.
                            let linea = matriz.get(xy.get(0) + t1);
                            linea = linea.set(xy.get(1) + t2, 1);
                            matriz = matriz.set(xy.get(0) + t1, linea);
                        };
                    })
                ));
                estados.elSiguiente(matriz);
            };
        };
        clearTimeout(estados.intervaloCaida);
        estados.intervaloCaida = setTimeout(caer, salida === undefined ? velocidades[estado.get('velocidadPartida') - 1] : salida);
    },
    // Método que controla el fin de un bloque y dispara el siguiente...
    elSiguiente: (matriz, detenerMovimiento) => {
        // console.info('\u2713 GENERO EL SIGUIENTE BLOQUE...');
        clearTimeout(estados.intervaloCaida);
        almacen.dispatch(acciones.asegurar(true)); // Deshabilito botones del tablero.
        almacen.dispatch(acciones.matriz(matriz));
        if(typeof detenerMovimiento === 'function') { detenerMovimiento(); };
        const sumarPuntos = (almacen.getState().get('puntos') + 10) +
            ((almacen.getState().get('velocidadPartida') - 1) * 2); // Cuanto más rápida sea la velocidad, mayor será el puntaje.
        estados.despacharPuntos(sumarPuntos);
        if(seDespeja(matriz)) { 
            if(musica.despejado) { musica.despejado(); };
            return;
        };
        if(perdiste(matriz)) {
            console.info('\u2713 ¡PERDISTE!');
            if(musica.perdiste) { musica.perdiste(); };
            estados.finalizar();
            return;
        };
        setTimeout(() => {
            almacen.dispatch(acciones.asegurar(false)); // Habilito botones del tablero.
            almacen.dispatch(acciones.moverBloque({ tipo: almacen.getState().get('siguiente') })); // Obtengo el tipo del siguiente bloque.
            almacen.dispatch(acciones.sigBloque());
            estados.auto();
        }, 100); // Cada centesima de segundo actualizo el estado.
    },
    // Método que observa si la pagina esta enfocada y toma acciones acorde...
    foco: (estaEnfocado) => {
        almacen.dispatch(acciones.enfocar(estaEnfocado));
        if(!estaEnfocado) { // Si la página esta desenfocada...
            // console.info('\u274c PAGINA DESENFOCADA...'); 
            clearTimeout(estados.intervaloCaida); // ...detengo la caida del bloque.
            return;
        };
        // console.info('\u2713 PAGINA ENFOCADA...');
        const estado = almacen.getState();
        if(estado.get('actual') && !estado.get('resetear') && !estado.get('pausar')) {
            // Si tenemos datos actuales, no hemos reseteado el juego & no esta pausado...
            estados.auto(); //...continúa la caida del bloque.
        };
    },
    // Suspender el juego
    pausar: (estaPausado) => {
        almacen.dispatch(acciones.pausar(estaPausado));
        if(estaPausado) {
            clearTimeout(estados.intervaloCaida); //...detengo la caida del bloque al borrar el temporizador.
            return;
        };
        estados.auto(); //...continúa la caida del bloque.
    },
    // Eliminar lineas
    lineasDespejadas: (matriz, lineas) => {
        const estado = almacen.getState();
        let nuevaMatriz = matriz;
        lineas.forEach(n => { // Por cada linea despejada.
            nuevaMatriz = nuevaMatriz.splice(n, 1); // Remueve la(s) linea(s).
            nuevaMatriz = nuevaMatriz.unshift(List(lineaEnBlanco)); // Inserta una linea en blanco al inicio.
        });
        almacen.dispatch(acciones.matriz(nuevaMatriz));
        almacen.dispatch(acciones.moverBloque({ tipo: estado.get('siguiente') }));
        almacen.dispatch(acciones.sigBloque());
        estados.auto();
        almacen.dispatch(acciones.asegurar(false));
        const lineasDespejadas = estado.get('lineasDespejadas') + lineas.length;
        almacen.dispatch(acciones.lineasDespejadas(lineasDespejadas)); // Actualizo línea de eliminación.

        const sumarPuntos = estado.get('puntos') +
            puntosPorDespeje[lineas.length - 1]; // Cuantas más filas se eliminen a la vez, más puntos sumará.
        almacen.dispatch(acciones.puntos(sumarPuntos));

        const agregarVelocidad = Math.floor(lineasDespejadas / lineasTotales); // En base al numero de filas eliminadas, aumento la velocidad del juego.
        let velocidadActual = estado.get('velocidadInicial') + agregarVelocidad;
        velocidadActual = velocidadActual > 6 ? 6 : velocidadActual; // Limito la velocidad máxima a 6.
        almacen.dispatch(acciones.velPartida(velocidadActual));
    },
    iniciar: () => {
        if(musica.iniciar) musica.iniciar();
        const estado = almacen.getState(); // Asignación de todo el REDUX-STATE.
        estados.despacharPuntos(0);
        almacen.dispatch(acciones.velPartida(estado.get('velocidadInicial')));
        const lineasIniciales = estado.get('lineasIniciales');
        getMatrizInicial(lineasIniciales).then((matrizInicial)=> {
            almacen.dispatch(acciones.matriz(matrizInicial));
            almacen.dispatch(acciones.moverBloque({ tipo: estado.get('siguiente') }));
            almacen.dispatch(acciones.sigBloque());
            estados.auto();
        });
    },
    reiniciar: () => { // Fin del juego, animación de activación.
        console.info('ESTADOS-REINICIANDO...');
        clearTimeout(estados.intervaloCaida);
        almacen.dispatch(acciones.asegurar(true));
        almacen.dispatch(acciones.resetear(true));
        almacen.dispatch(acciones.pausar(false));
    },
    finalizar: () => { // Animación de finalización del juego.
        almacen.dispatch(acciones.matriz(matrizVacia));
        almacen.dispatch(acciones.moverBloque({ resetear: true })); // Establezco actual a null.
        almacen.dispatch(acciones.resetear(false));
        almacen.dispatch(acciones.asegurar(false));
        almacen.dispatch(acciones.lineasDespejadas(0));
    },
    despacharPuntos: (puntos) => { // Escribe el marcador, y determina si es el puntaje más alto
        almacen.dispatch(acciones.puntos(puntos));
        if(puntos > 0 && puntos > almacen.getState().get('max')) { // ¡Nuevo record!
            almacen.dispatch(acciones.max(puntos));
        };
    },
};
export default estados;