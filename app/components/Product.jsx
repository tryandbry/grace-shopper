import React, { Component } from 'react';
import { connect } from 'react-redux';

const Product = (props) => {
    const product = props.selectedProduct;
    const reviews = props.reviews;

    return(
            <div className="product">
      <div>
        <h3>{ product.name }</h3>
        <img src={ product.image } className="img-thumbnail"/>
        <small> { product.description } </small>
        <span> { product.inventory } </span> <span> { product.cost } </span>
        <button type="button" class="btn btn-success" onClick>Add Rock</button>
      </div>
    </div>
    )
}

export default Product;
