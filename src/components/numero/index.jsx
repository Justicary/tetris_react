import React, { Component } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import estilo from './index.less';

const renderizar = (datos) => (
    <div className={estilo.numero}>
        { datos.map((e,k) => (
            <span className={cn(['bg', estilo[`s_${e}`]])} key={k}/>
        ))}
    </div>
);

const formato = (numero) => (
    numero < 10 ? `0${numero}`.split('') : `${numero}`.split('')
);

export default class Numero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contador_tiempo: false,
            tiempo: new Date(),
        };
        if(!props.tiempo) return;
        const reloj = () => {
            let contador = +Numero.intervaloTiempo;
            Numero.intervaloTiempo = setTimeout( () => {
                this.setState({ tiempo: new Date(), contador_tiempo: contador });
                reloj();
            }, 1000);
        };
        reloj();
    };
    shouldComponentUpdate({numero}) {
        if(this.props.tiempo) { // Reloj de la esquina inferior derecha.
            if(this.state.contador_tiempo !== Numero.contador_tiempo) {
                if(this.state.contador_tiempo !== false) {
                    Numero.contador_tiempo = this.state.contador_tiempo; // Memoriza el último caché del reloj.
                };
                return true;
            };
            return false; // Después de que se ha procesado el tiempo, devuelve falso.
        };
        return this.props.numero !== numero;
    };
    componentWillUnmount() {
        if(!this.props.tiempo) return;
        clearTimeout(Numero.intervaloTiempo);
    };
    render() {
        if(this.props.tiempo) { // Reloj de la esquina inferior derecha.
            let ahora = this.state.tiempo;
            let hora = formato(ahora.getHours());
            let min = formato(ahora.getMinutes());
            let seg = ahora.getSeconds() % 2;
            let tie = hora.concat(seg ? 'd' : 'd_c', min);
            return (renderizar(tie));
        };
        let numero = `${this.props.numero}`.split(''); // Creo arreglo del numero recibido.
        for(let i=0, largo = this.props.largo - numero.length; i < largo; i++) {
            numero.unshift('n');
        };
        return (renderizar(numero));
    };
};
Numero.statics = {
    intervaloTiempo: null,
    contador_tiempo: null,
};
Numero.propTypes = {
    numero: propTypes.number,
    largo: propTypes.number,
    tiempo: propTypes.bool,
};
Numero.defaultProps = {
    largo: 6,
};