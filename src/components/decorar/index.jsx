import React, { Component } from 'react';
import cn from 'classnames';
import estilo from './index.less';
import i18n, {idioma} from '../../unidades/constantes';

const { datos } = i18n;

export default class Decorar extends Component {
    // Este componente NO se actualiza, ya que su función es solo la decoración inicial de la página.
    shouldComponentUpdate() {
        return false;
    };
    render() {
        return(
            <div className={estilo.decorar}>
                <div className={estilo.bordeSuperior}>
                    <span className={cn(['l', estilo.mr])} style={{ width: 40 }} />
                    <span className={cn(['l', estilo.mr])} />
                    <span className={cn(['l', estilo.mr])} />
                    <span className={cn(['l', estilo.mr])} />
                    <span className={cn(['l', estilo.mr])} />
                    <span className={cn(['r', estilo.ml])} style={{ width: 40 }} />
                    <span className={cn(['r', estilo.ml])} />
                    <span className={cn(['r', estilo.ml])} />
                    <span className={cn(['r', estilo.ml])} />
                    <span className={cn(['r', estilo.ml])} />
                </div>
                <h1>{datos.titulo[idioma]}</h1>
                <div className={estilo.vista}>
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />                
                </div>
                <div className={cn([estilo.vista, estilo.l])}>
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <b className="c" />
                    <p />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <div className="clear" />
                    <em />
                    <b className="c" />
                    <p />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                    <div className="clear" />
                    <b className="c" />
                </div>
            </div>
        );
    };
};