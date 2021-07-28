import { createStore } from "redux"
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const INITIAL_STATE = {};

const persistConfig = {
    key: 'root',
    storage
}

function login(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case 'LOGIN':
            return {...state, data: action.user}
        case 'RESET':
            return INITIAL_STATE
        default:
            return state;
    }
}

const _persistReducer = persistReducer(persistConfig, login)

const store = createStore(_persistReducer);
const persistor = persistStore(store);


export {store, persistor};