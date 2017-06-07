import React, { Component } from 'react';
import { connect } from 'react-redux';

// need find way to make user match review and get user on props

const Product = (props) => {
    const product = props.selectedProduct;

    return(
            <div className="product">
      <div>
        <h3>{ product.name }</h3>
        <img src={ product.image } className="img-thumbnail"/>
        <small> { product.description } </small>
        <span> { product.inventory } </span> <span> { product.cost } </span>
        <button type="button" className="btn btn-success" onClick={() => console.log('=]')}>Add Rock</button>
      </div>
      <div>
          {
              product.reviews && product.reviews.map(review => (
                <div key={ review.id }>
                    <h5><span>{review.user.fullName}</span></h5>  
                    <small>{ review.text }</small>
                </div>
              ))
          }
      </div>
    </div>
    )
}


function mapStateToProps(state) {
    return { selectedProduct: state.product.product };
}

export default connect(mapStateToProps)(Product);
