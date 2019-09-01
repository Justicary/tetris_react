import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import almacen from './almacen';
import App from './containers/';
import unidad from './unidades';
import './controles';
import './unidades/constantes';

const { guardarAlmacenLocalmente } = unidad;

console.info(`\u2713 Iniciando Aplicación...`);
guardarAlmacenLocalmente(almacen);

render (
    <Provider store={almacen}>
        <App />
    </Provider>
    , document.getElementById('root')
);