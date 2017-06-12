import React from 'react'
import { connect } from 'react-redux'
import ProductOrItemContainer from '../containers/ProductOrItemContainer'

const Cart = ({ items }) => (
    <div>
    <h3>Cart</h3>        
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
                </div>
            ))
    }</div>
    
    </div>
)

const mapState = state => ({
    items : state.cart.items
});

export default connect(mapState)(Cart);