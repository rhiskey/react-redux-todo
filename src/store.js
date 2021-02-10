import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { save } from 'redux-localstorage-simple';

// Подключение в приложение redux-evtools для Chrome, если оно в devmode
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

// Улучшения - корневой редусер, preloadState - нач состояние
//
const configureStore = preloadedState => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(save({namespace: 'todo-list'})) //Функция, выполняющая операц. промежуточ данные в момент обновления
    ),
  )
);

const store = configureStore({});

export default store;
