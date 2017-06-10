import React from 'react';
import { Link } from 'react-router';

// import ProductQuantityChanger from './ProductQuantityChanger';


const CartItem = (props) => {
    const item = props.item;

    return (
        <tr>
            <td>
                <Link
                to={`/product/${item.product.id}`}
                key={item.product.id}
                ><img src={ item.product.image } />
                </Link>
            </td>
            <td>{ item.product.name }</td>
            <td>{
                ( item.quantity < item.product.inventory )
                ? item.quantity
                : item.product.inventory
            }</td>
            <td>{ item.cost }</td>
        </tr>
    );
}

export default CartItem;