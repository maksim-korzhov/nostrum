import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {BrowserRouter, Route, Switch, IndexRoute} from "react-router-dom";
import {composeWithDevTools} from "redux-devtools-extension";

import reducers from "./reducers";

import Main from "./containers/Main";

import style from "../style/style.scss";

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware())(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
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
