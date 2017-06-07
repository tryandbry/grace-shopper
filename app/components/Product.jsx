import React, { Component } from 'react';
import { connect } from 'react-redux';

// need find way to make user match review and get user on props

const Product = (props) => {
    const product = props.selectedProduct;
    const reviews = props.reviews;
    const user = props.user;

    return(
            <div className="product">
      <div>
        <h3>{ product.name }</h3>
        <img src={ product.image } className="img-thumbnail"/>
        <small> { product.description } </small>
        <span> { product.inventory } </span> <span> { product.cost } </span>
        <button type="button" class="btn btn-success" onClick={'FILL_ME_IN'}>Add Rock</button>
      </div>
      <div>
          {
              reviews && reviews.map(review => (
                <div key={ review.id }>
                    <h5><span>{user.name}</span></h5>  
                    <small>{ review.text }</small>
                </div>
              ))
          }
      </div>
    </div>
    )
}

export default Product;
