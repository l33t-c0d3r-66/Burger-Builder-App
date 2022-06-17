import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import reducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/authentication';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {watchAuthentication} from './store/sagas/index';

const composeEnhancers = (process.env.NODE_ENV === "development" ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null) || compose;

const rootReducer = combineReducers({
    burgerBuilder: reducer,
    order: orderReducer,
    auth: authReducer
})

const sageMiddleWare = createSagaMiddleware();


const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk, sageMiddleWare)));

sageMiddleWare.run(watchAuthentication);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
