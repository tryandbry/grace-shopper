import React from 'react';
import { Link } from 'react-router';
import ProductQuantityChanger from './ProductQuantityChanger';


const Item = ({ item, changeQuantity, handleChange, quantity, addItemToCart }) => {

    return (
        <div>
                <Link
                to={`/product/${item.product.id}`}
                key={item.product.id}
                ><img src={ item.product.image } />
                </Link>
                { item.product.name }
                {
                    ( item.quantity < item.product.inventory )
                    ? item.quantity
                    : item.product.inventory
                }
                <ProductQuantityChanger 
                    changeQuantity={changeQuantity}
                    handleChange={handleChange}
                    quantity={quantity}
                />

                { item.cost }
    </div>
    );
}

export default Item;