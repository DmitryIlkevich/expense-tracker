import {SnackbarProvider} from "notistack";
import AppRouter from "./AppRouter";

const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <AppRouter/>
    </SnackbarProvider>, document.getElementById('react'));


