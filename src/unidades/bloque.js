import { List } from 'immutable';
import { formaFigura, origen } from './constantes';

class Bloque {
    constructor(opcion) {
        // Construcción de propiedades:
        this.tipo = opcion.tipo; // PROP#1 La propiedad TIPO es imprescindible para crear un bloque de forma correcta.
        if(!opcion.rotarIndice) { // PROP#2
            this.rotarIndice = 0;
        } else {
            this.rotarIndice = opcion.rotarIndice;
        };
        if(!opcion.marcaTiempo) { // PROP#3
            this.marcaTiempo = Date.now();
        } else {
            this.marcaTiempo = opcion.marcaTiempo;
        };
        if(!opcion.figura) { // PROP#4
            // Si al momento de crear el bloque, opcion NO se especifica el tipo de figura...
            // creo una en base al TIPO de bloque  y la guardo en su propiedad figura(List immutable).
            this.figura = List(formaFigura[opcion.tipo].map(e => List(e)));
        } else {
            this.figura = opcion.figura;
        };
        if(!opcion.xy) { // PROP#5
            // Si al momento de crear el bloque, opcion NO especifica su posición XY. Utilizo el tipo de bloque
            // y la guardo en su propiedad xy(List immutable) y la centro en pantalla.
            switch(opcion.tipo) {
                case 'I':
                    this.xy = List([0, 3]); // ■ ■ ■ ■
                    break;
                case 'L':
                    this.xy = List([-1, 4]); //     ■
                    break;                   // ■ ■ ■
                case 'J':
                    this.xy = List([-1, 4]); // ■
                    break;                   // ■ ■ ■
                case 'Z':
                    this.xy = List([-1, 4]); // ■ ■
                    break;                   //   ■ ■
                case 'S':
                    this.xy = List([-1, 4]); //   ■ ■
                    break;                   // ■ ■
                case 'O':
                    this.xy = List([-1, 4]); // ■ ■
                    break;                   // ■ ■
                case 'T':
                    this.xy = List([-1, 4]); //   ■
                    break;                   // ■ ■ ■
                default:
                    break;
            };
        } else {
            this.xy = List(opcion.xy);
        };
    };
    // Método #1 ROTAR:
    rotar() {
        const figura = this.figura;
        let resultado = List([]);
        figura.forEach(m => m.forEach((n, t) => {
            const indice = m.size - t - 1;
            if(resultado.get(indice) === undefined) {
                resultado = resultado.set(indice, List([]));
            };
            const tempoT = resultado.get(indice).push(n);
            resultado = resultado.set(indice, tempoT);
        }));
        const sigXY = [
            this.xy.get(0) + origen[this.tipo][this.rotarIndice][0],
            this.xy.get(1) + origen[this.tipo][this.rotarIndice][1],
        ];
        const sigRotarIndice = this.rotarIndice + 1 >= origen[this.tipo].length ? 0 : this.rotarIndice + 1;
        return {
            figura: resultado,
            tipo: this.tipo,
            xy: sigXY,
            rotarIndice: sigRotarIndice,
            marcaTiempo: this.marcaTiempo,
        };
    };
    // Método #2 CAER:
    caer(n = 1) { // (n) Velocidad de caida.
        return {
            figura: this.figura,
            tipo: this.tipo,
            xy: [this.xy.get(0) + n, this.xy.get(1)],
            rotarIndice: this.rotarIndice,
            marcaTiempo: Date.now(),
        };
    };
    // Método #3 DERECHA:
    derecha() {
        return {
            figura: this.figura,
            tipo: this.tipo,
            xy: [this.xy.get(0), this.xy.get(1) + 1],
            rotarIndice: this.rotarIndice,
            marcaTiempo: Date.now(),
        };
    };
    // Método #4 IZQUIERDA:
    izquierda() {
        return {
            figura: this.figura,
            tipo: this.tipo,
            xy: [this.xy.get(0), this.xy.get(1) - 1],
            rotarIndice: this.rotarIndice,
            marcaTiempo: Date.now(),
        };
    };
};
export default Bloque;