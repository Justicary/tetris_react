import React, {Component} from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import estilo from './index.less';

export default class Pausar extends Component {
    constructor() {
        super();
        this.state = { mostrarPausa: false }; // Controla el estado de la pantalla.
    };
    componentDidMount()     {
        this.saludar(this.props.datos);
    };
    componentDidUpdate({ datos }) {
        if(datos !== this.props.datos) this.saludar(datos);
    };
    shouldComponentUpdate({ datos }) {
        // Si está en pausa, no habrá re rendreos, teniendo en cuenta el efecto de parpadeo, volverá a verdadero directamente.
        if(datos) return true; 
        return datos !== this.props.datos;
    };
    saludar(bool) { // Se enciende o se apaga según los accesorios
        if(bool && !Pausar.tiempofuera) {
            Pausar.tiempofuera = setInterval( () => {
                this.setState({ mostrarPausa: !this.state.mostrarPausa });
            }, 250);
        };
        if(!bool && Pausar.tiempofuera) {
            clearInterval(Pausar.tiempofuera);
            this.setState({ mostrarPausa: false });
            Pausar.tiempofuera = null;
        };
    };
    render() {
        return ( 
            <div className={cn({ bg:true, [estilo.pausar]: true, [estilo.c]: this.state.mostrarPausa})} />
        );
    };
};
Pausar.statics = { tiempofuera: null };
Pausar.propTypes = { datos: propTypes.bool.isRequired };
Pausar.defaultProps = { datos: false };