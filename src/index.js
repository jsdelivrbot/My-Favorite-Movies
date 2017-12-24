
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import App      from './components/app';
import Async    from './middlewares/async';
import reducers from './reducers';


ReactDOM.render(
    <Provider store={ applyMiddleware( Async )( createStore )( reducers ) }>
        <App />
    </Provider>,
    document.querySelector( '.container' )
);
