import React from 'react';
import { connect } from 'react-redux';
import ProductQuantityChanger from './ProductQuantityChanger';

// userId getting passed in through props, will bomId or need grab bomId in db

const Product = ({ product, changeQuantity, handleChange, quantity, addItemToCart  }) => {

    return (
        <div className="product">
            <div>
                <h3>{product.name}</h3>
                <img src={product.image} className="img-thumbnail" />
                <small> {product.description} </small>
                <span> Quantity {product.inventory} </span> 
                <span> ${product.cost} </span>

                <ProductQuantityChanger 
                    changeQuantity={changeQuantity}
                    handleChange={handleChange}
                    quantity={quantity}
                />
    
                <button 
                    type="button"
                    className="btn btn-success" 
                    onClick={addItemToCart}
                >Add Rock
                </button>
            </div>
            <div>
                {
                    product.reviews && product.reviews.map(review => (
                        <div key={review.id}>
                            <h5><span>{review.user.fullName}</span></h5>
                            <small>{review.text}</small>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Product;