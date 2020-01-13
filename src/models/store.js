import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

function initializeStore(initialState = {}) {
    const devTools = process.env.NODE_ENV === 'development' && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
    return createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(thunk),
            devTools
        )
    );
}

export default initializeStore;
