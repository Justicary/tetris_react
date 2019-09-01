// Paquetes Node.js
import React, { Component } from 'react';
import immutable, { List } from 'immutable';
import cn from 'classnames';
import propTypes from 'prop-types';
// Lógica && Redux
import estados from '../../controles/estados';
import unidad from '../../unidades';
// Diseño css, less, sass
import estilo from './index.less';

const { seDespeja } = unidad;
var constantes = require('../../unidades/constantes');
const { lineaEnBlanco, llenarLinea } = constantes;

const t = setTimeout;

export default class Matriz extends Component {
    constructor() {
        super();
        this.state = {
            lineasDespejadas: false,
            animarColor: 2,
            perdiste: false,
            estadoPerdiste: null,
        };
    };
    componentDidUpdate(antProps = {}, antState) {
        if (this.props !== antProps) {
            let despejadas = seDespeja(this.props.matriz);
            let perdisteS = this.props.resetear;
            this.setState({ lineasDespejadas: despejadas, perdiste: perdisteS });
            
            if(despejadas && !this.state.lineasDespejadas) {
                this.animarDespeje(despejadas);
            };
            if(!despejadas && perdisteS && !this.state.perdiste) {
                this.perdiste(this.props);
            };
        };
    };
    shouldComponentUpdate(sigProps = {}) { // Comparo las dos listas(matrices) con Inmutable.
        const props = this.props;
        return !( // Si son identicas regreso false, si son diferentes regreso true
            immutable.is(sigProps.matriz, props.matriz) &&
                immutable.is((sigProps.actual && sigProps.actual.figura),
                    (props.actual && props.actual.figura)) &&
                        immutable.is(
                            (sigProps.actual && sigProps.actual.xy),
                            (props.actual && props.actual.xy)
                        )
        ) || this.state.lineasDespejadas || this.state.perdiste;
    };
    getResultado(props = this.props) {
        const actual = props.actual;
        const figura = actual && actual.figura;
        const xy = actual && actual.xy;
        let matriz = props.matriz;
        const lineasDespejadas = this.state.lineasDespejadas;
        if(lineasDespejadas) { // Cuando se depeja(n) linea(s) animo con color rojo el despeje.
            const animarColor = this.state.animarColor;
            lineasDespejadas.forEach((indice) => {
                matriz = matriz.set(indice, List([
                    animarColor,
                    animarColor,
                    animarColor,
                    animarColor,
                    animarColor,
                    animarColor,
                    animarColor,
                    animarColor,
                    animarColor,
                    animarColor,
                ]));
            });
        } else if(figura) {
            figura.forEach((m, k1) => (
                m.forEach((n, k2) => {
                    if (n && xy.get(0) + k1 >= 0) { // Las coordenadas verticales pueden ser negativas.
                        let linea = matriz.get(xy.get(0) + k1);
                        let color;
                        if (linea.get(xy.get(1) + k2) === 1 && !lineasDespejadas) { // Matriz y cuadrado coinciden.
                            color = 2;
                        } else {
                            color = 1;
                        };
                        linea = linea.set(xy.get(1) + k2, color);
                        matriz = matriz.set(xy.get(0) + k1, linea);
                    };
                })
            ));
        };
        return matriz;
    };
    animarDespeje() {
        const animar = (callback) => {
            t( () => { // Temporizadores anidados...
                this.setState({ animarColor: 0 });
                t( () => {
                    this.setState({ animarColor: 2 });
                    if(typeof callback === 'function') {
                        callback();
                    };
                }, 100);
            }, 100);
        };
        animar( () => { // Metodo anidado
            animar( () => {
                animar( () => {
                    t( () => {
                        estados.lineasDespejadas(this.props.matriz, this.state.lineasDespejadas);
                    }, 100);
                });
            });
        });
    };
    perdiste(sigProps) {
        let estadoPerdiste = this.getResultado(sigProps);
        this.setState({ estadoPerdiste });
        const exLinea = (indice) => {
            if(indice <= 19) {
                estadoPerdiste = estadoPerdiste.set(19 - indice, List(llenarLinea));
            } else if(indice >= 20 && indice <=39) {
                estadoPerdiste = estadoPerdiste.set(indice - 20, List(lineaEnBlanco));
            } else {
                estados.finalizar();
                return;
            };
            this.setState({ estadoPerdiste });
        };
        for(let i=0; i<=40; i++) {
            t(exLinea.bind(null, i), 40 * (i + 1));
        };
    };
    render() {
        let matriz;
        if(this.state.perdiste) {
            matriz = this.state.estadoPerdiste;
        } else {
            matriz = this.getResultado();
        };
        return (
            <div className={estilo.matriz}>
                {matriz.map((p, k1) => (
                    <p key={k1}>
                        { p.map((e, k2) => <b className={cn({ c: e === 1, d: e === 2 })} key={k2} />) }
                    </p>))
                }
            </div>
        );
    };
};
Matriz.propTypes = {
    matriz: propTypes.object.isRequired,
    actual: propTypes.object,
    resetear: propTypes.bool.isRequired,
};