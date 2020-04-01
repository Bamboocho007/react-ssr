import { StaticRouter, matchPath } from "react-router-dom";
// renderToString compile all react app to html string
import { renderToString } from "react-dom/server";
import React from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Provider } from "react-redux"; 
import express from "express";
import serialize from "serialize-javascript"
import "@babel/polyfill";
import Routes from "./Routes";
import { store } from "./store";
import manifest from "../dist/manifest.json";

const app = express();
app.use(express.static("dist"));


app.get("*", (req, res) => {
    const template = (content, initialData = null) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>My react ssr</title>
            <link rel="stylesheet" type="text/css" href="${manifest['main.css']}" media="screen"/>
        </head>
        <body>
            <div id="root">${content}</div>
            <script>window.__INITIAL_DATA__ = ${serialize(initialData)}</script>
            <script src="${manifest['main.js']}"></script>
        </body>
        </html>
    `;

    const renderer = (data) => renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{data}}>
                {renderRoutes(Routes)}
            </StaticRouter> 
        </Provider>
    )
    const activeRoute = Routes[0].routes.find((route) => matchPath(req.url, route)) || {}
    const promise = activeRoute.component.fetchInitialData
    ? activeRoute.component.fetchInitialData(store)
    : Promise.resolve();

    promise
        .then((data) => {
            const DOMString = renderer(data);
            res.send( template(DOMString) );
        })
        .catch((err) => {
            console.log(err)
        })
});

app.listen(3000, (err) => {
    if( err ) {
        console.log(err);
    } else {
        console.log('Server started on port 3000');
    }
})