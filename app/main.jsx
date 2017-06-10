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

import UserOrders from './components/UserOrders'
import UserPage from './components/UserPage'
import Product from './components/Product'
import Sidebar from './components/Sidebar'
import Cart from './components/Cart'
import CheckoutContainer from './containers/CheckoutContainer'
import Bom from './components/Bom'
import { fetchBom } from './reducers/bom'

import { getProducts, getCategories } from './reducers/catalog'
import { getProduct } from './reducers/product'
import { getUsersOrders } from './reducers/user'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user.id ? <WhoAmI/> : <Login/>}
      </nav>
      <Sidebar />
      {children}
    </div>
)

const onEnter = function () {
    store.dispatch(getProducts())
    store.dispatch(getCategories())
}


const onProductEnter = function (nextRouterState) {
    const productId = nextRouterState.params.id;
    store.dispatch(getProduct(parseInt(productId)));
}

const fetchBomOnEnter = (nextRouterState)=>{
  fetchBom(nextRouterState.params.id)(store.dispatch);
}

const onUserOrdersEnter = nextRouterState => {
    const userId = nextRouterState.params.userId;
    store.dispatch(getUsersOrders(parseInt(userId)));
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
                <Route path="/user/:userId/account" component={UserPage} />  
                <Route path="/user/:userId/account/orders" component={UserOrders} />   
            </Route>
	    <Route path="/bom/:id" component={Bom} onEnter={fetchBomOnEnter} /> 
            <Route path='*' component={NotFound} />
        </Router>
    </Provider>,
    document.getElementById('main')
)

