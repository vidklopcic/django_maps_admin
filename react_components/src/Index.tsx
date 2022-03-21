import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {MapsLineAdmin} from './MapsLineAdmin';

// @ts-ignore
window.react = {};
// @ts-ignore
window.react.App = (container: HTMLElement) => {
    ReactDOM.render(
        <App/>,
        container,
    );
};

// @ts-ignore
window.react.MapsLineAdmin = (container: HTMLElement) => {
    ReactDOM.render(
        <MapsLineAdmin/>,
        container,
    );
};

