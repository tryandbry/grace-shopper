import React from 'react';
import { connect } from 'react-redux';
import ProductQuantityChanger from './ProductQuantityChanger';
import { printPrice } from 'APP/utils'


//need add reviewchange somewhere to take in input in real time........

const Product = ({ product, changeQuantity, handleChange, quantity, addItemToCart, handleReviewForm, handleStarChange, onReviewSubmit, rating }) => (
    <div className="container product">
        <div className="row">
            <div className="col-lg-3 col-md-3">
                <h3>{product.name}</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-3 col-md-3">
                <img src={product.image} className="img-thumbnail" />
            </div>
            <div className="col-lg-3 col-md-3">
                <span className="stock"> In Stock: </span>
                <span className="quantity"> {product.inventory} </span>
                <div></div>
                <span className="stock"> price: </span>
                <span className="cost"> {printPrice(product.cost)} </span>
                <span className="stock"> Average Rating: </span>
                <span className="averageRating"> { rating ? Math.round(rating * 100) / 100 + ' stars!' : 'There are no Current Ratings' } </span>
            </div>
        </div>
        <div className="row purchase">
            <div className="col-lg-3 col-md-3">
                <ProductQuantityChanger
                    changeQuantity={changeQuantity}
                    handleChange={handleChange}
                    quantity={quantity}
                />
            </div>
            <div className="col-lg-3 col-md-3">
                <span><button
                    type="button"
                    className="btn btn-success"
                    onClick={addItemToCart}
                >Add Rock
                </button></span>
            </div>
        </div>
        <div className="row description">
            <div className="col-lg-6 col-md-6">
                <small className="descriptionHeader"> Product Description </small>
                <div className="well well-lg"> {product.description} </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                            <label for="inputlg">Leave a Review for {product.name}</label>
                            <div className="row">
                                <textarea className="form-control" rows="5" id="comment" onChange={handleReviewForm}></textarea>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <input id="input-id" type="number" className="rating" min={0} max={5} step={0.5} data-size="lg" onChange={handleStarChange} />
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3"/>
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <button type="button" className="btn btn-success" onClick={onReviewSubmit}> Submit Review </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    product.reviews && product.reviews.map(review => (
                        <div key={review.id}>
                            <h5><span>{review.user.fullName}</span></h5>
                            <small>Rating: {review.rating} stars </small>
                            <div>
                            <small className='reviewTxt'>{review.text}</small>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
)




const mapState = state =>{
    console.log(state.product.rating)
return {
    rating: state.product.rating
}
} 

export default connect(mapState)(Product);