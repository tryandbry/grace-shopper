'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory, Link } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import LoginPage from './components/LoginPage'
import SignUpContainer from './containers/SignUpContainer'


import FilterCatalog from './components/FilterCatalog'

import Product from './components/Product'
import Sidebar from './components/Sidebar'
import Cart from './components/Cart'
import CheckoutContainer from './containers/CheckoutContainer'
import ProductContainer from './containers/ProductContainer'

import Bom from './components/Bom'


import { getProducts, getCategories } from './reducers/catalog'
import { getProduct } from './reducers/product'
import { fetchBom } from './reducers/bom';


/*
const Main = ({ user, children }) => (
    <div>
      <nav>
        {user.id ? <WhoAmI/> : <Login/>}
      </nav>
      <Sidebar />
      {children}
    </div>
)
*/
// TOOD: why aren't these routes covered in react router?
const Main = ({ user, children }) => (
    <div className="container">
        <nav className="navbar navbar-inverse bg-inverse">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Rocks</a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navigationBtn">
                        <li className="nav-item">
                          {/* TODO: use Links from react router to not fetch the document again*/}
                            <Link className="nav-link" to="/catalog">Home<span/></Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="INSERT_LINK_TO_USERPAGE_HERE">Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="INSERT_LINK_TO_ABOUTPAGE_HERE">About</a>
                        </li>
                    </ul>
                    <div className="nav navbar-nav navbar-right">
                        <ul className="navbar-nav">
                            <li className="nav-link">
                                 <a href="/cart" className="glyphicon glyphicon-shopping-cart cart active"></a>
                            </li>
                        </ul>
                        {user.id ? <WhoAmI /> : <Login />}
                    </div>
                </div>
            </div>
        </nav>
        <div className="row">
            <div className="col-lg-2 col-md-2">
                <Sidebar />
            </div>
            <div className="col-lg-10 col-md-10">
                {children}
            </div>
        </div>
    </div>
)

const mapState = ({ auth }) => ({ user: auth })
const ExampleApp = connect(mapState)(Main)





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
// TODO: link to signup
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ExampleApp} onEnter={onEnter}>
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
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('main')
)
