import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ProductOrItemContainer from '../containers/ProductOrItemContainer'

const Cart = ({ items }) => (
    <div>
    <h3>Cart</h3>
    <hr/><hr/>
    <div>{
        items
            .sort((a, b) => b.updated_at - a.updated_at)
            .map(item => (
                <div className="row" key={item.product.id}>
                <ProductOrItemContainer
                    type='Item'
                    productOrItem={item} 
                    selectedProduct={item.product}
                />
                <hr/>
                </div>
            ))
    }</div>
    
    <hr/>
    <div className="container">
        <div className="row">
            <div className="col-lg-8 col-md-8">
            </div>
            <div className="col-lg-2 col-md-2">
                <h3>total?</h3>
                <Link to={'/checkout'}>
                    <button className="btn btn-default btn-success" >
                    Checkout
                    </button>
                </Link>
            </div>
        </div>
    </div>
    
    
    </div>
)

const mapState = state => ({
    items : state.cart.items
});

export default connect(mapState)(Cart);