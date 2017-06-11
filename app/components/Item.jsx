import React from 'react';
import { Link } from 'react-router';
import ProductQuantityChanger from './ProductQuantityChanger';

/*
    be careful using item.quantity, which is not tied to state
    (local state in ProductOrIemConatiner)
    whereas quantity is!
*/

const Item = ({ item, changeQuantity, quantity, handleChange, removeItemFromCart }) => (
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
                    <span className=""> quantity { quantity } times cost { item.cost } </span>
                </div>
                <div className="row">
                    <span className=""> total { quantity * item.cost } </span>
                </div>
                <div className="row">
                    <ProductQuantityChanger 
                        changeQuantity={changeQuantity}
                        handleChange={handleChange}
                        quantity={quantity}
                    />
                </div>
            </div>
            <div className="col-lg-2 col-md-2">
                <div className="row">
                    <button 
                        type="button"
                        className="btn btn-success" 
                        onClick={removeItemFromCart}
                    >Delete Rock
                    </button>
                </div>
            </div>
        </div>
    </div>
)

export default Item;