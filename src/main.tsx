import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import App from './app';
import store from 'app/store';
import ErrorBoundary from 'app/components/Utils/ErrorBoundary';

const HandleAppError = () => {
    return <ErrorBoundary component={<App />} />;
};

ReactDOM.render(
    <Provider store={store}>
        <HandleAppError />
    </Provider>,
    document.getElementById('root'),
);
