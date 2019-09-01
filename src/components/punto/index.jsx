import React, { Component } from 'react';
import propTypes from 'prop-types';
import Numero from '../numero';
import i18n, { idioma } from '../../unidades/constantes';
const { datos } = i18n;
const MAN = datos.punto[idioma];
const MAR = datos.marcadorRecord[idioma];
const ULR = datos.ultimaRonda[idioma];

export default class Punto extends Component {
    constructor() {
        super();
        this.state = { etiqueta: '', numero: 0 };
    };
    componentDidMount() {
        this.alCambiar(this.props);
    };
    componentDidUpdate(sigProps) {
        if(this.props !== sigProps) this.alCambiar(sigProps);
    };
    shouldComponentUpdate({actual,punto,max}) {
        const props = this.props;
        return actual !== props.actual || punto !== props.punto || max !== props.max || !props.actual;
    };
    alCambiar({actual,punto,max}) {
        clearInterval(Punto.tiempofuera);
        if(actual) { // Partida en progreso.
            this.setState({ etiqueta: punto >= max ? MAR : MAN, numero: punto });
        } else { // Partida sin iniciar.
            const alternar = () => { // El puntaje más alto y el puntaje de la última ronda se alternan.
                this.setState({ etiqueta: ULR, numero: punto });
                Punto.tiempofuera = setTimeout(() => {
                    this.setState({ etiqueta: MAR, numero: max });
                    Punto.tiempofuera = setTimeout(alternar, 3000);
                }, 3000)
            };
            if(punto !== 0) { // Si no hay juego para la última ronda, no hay necesidad de preguntar.
                alternar();
            } else {
                this.setState({ etiqueta: MAR, numero: max });
            };
        };
    };
    render() {
        return (
            <div>
                <p>{this.state.etiqueta}</p>
                <Numero numero={this.state.numero} />
            </div>
        );
    };
};
Punto.statics = { tiempofuera: null };
Punto.propTypes = {
    actual: propTypes.bool,
    max: propTypes.number.isRequired,
    punto: propTypes.number.isRequired,
};