import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reductorPrincipal from '../reductores';

const middlewares = [thunk];

const composeMejoradores = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Especificar opciones de extención como:  name, actionsBlacklist, actionsCreators, serialize, etc...
      })
    : compose;

const almacen = createStore(reductorPrincipal(), composeMejoradores(applyMiddleware(...middlewares)));

export default almacen;