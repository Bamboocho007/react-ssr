import React from "react";
// hydrate is going to do is it tells React that you’ve already created the markup on the server and instead of recreating it on the client, it should preserve it and just attach any needed event handlers to the existing server rendered markup
import { hydrate } from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import "@babel/polyfill";
import Routes from "./Routes";
import { store } from "./store";

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>, 
    document.getElementById("root")
)