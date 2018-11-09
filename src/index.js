import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer } from './Redux/reducers';
import {BrowserRouter as Router} from "react-router-dom";

export const store = createStore(appReducer, composeWithDevTools());
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
