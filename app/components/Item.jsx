import React from 'react';
import { Link } from 'react-router';
import ProductQuantityChanger from './ProductQuantityChanger';
import { printPrice } from '../../utils'

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
            <div className="col-lg-10 col-md-10">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <h3> { item.product.name } </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <p> { item.product.description } </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <button 
                                type="button"
                                className="btn btn-success" 
                                onClick={removeItemFromCart}
                            >Delete Rock
                            </button>
                        </div>
                        
                        <div className="col-lg-1 col-md-1">
                        </div>
                        
                        <div className="col-lg-2 col-md-2">
                            <ProductQuantityChanger 
                                changeQuantity={changeQuantity}
                                handleChange={handleChange}
                                quantity={quantity}
                            />
                            <p></p>
                            {/*<h5 className="right">{ printPrice(item.cost) }</h5>*/}
                        </div>
                        
                        <div className="col-lg-1 col-md-1">
                        </div>         
                        
                        <div className="col-lg-2 col-md-2">
                            <h4 className=""> { printPrice(quantity * item.cost) } </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Item;