import React, { Component } from 'react'
import cn from 'classnames';
import propTypes from 'prop-types';
import estilo from './index.less';

export default class Musica extends Component {
    shouldComponentUpdate({ datos }) {
        return datos !== this.props.datos;
    };
    render() {
        return (
            <div className={cn({ bg: true, [estilo.musica]: true, [estilo.c]: !this.props.datos })} />
        );
    };
};
Musica.propTypes = { datos: propTypes.bool.isRequired };