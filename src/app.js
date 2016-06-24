import React                             from 'react'
import { render }                        from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider }                      from 'react-redux'
import configureStore                    from './store/configureStore'
import App                               from './modules/App'

const store = configureStore()

import css from './styles/index.css'

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            </Route>
        </Router>
    </Provider>
), document.body);