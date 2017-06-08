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

import Product from './components/Product'
import Sidebar from './components/Sidebar'
import Cart from './components/Cart'
import CheckoutContainer from './containers/CheckoutContainer'
//import CheckoutContainer from './containers/test'

import { getProducts, getCategories } from './reducers/catalog'
import { getProduct } from './reducers/product'
// import { getCart } from './reducers/cart'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      <Sidebar />
      {children}
    </div>
)

const onEnter = function () {
    store.dispatch(getProducts())
    store.dispatch(getCategories())
    // store.dispatch(getCart())
}


const onProductEnter = function (nextRouterState) {
    const productId = nextRouterState.params.id;
    store.dispatch(getProduct(parseInt(productId)))
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ExampleApp} onEnter={onEnter}>
                <IndexRedirect to="/catalog" />
                <Route path="/catalog" component={FilterCatalog} />
                <Route path="/product/:id" component={Product} onEnter={onProductEnter}/>
                <Route path="/user/:userId/cart" component={Cart} />    
                <Route path="/checkout" component={CheckoutContainer} />    
            </Route>
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('main')
)
