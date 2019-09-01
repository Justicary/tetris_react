import {tipoFigura, llaveAlmacenamiento} from './constantes';

const propiedadEscondida = (() => {
    let nombres = [ 'hidden', 'webkitHidden', 'mozHidden', 'msHidden' ];
    nombres = nombres.filter((e)=>(e in document));
    return nombres.length > 0 ? nombres[0] : false;
})();
const eventoCambioVisibilidad = (() => {
    if(!propiedadEscondida) return false;
    return propiedadEscondida.replace(/hidden/i, 'visibilitychange'); // Expresion regular que reemplaza el texto hidden por visibilitychange.
})();
const estaEnfocado = () => {
    if (!propiedadEscondida) { // Si no existe tal característica, siempre está enfocado.
      return true;
    }
    return !document[propiedadEscondida];
};
const unidad = { // Creo objeto unidad que contiene los métodos para el control del bloque.
    obtenerSigTipo() { // regresa una figura aleatoria que será la siguiente en caer.
        const longitud = tipoFigura.length; // Para tetris siempre debe ser 7.
        return tipoFigura[Math.floor(Math.random() * longitud)]; // Obtengo una figura aleatoria.
    },
    quiero(siguiente, matriz) { // ¿Puedo mover el bloque a la posición solicitada por los controles?
        const xy = siguiente.xy;
        const figura = siguiente.figura;
        const horizontal = figura.get(0).size; // Tamaño horizontal del bloque
        // Logica pra el control de colisiones en la matriz...(regresa true o false)
        return figura.every((m, t1) => ( 
            m.every((n, t2) => {
                if(xy[1] < 0) return false; // Izq
                if(xy[1] + horizontal > 10) return false; // Der
                if(xy[0] + t1 < 0) return true; // Arriba
                if(xy[0] + t1 >= 20) return false; // Abajo
                if(n){
                    if(matriz.get(xy[0] + t1).get(xy[1] + t2)) { return false; };
                    return true;
                };
                return true;
            })
        ));
    },
    seDespeja(matriz) { // Cuando la línea alcanza el estado de despeje.
        const lineasDespejadas = []; // Arreglo que guarda el o los indices de la(s) linea(s) que se está(n) despejando.
        matriz.forEach((linea, indice) => { // Checo cada linea de la matriz con el método EVERY de un LIST Immutable...
            // si esta completa la linea en la matriz, agrego su indice a lineasDespejadas.
            if(linea.every(n => !!n)) lineasDespejadas.push(indice); 
        });
        if(lineasDespejadas.length === 0) return false;
        return lineasDespejadas; // Si existen lineas despejadas, regreso el o los indices.
    },
    perdiste(matriz) { // Si el juego ha terminado, la primera línea se basa en el cuadro.
        return matriz.get(0).some(n => !!n); // Regresa TRUE ó FALSE si la primera linea de la matriz tiene iterables(1 o más...).
    },
    guardarAlmacenLocalmente(almacen) { // Almaceno el redux STATE en localStorage. 
        try {
            almacen.subscribe(() => {
                let datos = almacen.getState().toJS();
                if(datos.asegurar) { // Cuando el estado está asegurado, no se registran datos.
                    return; 
                };
                // Aplicando codificación...
                datos = JSON.stringify(datos); // 1.- Convierto objeto a JSON.
                datos = encodeURIComponent(datos); // 2.- Codifico con secuencias de escape.
                if(window.btoa) datos = btoa(datos); // 3.- Codifico datos usando base 64.
                localStorage.setItem(llaveAlmacenamiento, datos);
                console.info(`\u2713 guardarAlmacenLocalmente - Registrando cambios en la App...`);
            });
        } catch(e) {
            console.error(`\u274c unidades->guardarAlmacenLocalmente - ERROR [${e}] `); // Tache rojo
        };
    },
    esMovil() { // Determino si la terminal es un móvil...
        const ua = navigator.userAgent;
        const android = /Android (\d+\.\d+)/.test(ua);
        const iphone = ua.indexOf('iPhone') > -1;
        const ipod = ua.indexOf('iPod') > -1;
        const ipad = ua.indexOf('iPad') > -1;
        const nokiaN = ua.indexOf('NokiaN') > -1;
        return android || iphone || ipod || ipad || nokiaN;
    },
    estaEnfocado,
    eventoCambioVisibilidad, // Incluyo a mi clase unidad estos dos métodos externos.
};
export default unidad;