import React, { Component } from 'react';
import propTypes from 'prop-types';
import {formaFigura} from '../../unidades/constantes';
import estilo from './index.less';

const xy = {
    I: [1, 0],
    L: [0, 0],
    J: [0, 0],
    Z: [0, 0],
    S: [0, 0],
    O: [0, 1],
    T: [0, 0],
};
const vacio = [
    [0,0,0,0],
    [0,0,0,0],
];

export default class Siguiente extends Component {
    constructor(props) {
        super();
        this.inicia = true;
        this.state = { bloque: vacio };
        this.construir(props.datos);
    };
    componentDidUpdate(sigProps) {
        if(this.props !== sigProps) this.construir(sigProps.datos);
    };
    shouldComponentUpdate(sigProps) {
        return sigProps.datos !== this.props.datos;
    };
    construir(tipo) {
        const forma = formaFigura[tipo];
        const bloque = vacio.map(e => ([...e])); // Inicializo un bloque vacio...
        forma.forEach((m, k1) => { // En base a la forma recibida creo un bloque...
            m.forEach((n, k2) => {
              if (n) {
                bloque[k1 + xy[tipo][0]][k2 + xy[tipo][1]] = 1;
              };
            });
        });
        if(this.inicia) {
            this.inicia = false;
            this.state = { bloque };
        } else {
            this.setState({ bloque });
        };
    };
    render() {
        return (
            <div className={estilo.siguiente}>
                { this.state.bloque.map((arregloA, indice1) => (
                    <div key={indice1}>
                        { arregloA.map((arregloB, indice2) => (
                            <b className={arregloB ? 'c' : ''} key={indice2} />
                        )) }
                    </div>
                )) }
            </div>
        );
    };
};
Siguiente.propTypes = { datos: propTypes.string };