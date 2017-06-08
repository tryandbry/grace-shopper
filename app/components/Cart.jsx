import React from 'react';
import { connect } from 'react-redux';
import CartItems from './CartItems';
import { getCart } from '../reducers/cart';

class Cart extends React.Component {
    constructor () {
        super();
        this.state = {
            items : []
        }
    }
    
    // componentDidMount (nextProps, nextState) {
    //     const { userId } = nextState.params;
    //     getCart( userId, )
    // }
    
    render () {
        const items = this.props.items;
        
        return (
            <div>
            <h3>Cart</h3>
            <CartItems items={items}/>
            </div>
        );
    }
}

const mapState = (state) => ({
    items : state.cart.items
});
// const mapDispatch = (dispatch) => ({
//     getCart : () =>
// });

export default connect(mapState)(Cart);