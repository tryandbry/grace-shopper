import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';

// import ProductQuantityChanger from './ProductQuantityChanger';


const Cart = (props) => {
    const items = props.items;
    
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