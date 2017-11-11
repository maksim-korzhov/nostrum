import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch, IndexRoute } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

import Main from "./containers/Main";

import style from "../style/style.scss";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// compose saga with store
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(sagaMiddleware))(createStore);

const store = createStoreWithMiddleware(reducers);

// run the saga
sagaMiddleware.run(sagas);

// render the application
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            {/*<Wrapper>*/}
                <Switch>
                    <Route path="/" component={Main} />
                </Switch>
            {/*</Wrapper>*/}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
