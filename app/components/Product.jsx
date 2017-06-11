import React from 'react';
import { connect } from 'react-redux';
import ProductQuantityChanger from './ProductQuantityChanger';

const Product = ({ product, changeQuantity, handleChange, quantity, addItemToCart  }) => (
    <div className="container product">
        <div>
            <div className="row">
                <h3>{product.name}</h3>
            </div>
            <div className="row">
                <div className="col-lg-2 col-md-2">
                    <img src={product.image} className="img-thumbnail" />
                </div>
                <div className="col-lg-2 col-md-2">
                    <div className="row">
                    <span className="stock"> In Stock: </span> <span className="quantity"> {product.inventory} </span>
                    </div>
                    <div className="row">
                    <span className="stock"> price: </span> <span className="cost"> ${product.cost} </span>
                    </div>
                </div>
            </div>
            <div className="row purchase">
                <div className="container">
                    <div className="col-lg-2">
                        <ProductQuantityChanger 
                            changeQuantity={changeQuantity}
                            handleChange={handleChange}
                            quantity={quantity}
                        />
                    </div>
                    <div className="col-lg-2">
                        <button 
                            type="button"
                            className="btn btn-success" 
                            onClick={addItemToCart}
                        >Add Rock
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className="row description">
                <small className="descriptionHeader"> Product Description </small>
            </div>
            <div className="row">
                <div className="well well-lg"> {product.description} </div>
            </div>
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


export default Product;