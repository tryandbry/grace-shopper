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
import UserPage from './components/UserPage'
import About from './components/About'
import Bom from './components/Bom'

// import { getUsersOrders } from './reducers/user'
import { getProducts, getCategories } from './reducers/catalog'
import { getProduct } from './reducers/product'
import { fetchBom } from './reducers/bom'

const onEnter = function () {
    store.dispatch(getProducts())
    store.dispatch(getCategories())
}

// const onOrdersEnter = () => {                 // monica change this to a component will mount on userpage or figure another way but userid on state is async and not loading in time as is
//     console.log('userId? ', store.getState().auth.user.id);
//     const userId = store;
//     store.dispatch(getUsersOrders(userId));
// }

const onProductEnter = function (nextRouterState) {
    const productId = nextRouterState.params.id;
    store.dispatch(getProduct(parseInt(productId)))
}

const fetchBomOnEnter = (nextRouterState) => {
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
                <Route path="/account" component={UserPage} />
            </Route>
            <Route path="/bom/:id" component={Bom} onEnter={fetchBomOnEnter} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignUpContainer} />
            <Route path='/logout' component={Logout} />
            <Route path='/about' component={About} />
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('main')
)
