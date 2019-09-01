import React, { Component } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import i18n, { idioma } from '../../unidades/constantes';
import estilo from './index.less';
const { datos } = i18n;
export default class Logotipo extends Component {
    constructor() {
        super();
        this.state = {
            estilo: estilo.r1,
            display: 'none',
        };  
    };
    componentDidMount() {
        this.animar(this.props);
    };
    componentDidUpdate(sigProps) {
        if (( // El disparador solo cambia cuando el juego inicia o termina.   
            [this.props.actual, sigProps.actual].indexOf(false) !== -1 &&
            (this.props.actual !== sigProps.actual)) || (this.props.resetear !== sigProps.resetear)) {
            this.animar(sigProps);
        };
    };
    shouldComponentUpdate({actual, resetear}) { // Solo se actualiza cuando cambian algunas de mis props o cuando actual es false.
        return actual !== this.props.actual || resetear !== this.props.resetear || !actual;
    };
    animar({actual, resetear}) {
        clearTimeout(Logotipo.tiempofuera);
        this.setState({ estilo: estilo.r1, display: 'none' });
        if(actual || resetear) { this.setState({ display: 'none'}); return; };
        let m = 'r'; // Dirección
        let contador = 0;
        const establecer = (funcion, retraso) => { // Metodo auxiliar para controlar la animación
            if(!funcion) return;
            Logotipo.tiempofuera = setTimeout(funcion, retraso);
        };
        const mostrar = (funcion) => {
            establecer( () => {
                this.setState({ display: 'block' });
                if(funcion) funcion();
            }, 150);
        };
        const esconder = (funcion) => {
            establecer( () => {
                this.setState({ display: 'none' });
                if(funcion) funcion();
            }, 150);
        };
        const ojos = (funcion, retraso1, retraso2) => { // Parpadeo del dragon
            establecer( () => { 
                this.setState({estilo: estilo[m+2]});
                establecer( () => {
                    this.setState({estilo: estilo[m+1]});
                    if(funcion) funcion();
                }, retraso2)
            }, retraso1)
        };
        const correr = (funcion) => { // ¡Comienza a correr!
            establecer( () => {
                this.setState({ estilo: estilo[m+4] });
                establecer( () => {
                    this.setState({ estilo: estilo[m+3] });
                    contador++;
                    if(contador === 10 || contador === 20 || contador === 30) { m = m === 'r' ? 'l' : 'r'; };
                    if(contador<40) {
                        correr(funcion);
                        return;
                    };
                    this.setState({ estilo: estilo[m+1] });
                    if(funcion) { establecer(funcion, 4000);};
                }, 100);
            }, 100);
        };
        const ejercitarse = () => {
            contador = 0;
            ojos( () => {
                ojos( () => {
                    ojos( () => {
                        this.setState({ estilo: estilo[m+2] });
                        correr(ejercitarse);
                    }, 150, 150);
                }, 150, 150);
            }, 1000, 1500);
        };
        mostrar( () => { // Parpadea
            esconder( () => {
                mostrar( () => {
                    esconder( () => {
                        mostrar( () => {
                            ejercitarse(); // Comienza ejercitarse.
                        });
                    });
                });
            });
        });
    };
    render() {
        if(this.props.actual) return null;
        return (
            <div className={estilo.logotipo} style={{ display: this.state.display }}>
                <div className={cn({ bg: true, [estilo.dragon]: true, [this.state.estilo]: true })} />
                <p dangerouslySetInnerHTML={{__html: datos.tituloAlCentro[idioma] }} />
            </div>
        );
    };
};
Logotipo.propTypes = {
    actual: propTypes.bool,
    resetear: propTypes.bool.isRequired,
};
Logotipo.statics = {
    tiempofuera: null,
};