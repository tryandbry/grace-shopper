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
import Bom from './components/Bom'
import { fetchBom } from './reducers/bom';

import { getProducts, getCategories } from './reducers/catalog'
import { getProduct } from './reducers/product'

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

const Main = ({ user, children }) => (
  <div className="container">
    <nav className="navbar navbar-default">
      <div className="container">
	<div className="navbar-header">
	  <a className="navbar-brand" href="#">Rocks</a>
	</div>
	<div className="collapse navbar-collapse">
	  <div className="navbar-form">
	    {user.id ? <WhoAmI/> : <Login/>}
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

const fetchBomOnEnter = (nextRouterState)=>{
  console.log("fetchBomOnEnter: ",nextRouterState);
  fetchBom(nextRouterState.params.id)(store.dispatch);
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ExampleApp} onEnter={onEnter}>
                <IndexRedirect to="/catalog" />
                <Route path="/catalog" component={FilterCatalog} />
                <Route path="/product/:id" component={Product} onEnter={onProductEnter}/>
                <Route path="/cart" component={Cart} />    
                <Route path="/checkout" component={CheckoutContainer} />    
            </Route>
	    <Route path="/bom/:id" component={Bom} onEnter={fetchBomOnEnter} /> 
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('main')
)
