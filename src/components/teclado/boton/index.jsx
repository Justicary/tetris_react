import React, { Component } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import {transformar} from '../../../unidades/constantes';
import estilo from './index.less';

export default class Boton extends Component {
    shouldComponentUpdate(sigProps) {
        return sigProps.activo !== this.props.activo;
    };
    render() {
        const { activo, color, tamaño, arriba, izquierda, etiqueta, posicion, flecha } = this.props;
        return (
            <div className={cn({ [estilo.boton]:true, [estilo[color]]:true, [estilo[tamaño]]:true })} style={{ top: arriba, left: izquierda }}>
                <i className={cn({ [estilo.active]:activo })} ref={(c)=>{ this.dom=c; }} />
                { tamaño === 's1' && <em style={{ [transformar]: `${flecha} scale(1,2)` }} /> }
                <span className={cn({ [estilo.posicion]:posicion })}>{etiqueta}</span>
            </div>
        );
    };
};
Boton.propTypes = {
    color: propTypes.string.isRequired,
    tamaño: propTypes.string.isRequired,
    arriba: propTypes.number.isRequired,
    izquierda: propTypes.number.isRequired,
    etiqueta: propTypes.string.isRequired,
    posicion: propTypes.bool,
    flecha: propTypes.string,
    activo: propTypes.bool.isRequired,
};