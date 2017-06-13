import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { printPrice } from 'APP/utils'
const Catalog = ({ products }) => (
    <div>
        <div className="center">
        <h3>Catalog</h3>
        </div>
        <div className="row">
            {
                products && products
                    .map(product => (
                            <div className="col-lg-12 col-md-12" key={product.id}>
                                <Link
                                    className="thumbnail"
                                    to={`/product/${product.id}`}
                                >
                                    <img className="images" src={product.image} />
                                    <div className="caption">
                                        <h5><span>{product.name}</span></h5>
                                    </div>
                                    <small className="hCost">price: {printPrice(product.cost)}</small>
                                </Link>
                            </div>
                    ))
            }
        </div>
    </div>
)

export default Catalog;