'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import FilterCatalog from './components/FilterCatalog'

import { getProducts, getCategories } from './reducers/catalog';

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const onEnter = function () {
    store.dispatch(getProducts)
    store.dispatch(getCategories)
    console.log('ONENTER')
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ExampleApp} onEnter={onEnter}>
                <IndexRedirect to="/catalog" />
                <Route path="/catalog" component={FilterCatalog} />
            </Route>
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('main')
)
