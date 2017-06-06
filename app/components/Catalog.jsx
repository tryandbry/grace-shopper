import React, { Component } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Catalog = (props) => {
    const products = props.products;
    
    return (
        <div>
        <h3>Catalog</h3>
        <div className="row">
            {
            products && products
                .map(product => (
                    <div className="col-xs-4" key={ product.id }>
                        <Link 
                            className="thumbnail" 
                            to={`/product/${product.id}`}
                        >     
                            <img src={ product.image }/>
                            <div className="caption">
                                <h5><span>{product.name}</span></h5>
                            </div>
                            <small>${ product.cost }</small>
                        </Link>
                    </div>
                ))
            }
        </div>
        </div>
    );
}

export default Catalog;