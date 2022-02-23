import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/rootReducer';
import middlewares from './middlewares/middlewares';

// const store = createStore(rootReducer);

// export default store;

export default function configureStore () {
    const store = createStore(
        rootReducer,
        {},
        applyMiddleware(
            middlewares
        )
    );

    return store;
}