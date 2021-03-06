import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from './middlewares/logger';

const initialState = {};

const middleWare = [thunk];

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState)
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
    rootReducer,
    persistedState,
    compose(
    applyMiddleware(...middleWare,logger)
    ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

store.subscribe(() => saveToLocalStorage(store.getState()))


export default store;