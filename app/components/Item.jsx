import React from 'react';
import { Link } from 'react-router';
import ProductQuantityChanger from './ProductQuantityChanger';


const Item = ({ item, changeQuantity, handleChange, addItemToCart }) => (
    <div className="container item">
        <div className="row">
            <div className="col-lg-2 col-md-2">
                <Link
                to={`/product/${item.product.id}`}
                key={item.product.id}
                >
                    <img src={ item.product.image } className="img-thumbnail" />
                </Link>
            </div>
            <div className="col-lg-2 col-md-2">
                <div className="row">
                    <h4> { item.product.name } </h4>
                </div>
                <div className="row">
                    <span className=""> quantity { item.quantity } times cost { item.cost } </span>
                </div>
                <div className="row">
                    <span className=""> total { item.quantity * item.cost } </span>
                </div>
                <div className="row">
                    <ProductQuantityChanger 
                        changeQuantity={changeQuantity}
                        handleChange={handleChange}
                        quantity={item.quantity}
                    />
                </div>
            </div>
        </div>
    </div>
)

export default Item;