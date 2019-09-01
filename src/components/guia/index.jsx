import React, { Component } from 'react';
import codigoQR from 'qrcode';
// Lógica && Redux
import i18n, { transformar, idioma } from '../../unidades/constantes';
import unidad from '../../unidades';
// Diseño css, less, sass
import estilo from './index.less';

const {datos} = i18n; const {esMovil} = unidad;

export default class Guia extends Component {
    constructor() {
        super();
        this.state = { esMovil: esMovil(), codigoQR: '' };
        if(this.state.esMovil) return;
    };
    componentDidMount() {
        codigoQR.toDataURL(window.location.href, { margin: 1 })
            .then(datosUrl => this.setState({ codigoQR: datosUrl }));
    };
    shouldComponentUpdate(state) {
        if(state.codigoQR === this.state.codigoQR) return false;
        return true;
    };
    render() {
        if(this.state.esMovil) return (null);
        return (
            <div style={{ display: this.state.esMovil ? 'none' : 'block' }}>
                <div className={`${estilo.guia} ${estilo.right}`}>
                    <div className={estilo.up}>
                        <em style={{ [transformar]: 'translate(0, -3px) scale(1,2)' }} />
                    </div>
                    <div className={estilo.left}>
                        <em style={{ [transformar]: 'translate(-7px, 3px) rotate(-90deg) scale(1, 2)' }} />
                    </div>
                    <div className={estilo.down}>
                        <em style={{ [transformar]: 'translate(0, 9px) rotate(180deg) scale(1, 2)' }} />
                    </div>
                    <div className={estilo.right}>
                        <em style={{ [transformar]: 'translate(7px, 3px) rotate(90deg) scale(1, 2)' }} />
                    </div>
                </div>
                <div className={`${estilo.guia} ${estilo.left}`}>
                    <div className={estilo.space}>ESPACIO</div>
                </div>
                { this.state.codigoQR !== '' ? (
                    <div className={`${estilo.guia} ${estilo.qr}`}>
                        <img src={this.state.codigoQR} alt={datos.codigoQR[idioma]} />
                    </div>
                ) : null}
            </div>
        );
    };
};