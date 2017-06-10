import React from 'react';
import { connect } from 'react-redux';
import CartItems from './CartItems';

const Cart = (props) => {
    const items = props.items;
    
    return (
        <div>
        <h3>Cart</h3>
        <CartItems items={items}/>
        </div>
    );
}

const mapState = (state) => ({
    items : state.cart.items
});

export default connect(mapState)(Cart);