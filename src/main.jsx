

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

import { store } from 'store';
import rootRoutes from 'routes';

ReactDOM.render(
	<Provider store={store}>
        <Router routes={rootRoutes} history={browserHistory} />
    </Provider>,
	document.getElementById('root')
);