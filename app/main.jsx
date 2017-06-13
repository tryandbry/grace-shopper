'use strict'

import React from 'react'
import { Router, Route, IndexRedirect, browserHistory, Link } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
// import Jokes from './components/Jokes'
import Login from './components/Login'
import NotFound from './components/NotFound'
import LoginPage from './components/LoginPage'
import SignUpContainer from './containers/SignUpContainer'
import Logout from './components/Logout'

import AppContainer from './containers/AppContainer'
import FilterCatalog from './components/FilterCatalog'

import Product from './components/Product'
import Cart from './components/Cart'
import CheckoutContainer from './containers/CheckoutContainer'
import ProductContainer from './containers/ProductContainer'

import Bom from './components/Bom'


import { getProducts, getCategories } from './reducers/catalog'
import { getProduct } from './reducers/product'
import { fetchBom } from './reducers/bom';

const onEnter = function () {
    store.dispatch(getProducts())
    store.dispatch(getCategories())
}

const onProductEnter = function (nextRouterState) {
    const productId = nextRouterState.params.id;
    store.dispatch(getProduct(parseInt(productId)))
}

const fetchBomOnEnter = (nextRouterState) => {
    console.log("fetchBomOnEnter: ", nextRouterState);
    fetchBom(nextRouterState.params.id)(store.dispatch);
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppContainer} onEnter={onEnter}>
                <IndexRedirect to="/catalog" />
                <Route path="/catalog" component={FilterCatalog} />
                <Route path="/catalog/:category" component={FilterCatalog} />
                <Route path="/product/:id" component={ProductContainer} onEnter={onProductEnter} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={CheckoutContainer} />
            </Route>
            <Route path="/bom/:id" component={Bom} onEnter={fetchBomOnEnter} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignUpContainer} />
            <Route path='/logout' component={Logout} />
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('main')
)
