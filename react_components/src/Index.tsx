import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

// @ts-ignore
window.react = {};
// @ts-ignore
window.react.Test = (container: string) => {
    ReactDOM.render(
        <App/>,
        document.getElementById(container),
    );
};
