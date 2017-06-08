import React from 'react';
import { Link } from 'react-router';

const CartItems = (props) => {
    const items = props.items;
    
    return (
        <div>
            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>item</th>
                        <th>image</th>
                        <th>name</th>
                        <th>n</th>
                        <th>cost</th>
                    </tr>
                </thead>
        
                <tbody>
                {
                    items.map((item, i) => (
                        <Link 
                            to={`/product/${item.product.id}`}
                        >
                        <tr key={item.id}>
                            <th scope="row">{i}</th>
                            <td><img src={ item.product.image } /></td>
                            <td>{ item.product.name }</td>
                            <td>{
                                ( item.quantity < item.product.inventory )
                                ? item.quantity
                                : item.product.inventory
                            }</td>
                            <td>{ item.cost }</td>
                        </tr>
                        </Link>
                    ))
                }
                </tbody>
        
            </table>
        </div>
    );
}

export default CartItems;