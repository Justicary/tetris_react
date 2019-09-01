import React, {Component} from 'react';
import Immutable from 'immutable';
import propTypes from 'prop-types';
import almacen from '../../almacen';
import acciones from '../../controles/acciones';
import i18n, {idioma} from '../../unidades/constantes';
import estilo from './index.less';
import Boton from './boton';

const { datos } = i18n;

export default class Teclado extends Component {
    componentDidMount() {
        // Para operación en dispositivos móviles se activa el inicio táctil, realiza registro y el evento posterior del mouse ya no se activará.
        const atrapaEventoTocar = {};
        // El mouse activa mousedown, obvio no activa el mouseup al eliminar elementos, este es un simulador de mouseup/mouseout compatible
        const atrapaEventoMousedown = {};

        document.addEventListener('touchstart', (e) => { if(e.preventDefault) { e.preventDefault(); }; }, true);
        document.addEventListener('touchend', (e) => { if(e.preventDefault) { e.preventDefault(); }; }, true);
        document.addEventListener('gesturestart', (e) => { if(e.preventDefault) { e.preventDefault(); }; }); //Evita que dos dedos se acerquen.
        document.addEventListener('mousedown', (e) => { if(e.preventDefault) { e.preventDefault(); }; }, true);

        // Le asigno a cada tipo de botón su controlador de eventos de forma dinámica.
        Object.keys(acciones).forEach((tecla) => {
            this[`dom_${tecla}`].dom.addEventListener('mousedown', () => {
                if(atrapaEventoTocar[tecla] === true) return;
                acciones[tecla].presionar(almacen);
                atrapaEventoMousedown[tecla] = true;
            }, true);
            this[`dom_${tecla}`].dom.addEventListener('mouseup', () => {
                if(atrapaEventoTocar[tecla] === true) {atrapaEventoTocar[tecla] = false; return;};
                acciones[tecla].soltar(almacen);
                atrapaEventoMousedown[tecla] = false;
            }, true);
            this[`dom_${tecla}`].dom.addEventListener('mouseout', () => {
                if(atrapaEventoMousedown[tecla] === true) { acciones[tecla].soltar(almacen); };
            }, true);
            this[`dom_${tecla}`].dom.addEventListener('touchstart', () => {
                atrapaEventoTocar[tecla] = true;
                acciones[tecla].presionar(almacen);
            }, true);
            this[`dom_${tecla}`].dom.addEventListener('touchend', () => {
                acciones[tecla].soltar(almacen);
            }, true);
        });
    };
    shouldComponentUpdate({ teclado, llenado }) {
        return !Immutable.is(teclado, this.props.teclado) || llenado !== this.props.llenado;
    };
    render() {
        const teclado = this.props.teclado;
        return(
            <div className={estilo.teclado} style={{ marginTop: 20 + this.props.llenado }}>
                <Boton 
                    color='blue'
                    tamaño='s1'
                    arriba={0}
                    izquierda={374}
                    etiqueta={datos.rotar[idioma]}
                    flecha='translate(0, 63px)'
                    posicion
                    activo={teclado.get('rotar')}
                    ref={(c) => {this.dom_rotar = c;}}
                />
                <Boton 
                    color='blue'
                    tamaño='s1'
                    arriba={180}
                    izquierda={374}
                    etiqueta={datos.abajo[idioma]}
                    flecha='translate(0, -71px) rotate(180deg)'
                    activo={teclado.get('bajar')}
                    ref={(c) => {this.dom_bajar = c;}}
                />
                <Boton 
                    color='blue'
                    tamaño='s1'
                    arriba={90}
                    izquierda={284}
                    etiqueta={datos.izq[idioma]}
                    flecha='translate(60px, -12px) rotate(270deg)'
                    activo={teclado.get('izquierda')}
                    ref={(c) => {this.dom_izquierda = c;}}
                />
                <Boton 
                    color='blue'
                    tamaño='s1'
                    arriba={90}
                    izquierda={464}
                    etiqueta={datos.der[idioma]}
                    flecha='translate(-60px, -12px) rotate(90deg)'
                    activo={teclado.get('derecha')}
                    ref={(c) => {this.dom_derecha = c;}}
                />
                <Boton 
                    color='blue'
                    tamaño='s0'
                    arriba={100}
                    izquierda={52}
                    etiqueta={`${datos.soltar[idioma]} (espacio)`}
                    activo={teclado.get('soltar')}
                    ref={(c) => {this.dom_espacio = c;}}
                />
                <Boton 
                    color='red'
                    tamaño='s2'
                    arriba={0}
                    izquierda={196}
                    etiqueta={`${datos.resetear[idioma]}(R)`}
                    activo={teclado.get('resetear')}
                    ref={(c) => {this.dom_r = c;}}
                />
                <Boton 
                    color='green'
                    tamaño='s2'
                    arriba={0}
                    izquierda={106}
                    etiqueta={`${datos.sonido[idioma]}(I)`}
                    activo={teclado.get('musica')}
                    ref={(c) => {this.dom_i = c;}}
                />
                <Boton 
                    color='green'
                    tamaño='s2'
                    arriba={0}
                    izquierda={16}
                    etiqueta={`${datos.pausar[idioma]}(P)`}
                    activo={teclado.get('pausar')}
                    ref={(c) => {this.dom_p = c;}}
                />
            </div>
        );
    };
};
Teclado.propTypes = {
    llenado: propTypes.number.isRequired,
    teclado: propTypes.object.isRequired,
};