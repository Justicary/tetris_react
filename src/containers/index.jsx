// Paquetes Node.js
import React, {Component} from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import propTypes from 'prop-types';
// Mis Componentes React
import Decorar from '../components/decorar';
import Guia from '../components/guia';
import Logotipo from '../components/logotipo';
import Matriz from '../components/matriz';
import Musica from '../components/musica';
import Numero from '../components/numero';
import Pausar from '../components/pausar';
import Punto from '../components/punto';
import Siguiente from '../components/siguiente';
import Teclado from '../components/teclado';
// Lógica && Redux
import i18n, { transformar, ultimoRegistro, velocidades, idioma } from '../unidades/constantes';
import unidad from '../unidades';
import estados from '../controles/estados';
// Diseño css, less, sass
import estilo from './index.less';
import './cargador.less';

console.info(`\u2713 Containers->index.jsx Preparando App...`);
const { estaEnfocado, eventoCambioVisibilidad } = unidad;
const {datos} = i18n;

class App extends Component {
    constructor() {
        super();
        this.state = {
            ancho: document.documentElement.clientWidth,
            alto: document.documentElement.clientHeight
        };
        window.addEventListener('resize', this.ajustarTamaño.bind(this), true);
    };
    componentDidMount() {
        if(eventoCambioVisibilidad) { // Monitorie el cambio de foco en la página y lo refleja en el estado redux correspondiente.
            document.addEventListener(eventoCambioVisibilidad, () => {
                estados.foco(estaEnfocado());
            }, false)
        };
        if(ultimoRegistro) { // Si tenemos registro en localStorage, lo leemos.
            console.info('Tenemos info en localStorage...');
            if(ultimoRegistro.actual && !ultimoRegistro.pausar) { // Obtengo el estado del último juego, si no esta en pausa, el juego continúa.
                const velocidadPartida = this.props.velocidadPartida;
                let tiempofuera = velocidades[velocidadPartida - 1] / 2; // Cuando continúa, tomo la mitad de la velocidad de caída actual.
                // El tiempo de permanencia no es inferior a la velocidad más rápida.
                tiempofuera = velocidadPartida < velocidades[velocidades.length - 1] ? velocidades[velocidades.length - 1] : velocidadPartida;
                estados.auto(tiempofuera);
            };
            if(!ultimoRegistro.actual) estados.reiniciar();
        } else {
            estados.reiniciar();
        };
    };
    ajustarTamaño() {
        this.setState({
            ancho: document.documentElement.clientWidth,
            alto: document.documentElement.clientHeight
        });
    };
    render() {
        let llenado = 0;
        const tamaño = (() => {
            const an = this.state.ancho;
            const al = this.state.alto;
            const radio = al / an;
            let escala;
            let css = {};
            if(radio < 1.5) {
                escala = al / 960;
            } else {
                escala = an / 640;
                llenado = (al - (960 * escala)) / escala / 3;
                css = {
                    paddingTop: Math.floor(llenado) + 42,
                    paddingBottom: Math.floor(llenado),
                    marginTop: Math.floor(-480 - (llenado * 1.5)),
                };
            };
            // console.warn(`Ventana ${ancho}X${alto} Radio[${radio}] Escala[${escala}]...`);
            css[transformar] = `scale(${escala})`;
            return css;
        })();
        // Renderizado JSX
        return (
            <div className={estilo.app} style={tamaño}>
                <div className={cn({ [estilo.rectBordeado]: true, [estilo.efectoSoltar]: this.props.soltar })}>
                    <Decorar />
                    <div className={estilo.pantalla}>
                        <div className={estilo.panel}>
                            <Matriz matriz={this.props.matriz} actual={this.props.actual} resetear={this.props.resetear} />
                            <Logotipo actual={!!this.props.actual} resetear={this.props.resetear} />
                            <div className={estilo.estado}>
                                <Punto actual={!!this.props.actual} punto={this.props.puntos} max={this.props.max} />
                                <p>{ this.props.actual ? datos.limpiar[idioma] : datos.lineaInicio[idioma] }</p>
                                <Numero numero={this.props.actual ? this.props.lineasDespejadas : this.props.lineasIniciales} />
                                <p>{ datos.nivel[idioma] }</p>
                                <Numero 
                                    numero={this.props.actual ? this.props.velocidadPartida : this.props.velocidadInicial}
                                    largo={1}
                                />
                                <p>{ datos.siguiente[idioma] }</p>
                                <Siguiente datos={this.props.siguiente} />
                                <div className={estilo.fondo}>
                                    <Musica datos={this.props.musica} />
                                    <Pausar datos={this.props.pausar} />
                                    <Numero tiempo />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Teclado llenado={llenado} teclado={this.props.teclado} />
                <Guia />
            </div>
        );
    };
};
App.propTypes = {
    actual: propTypes.object,
    lineasDespejadas: propTypes.number.isRequired,
    lineasIniciales: propTypes.number.isRequired,
    matriz: propTypes.object.isRequired,
    max: propTypes.number.isRequired,
    musica: propTypes.bool.isRequired,
    pausar: propTypes.bool.isRequired,
    puntos: propTypes.number.isRequired,
    resetear: propTypes.bool.isRequired,
    siguiente: propTypes.string.isRequired,
    teclado: propTypes.object.isRequired,
    soltar: propTypes.bool.isRequired,
    velocidadInicial: propTypes.number.isRequired,
    velocidadPartida: propTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
    actual: state.get('actual'),
    asegurar: state.get('asegurar'),
    lineasDespejadas: state.get('lineasDespejadas'),
    enfocar: state.get('enfocar'),
    lineasIniciales: state.get('lineasIniciales'),
    matriz: state.get('matriz'),
    max: state.get('max'),
    musica: state.get('musica'),
    pausar: state.get('pausar'),
    puntos: state.get('puntos'),
    resetear: state.get('resetear'),
    siguiente: state.get('siguiente'),
    teclado: state.get('teclado'),
    soltar: state.get('soltar'),
    velocidadInicial: state.get('velocidadInicial'),
    velocidadPartida: state.get('velocidadPartida')
})
export default connect(mapStateToProps)(App);