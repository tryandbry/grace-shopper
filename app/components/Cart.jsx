import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
// import { sortByDateDesc } from '../utils';

// import ProductQuantityChanger from './ProductQuantityChanger';

const Cart = (props) => {
    /// okay guys
    /// this doesn't sort for some reason
    const items = props.items.sort((a, b) => b.updated_at - a.updated_at);
    console.log(items)
    
    return (
        <div>
        <h3>Cart</h3>        
        <div>
            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>image</th>
                        <th>name</th>
                        <th>n</th>
                        <th>cost</th>
                    </tr>
                </thead>

                <tbody>
                {
                    items.map(item => (
                        <CartItem 
                            item={item} 
                            key={item.product.id}
                        />
                    ))
                }
                </tbody>

            </table>
        </div>
        
        </div>
    );
}

const mapState = (state) => ({
    items : state.cart.items
});

export default connect(mapState)(Cart);